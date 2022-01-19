import re

from django.core.exceptions import ValidationError


class PasswordNumberValidator(object):
    def get_help_text(self):
        return f"The password must contain at least 2 digits."

    def validate(self, password, user=None):
        if not re.findall('(?=(.*\d){2})', password):
            raise ValidationError(
                "The password must contain at least 2 digits.",
                code='password_no_number',
            )


class PasswordLetterValidator(object):
    def get_help_text(self):
        return f"The password must contain at least 2 letters."

    def validate(self, password, user=None):
        if not re.findall('(?=.*[a-zA-Z]{2})', password):
            raise ValidationError(
                "The password must contain at least 2 letters.",
                code='password_no_letter',
            )


def first_name_validator(first_name):
    if len(first_name) < 2:
        raise ValidationError(
            "First name must be 2 or more characters long",
            code='first_name_too_short',
        )
    if not re.findall('^([A-z])+$', first_name):
        raise ValidationError(
            "First name must contain only latin characters.",
            code='first_name_wrong_characters',
        )


def last_name_validator(last_name):
    if len(last_name) < 2:
        raise ValidationError(
            "Last name must be 2 or more characters long",
            code='last_name_too_short',
        )
    if not re.findall('^([A-z])+$', last_name):
        raise ValidationError(
            "Last name must contain only latin characters.",
            code='last_name_wrong_characters',
        )
