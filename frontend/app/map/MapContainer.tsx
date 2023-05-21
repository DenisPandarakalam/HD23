"use client"

import { GoogleMap, InfoWindow, LoadScript, Marker } from '@react-google-maps/api';
import React, { useState } from "react";
import { string } from 'zod';


const MapContainer = () => {

  const markers = [
    {
      id: 1,
      name: "CATHERINE LEBLANC, LMFT",
      position: { lat: 38.550480, lng: -121.741280 }
    },
    {
      id: 2,
      name: "Denver, Colorado",
      position: { lat: 38.556368, lng: -121.753321 }
    },
    {
      id: 3,
      name: "Los Angeles, California",
      position: { lat: 34.052235, lng: -118.243683 }
    },
    {
      id: 4,
      name: "New York, New York",
      position: { lat: 40.712776, lng: -74.005974 }
    }
  ];

  const customMapStyle = [
    {
        "featureType": "landscape",
        "elementType": "all",
        "stylers": [
            {
                "color": "#f9ddc5"
            },
            {
                "lightness": "-7"
            }
        ]
    },
    {
      "featureType": "city",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
  },
    {
      "featureType": "poi",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          }
      ]
    },
    {
        "featureType": "poi.business",
        "elementType": "all",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "lightness": "38"
            }
        ]
    },
    {
        "featureType": "poi.government",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "lightness": "46"
            },
            {
                "gamma": "1"
            }
        ]
    },
    {
        "featureType": "poi.medical",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "off"
            },
            {
                "color": "#813033"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "38"
            },
            {
                "visibility": "on"
            },
        ]
    },
    {
        "featureType": "poi.park",
        "elementType": "all",
        "stylers": [
            {
                "color": "#645c20"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "39"
            },
            {
                "gamma": "1.00"
            },
            {
                "visibility": "on"
            },
        ]
    },
    {
      "featureType": "poi.park",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
      ]
    },
    {
        "featureType": "poi.school",
        "elementType": "all",
        "stylers": [
            {
                "color": "#a95521"
            },
            {
                "lightness": "35"
            },
            {
                "visibility": "on"
            },
        ]
    },
    {
      "featureType": "poi.school",
      "elementType": "labels",
      "stylers": [
          {
              "visibility": "off"
          },
      ]
    },
    {
        "featureType": "poi.sports_complex",
        "elementType": "all",
        "stylers": [
            {
                "color": "#9e5916"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "32"
            },
            {
                "gamma": "1.00"
            },
            {
                "visibility": "off"
            },
        ]
    },
    {
        "featureType": "road",
        "elementType": "all",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "43"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.fill",
        "stylers": [
            {
                "visibility": "on"
            },
            {
                "color": "#f19f53"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "16"
            },
            {
                "gamma": "1.00"
            },
            {
                "weight": "1.30"
            }
        ]
    },
    {
        "featureType": "road.local",
        "elementType": "geometry.stroke",
        "stylers": [
            {
                "color": "#f19f53"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "-10"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "transit",
        "elementType": "all",
        "stylers": [
            {
                "lightness": "38"
            }
        ]
    },
    {
        "featureType": "transit.line",
        "elementType": "all",
        "stylers": [
            {
                "color": "#813033"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "43"
            },
            {
                "gamma": "1.00"
            }
        ]
    },
    {
        "featureType": "transit.station",
        "elementType": "all",
        "stylers": [
            {
                "visibility": "off"
            }
        ]
    },
    {
        "featureType": "water",
        "elementType": "all",
        "stylers": [
            {
                "color": "#1994bf"
            },
            {
                "saturation": "-69"
            },
            {
                "lightness": "43"
            },
            {
                "gamma": "0.99"
            }
        ]
    }
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

  const [activeMarker, setActiveMarker] = useState(null);

  const handleActiveMarker = (marker) => {
    if (marker === activeMarker) {
      return;
    }
    setActiveMarker(marker);
  };

  const handleOnLoad = (map) => {
    const bounds = new google.maps.LatLngBounds();
    markers.forEach(({ position }) => bounds.extend(position));
    map.fitBounds(bounds);
  };
  
  const icon = {
    url: "https://cdn.discordapp.com/attachments/1109526930916655124/1109704287010959400/image.png",
    scaledSize: new google.maps.Size(50, 50),
    origin: new google.maps.Point(0, 0),
    anchor: new google.maps.Point(0, 0),
  };

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
          {markers.map(({ id, name, position }) => (
            <Marker
              key={id}
              position={position}
              onClick={() => handleActiveMarker(id)}
              animation={google.maps.Animation.BOUNCE}
              // if want to only jump when clicked: animation={activeMarker === id ? google.maps.Animation.BOUNCE : null}
              icon={icon}
            >
              {activeMarker === id ? (
                <InfoWindow onCloseClick={() => setActiveMarker(null)}>
                  <div>{name}</div>
                </InfoWindow>
              ) : null}
            </Marker>
          ))}
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;