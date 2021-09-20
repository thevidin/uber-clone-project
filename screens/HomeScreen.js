import React from 'react'
import { SafeAreaView, StyleSheet, Text, View,Image } from 'react-native'
import tw from "tailwind-react-native-classnames";
import NavOptions from '../components/NavOptions';
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete';
import { GOOGLE_MAPS_APIKEY } from "@env";
import { useDispatch } from "react-redux";
import { setDestination,setOrigin } from "../slices/navSlices";
import NavFavourites from '../components/NavFavourites';


const HomeScreen = () => {
    const dispatch = useDispatch();



    return (
        <SafeAreaView style={tw(["bg-white h-full"])}>
           <View style={tw(["p-5"])}>
               <Image 
               style={{
                   width:100,
                   height:100,
                   resizeMode:"contain"
                }}
               source={{   
                   uri: "https://links.papareact.com/gzs"
                }} />

        <GooglePlacesAutocomplete
                styles={{
                    container:{
                        flex:0,
                    },
                    textInput:{
                        fontSize:18
                    },
                }}
                onPress={(data,details = null) => {
                    dispatch(
                        setOrigin({
                        location: details.geometry.location,
                        description: data.description
                    })
                    );
                    dispatch(setDestination(null));
                }}
                fetchDetails={true}
                returnKeyType={'search'}
                enablePoweredByContainer={false}
                minLength={2}
                query={{
                    key:'GOOGLE-MAPS-API',
                    language:'en'

                }}
                placeholder="Where from"
                nearbyPlacesAPI="GooglePlacesSearch"
                 debounce={400}

        />

        <NavOptions/>
        <NavFavourites />
           </View>
        </SafeAreaView>
    )
}

export default HomeScreen

const styles = StyleSheet.create({

    text:{
        color:"blue",

    }
})