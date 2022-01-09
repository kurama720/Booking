from rest_framework.permissions import SAFE_METHODS, BasePermission

from accounts.models import BusinessClientUser, ClientUser


class IsOwnerOrReadOnly(BasePermission):
    """
    The request is authenticated as an apartment owner, or is a read-only request.
    """
    def has_permission(self, request, view):
        if request.method in SAFE_METHODS:
            return True
        try:
            request.user.clientuser.businessclientuser
        except (ClientUser.businessclientuser.RelatedObjectDoesNotExist, AttributeError):
            return False
        return bool(request.user and
                    request.user.is_authenticated)

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
