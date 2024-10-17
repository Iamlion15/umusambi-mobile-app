import React, { useState, useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Image, ScrollView } from 'react-native';
import { AntDesign } from '@expo/vector-icons'
import AsyncStorage from '@react-native-async-storage/async-storage';

const LoginScreen = ({ navigation }) => {
    const [data, setData] = useState({
        email: "",
        password: ""
    });
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [message, setMessage] = useState("")
    const closeAlert = () => {
        setVisible(false);
    }
    const showAlert = () => {
        setVisible(true);
        clearTimeout(timeoutRef.current)
        timeoutRef.current = setTimeout(closeAlert, 4000);
    }
    const [msg, setMsg] = useState();
    const isValidEmail = (email) => {
        const emailPattern = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
        return emailPattern.test(email);
    };
    const validateInputs = () => {
        console.log(data)
        if (
            data.email === "" ||
            data.password === ""
        ) {
            setMsg("Please fill in all fields.");
            showAlert();
            return false;
        }
        if (!isValidEmail(data.email)) {
            setMsg("Invalid email format.");
            showAlert();
            return false;
        }
        return true;
    };
    function LoginHandler() {
        if (!validateInputs()) {
            return;
        }
        const methodOptions = {
            method: "POST",
            body: JSON.stringify(data),
            headers: {
                "content-type": "application/JSON",
            },
        };
        fetch("http://192.168.43.112:7000/api/app/login", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    if (response.status == 401) {
                        console.log("INVALID EMAIL OR PASSWORD");
                        setMsg("INVALID EMAIL OR PASSWORD")
                        showAlert();
                    }
                    else {
                        if (response.status == 403) {
                            setMessage("YOUR ACCOUNT HAS NOT YET BEEN VERIFIED YET")
                            showAlert()
                        }
                    }
                }
                else {
                    if (response.ok) {
                        if (response.status == 201) {
                            setMsg("USER DOESN'T EXIST");
                            showAlert()
                        }
                        else if (response.status == 202) {
                            setMsg("INVALID CREDENTIALS");
                            showAlert()
                        }
                        else if (response.status == 200) {
                            return response.json();
                        }
                    }
                }
            })
            .then((value) => {
                console.log("here",value);
                if (value.message === "successfully logged in") {
                    // Store the token in SecureStore
                    console.log("here");
                    
                    AsyncStorage.setItem('UserToken', value.token)
                        .then(() => {
                            console.log("running here")
                            // Navigate to the next screen or perform any other action
                            navigation.navigate('Home');
                        })
                        .catch((error) => {
                            console.log('Error storing token:', error);
                        });
                }
            })
            .catch((error) => {
                // setMsg("unexpected error occured");
                console.log(error);
            });
    }

    return (
        <>
            <Image
                source={require("../../assets/header.jpg")}
                style={styles.headerImage}
            />
            <ScrollView>
                {msg && visible && (
                    <View style={styles.alertContainer}>
                        <AntDesign name="checkcircle" size={24} color="green" />
                        <Text style={styles.alertText}>{msg}</Text>
                    </View>
                )}
                {/* Error Message */}
                <Text>
                    {msg && visible && (
                        <View style={[styles.alertContainer, { backgroundColor: 'red' }]}>
                            <AntDesign name="closecircle" size={24} color="white" />
                            <Text style={[styles.alertText, { color: 'white' }]}>{msg}</Text>
                        </View>
                    )}
                </Text>
                <View style={styles.container}>
                    <Text style={styles.title}>Login</Text>
                    <View style={styles.inputContainer}>
                        <TextInput
                            style={styles.input}
                            placeholder="Email"
                            keyboardType="email-address"
                            value={data.email}
                            onChangeText={(text) => setData({ ...data, email: text })}
                        />
                        <TextInput
                            style={styles.input}
                            placeholder="Password"
                            secureTextEntry
                            value={data.password}
                            onChangeText={(text) => setData({ ...data, password: text })}
                        />
                    </View>
                    <TouchableOpacity style={styles.button} onPress={LoginHandler}>
                        <Text style={styles.buttonText}>Login</Text>
                    </TouchableOpacity>
                    <TouchableOpacity style={styles.signupLink}
                        onPress={() => navigation.navigate("registration")}
                    >
                        <Text style={styles.signupText}>Don't have an account? Sign up</Text>
                    </TouchableOpacity>
                </View>
            </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        marginTop: 60,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f0f0f0',
    },
    title: {
        fontSize: 24,
        marginBottom: 20,
    },
    inputContainer: {
        width: '80%',
        marginBottom: 20,
    },
    input: {
        height: 40,
        borderRadius: 20,
        backgroundColor: 'white',
        marginBottom: 10,
        paddingHorizontal: 20,
    },
    button: {
        backgroundColor: 'lightpink',
        borderRadius: 20,
        paddingVertical: 10,
        paddingHorizontal: 20,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
    },
    signupLink: {
        marginTop: 20,
    },
    headerImage: {
        width: '100%',
        height: 250, // Adjust the height according to your image
    },
    signupText: {
        color: 'blue',
        fontSize: 16,
    },
    alertContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        paddingVertical: 10,
        paddingHorizontal: 20,
        borderRadius: 20,
        marginTop: 10,
    },
    alertText: {
        marginLeft: 10,
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default LoginScreen;
