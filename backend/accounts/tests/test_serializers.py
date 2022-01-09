from django.test import TestCase

from accounts.api.serializers import BusinessClientSerializer
from accounts.models import BusinessClientUser


class BusinessClientSerializerTestCase(TestCase):
    def test_serialize(self):
        test_business_client = BusinessClientUser.objects.create(
            organization_name="Feel Goode Test Inc.",
            email="test@email.cim",
            password="test1password",
            first_name="testfirst",
            last_name="testsecond"
        )
        test_data = BusinessClientSerializer(test_business_client).data
        expected_data = {
            "id": test_business_client.id,
            "apartments": []
        }
        self.assertEqual(expected_data, test_data)
