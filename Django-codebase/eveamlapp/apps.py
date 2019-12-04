from django.apps import AppConfig
from .web_scraping import scheduler


class EveamlappConfig(AppConfig):
    name = 'eveamlapp'

    def ready(self):
        print("ready function")
        scheduler.startScehdule()


