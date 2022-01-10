from django.test import TestCase
from django.core.files.uploadedfile import SimpleUploadedFile

from accounts.models import BusinessClientUser
from apartments.models import Apartment
from apartments.api.serializers import ApartmentSerializer


class ApartmentSerializerTestCase(TestCase):
    def test_serialize(self):
        # change to current image path
        image_path = "images/IMG-1.jpg"

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
                img=SimpleUploadedFile(name="test_image.jpg",
                                       content=open(image_path, "rb").read(),
                                       content_type="image/jpeg"),
                lat=21,
                lon=299,
                description="some description",
                num_of_bedrooms=2,
                business_account=test_business_client
        )
        test_data = ApartmentSerializer(test_apartment).data
        expected_data = dict(
            id=str(test_apartment.id),
            title="some title",
            price=120,
            img=test_apartment.img.url,
            lat=21.0,
            lon=299.0,
            description="some description",
            num_of_bedrooms=2,
            rating=None,
            created_at=test_apartment.created_at.isoformat().replace("+00:00", "Z"),
            business_account=test_business_client.id
        )
        self.assertEqual(test_data, expected_data)
