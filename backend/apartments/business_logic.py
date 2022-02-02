from rest_framework.exceptions import ValidationError
from rest_framework.request import Request


def check_files_in_request(request: Request) -> list:
    """
    Check that all current files(images) available in request object
    :param request: request object, that should contain current files
    :return: images list or empty list or raise exception
    """
    images = request.FILES.getlist("img_content")
    if images:
        if len(images) > 8:
            raise ValidationError({"img_content": ["Can't set more than 8 images!"]})
        return images
    return []
