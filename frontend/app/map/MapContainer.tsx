"use client"

import React from 'react';
import { GoogleMap, LoadScript, Marker } from '@react-google-maps/api';
import data from "./data_map.json";

const MapContainer = () => {

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
                "color": "#813033"
            },
            {
                "saturation": "0"
            },
            {
                "lightness": "38"
            },
            {
                "visibility": "off"
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
                "visibility": "off"
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
                "visibility": "off"
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
                "visibility": "off"
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
    width: '100%',
    height: '100%'
  };
  
  const defaultCenter = {
    lat: 38.549962, lng: -121.738213
  }

  const position = {
  lat: 38.549962,
  lng: -121.734213
  }
  
  const showCard = (loc: { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: string; line2: string; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: number; lng: number; }; education: { school: string; graduation_year: number; years_in_practice: number; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: string[]; issues: string[]; modailities: string[]; payment_methods: string[]; treatment_orientation: string[]; } | { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: string; line2: null; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: number; lng: number; }; education: { school: string; graduation_year: number; years_in_practice: number; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: string[]; issues: string[]; modailities: string[]; payment_methods: string[]; treatment_orientation: string[]; } | { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: string; line2: null; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: number; lng: number; }; education: { school?: undefined; graduation_year?: undefined; years_in_practice?: undefined; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: string[]; issues: string[]; modailities: never[]; payment_methods: never[]; treatment_orientation: string[]; } | { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: null; line2: null; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: null; lng: null; }; education: { school?: undefined; graduation_year?: undefined; years_in_practice?: undefined; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: string[]; issues: string[]; modailities: string[]; payment_methods: string[]; treatment_orientation: string[]; } | { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: string; line2: string; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: number; lng: number; }; education: { school?: undefined; graduation_year?: undefined; years_in_practice?: undefined; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: string[]; issues: string[]; modailities: string[]; payment_methods: string[]; treatment_orientation: string[]; } | { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: string; line2: null; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: number; lng: number; }; education: { school?: undefined; graduation_year?: undefined; years_in_practice?: undefined; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: never[]; issues: never[]; modailities: never[]; payment_methods: string[]; treatment_orientation: never[]; } | { full_name: string; name: { title: string; first: string; last: string; }; accepting_new_patients: boolean; appointments: { online: boolean; in_person: boolean; }; phone: string; pronouns: string; location: { line1: null; line2: null; city: string; region: string; region_code: string; postal_code: string; country_code: string; lat: null; lng: null; }; education: { school: string; graduation_year: number; years_in_practice: number; }; fees: { individual: number; couple: number; }; paragraph_descriptions: string[]; age_focus: string[]; issues: string[]; modailities: string[]; payment_methods: string[]; treatment_orientation: string[]; }) => {
    console.log(loc)
  }
  
  return (
     <LoadScript
       googleMapsApiKey='AIzaSyAlCbYm7I4nUSockriyqenio0GCVjBAGxQ'>
        <GoogleMap
          mapContainerClassName='h-full w-full'
          zoom={14}
          center={defaultCenter}
          options={{
            disableDefaultUI: true,
            gestureHandling: 'none',
            zoomControl: false,
            styles: customMapStyle,
         }}>
            {data.map((loc) => (
                <Marker
                    onClick={()=>{
                        showCard(loc);
                    }}
                    key={loc.full_name}
                    position={{ lat: loc.location.lat as number, lng: loc.location.lng as number }}
                    animation={1}
                    icon = {{
                        url: "https://upload.wikimedia.org/wikipedia/commons/thumb/d/d8/Person_icon_BLACK-01.svg/1924px-Person_icon_BLACK-01.svg.png",
                        scaledSize: new google.maps.Size(50, 50),
                    }}
                />
            ))}
        </GoogleMap>
     </LoadScript>
  )
}

export default MapContainer;