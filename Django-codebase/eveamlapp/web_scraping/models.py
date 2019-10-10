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


class URLCollection(models.Model):

    referenceId = models.CharField
    urlType = models.CharField
    url = models.CharField

