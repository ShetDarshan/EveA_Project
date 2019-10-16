import geopy as nom
def getOrdinates(address):
    locator = nom.Nominatim(user_agent= "eba7f5230f2a6888e75a8a19573a4241f4cd1987")
    location = locator.geocode(address)
    if location is None:
        return getOrdinates("Dublin")
    else:
        return location.latitude , location.longitude, location.address