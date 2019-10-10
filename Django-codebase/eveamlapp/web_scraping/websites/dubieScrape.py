from plistlib import Data
from urllib.request import urlopen as uReq
from bs4 import BeautifulSoup as soup
import uuid
import re

from eveamlapp.web_scraping.models import EventData

class DublinIe:

    @staticmethod
    def scrape(url):
        data_list = []

        uClient = uReq(url)
        page_html = uClient.read()
        uClient.close()

        page_soup = soup(page_html, "html.parser")

        # Finding each events
        article = page_soup.find_all('article', class_="event card")


        for container in article:
            # container = article[0]
            div = container.find_all('div', class_="text")
            v = div[0].a["href"]
            img = container.div["style"]
            pattern = r"(?<=\(')[^'\)]*"
            img = re.search(pattern, img)
            img = img[0]
            category = container["data-categories"]
            url2 = v
            uClient = uReq(url2)
            page_html = uClient.read()
            uClient.close()
            page_soup = soup(page_html, "html.parser")
            div = page_soup.find_all('div', class_="event-info")
            details = div[0].findAll('dd')

            datadict = {}
            var1 = div[0].findAll('dt')
            for i in range(len(var1)):
                datadict[var1[i].text] = details[i].text

            date = datadict['Date:']
            time = datadict['Time:']
            if any('Price:' in x for x in datadict):
                price = datadict['Price:']
            else:
                continue

            #address = datadict['Address:']
            var2 = date.split('-')
            startdate = var2[0]
            startdate = startdate.split(' ')
            start = startdate[1].replace('th','').replace('nd','').replace('st','').replace('rd','')
            date = start.split(' ')
            date = start
            month = startdate[2]
            year = "2019"
            startdate = date + (' ')+ month+(' ')+ year
            try:
                enddate = var2[1]
            except:
                enddate = 'None'
            title = page_soup.h1.text
            #time = container.time.text
            p_tags = container.findAll('p')
            location = p_tags[0].text
            summary = p_tags[1].text.strip()
            read_more = url2

            data = EventData()

            data.id = uuid.uuid1().__str__()
            data.title = title
            data.time = time
            data.location = location
            data.summary = summary
            data.img = img
            data.category = category
            data.startdate = startdate
            data.read_more = read_more
            #data.address = address
            data.enddate = enddate
            data.price = price
            data_list.append(data)

        print(len(data))
        
        return data_list
