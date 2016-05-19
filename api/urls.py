from django.conf.urls import url, include
from django.contrib import admin
from rest_framework import routers
from account.views import ObtainAuthToken, CustomerViewSet

router = routers.DefaultRouter()
router.register(r'users', CustomerViewSet, 'Users')


urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/', include(router.urls)),
    url(r'^api/login/$', ObtainAuthToken.as_view()),
]
