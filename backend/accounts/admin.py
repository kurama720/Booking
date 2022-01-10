from django.contrib import admin

from accounts.models import ClientUser, BusinessClientUser


admin.site.register(ClientUser)
admin.site.register(BusinessClientUser)
