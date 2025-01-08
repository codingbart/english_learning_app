import React, { useState } from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';

export default function CardsScreen() {
  const [isFlipped, setIsFlipped] = useState(false); 
  const [word, setWord] = useState('Apple');
  const [translation, setTranslation] = useState('Jabłko');

  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={() => alert('nastepna fiszka')}>
          <Text style={styles.buttonText}>Następna fiszka</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.card} onPress={flipCard}>
        <Text style={styles.cardText}>
          {isFlipped ? translation : word}
        </Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.addButton} onPress={() => alert('nowa fiszka')}>
        <Text style={styles.addButtonText}>Dodaj fiszkę</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#f9f9f9',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50', // Kolor zielony
    paddingVertical: 15,
    marginHorizontal: 10,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
  card: {
    width: 350,
    height: 250,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    marginBottom: 20,
  },
  cardText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  addButton: {
    width: '90%',
    backgroundColor: '#2196F3',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  addButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});
