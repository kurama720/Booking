"""
Get data of the actual apartments in Minsk from the site www.booking.com.
Write down data into SCV file
"""
import os
import sys
import csv
import uuid
import logging
import random
import threading
from typing import List

import requests
from bs4 import BeautifulSoup

logging.basicConfig(handlers=[logging.FileHandler(filename='app.log',
                                                  mode='w', encoding='utf-8')],
                    level=logging.DEBUG,
                    format='%(asctime)s - %(levelname)s - %(message)s')

user_agent = ("Mozilla/5.0 (Windows NT 6.3; Win64; x64)"
              "AppleWebKit/537.36 (KHTML, like Gecko)"
              "Chrome/92.0.4515.159 Safari/537.36")

hotels_data = []
hotels_unique_id = set()
img_num = 1


def create_directory(name_dir: str) -> None:
    """Create directory"""
    try:
        os.mkdir(name_dir)
    except FileExistsError as ex:
        logging.error(ex)


def get_data_from_hotel_page(url: str) -> None:
    """
    Get hotel data

    Get hotel data from page, add unique id, download hotel avatar.
    Add data in tuple format to the 'hotels_data' list
    :param url: link to hotel page
    :return: None
    """
    global img_num
    description = ""
    unique_id = uuid.uuid4

    # check for duplicate unique_id
    while unique_id in hotels_unique_id:
        unique_id = uuid.uuid4

    hotels_unique_id.add(unique_id)
    soup = make_request_beautifulsoup(url)
    try:
        name = soup.find("a", id="hp_hotel_name_reviews").text.strip()
        location = soup.find("a", id="hotel_address").get("data-atlas-latlng")
        price = random.randint(70, 300)
        img = soup.find("a", class_="bh-photo-grid-photo1").get("data-thumb-url")
        block_description = soup.find("div",
                                      id="property_description_content").find_all("p")
        for part in block_description:
            if not part.find("a"):
                description += (part.text.strip().replace("\n", "") + " ")

        response = requests.get(img)
        img_name = f"IMG-{img_num}.jpg"
        with open(f"images/{img_name}", 'wb') as file:
            file.write(response.content)

        hotel_data = (unique_id, name, price, img_name, location, description)
        hotels_data.append(hotel_data)

        img_num += 1
    except Exception as ex:
        logging.error(ex)


def make_request_beautifulsoup(url: str) -> BeautifulSoup:
    """
    Make GET request by link using 'BeautifulSoup' and return processed HTML

    :param url: link to site page
    :return: page HTML processed with BeautifulSoup
    """
    try:
        headers = {"User-Agent": f"{user_agent}"}
        req = requests.get(url, headers=headers, timeout=15)
        src = req.text
        soup = BeautifulSoup(src, "lxml")
        return soup
    except Exception as ex:
        logging.error(ex)


def search_hotel_links_in_page_html(soup: BeautifulSoup) -> List[str]:
    """
    Find hotels links and return list of them

    Find all elements with hotel link.
    Add hotel url in str format to the 'urls' list
    Script stops if there are no such elements on the page
    :param soup: page HTML processed with BeautifulSoup
    :return: list of hotels urls in str format
    """
    urls = []
    try:
        all_hotel_href = soup.find_all("a", class_="fb01724e5b")
        for elem in all_hotel_href:
            url = elem.get("href")
            urls.append(url)
        return urls
    except Exception as ex:
        logging.error(ex)
        sys.exit()


def search_total_number_of_hotel_pages(soup: BeautifulSoup) -> int:
    """
    Find total number of hotel pages

    Script stops if there is no such element on the page
    :param soup: page HTML processed with BeautifulSoup
    :return: number of pages in int format
    """
    try:
        block = soup.find("ol", class_="_5312cbccb")
        total_number = block.find_all("button",
                                      class_="_4310f7077 _fd15ae127")[-1].text
        return int(total_number)
    except Exception as ex:
        logging.error(ex)
        sys.exit()


if __name__ == '__main__':
    site_url = ("https://www.booking.com/searchresults.html?aid=397594;"
                "label=gog235jc-1DCAEoggI46AdIIVgDaCWIAQGYASG4ARfIAQzYAQ"
                "PoAQH4AQKIAgGoAgO4Aq6IjI4GwAIB0gIkMDJjM2U3N2YtN2UyMi00MD"
                "hjLTg0YjItNjI3MWVkYTdhMTI12AIE4AIB;sid=610cc94925e44a6151"
                "66d1d3ba8e2a8e;dest_id=-1946324;dest_type=city;"
                "srpvid=47b059f530680012&offset=")

    create_directory("images")
    count_hotels = 1000
    count_file_records = 0
    page_records_offset = 0
    hotel_pages_num = 1

    with open(f"hotels.csv", "w", encoding="utf-8-sig") as csv_file:
        pass

    while count_file_records < count_hotels and hotel_pages_num:
        bf_soup = make_request_beautifulsoup(site_url+str(page_records_offset))
        hotels_url = search_hotel_links_in_page_html(bf_soup)
        if not page_records_offset:
            hotel_pages_num = search_total_number_of_hotel_pages(bf_soup)

        threads = []
        for hotel_url in hotels_url:
            threads.append(threading.Thread(target=get_data_from_hotel_page,
                                            args=(hotel_url,)))
            threads[-1].start()
        for thread in threads:
            thread.join()

        for data in hotels_data:
            if count_file_records < count_hotels:
                with open(f"hotels.csv", "a", newline='',
                          encoding="utf-8-sig") as csv_file:
                    writer = csv.writer(csv_file, delimiter=";")
                    writer.writerow(data)
                    count_file_records += 1
            else:
                sys.exit()

        hotels_data.clear()
        page_records_offset += 25
        hotel_pages_num -= 1
