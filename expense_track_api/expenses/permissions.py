from rest_framework.permissions import BasePermission


class IsOwnerOrAdmin(BasePermission):
    """
    Custom permission to only allow owners of an expense to edit it.
    Read-only permissions are allowed for any request.
    """

    def has_object_permission(self, request, view, obj):
        """Check if the request is a safe method or the user is the owner of the object."""

        if request.user.is_superuser:
            return True
        return obj.user == request.user
