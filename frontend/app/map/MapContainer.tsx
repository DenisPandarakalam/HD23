"use client"

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';

const MapContainer = () => {

  const customMapStyle = [
    {
      "featureType": "water",
      "stylers": [
          {
              "color": "#a0d3d3"
          }
      ]
    },
    {
        "featureType": "landscape",
        "stylers": [
            {
                "color": "#e5e8e7"
            }
        ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "geometry",
        "stylers": [
            {
                "color": "#c7c7c7"
            },
            {
                "visibility": "off"
            }
        ]
    },
  ]

  const mapStyles = {        
    height: "100vh",
    width: "100%"
  };
  
  const defaultCenter = {
    lat: 38.549962, lng: -121.734213
  }

  const position = {
  lat: 38.549962,
  lng: -121.734213
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyAlCbYm7I4nUSockriyqenio0GCVjBAGxQ'>
        <GoogleMap
          mapContainerStyle={mapStyles}
          zoom={14}
          center={defaultCenter}
          options={{
            disableDefaultUI: true,
            gestureHandling: 'none',
            zoomControl: false,
            styles: customMapStyle,
         }}>
          <Marker
            position={position}
          />
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;