from django.conf.urls import url

from . import views

urlpatterns = [
    url(r'^$', views.processwebdata, name='save'),
    url(r'getdata/', views.recommend, name = 'search')
]