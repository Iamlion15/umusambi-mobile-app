import React from 'react';
import { View, Text, Image, StyleSheet, TouchableOpacity } from 'react-native';

const LandingPage = ({navigation}) => {
    return (
        <View style={styles.container}>
            <Image
                source={require('../../assets/header.jpg')}
                style={styles.backgroundImage}
            />
            <View style={styles.content}>
                <Text style={styles.title}>Welcome to Umusambi Village</Text>
                <Text style={styles.subtitle}>A Serene Escape for You</Text>
                <Text style={styles.description}>
                    Discover the picturesque Umusambi Village – a place where tranquility meets adventure.
                    Immerse yourself in the lush landscapes, unwind by the serene rivers, and explore
                    the hidden treasures of nature.
                </Text>
                <TouchableOpacity style={styles.exploreButton}
                onPress={()=>navigation.navigate("map")}
                >
                    <Text style={styles.buttonText}>Explore Now</Text>
                </TouchableOpacity>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
    backgroundImage: {
        width: '100%',
        height: '100%',
        resizeMode: 'cover',
        position: 'absolute',
    },
    content: {
        backgroundColor: 'rgba(255, 255, 255, 0.8)', // Semi-transparent white background
        padding: 20,
        borderRadius: 20,
        alignItems: 'center',
        justifyContent: 'center',
    },
    title: {
        fontSize: 28,
        fontWeight: 'bold',
        color: '#FF4572', // Pink color
        marginBottom: 10,
        textAlign: 'center',
    },
    subtitle: {
        fontSize: 18,
        color: '#FFA06D', // Coral color
        marginBottom: 20,
        textAlign: 'center',
    },
    description: {
        fontSize: 16,
        color: '#333',
        marginBottom: 30,
        textAlign: 'center',
    },
    exploreButton: {
        backgroundColor: '#FF4572', // Pink color
        paddingVertical: 15,
        paddingHorizontal: 40,
        borderRadius: 30,
    },
    buttonText: {
        color: '#FFF', // White color
        fontSize: 18,
        fontWeight: 'bold',
    },
});

export default LandingPage;
