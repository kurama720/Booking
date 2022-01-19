from django.core.exceptions import ValidationError
from rest_framework.test import APITestCase

from apartments.validators import SCHEMA, JSONSchemaValidator

VALID_JSON = {"guests": 2, "bedrooms": 2, "beds": 3, "bathrooms": 1}
INVALID_JSON = {"guests": 1, "chicken": "apple", "beds": "four", "bathroom": 1}


class ValidationFeatureJSON(APITestCase):

    def test_invalid_json(self):
        JSONSchemaValidator(INVALID_JSON, SCHEMA)
        self.assertRaisesMessage(ValidationError, f"{INVALID_JSON} is failed JSON schema check!")

    def test_valid_json(self):
        self.assertTrue(JSONSchemaValidator(VALID_JSON, SCHEMA))
