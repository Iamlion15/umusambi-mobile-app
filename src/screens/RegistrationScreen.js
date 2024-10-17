import React, { useState,useRef } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image, ScrollView, } from 'react-native';
import { AntDesign } from '@expo/vector-icons'

const RegistrationScreen = () => {
    const [data, setData] = useState({
        firstname: "",
        lastname: "",
        email: "",
        phone: "",
        nID: "",
        password: ""
    });
    const timeoutRef = useRef(null);
    const [visible, setVisible] = useState(false)
    const [message,setMessage]=useState('');
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
        if (
            data.firstname === "" ||
            data.lastname === "" ||
            data.email === "" ||
            data.phone === "" ||
            data.nID === "" ||
            data.password === ""
        ) {
            setMsg("Please fill in all fields.");
            showAlert();
            return false;
        }

        // if (!isValidEmail(data.email)) {
        //     setMsg("Invalid email format.");
        //     showAlert();
        //     return false;
        // }

        if (data.phone.length !== 10) {
            setMsg("Phone number must be 10 digits.");
            showAlert();
            return false;
        }
        if (data.nID.length !== 16) {
            setMsg("National Identity must be 16 characters.");
            showAlert();
            return false;
        }
        return true;
    };
    function RegisterHandler() {
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
        fetch("http://192.168.43.112:7000/api/app/signup", methodOptions)
            .then((response) => {
                if (!response.ok) {
                    console.log("response",response);
                    console.log("INVALID EMAIL OR PASSWORD");
                    if (response.status == 405) {
                        setMsg("EMAIL OR PHONE NUMBER USED")
                        showAlert();
                    }
                }
                else {
                    if (response.ok) {
                        console.log("visitor")
                        showAlert();
                        setMsg("SUCCESFULLY REGISTERED,")
                    }
                }
            })
            .catch((error) => {
                showAlert();
                setMsg("unexpected error occured");
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
            <View style={styles.container}>
            <Text style={styles.title}>Registration</Text>
            <TextInput
                style={styles.input}
                placeholder="First Name"
                value={data.firstName}
                onChangeText={(text) => setData({ ...data, firstname: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Last Name"
                value={data.lastName}
                onChangeText={(text) => setData({ ...data, lastname: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="email"
                value={data.email}
                onChangeText={(text) => setData({ ...data, email: text })}
            />
            <TextInput
                style={styles.input}
                placeholder="Phone Number"
                value={data.phoneNumber}
                onChangeText={(text) => setData({ ...data, phone: text })}
                keyboardType="phone-pad"
            />
            <TextInput
                style={styles.input}
                placeholder="National ID"
                value={data.nationalId}
                onChangeText={(text) => setData({ ...data, nID: text })}
                keyboardType="numeric"
            />
            <TextInput
                style={styles.input}
                placeholder="Password"
                value={data.password}
                onChangeText={(text) => setData({ ...data, password: text })}
                secureTextEntry
            />
            <TouchableOpacity style={styles.button}
                onPress={RegisterHandler}
            >
                <Text style={styles.buttonText}>Register</Text>
            </TouchableOpacity>
            </View>
        </ScrollView>
        </>
    );
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        padding: 20,
    },
    title: {
        fontSize: 24,
        fontWeight: 'bold',
        marginBottom: 20,
    },
    headerImage: {
        width: '100%',
        height: 250, // Adjust the height according to your image
      },
    input: {
        width: '100%',
        backgroundColor: 'white',
        marginBottom: 10,
        padding: 10,
        borderRadius: 5,
        borderWidth: 1,
        borderColor: '#ccc',
    },
    button: {
        backgroundColor: 'lightpink',
        paddingVertical: 12,
        paddingHorizontal: 30,
        borderRadius: 5,
    },
    buttonText: {
        color: 'white',
        fontSize: 16,
        fontWeight: 'bold',
    },
});

export default RegistrationScreen;
