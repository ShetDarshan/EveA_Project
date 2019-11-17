from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid

from eveamlapp.web_scraping.models import EventData

class IrelandIe:

    @staticmethod
    def scrape(urlOriginal):
        data_list = []
        for value in range(1,136):

            url = ""
            url = urlOriginal+format(value)+'/'
            print(url)
            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()
            # Finding each events
            page_soup = soup(page_html, "html.parser")
            det = page_soup.findAll('div', class_= 'details')
            for container in det:
                try:
                    title = container.h2.text
                except:
                    title = 'None'

                location = container.h3.text
                try:
                    description = container.p.text.strip('\n')
                    description = description.strip(' ')
                except:
                    description = 'None'
                try:
                    img = container.img['src']
                except:
                    img = 'None'
    
                read_more = container.a['href']
                read = 'https://www.ireland.com/'+ read_more
                category = 'TOURISM & SIGHTSEEING'
                if category == 'TOURISM & SIGHTSEEING' and img == 'None':
                    img = 'https://www.fhi.no/globalassets/bilder/vaksine/oversikt-reisevaksine.jpg?preset=mainbodywidth'

                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = title
                data.time = ''
                data.location = location
                data.summary = description
                data.img = img
                data.category = category
                data.startdate = ''
                data.read_more = read
                #data.address = address
                data.enddate = ''
                data.price = ''
                data_list.append(data)

        print(len(data_list))

        return data_list