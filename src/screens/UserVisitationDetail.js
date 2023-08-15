import React,{useState,useEffect} from 'react';
import { StyleSheet, View, ScrollView,Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentHistoryScreen = () => {
  // Sample payment history data
  // const paymentHistory = [
  //   { id: 1, date: '2023-08-01', amount: '$100.00' },
  //   { id: 2, date: '2023-07-15', amount: '$50.00' },
  //   // Add more payment history items here
  // ];

   const [paymentHistory, setPaymentHistory] = useState([]);

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
            const response = await fetch('http://192.168.43.236:7000/api/app/getuserhistory',requestOptions);
            if (response.ok) {
                const data = await response.json();
                setPaymentHistory(data);
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
      <Text h4 style={styles.title}>Visitation History</Text>       
    <ScrollView style={styles.container}>
        <Block style={styles.content}>
          {paymentHistory.length === 0 ? (
            <Text style={styles.emptyHistoryText}>Empty history</Text>
          ) : (
            paymentHistory.map((payment) => (
              <Block key={payment.id} style={styles.paymentContainer}>
                <Text size={16} color={argonTheme.COLORS.ACTIVE} bold>
                  {payment.date}
                </Text>
                <Text size={16} style={styles.paymentAmount}>
                  3000 RWF
                </Text>
              </Block>
            ))
          )}
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
  headerImage: {
    width: '100%',
    height: 150, // Adjust the height according to your image
  },
  title: {
    marginBottom: theme.SIZES.BASE * 2,
    fontWeight: 'bold',
  },
  paymentContainer: {
    marginBottom: theme.SIZES.BASE * 2,
    padding: theme.SIZES.BASE,
    borderWidth: 1,
    borderColor: argonTheme.COLORS.BORDER,
    borderRadius: theme.SIZES.BASE / 2,
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  paymentAmount: {
    fontWeight: 'bold',
  },
  emptyHistoryText: {
    textAlign: 'center',
    color: argonTheme.COLORS.MUTED,
    fontStyle: 'italic',
    marginBottom: theme.SIZES.BASE,
  },
});

export default PaymentHistoryScreen;
