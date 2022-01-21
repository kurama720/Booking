"""backend URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/3.1/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include
from drf_spectacular.views import SpectacularSwaggerView, SpectacularAPIView
from django.conf import settings
from django.conf.urls.static import static
from rest_framework.routers import DefaultRouter

from apartments.api.views import ApartmentViewSet, BookingHistoryView

from accounts.api.views import BusinessClientViewSet


router = DefaultRouter()
router.register('apartments', ApartmentViewSet)
router.register('business/apartments', BusinessClientViewSet)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('accounts/', include('accounts.urls')),
    path('', include(router.urls)),
    path('openapi/',
         SpectacularAPIView.as_view(),
         name='openapi-schema'),
    path('swagger/',
         SpectacularSwaggerView.as_view(
                                        url_name='openapi-schema'),
         name='swagger-ui'),
    path('apartments/', include('apartments.urls')),
    path('book-history/', BookingHistoryView.as_view(), name="book_history"),
    path('map/', include('markers.urls')),
]

if settings.DEBUG:
    urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)
