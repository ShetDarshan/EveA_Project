from django.db import models

# Create your models here.


class EventData(models.Model):

    id = models.CharField
    title = models.CharField
    time = models.CharField
    location = models.CharField
    summary = models.CharField
    img = models.CharField
    startdate = models.CharField
    enddate = models.CharField
    category = models.CharField
    price = models.CharField
    #address = models.CharField
    read_more = models.CharField
    latitude = models.CharField
    longitude = models.CharField


class URLCollection(models.Model):

    referenceId = models.CharField
    urlType = models.CharField
    url = models.CharField


class UsersData(models.Model):
    address = models.CharField
    bio = models.CharField
    birthday = models.CharField
    createdAt = models.CharField
    email = models.CharField
    gender = models.CharField
    handle = models.CharField
    imageUrl = models.CharField
    interests = []
    location = models.CharField
    userId = models.CharField

