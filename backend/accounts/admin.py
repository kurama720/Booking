from django.contrib import admin
from django.contrib.auth.admin import UserAdmin

from accounts.models import ClientUser, BusinessClientUser, Avatar
from accounts.forms import ClientUserCreationForm, ClientUserChangeForm


class BusinessClientModelAdmin(admin.ModelAdmin):
    def save_model(self, request, obj, form, change):
        obj.set_password(form.data.get("password"))
        super().save_model(request, obj, form, change)


class ClientUserAdmin(UserAdmin):
    add_form = ClientUserCreationForm
    form = ClientUserChangeForm
    model = ClientUser
    list_display = ('email', 'is_staff', 'is_active',)
    list_filter = ('email', 'is_staff', 'is_active',)
    fieldsets = (
        (None, {'fields': ('email', 'password', 'first_name', 'last_name', 'avatar')}),
        ('Permissions', {'fields': ('is_staff', 'is_active', 'is_superuser', 'groups', 'user_permissions')}),
    )
    add_fieldsets = (
        (None, {
            'classes': ('wide',),
            'fields': ('email', 'password1', 'password2', 'first_name', 'last_name', 'is_staff', 'is_active',
                       'groups', 'user_permissions',)}
         ),
    )
    search_fields = ('email',)
    ordering = ('email',)


class AvatarAdmin(admin.ModelAdmin):
    list_display = ('local_url', )


admin.site.register(ClientUser, ClientUserAdmin)
admin.site.register(BusinessClientUser, BusinessClientModelAdmin)
admin.site.register(Avatar, AvatarAdmin)
