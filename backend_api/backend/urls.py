# backend/urls.py

from django.contrib import admin
from django.urls import path
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView,
)

api_path = 'api/v1'

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include("api.urls")),
    path('ckeditor/', include('ckeditor_uploader.urls')),
    path("ckeditor5/", include('django_ckeditor_5.urls')),

    path('api-auth/', include('rest_framework.urls')),
    path(f"{api_path}/client/", include(("client.urls_api", "user-api"), namespace="user-api")),
    path(f"{api_path}/document/", include(("document.urls_api", "user-api"), namespace="doc-api")),
    path(f"{api_path}/payment/", include(("payment.urls_api", "user-api"), namespace="payment-api")),
    path(f"{api_path}/invoice/", include(("invoice.urls_api", "invoice-api"), namespace="invoice-api")),
    path(f"{api_path}/project/", include(("project.urls_api", "project-api"), namespace="project-api")),

    #JWT
    path(f"{api_path}/auth/token/", TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path(f"{api_path}/auth/token/refresh/", TokenRefreshView.as_view(), name='token_refresh'),

]


urlpatterns +=static(settings.STATIC_URL, document_root=settings.STATIC_ROOT)
urlpatterns += static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)

