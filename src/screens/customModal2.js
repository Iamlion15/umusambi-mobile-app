import React from 'react';
import { Modal, View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';

const Destionation2modal = ({ isVisible, toggleModal }) => {
  return (
    <Modal visible={isVisible} animationType="slide" transparent={true}>
      <View style={styles.modalContainer}>
        <View style={styles.modalContent}>
          <Image source={require('../../assets/header.jpg')} style={styles.image} />
          <Text style={styles.description}>
          Umusambi Village stands as a unique conservation haven,
           where a diverse array of avian species have found a new home. 
           Through dedicated efforts, a variety of birds have been thoughtfully 
           reintroduced to this sanctuary. This vibrant tapestry of winged 
           inhabitants adds an enchanting melody to the tranquil landscape, 
           as they thrive in their revitalized habitat. Umusambi Village 
           proudly exemplifies the harmonious coexistence of humans and nature, 
           fostering a haven where the skies are alive with the vibrant colors 
           and melodies of different bird species.
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

export default Destionation2modal;
