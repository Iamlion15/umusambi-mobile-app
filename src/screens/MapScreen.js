import React, { useState, useEffect } from 'react';
import { View, ActivityIndicator, StyleSheet, TouchableOpacity, Text } from 'react-native';
import MapView, { Marker } from 'react-native-maps';
import MapViewDirections from 'react-native-maps-directions';
import * as Location from 'expo-location';
import CustomModal from './customModal';
import Destination1Modal from './customModal1';
import Destionation2modal from './customModal2';
import Destination3Modal from './customModal3';


const GOOGLE_MAPS_API_KEY = 'AIzaSyAHg41fcz6JqNFtY33alYcDP9zqQqAACjI';
const MapScreen = () => {
    const [currentLocation, setCurrentLocation] = useState(null);
    const destination = { latitude: -1.984105, longitude: 30.209492 };
    const destination1 = { latitude: -1.984105 + 0.00045, longitude: 30.209492 + 0.00045 };
    const destination2 = { latitude: -1.984105 + 0.0009, longitude: 30.209492 + 0.0009 };
    const destination3 = { latitude: -1.984105 + 0.00135, longitude: 30.209492 + 0.00135 };
    const [isLoading, setIsLoading] = useState(true);
    const [selectedDestination, setSelectedDestination] = useState(destination);
    const [isModalVisible, setModalVisible] = useState(false);
    const [isModalVisibleDestination1, setModalVisibleDestination1] = useState(false);
    const [isModalVisibleDestination2, setModalVisibleDestination2] = useState(false);
    const [isModalVisibleDestination3, setModalVisibleDestination3] = useState(false);
    const handleMarkerPress = () => {
        setModalVisible(true);
    };
    const handleMarkerDestination1Press = () => {
        setModalVisibleDestination1(true);
    };
    const handleMarkerDestination2Press = () => {
        setModalVisibleDestination2(true);
    };
    const handleMarkerDestination3Press = () => {
        setModalVisibleDestination3(true);
    };


    const toggleModal = () => {
        setModalVisible(false);
    };
    const toggleModalDestination1 = () => {
        setModalVisibleDestination1(false);
    };
    const toggleModalDestination2 = () => {
        setModalVisibleDestination2(false);
    };
    const toggleModalDestination3 = () => {
        setModalVisibleDestination3(false);
    };
    const handleDestinationButtonPress = (newDestination) => {
        setSelectedDestination(newDestination);
    };

    useEffect(() => {
        (async () => {
            const { status } = await Location.requestForegroundPermissionsAsync();
            if (status === 'granted') {
                const location = await Location.getCurrentPositionAsync({});
                setCurrentLocation({
                    latitude: location.coords.latitude,
                    longitude: location.coords.longitude,
                });
                setIsLoading(false);
            }
        })();
    }, []);

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" color="blue" />
            </View>
        );
    }

    return (
        <View style={{ flex: 1 }}>
            <MapView
                style={{ flex: 1 }}
                initialRegion={{
                    latitude: (currentLocation.latitude + destination.latitude) / 2,
                    longitude: (currentLocation.longitude + destination.longitude) / 2,
                    latitudeDelta: Math.abs(currentLocation.latitude - destination.latitude) * 1.5,
                    longitudeDelta: Math.abs(currentLocation.longitude - destination.longitude) * 1.5,
                }}
            >
                <Marker coordinate={currentLocation} title="My Location" />
                <Marker coordinate={destination} title="UMUSAMBI VILLAGE"
                    onPress={handleMarkerPress}
                />
                <Marker coordinate={destination1} title="Butterfly house"
                    onPress={handleMarkerDestination1Press}
                />
                <Marker coordinate={destination2} title="Destination 2"
                    onPress={handleMarkerDestination2Press}
                />
                <Marker coordinate={destination3} title="Destination 3"
                    onPress={handleMarkerDestination3Press}
                />
                <MapViewDirections
                    origin={currentLocation}
                    destination={selectedDestination}
                    apikey={GOOGLE_MAPS_API_KEY}
                    strokeWidth={3}
                    strokeColor="hotpink"
                />
            </MapView>
            {/* Modal component */}
            <CustomModal isVisible={isModalVisible} toggleModal={toggleModal} />
            <Destination1Modal isVisible={isModalVisibleDestination1} toggleModal={toggleModalDestination1} />
            <Destionation2modal isVisible={isModalVisibleDestination2} toggleModal={toggleModalDestination2} />
            <Destination3Modal isVisible={isModalVisibleDestination3} toggleModal={toggleModalDestination3} />


            {/* Buttons for each destination */}
            <View style={styles.buttonContainer}>
                <TouchableOpacity style={styles.destinationButton} onPress={() => handleDestinationButtonPress(destination)}>
                    <Text style={styles.buttonText}>UMUSAMBI VILLAGE</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.destinationButton} onPress={() => handleDestinationButtonPress(destination1)}>
                    <Text style={styles.buttonText}>HOUSE OF BUTTERFLIES</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.destinationButton} onPress={() => handleDestinationButtonPress(destination2)}>
                    <Text style={styles.buttonText}>BIRDS</Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.destinationButton} onPress={() => handleDestinationButtonPress(destination3)}>
                    <Text style={styles.buttonText}>SWAMPS</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};
const styles = StyleSheet.create({
    buttonContainer: {
        position: 'absolute',
        right: 20,
        top: 50,
        backgroundColor: 'transparent',
    },
    destinationButton: {
        marginBottom: 10,
        padding: 8,
        borderRadius: 5,
        backgroundColor: 'teal',
    },
    buttonText: {
        color: 'white',
        fontWeight: 'bold',
        textAlign: 'center',
    },
});

export default MapScreen;
