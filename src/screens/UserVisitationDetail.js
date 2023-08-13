import React from 'react';
import { StyleSheet, View, ScrollView,Image } from 'react-native';
import { Block, Text, theme } from 'galio-framework';
import { argonTheme } from '../constants';
import AsyncStorage from '@react-native-async-storage/async-storage';

const PaymentHistoryScreen = () => {
  // Sample payment history data
  const paymentHistory = [
    { id: 1, date: '2023-08-01', amount: '$100.00' },
    { id: 2, date: '2023-07-15', amount: '$50.00' },
    // Add more payment history items here
  ];

  return (
    <>
    <Image
        source={require("../../assets/header.jpg")} 
        style={styles.headerImage}
      />
    <ScrollView style={styles.container}>       
      <Block style={styles.content}>
        <Text h4 style={styles.title}>Visitation History</Text>
        {paymentHistory.map((payment) => (
          <Block key={payment.id} style={styles.paymentContainer}>
            <Text size={16} color={argonTheme.COLORS.ACTIVE} bold>
              {payment.date}
            </Text>
            <Text size={16} style={styles.paymentAmount}>
              {payment.amount}
            </Text>
          </Block>
        ))}
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
});

export default PaymentHistoryScreen;
