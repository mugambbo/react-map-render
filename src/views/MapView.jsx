import React, { Component } from 'react'
import { GoogleMap as Map, LoadScript, Marker, MarkerClusterer, Polyline, Polygon } from '@react-google-maps/api'
import NavUtils, { BundleKeys } from '../utils/NavUtils';
import CommonUtils from '../utils/CommonUtils';
import * as Sentry from '@sentry/react';
import Signature from '../components/Signature';
import Loading from '../components/Loading';

class MapView extends Component {
    constructor(props) {
        super(props);
        this.state = {  
            entities: [],
            zoom: 3,
            center: {lat: 3.444, lng: 3.4444},
            polylinePath: [],
            polygonPath: [],
            mapTypeId: 'roadmap',
            apikey: process.env.REACT_APP_GGLE_KEY
        }
    }
    render() { 
        const { entities, apikey, zoom, center, polylinePath, polygonPath, mapTypeId } = this.state;
        return (
            <>
            <LoadScript googleMapsApiKey={apikey} loadingElement={<Loading />}>
                <Map id='map-location' mapTypeId={mapTypeId} mapContainerStyle={{width: '100%', height: '100%', position: 'absolute'}} zoom={zoom} options={this.options}
                    onIdle={this.handleMapIdle}
                    onLoad={this.onMapLoad} center={center} onClick={this.onMapClick} onDrag={this.handleMapDrag} >
                        <MarkerClusterer styles={clusterStyles} >{clusterer => (
                            entities.map((entity, index) => (
                                (entity.lat && entity.lng)?<Marker
                                    key={entity._id}
                                    title={entity.title}
                                    icon={{
                                        url: entity.iconUrl,
                                        scaledSize: new window.google.maps.Size(48, 48),
                                        origin: new window.google.maps.Point(0, 0)                                    
                                    }}                                    
                                    name={entity.name}
                                    position={{lat: entity.lat, lng: entity.lng}}
                                    clusterer={clusterer} />:<></>
                            )))}
                        </MarkerClusterer>

                        <Polygon
                            onLoad={this.onPolygonLoad}
                            paths={polygonPath}
                            options={this.polygonOptions} />

                        <Polyline
                            onLoad={this.onPolylineLoad}
                            path={polylinePath}
                            options={this.polylineOptions} />
                </Map>
            </LoadScript>    
            <Signature />
            </>           
        );
    }

    componentDidMount(){          
    }

    onPolylineLoad = (polyline) => {
        console.log('polyline: ', polyline)
    }

    onPolygonLoad = (polygon) => {
        console.log('polygon: ', polygon)
    }

    onMapLoad = (map) => {
        this.map = map;  
        const { location } = this.props;
        const zoom = Number(NavUtils.getQueryParam(location, BundleKeys.zoom)) || 3;
        const centerParams = NavUtils.getQueryParam(location, BundleKeys.center)
        const centerPointArr = centerParams? centerParams.split(','): [this.state.center.lat, this.state.center.lng];
        const center = {lat: Number(centerPointArr[0]), lng: Number(centerPointArr[1])};
        const pointsParams = NavUtils.getQueryParam(location, BundleKeys.points);
        const points = CommonUtils.getPoints(pointsParams);
        const coordinatesParams = NavUtils.getQueryParam(location, BundleKeys.coordinates);
        const coordinates = CommonUtils.getPoints(coordinatesParams);
        const geoCoordinatesParams = NavUtils.getQueryParam(location, BundleKeys.geocoord);
        const apikey = NavUtils.getQueryParam(location, BundleKeys.apikey) || process.env.REACT_APP_GGLE_KEY;
        const geoCoordinates = CommonUtils.getPoints(geoCoordinatesParams);

        const mapTypeParams = String(NavUtils.getQueryParam(location, BundleKeys.mapType) || 'roadmap');
        const mapTypeId = CommonUtils.getMapType(mapTypeParams);

        this.initMapConstants();
        this.setState({
            entities: points,
            zoom: zoom,
            center: center,
            polylinePath: coordinates,
            polygonPath: geoCoordinates,
            mapTypeId: mapTypeId,
            apikey: apikey
        })

        const allPoints = [...coordinates, ...geoCoordinates, ...points];
        this.zoomBounds(allPoints);
        Sentry.captureMessage(new Date())
    }    

    initMapConstants = () => {
        this.options = {
            minZoom: 3
        }

        this.polygonOptions = {
            fillColor: "#355cd7",
            fillOpacity: 0.2,
            strokeColor: "#355cd7",
            strokeOpacity: 1,
            strokeWeight: 4,
            clickable: false,
            draggable: false,
            editable: false,
            geodesic: false,
            zIndex: 1              
          }

          const lineSymbol = {
            path: window.google.maps.SymbolPath.CIRCLE,
            strokeOpacity: 1,
            scale: 4,
            fillColor: "#ffffff",
            fillOpacity: 1,
            radius: 20,
            strokeColor: "#3b5ecb",
            strokeWeight: 2
          };

          this.polylineOptions = {
            strokeColor: '#355cd7',
            strokeOpacity: 0,
            strokeWeight: 2,
            fillOpacity: 0,
            clickable: false,
            draggable: false,
            editable: false,
            zIndex: 1,
            icons: [
                {
                  icon: lineSymbol,
                  offset: "0",
                  repeat: "20px"
                }
              ],            
          };  
    }

    onMarkerClick = (props, entity) => {
        console.log("Marker clicked: "+entity);
    }

    points = [];

    onMapClick = (map) => {
        this.points.push({lat: map.latLng.lat(), lng: map.latLng.lng()});
        console.log(JSON.stringify(this.points));
    }

    handleMapDrag = (map) => {
        this.points = [];
    }

    zoomBounds(entities = []){
        let bounds = new window.google.maps.LatLngBounds();
        entities.forEach(entity => {
            if (entity.lat && entity.lng) 
                bounds.extend(
                    {'lat':entity.lat, 
                    'lng':entity.lng}
                );
        });

        this.map.fitBounds(bounds);
    }

    handleMapIdle = () => {
        console.log('Map idle');
    }
}

const clusterStyles = [
    {
        url: '/m/m1.png',
        textColor: '#ffffff',
        height: 64,
        width: 64,
        anchorText: [-6, -6]            
    }
];

export default MapView;