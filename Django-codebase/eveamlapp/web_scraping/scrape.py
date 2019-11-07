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
import sys
import time
import re


class WebScrape:

    @staticmethod
    def scrapeweb():

        data_list = list()

        urls = DataProcess.geturls()

        for url in urls:

            # if url.referenceId=='TicketMasterIE':
            #     dataList = TicketmasterIe.scrape(url.url)

            #     for data in dataList:
            #        data_list.append(data)

            
            if url.referenceId=='RCSIIE':
                dataList = RCSIIE.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            elif url.referenceId=='SugarclubIE':
                dataList = SugarclubIe.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            elif url.referenceId=='PoetryIreland':
                dataList = PoetryIrelandIE.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            elif url.referenceId=='dublincity':
                dataList = dublincity.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            # elif url.referenceId=='DublinChamber':
            #     dataList = DubChamberIE.scrape(url.url)

            #     for data in dataList:
            #        data_list.append(data)

            # elif url.referenceId=='DUBIE':
            #    dataList = DublinIe.scrape(url.url)

            #    for data in dataList:
            #        data_list.append(data)

            elif url.referenceId=='DBSScrape':
                dataList = DBSScrape.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            elif url.referenceId=='DublintownScrape':
                dataList = DublintownScrape.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            elif url.referenceId=='Knowledgeie':
                dataList = KnowIE.scrape(url.url)

                for data in dataList:
                    data_list.append(data)

            # elif url.referenceId == 'EventbriteIE':
            #     dataList = EventIe.scrape(url.url)

            #     for data in dataList:
            #         data_list.append(data)

            
            # elif url.referenceId == 'TUD_Blanchardstown':
            #     dataList = TUD_Blanchardstown.scrape(url.url)

            #     for data in dataList:
            #         data_list.append(data)

            elif url.referenceId=='TUD_main':
                dataList = TUD_main.scrape(url.url)

                for data in dataList:
                   data_list.append(data)

            
            # elif url.referenceId=='IRELANDIE':
            #     dataList = IrelandIe.scrape(url.url)

            #     for data in dataList:
            #        data_list.append(data)       

        return data_list
