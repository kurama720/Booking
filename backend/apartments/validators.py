from django.core.exceptions import ValidationError
from django.core.validators import BaseValidator

import jsonschema

SCHEMA = {
    "type": "object",
    "properties": {
        "guests": {"type": "number"},
        "bedrooms": {"type": "number"},
        "beds": {"type": "number"},
        "bathrooms": {"type": "number"},
    },
    "required": ["guests", "bedrooms", "beds", "bathrooms"],
}  # json schema for proper validation of apartment features descriptions


class JSONSchemaValidator(BaseValidator):
    """Validator for comparing incoming data and the correct scheme"""
    def compare(self, input_value, schema):
        try:
            jsonschema.validate(input_value, schema)
        except jsonschema.exceptions.ValidationError:
            raise ValidationError(f"{input_value} is failed JSON schema check!")
