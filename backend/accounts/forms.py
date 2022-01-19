from django.contrib.auth.forms import UserCreationForm, UserChangeForm

from accounts.models import ClientUser


class ClientUserCreationForm(UserCreationForm):
    class Meta(UserCreationForm):
        model = ClientUser
        fields = ('email',)


class ClientUserChangeForm(UserChangeForm):
    class Meta:
        model = ClientUser
        fields = ('email',)
