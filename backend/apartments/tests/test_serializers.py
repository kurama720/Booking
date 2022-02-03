from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from PIL import Image

from accounts.models import BusinessClientUser
from apartments.models import Apartment, ApartmentsImage
from apartments.api.serializers import ApartmentSerializer


class ApartmentSerializerTestCase(TestCase):
    def test_serialize(self):
        test_image = Image.new("P", (300, 300))
        image_to_save = SimpleUploadedFile("Test_image.png", test_image.tobytes())

        test_image_2 = Image.new("P", (300, 300), color=12)
        image_to_save_2 = SimpleUploadedFile("Test_image_2.png", test_image_2.tobytes())

        test_business_client = BusinessClientUser.objects.create(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        test_apartment = Apartment.objects.create(
                title="some title",
                price=120,
                lat=21,
                lon=299,
                description="some description",
                feature=dict(),
                business_account=test_business_client
        )
        image = ApartmentsImage.objects.create(
            apartments=test_apartment,
            img=image_to_save
        )
        image_2 = ApartmentsImage.objects.create(
            apartments=test_apartment,
            img=image_to_save_2
        )

        test_apartment.img_content.set([image, image_2])
        test_data = ApartmentSerializer(test_apartment).data
        expected_data = dict(
            id=test_apartment.id,
            uuid=str(test_apartment.uuid),
            img_content=[f"{image.img.url}",
                         f"{image_2.img.url}"],
            title="some title",
            price=120,
            lat=21.0,
            lon=299.0,
            description="some description",
            feature=dict(),
            rating=None,
            business_account=test_business_client.id,
            user=[],
        )
        self.assertEqual(test_data, expected_data)
