import React, { useRef,useEffect } from 'react'
import { StyleSheet, Text, View } from 'react-native'
import MapView,{Marker} from 'react-native-maps'
import { useDispatch, useSelector } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { selectOrigin,selectDestination, selectTravelTimeInformation, setTravelTimeInformation } from '../slices/navSlices'
import MapViewDirections from 'react-native-maps-directions'



const Map = () => {
    const origin = useSelector(selectOrigin);
    const destination = useSelector(selectDestination);
    const mapRef = useRef(null);
    const dispatch = useDispatch();

    console.log("test-1" , origin);
    console.log("test-2" , destination);
  useEffect(() => {
    if (!origin || !destination) return;

    //Zoom & fit to markers
    mapRef.current.fitToSuppliedMarkers(["origin","destination"],{
      edgePadding:{top:50,right:50,bottom:50,left:50},
    });


    }, [origin,destination]);

    useEffect(() => {
 
      if(!origin || !destination) return;
      
      const getTravelTime = async() => {
        fetch(`https://maps.googleapis.com/maps/api/distancematrix/json?units=imperial&origins=${origin.description}"&destinations=${destination.description}&key=${'GOOGLE-MAPS-API'}`
        )
        .then(res => res.json())
        .then((data) => {
          dispatch(setTravelTimeInformation(data.rows[0].elements[0]));
        })
      }

      getTravelTime();
    }, [origin,destination,'GOOGLE-MAPS-API']);

    return (
        <MapView
        ref={mapRef}
        style={tw(['flex-1'])}
        mapType="mutedStandard"
        initialRegion={{
          latitude: origin.location.lat,
          longitude: origin.location.lng,
          latitudeDelta: 0.005,
          longitudeDelta: 0.005,
        }}>

        
         {origin && destination && (
           
          <MapViewDirections 
           origin={origin.description}
           destination={destination.description}
           apikey={"GOOGLE-MAPS-API"}
           strokeWidth={6}
           strokeColor="black"
           
          />
          
        )}


          {origin?.location && (
              <Marker
              coordinate={{
                latitude:origin.location.lat,
                longitude:origin.location.lng,

              }}
              title="Konum"
              description={origin.description}
              identifier="origin"
              />
          )}

            {destination?.location && (
              <Marker
              coordinate={{
                latitude:destination.location.lat,
                longitude:destination.location.lng,
              }}
              title="Rota"
              description={destination.description}
              identifier="Rota"
              />
          )}      

      </MapView>

    );
};

export default Map

const styles = StyleSheet.create({})
