import React, { useState } from 'react';
import { StyleSheet, TouchableOpacity } from 'react-native';
import { DrawerContentScrollView, DrawerItemList } from '@react-navigation/drawer';
import { Block, Text, theme } from "galio-framework";
import { ScrollView } from 'react-native-gesture-handler';
import DrawerItem from './DrawerItem';
import AsyncStorage from '@react-native-async-storage/async-storage';




function CustomDrawerContent(props) {
    const [focusedItem, setFocusedItem] = useState("News");

    const handleItemPress = (itemLabel) => {
        setFocusedItem(itemLabel);
        props.navigation.navigate(itemLabel);
    };
    const handleLogout = async () => {
        await AsyncStorage.clear();

        props.navigation.navigate("Logine");
    };
    return (
        <>
            <Block
                style={styles.container}
                forceInset={{ top: "always", horizontal: "never" }}
            >
                <Block flex={0.06} style={styles.header}>
                    <Text>ELECTRONIC JOURNA SENTIMENT ANALYSIS</Text>
                </Block>
                <Block flex style={{ paddingLeft: 8, paddingRight: 14 }}>
                    <ScrollView style={{ flex: 1 }} showsVerticalScrollIndicator={false}>
                        <DrawerItem label="welcome"
                            focused={focusedItem === 'welcome'}
                            onPress={() => handleItemPress('welcome')} />
                        <DrawerItem label="history"
                            focused={focusedItem === 'history'}
                            onPress={() => handleItemPress('history')} />
                        <DrawerItem label='user profile'
                            focused={focusedItem === 'user profile'}
                            onPress={() => handleItemPress('user profile')} />
                        <DrawerItem label='map'
                            focused={focusedItem === 'map'}
                            onPress={() => handleItemPress('map')} />
                    </ScrollView>
                    <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
                        <Text style={styles.logoutText}>Logout</Text>
                    </TouchableOpacity>
                </Block>
            </Block>
        </>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
    },
    header: {
        paddingHorizontal: 28,
        paddingBottom: theme.SIZES.BASE,
        paddingTop: theme.SIZES.BASE * 3,
        //justifyContent: "center",
    },
    logoutButton: {
        marginTop: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderWidth: 1,
        borderColor: theme.COLORS.GRAY,
        borderRadius: 5,
        alignSelf: "center",
    },
    logoutText: {
        color: theme.COLORS.RED,
        fontWeight: "bold",
    },
});

export default CustomDrawerContent;
