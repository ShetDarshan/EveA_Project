from django.test import TestCase
from django.test import Client
# Create your tests here.
import pytest


class ScrapingViews(TestCase):

    def recommendations_200_test(self):
        """
        test whether function returns 200
        """
        c = Client()
        print(c)
        response = c.get('/api/recommendationsData');
        assert response.status_code is 200;
