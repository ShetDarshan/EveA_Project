from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData


class KnowIE:

    @staticmethod
    def scrape(url):
        
        data_list = []
        
        for value in range(1,3):
            url = "https://www.knowledgetransferireland.com/Events/Upcoming-Events/?pageNumber={}".format(value)
            #url = url.format(value)
            print(url)
            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()
            page_soup = soup(page_html, "html.parser")
            div = page_soup.findAll('div', {"class": "each-item"})

            for container in div:
                span_tags = container.div.findAll('span')
                #p_tags = container.findAll('p')
                date1 = span_tags[0].text
                date2 = span_tags[1].text
                date2 = datetime.datetime.strptime(date2,'%b').strftime('%B')
                date3 = span_tags[2].text
                startdate = date1 + ' ' + date2 + ' ' + date3
                try:
                    title = container.h2.text
                except:
                    title = 'none'    
                read_more = container.h2.a['href']
                try:
                    description = container.p.text
                except:
                    description = 'none'    
                #try:
                #    location = p_tags[2].text
                #except:
                #    location = 'none'
                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = title
                data.time = ''
                data.location = ''
                data.summary = description
                data.img = ''
                data.category = ''
                data.startdate = startdate
                data.read_more = read_more
                data.address = ''
                data.enddate = ''
                data.price = ''
                pagedata_list = []
                pagedata_list.append(data)

            #print(len(data))
        
            data_list.append(pagedata_list)  

        final_list = []
        for sublist in data_list:
            for item in sublist:
                final_list.append(item)         
        return final_list

    

