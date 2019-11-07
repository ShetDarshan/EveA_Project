import geopy as nom
from geopy.geocoders import Nominatim
from geopy.distance import great_circle
from geopy.exc import GeocoderTimedOut


def getOrdinates(address):
    locator = nom.Nominatim(user_agent= "eba7f5230f2a6888e75a8a19573a4241f4cd1987")
    #geolocator = Nominatim(timeout=10)
    try:
        location = locator.geocode(address, timeout=10)
    except GeocoderTimedOut:
        location = locator.geocode(address, timeout=10)    
    if location is None:
        return getOrdinates("Dublin")
    else:
        return location.latitude , location.longitude, location.address

def getDistance(srcLatitude, srcLongitude, destLatitude, destLongitude):
    src = (float(srcLatitude), float(srcLongitude))
    dest = (float(destLatitude), float(destLongitude))

    return great_circle(src, dest).meters




