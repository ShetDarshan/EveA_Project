from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime
from .geocoding_check import getOrdinates
from .GetMonth import month_string_to_number

from eveamlapp.web_scraping.models import EventData


class KnowIE:

    @staticmethod
    def scrape(url,data_list):
        
        for value in range(1,3):
            url = "https://www.knowledgetransferireland.com/Events/Upcoming-Events/?pageNumber={}".format(value)
            #url = url.format(value)
            print(url)
            try:
                uClient = uReq(url)
            except:
                pass
            page_html = uClient.read()
            uClient.close()
            page_soup = soup(page_html, "html.parser")
            div = page_soup.findAll('div', {"class": "each-item"})

            #final_list = []

            for container in div:
                span_tags = container.div.findAll('span')
                p_tags = container.findAll('p')
                date1 = span_tags[0].text
                date2 = span_tags[1].text
                month=date2
                date2 = datetime.datetime.strptime(date2,'%b').strftime('%B')
                date3 = span_tags[2].text
                startdate = date1 + ' ' + date2 + ' ' + date3
                d1 = datetime.datetime(int(date3), int(month_string_to_number(month)), int(date1))
                category='EDUCATION, BUSINESS & TECHNOLOGY'
                try:
                    title = container.h2.text
                except:
                    title = 'none'    
                read_more = container.h2.a['href']
                read_more = 'https://www.knowledgetransferireland.com/'+ read_more
                try:
                    description = container.p.text
                except:
                    description = 'none'    
                try:
                    location = p_tags[2].text
                except:
                    location = 'Dublin'
                location = location + "Dublin"


                ordinates = getOrdinates(location)
                                 
                
                img = 'https://uindia.net/assets/img/MediaTechnology.jpg'

                if d1>datetime.datetime.now():
                    data = EventData()

                    data.id = uuid.uuid1().__str__()
                    data.title = title
                    data.time = ''
                    data.location = location
                    data.summary = description
                    data.img = img
                    data.category = category
                    data.startdate = startdate
                    data.read_more = read_more
                    data.address = ordinates[2]
                    data.latitude = ordinates[0]
                    data.longitude = ordinates[1] 
                    data.enddate = ''
                    data.price = ''
                    data_list.append(data)

        return data_list

    

