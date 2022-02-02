from rest_framework.permissions import SAFE_METHODS, BasePermission

from accounts.models import BusinessClientUser, ClientUser


class IsBusinessClient(BasePermission):
    """
    The request is authenticated as a business client request.
    """

    def has_permission(self, request, view):
        try:
            request.user.clientuser.businessclientuser
        except (ClientUser.businessclientuser.RelatedObjectDoesNotExist, AttributeError):
            return False
        return bool(request.user.is_authenticated)


class IsOwnerOrReadOnly(IsBusinessClient):
    """
    The request is authenticated as an apartment owner, or is a read-only request.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        return super().has_permission(request, view)

    def has_object_permission(self, request, view, obj):
        if request.method in SAFE_METHODS:
            return True
        user_id = request.user.id
        if user_id:
            try:
                bind_to_user_objects = BusinessClientUser.objects.get(id=user_id).apartments.all()
            except BusinessClientUser.DoesNotExist:
                return False
            return obj in bind_to_user_objects
        return False


class IsClientOnly(BasePermission):
    """The request is authenticated as a client user only"""

    def has_permission(self, request, view):
        try:
            request.user.clientuser.businessclientuser
        except (ClientUser.businessclientuser.RelatedObjectDoesNotExist, AttributeError):
            return bool(request.user.is_authenticated)
        return False

