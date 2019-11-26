from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re
import datetime

from eveamlapp.web_scraping.models import EventData

class EventFilmmedia:

    @staticmethod
    def scrape(urlOriginal):

        data_list = []
        descrip = []
        i = 0
        for value in range(1, 6):
            url = ""
            url = urlOriginal+format(value)
            print(url)
            uClient = uReq(url)
            page_html = uClient.read()
            uClient.close()
            #Parsing
            page_soup = soup(page_html, "html.parser")
            #article = page_soup.findAll('ul',class_='search-main-content__events-list')
            article_1 = page_soup.findAll('div',class_='search-event-card-wrapper')
   
            # fetching each details
            for container in article_1:
                title = container.findAll('div', class_='eds-event-card__formatted-name--is-clamped')[0].text
                try:
                    Date_time = container.findAll('div',class_='eds-text-color--primary-brand eds-l-pad-bot-1 eds-text-weight--heavy eds-text-bs')[0].text
                except:
                    Date_time='None'
                try:
                    Location = container.findAll('div',class_='card-text--truncated__one')[0].text
                except:
                    Location='None'
                try:
                    Price = container.findAll('div',class_='eds-media-card-content__sub eds-text-bm eds-text-color--grey-600 eds-l-mar-top-1 eds-media-card-content__sub--cropped')[1].text
                except:
                    Price='None'
                a_tags=container.findAll('a')
                try:
                    image=a_tags[0].img['src']
                except:
                    image = 'None'
                read_more= a_tags[0]['href']
                # Date formatting
                
                date_split = Date_time.split(',')
                #time = date_split[2]
                #print(time)
                date_split_before = date_split[1]
                date_split_1 = date_split_before.split(' ')
                date = date_split_1[2]
                month_before = date_split_1[1]
                month = datetime.datetime.strptime(month_before,'%b').strftime('%B')
                year = '2019'
                Date = date + (' ') + month + (' ')+ year
                
                category = 'MUSIC & ENTERTAINMENT'
                if category == 'MUSIC & ENTERTAINMENT' and image == 'None':
                    image = 'https://livestyle.com/wp-content/uploads/2017/07/slider-4.jpg'
            
                
                # description
                
                descurl = read_more
                #Opening connection , grabbing the page
                uClient = uReq(descurl)
                desc_html = uClient.read()
                uClient.close()
                #Parsing
                desc_soup = soup(desc_html, "html.parser")
                
                desc = desc_soup.findAll('div', class_='js-xd-read-more-contents l-mar-top-3')
                if len(desc) == 0:
                    desc = desc_soup.findAll('div', class_= 'structured-content-rich-text structured-content__module l-align-left l-mar-vert-6 l-sm-mar-vert-4 text-body-medium')
                else:
                    desc = desc_soup.findAll('div', class_='js-xd-read-more-contents l-mar-top-3')
                try:
                    p_tags = desc[0].findAll('p')
                except:
                    continue
                
                for i in range(len(p_tags)):
                    descript = p_tags[i].text
                    descrip.append(descript)
                description = ''.join(str(e) for e in descrip)

                data = EventData()

                data.id = uuid.uuid1().__str__()
                data.title = title
                data.time = ''
                data.location = Location
                data.summary = description
                data.img = image
                data.category = category
                data.startdate = Date
                data.read_more = read_more
                data.enddate = ''
                data.price = Price
                data_list.append(data)
                i = i+1

        # print(len(data))

        print(len(data_list))
        return data_list