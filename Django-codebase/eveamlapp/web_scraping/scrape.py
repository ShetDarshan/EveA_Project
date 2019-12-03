from builtins import staticmethod, list
from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid

from .service import DataProcess
from datetime import datetime
from .websites.dubieScrape import DublinIe
from .websites.DBSScrape import DBSScrape
from .websites.Knowledgeie import KnowIE
from .websites.EventbriteScrape import EventIe
from .websites.ticketmasterScrape import TicketmasterIe
from .websites.WhitehallScrape import WhitehallIe
from .websites.RCSIScrape import RCSIIE
from .websites.SugarclubScrape import SugarclubIe
from .websites.PoetryIrelandScrape import PoetryIrelandIE
from .websites.dublincityScrape import dublincity
from .websites.TUD_mainScrape import TUD_main
from .websites.DublinchamberScrape import DubChamberIE
from .websites.DublintownScrape import DublintownScrape
from .websites.TUD_BlanchardstownScrape import TUD_Blanchardstown
from .websites.IrelandScrape import IrelandIe
from .websites.Eventbrite_Health import EventHealth
from .websites.Eventbrite_others import EventOthers
from .websites.Eventbrite_Business import EventbriteBusiness
from .websites.Eventbrite_art import EventbriteArt
from .websites.Eventbrite_filmmedia import EventFilmmedia
from .websites.Eventbrite_Communit import EventbriteCommunity
from .websites.Eventbrite_fooddrink import EventbriteFood
from .websites.Eventbrite_travel import EventbriteTravel
from .websites.Eventbrite_ScienceTech import EventbriteScience
from .websites.Eventbrite_music import EventbriteMusic
from .websites.Eventbrite_fashion import EventbriteFashion
from .websites.Eventbrite_Holiday import EventbriteHoliday
import sys
import time
import re


class WebScrape:

    @staticmethod
    def scrapeweb():

        data_list = list()

        urls = DataProcess.geturls()

        print(len(urls))
        for url in urls:

            if url.referenceId == 'TicketMasterIE':
                a = 1+2
                data_list = TicketmasterIe.scrape(url.url,data_list)
            
            # elif url.referenceId == 'Eventbrite_Others':
            #     data_list = EventOthers.scrape(url.url,data_list)
            
            # elif url.referenceId == 'EventbriteBusiness':
            #     data_list = EventbriteBusiness.scrape(url.url,data_list)

            # elif url.referenceId == 'Eventbrite_art':
            #     data_list = EventbriteArt.scrape(url.url,data_list) 

            # elif url.referenceId == 'Eventbrite_filmmedia':
            #     data_list = EventFilmmedia.scrape(url.url,data_list) 
            
            # elif url.referenceId == 'Eventbrite_community':
            #     data_list = EventbriteCommunity.scrape(url.url,data_list) 

            # elif url.referenceId == 'Eventbrite_fooddrink':
            #     data_list = EventbriteFood.scrape(url.url,data_list) 
            
            # elif url.referenceId == 'Eventbrite_health':
            #     data_list = EventHealth.scrape(url.url,data_list)

            # elif url.referenceId == 'Events_travel':
            #     data_list = EventbriteTravel.scrape(url.url,data_list) 
            

            # elif url.referenceId == 'Events_sciencetech':
            #     data_list = EventbriteScience.scrape(url.url,data_list) 

            # elif url.referenceId == 'Events_music':
            #     data_list = EventbriteMusic.scrape(url.url,data_list) 

            # elif url.referenceId == 'Events_fashion':
            #     data_list = EventbriteFashion.scrape(url.url,data_list) 
            
            # elif url.referenceId == 'Eventbrite_holiday':
            #     data_list = EventbriteHoliday.scrape(url.url,data_list) 
            

            # elif url.referenceId == 'RCSIIE':
            #     data_list = RCSIIE.scrape(url.url,data_list)

            # elif url.referenceId == 'SugarclubIE':
            #     data_list = SugarclubIe.scrape(url.url,data_list)

            # elif url.referenceId == 'PoetryIreland':
            #     data_list = PoetryIrelandIE.scrape(url.url,data_list)

        #    # elif url.referenceId == 'dublincity':
        #    #     data_list = dublincity.scrape(url.url,data_list)

        #     # elif url.referenceId == 'DublinChamber':
        #     #   data_list = DubChamberIE.scrape(url.url,data_list)

        #     # elif url.referenceId == 'DUBIE':
        #     #     data_list = DublinIe.scrape(url.url,data_list)

            # elif url.referenceId == 'DBSScrape':
            #     data_list = DBSScrape.scrape(url.url,data_list)

            # elif url.referenceId == 'DublintownScrape':
            #     data_list = DublintownScrape.scrape(url.url,data_list)

            # elif url.referenceId == 'Knowledgeie':
            #     data_list = KnowIE.scrape(url.url,data_list)

        # # elif url.referenceId == 'EventbriteIE':
        # #     data_list = EventIe.scrape(url.url,data_list)

        # # elif url.referenceId == 'TUD_Blanchardstown':
        # #     data_list = TUD_Blanchardstown.scrape(url.url,data_list)

            # elif url.referenceId == 'TUD_main':
            #     a=1+3
            #     #data_list = TUD_main.scrape(url.url,data_list)

            # elif url.referenceId == 'IRELANDIE':
            #     data_list = IrelandIe.scrape(url.url,data_list)

        # # #         ## category scrapping of eventbrite:
           

        #     elif url.referenceId == 'WhitehallIE':
        #         data_list = WhitehallIe.scrape(url.url,data_list)

            

        return data_list
