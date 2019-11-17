import geopy as nom
from geopy.geocoders import Nominatim
from geopy.distance import great_circle
from geopy.exc import GeocoderTimedOut
from geopy.extra.rate_limiter import RateLimiter




def getOrdinates(address):
    #locator = nom.Nominatim(user_agent= "eba7f5230f2a6888e75a8a19573a4241f4cd1987", timeout= 3)
    locator = Nominatim(user_agent= "http://evea-prj.firebaseapp.com")
    #geolocator = Nominatim(timeout=10)
    try:
        location = locator.geocode(address, timeout= None)
    except GeocoderTimedOut:
        location = locator.geocode(address, timeout= None)    
    if location is None:
        return getOrdinates("Dublin")
    else:
        return location.latitude , location.longitude, location.address

def getDistance(srcLatitude, srcLongitude, destLatitude, destLongitude):
    src = (float(srcLatitude), float(srcLongitude))
    dest = (float(destLatitude), float(destLongitude))

    return great_circle(src, dest).meters




