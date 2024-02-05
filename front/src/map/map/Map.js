import React from "react";

import {GoogleMap, Marker, InfoWindow, MarkerF, InfoWindowF} from "@react-google-maps/api";
import axios from "axios";

const myStyles = [
    {
        featureType: "poi",
        elementType: "labels",
        stylers: [{visibility: "off"}],
    },
];

class Map extends React.Component {
    _map = null;
    temp = 0

    constructor(props) {
        super(props);
        this.state = {
            selectedMarkerPosition: null,
            selectedMarkerName: ''
        }
    }

    onMapLoad = map => {
        this._map = map;
        console.log('test22222', this.props.coordinates, this.props.places)
        let request = {
            keyword: "golf",
            location: new window.google.maps.LatLng(parseFloat(this.props.coordinates.lat), parseFloat(this.props.coordinates.lng)),
            radius: 5000,
            type: "golf"
        };
        let service = new window.google.maps.places.PlacesService(map);
        if (this.temp === 0) {
            this.temp = 0;
            this.props.setPlaces([])
            service.nearbySearch(request, (results, status) => {
                if (status === window.google.maps.places.PlacesServiceStatus.OK) {
                    for (var i = 0; i < results.length; i++) {
                        this.props.places.push(results[i]);
                        console.log(i, results[i])
                    }
                }
                this.temp = 1;
                this.props.refreshPlaces()
            });
            console.log('test333333', this.props.places)
        }

        console.log('test444444', this.props.places)
    };

    render() {
        if (this.temp === 1) {
            return (
                <GoogleMap
                    ref={(map) => this._map = map}
                    center={this.props.coordinates}
                    zoom={13}
                    onLoad={map => this.onMapLoad(map)}
                    onMouseUp={(e) => {
                        this.temp = 0;
                        this.props.setCoordinates({lat: e.latLng.lat(), lng: e.latLng.lng()})
                    }
                    }
                    mapContainerStyle={{height: "600px", width: "900px"}}
                    options={{disableDefaultUI: true, styles: myStyles}}
                >
                    {
                        this.props.places !== [] &&
                        this.props.places.map((results, i) => {
                            return (
                                <MarkerF position={results.geometry.location}
                                         icon={'https://developers.google.com/maps/documentation/javascript/examples/full/images/info-i_maps.png'}
                                         onClick={(e) => {
                                             const selectedMarker = {lat: e.latLng.lat(), lng: e.latLng.lng()};
                                             this.setState({
                                                 selectedMarkerPosition: selectedMarker,
                                                 selectedMarkerName: results.name
                                             }, () => {
                                                 console.log(results.name, this.state);
                                             });
                                         }}/>
                            );
                        })}
                    {this.state.selectedMarkerPosition !== null && (
                        <InfoWindowF
                            position={this.state.selectedMarkerPosition}
                            options={{pixelOffset: new window.google.maps.Size(0, -25)}}
                            onCloseClick={() => {
                                this.setState(null);
                            }}
                        >
                            <div>
                                {this.state.selectedMarkerName}
                            </div>
                        </InfoWindowF>
                    )}
                </GoogleMap>
            );
        } else {
            return (
                <div>
                    <GoogleMap
                        ref={(map) => this._map = map}
                        center={this.props.coordinates}
                        zoom={13}
                        onLoad={map => this.onMapLoad(map)}
                        mapContainerStyle={{height: "600px", width: "900px"}}
                    >
                    </GoogleMap>
                </div>
            );
        }
    }
}

export default Map;
