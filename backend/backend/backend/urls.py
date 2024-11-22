# project/urls.py

from django.contrib import admin
from django.urls import path, include
from django.conf import settings
from django.conf.urls.static import static
from rest_framework import permissions
from drf_yasg.views import get_schema_view
from drf_yasg import openapi




schema_view = get_schema_view(
    openapi.Info(
        title='Ecommerce Backend Api',
        default_version = "v1",
        description='this is the documentation for the backend api',
        contact = openapi.Contact(email='sanjay@gmail.com',),
        license = openapi.License(name='ST Liscence '),
    ),
    public = True,
    permission_classes = (permissions.AllowAny,),
)

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/v1/', include ('api.urls')),
    path("", schema_view.with_ui('swagger', cache_timeout=0), name='schema-swagger-ui'),
    
    
] + static(settings.MEDIA_URL, document_root=settings.MEDIA_ROOT)