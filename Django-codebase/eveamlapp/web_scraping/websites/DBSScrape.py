from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re

from eveamlapp.web_scraping.models import EventData


class DBSScrape:

    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()

        # Finding each events
        page_soup = soup(page_html, "html.parser")
    

        # Finding each events
        article = page_soup.findAll('li', class_='sfnewsListItem sflistitem')
    

        item = page_soup.findAll('li', class_='sfrelatedListItem sflistitem')
        readmore = page_soup.findAll('div', class_='NewsEvent_right')

        data_list = []

        for container in article:
            #itemlist = container.findAll('li',class_='sfnewsListItem sflistitem')
            # print(itemlist)
            title = container.a.text
            div_tags = container.findAll('div')
            date = div_tags[0].text.strip()
            #date formatting
            new = date.split(',')
            year = new[2]
            new1 = new[1].split(' ')
            Date = new1[2]
            month = new1[1]
            fulldate = Date +' '+ month + year
            #print(fulldate)
            summary = div_tags[1].text.strip()
            location = "DBS"
            category = "Education & Technology"
            for itemlist in item:
                img = item[0].a.img['src']

            for readin in readmore:
                read_more = readmore[0].a['href']

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.startdate = fulldate
            data.enddate = ''
            data.time = ''
            data.category = category
            data.price = ''
            data.summary = summary
            data.location = location
            data.img = img
            data.read_more = read_more
            data_list.append(data)

        print(len(data_list))   
        return data_list