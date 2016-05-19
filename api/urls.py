from django.conf.urls import url
from django.contrib import admin
from account.views import ObtainAuthToken

urlpatterns = [
    url(r'^admin/', admin.site.urls),
    url(r'^api/login/$', ObtainAuthToken.as_view()),
]
