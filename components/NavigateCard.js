import { useNavigation } from '@react-navigation/native'
import React from 'react'
import {View,StyleSheet,Text,SafeAreaView, TouchableOpacity} from 'react-native'
import { Icon } from 'react-native-elements'
import { GooglePlacesAutocomplete } from 'react-native-google-places-autocomplete'
import { useDispatch } from 'react-redux'
import tw from 'tailwind-react-native-classnames'
import { setDestination } from '../slices/navSlices'
import NavFavourites from './NavFavourites'


const NavigateCard = () => {
 const dispatch = useDispatch();
 const navigation = useNavigation();

    return (
        <SafeAreaView style={tw(['bg-white flex-1'])}>
            <Text style={tw(['text-center py-5 text-xl'])}>Hello Vidin</Text>
            <View style={tw(['border-t border-gray-200 flex-shrink'])}>
                <View>
                    <GooglePlacesAutocomplete
                    placeholder="Where to" 
                    styles={toInputBoxStyles} 
                    fetchDetails={true}
                    enablePoweredByContainer={false}
                    onPress={(data,details = null) => {
                        dispatch(
                        setDestination({
                            location: details.geometry.location,
                            description: data.description
                        })
                        );
                        navigation.navigate("RideOptionsCard")
                    }}
                    query={{
                        key:'GOOGLE-MAPS-API',
                        language:'en'
                    }}
                    returnKeyType={"search"}
                    minLength={2}
                    nearbyPlacesAPI="GooglePlacesSearch"
                    debounce={400}
                    
                    />
                </View>
                <NavFavourites/>
            </View>

        <View style={tw(["flex-row bg-white justify-evenly py-2 mt-auto border-t border-gray-100"])}>
            <TouchableOpacity
            onPress={() => navigation.navigate("RideOptionsCard")}
            style={tw(["flex flex-row justify-between bg-black w-24 px-4 py-3 rounded-full"])}>
                <Icon name="car" type="font-awesome" color="white" size={16}/>
                <Text style={tw(["text-white text-center"])}>Rides</Text>
            </TouchableOpacity>
            <TouchableOpacity style={tw(["flex flex-row justify-between w-24 px-4 py-3 rounded-full"])}>
                <Icon name="fast-food-outline" type="ionicon" color="black" size={16}/>
                <Text style={tw(["text-center"])}>Eats</Text>
            </TouchableOpacity>
        </View>

        </SafeAreaView>
    )
}

export default NavigateCard

const toInputBoxStyles = StyleSheet.create({
    container: {
        backgroundColor:'white',
        paddingTop:20,
        flex:0,
    },
    textInput:{
        backgroundColor:'#DDDdDF',
        borderRadius:0,
        fontSize:18
    },
    textInputContainer:{
        paddingHorizontal:20,
        paddingBottom:0

    }
});