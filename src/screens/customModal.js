import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const CustomModal = ({ isVisible, toggleModal }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../../assets/header.jpg')} style={styles.image} />
          <Text style={styles.description}>
            hello your description wil go here
            hello your description wil go here
            hello your description wil go here
            hello your description wil go here
            hello your description wil go here
            hello your description wil go here
            hello your description wil go here
            hello your description wil go here
          </Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 20,
    borderRadius: 10,
    alignItems: 'center',
  },
  image: {
    width: 360,
    height: 200,
    marginBottom: 10,
  },
  description: {
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: 'lightpink',
    padding: 10,
    borderRadius: 5,
  },
  closeButtonText: {
    color: 'white',
    fontWeight: 'bold',
  },
});

export default CustomModal;
