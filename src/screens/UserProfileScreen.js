import React,{useState,useEffect} from 'react';
import { StyleSheet, ScrollView, Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserDetailScreen = () => {
    const [user, setUser] = useState({});

    useEffect(() => {
        fetchUserDetails();
    }, []);

    const fetchUserDetails = async () => {
        const token = await AsyncStorage.getItem('UserToken');
        console.log(token)

        if (!token) {
            console.log("token not available");
            return;
        }

        const requestOptions = {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'x-auth-token': token,
            },
        };
        try {
            const response = await fetch('http://192.168.43.236:7000/api/app/getdetails',requestOptions);
            if (response.ok) {
                const data = await response.json();
                setUser(data);
            } else {
                console.error('Failed to fetch user details');
            }
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    return (
        <>
            <Image
                source={require("../../assets/header.jpg")}
                style={styles.headerImage}
            />
            <ScrollView style={styles.container}>
                <Block style={styles.content}>
                    <Text h4 style={styles.title}>User Details</Text>
                    <Block style={styles.userInfoContainer}>
                        <Text style={styles.userInfoText}>
                            <Text style={styles.userInfoLabel}>First Name: </Text>
                            {user.firstname}
                        </Text>
                        <Text style={styles.userInfoText}>
                            <Text style={styles.userInfoLabel}>Last Name: </Text>
                            {user.lastname}
                        </Text>
                        <Text style={styles.userInfoText}>
                            <Text style={styles.userInfoLabel}>Phone Number: </Text>
                            {user.phone}
                        </Text>
                        <Text style={styles.userInfoText}>
                            <Text style={styles.userInfoLabel}>Email: </Text>
                            {user.email}
                        </Text>
                        <Text style={styles.userInfoText}>
                            <Text style={styles.userInfoLabel}>National Identity: </Text>
                            {user.nID}
                        </Text>
                    </Block>
                </Block>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: theme.COLORS.WHITE,
    },
    content: {
        padding: theme.SIZES.BASE,
    },
    title: {
        marginBottom: theme.SIZES.BASE * 2,
        fontWeight: 'bold',
    },
    userInfoContainer: {
        width: '100%',
        paddingHorizontal: theme.SIZES.BASE,
        paddingVertical: theme.SIZES.BASE * 1.5,
        backgroundColor: argonTheme.COLORS.WHITE,
        borderRadius: theme.SIZES.BASE / 2,
        marginBottom: theme.SIZES.BASE * 2,
        shadowColor: theme.COLORS.BLACK,
        shadowOffset: { width: 0, height: 2 },
        shadowOpacity: 0.1,
        shadowRadius: 4,
        elevation: 2,
    },
    headerImage: {
        width: '100%',
        height: 200, // Adjust the height according to your image
    },
    userInfoLabel: {
        fontWeight: 'bold',
        color: argonTheme.COLORS.HEADER,
    },
    userInfoText: {
        marginBottom: theme.SIZES.BASE,
    },
});

export default UserDetailScreen;
