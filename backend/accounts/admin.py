from django.contrib import admin

from accounts.models import ClientUser, BusinessClientUser
from django.contrib.admin import ModelAdmin


class BusinessClientModelAdmin(ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.set_password(form.data.get("password"))
        super().save_model(request, obj, form, change)


admin.site.register(ClientUser)
admin.site.register(BusinessClientUser, BusinessClientModelAdmin)
