from .scrape import WebScrape 
import schedule 
from .service import DataProcess
import time

def processwebdata():

    print("entering process webdata in scheduler")
    event_list = WebScrape.scrapeweb()
    time.sleep(2)
    DataProcess.saveeventdata(event_list)
    

def deletePastEvents():

    print('begin delete')

    DataProcess.deletePastEvents()
    print("finish delete")




schedule.every().day.at("00:45").do(processwebdata)
schedule.every().day.at("01:17").do(deletePastEvents)






def startScehdule():


    while True: 

        # Checks whether a scheduled task  
        # is pending to run or not 
        schedule.run_pending() 
        time.sleep(1)


# deletion of past events scheduler




