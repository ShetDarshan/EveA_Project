import { Map, InfoWindow, Marker, GoogleApiWrapper } from "google-maps-react";
import React, { Component } from "react";
const containerStyle = {
    position: "relative",
    width: "100%",
    height: "-webkit-fill-available"
};

class MapContainer extends Component {
    render() {
        const lat = isNaN(+this.props.lat) ? false : +this.props.lat;
        const lng = isNaN(+this.props.long) ? false : +this.props.long;
        console.log(lat,"in lat");
        console.log(lng,"longitide")

        if (lat === false || lng === false) {
            console.log("not running")
            return null;
        } else {
            return (
                <Map
                    style={{ border: "1px solid rgb(195, 207, 214)", minHeight: "330px" }}
                    google={this.props.google}
                    initialCenter={{ lat, lng }}
                    zoom={14}
                    containerStyle={containerStyle}
               
                >
                    <Marker
                        onClick={this.onMarkerClick}
                        name={"Current location"}
                    />
                    <InfoWindow visible={true} onClose={this.onInfoWindowClose}>
                        <div>
                            <h1>STuff</h1>
                        </div>
                    </InfoWindow>
                </Map>
            );
        }
    }
}

export default GoogleApiWrapper({
    apiKey: "AIzaSyD2s9vyxwQCR8y7F8pCGFgAvJFJ8inhRTU"
})(MapContainer);
