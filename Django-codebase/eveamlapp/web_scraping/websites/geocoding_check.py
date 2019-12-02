import geopy as nom
from geopy.geocoders import Nominatim
from geopy.distance import great_circle
from geopy.exc import GeocoderTimedOut
from geopy.extra.rate_limiter import RateLimiter
import random

def getOrdinates(location):
    #locator = nom.Nominatim(user_agent= "eba7f5230f2a6888e75a8a19573a4241f4cd1987", timeout= 3)
    ##websites=["https://evea-prj.firebaseapp.com","http://evea-prj.firebaseapp.com","https://evea-prj.appspot.com","https://evea-prj.appspot.com"]
    print(location)
    locator = Nominatim(user_agent="AIzaSyDUhIA8M9ad-4bu2bvpuKu3jXnbAjpicBk", timeout= 5)
    geocode = RateLimiter(locator.geocode, min_delay_seconds=2)
    try:
        locate = geocode(location, timeout= None)
    except GeocoderTimedOut:
        locate = geocode(location, timeout= None)
    if locate is None:
        return getOrdinates("Dublin")
    else:
        return locate.latitude , locate.longitude, locate.address


def getDistance(srcLatitude, srcLongitude, destLatitude, destLongitude):
    src = (float(srcLatitude), float(srcLongitude))
    dest = (float(destLatitude), float(destLongitude))

    return great_circle(src, dest).meters




