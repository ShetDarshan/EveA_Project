
from apscheduler.schedulers.background import BackgroundScheduler
from .views import *


def start():
    scheduler = BackgroundScheduler()
    scheduler.add_job(processwebdata, 'interval', minutes = 2)
    scheduler.start()