import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Destination3Modal = ({ isVisible, toggleModal }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../../assets/header.jpg')} style={styles.image} />
          <Text style={styles.description}>
          The African cranes at Umusambi Village are a captivating sight to behold.
           With their elegant long legs, distinctive elongated necks, 
           and regal stature, these cranes are a true representation of grace and beauty.
            Their intricate plumage boasts shades of earthy browns, deep blacks,
             and dashes of striking reds, creating a visual spectacle against 
             the backdrop of the village's lush surroundings. These majestic 
             birds have found a haven in Umusambi Village, where they can freely 
             display their intricate courtship dances and engage in their unique vocalizations. 
             As an emblem of both local biodiversity and the conservation efforts at Umusambi Village, 
             the African cranes inspire awe and serve as a reminder of the delicate balance 
             between human and natural worlds.
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

export default Destination3Modal;
