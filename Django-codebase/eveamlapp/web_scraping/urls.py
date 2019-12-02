from django.conf.urls import url
from django.urls import path
from rest_framework import routers

from . import views

urlpatterns = [
    #url(r'^$', views.processwebdata, name='save'),
    path('saveData/', views.processwebdata, name='save'),
    path('getdata/<str:inputstr>',views.search, name = 'search'),
    path('recommendationData/<str:inputstr>',views.recommendations,name='recommendations'),
    path('nearByData/<str:inputstr>', views.nearby, name = 'nearby'),
    path('userRecommendation/<str:inputstr>', views.usersrecommend, name = 'userrecommend'),
    path('deleteData/', views.deletePastEvents, name = 'deleteEvents')
]