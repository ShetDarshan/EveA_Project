from plistlib import Data
from urllib.request import urlopen as uReq
import requests
import json
import uuid
import re
import datetime
from bs4 import BeautifulSoup as soup

from eveamlapp.web_scraping.models import EventData

class RCSIIE:
    @staticmethod
    def scrape(urlOriginal):

        data_list = []
        for value in range(1,4):
            url = ""
            url = urlOriginal+format(value)
            print(url)

            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()

            page_soup = soup(page_html, "html.parser")
            div = page_soup.find_all('li',{"class":"wrapped wrapped-borderless"})
    

            for container in div:
                Title=container.h3.text.strip()
                URL= 'https://www.rcsi.com'+container.a['href']
                date = container.div.text.replace("\n"," ")

                # date formatting

                date_split = date.split(' ')
                date = date_split[1]
                month = date_split[2] 
                month = datetime.datetime.strptime(month,'%b').strftime('%B')
                year = '2019'
                date = date + (' ')+ month+ (' ')+ year
                
                
                Location=container.p.text.strip('\n')
                Category='EDUCATION, BUSINESS & TECHNOLOGY'
                img ='http://www.hrbcentreprimarycare.ie/images/rcsilogonewer.png'

                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = Title
                data.time = ''
                data.location = Location
                data.summary = ''
                data.img = img
                data.category = Category
                data.startdate = date
                data.read_more = URL
                #data.address = address
                data.enddate = ''
                data.price = ''
                data_list.append(data)

        print(len(data_list))

        return data_list

