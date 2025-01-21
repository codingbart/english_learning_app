import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Text, TouchableOpacity, Alert, TextInput } from 'react-native';
import API from '../../api/config';
import {Accelerometer} from 'expo-sensors';


function CardsScreen() {
  const [isFlipped, setIsFlipped] = useState(false); 
  const [cards, setCards] = useState([]);
  const [currentCardIndex, setCurrentCardIndex] = useState(0);
  const [word, setWord] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newWord, setNewWord] = useState('');
  const [newTranslation, setNewTranslation] = useState('');
  const [data, setData] = useState({ x:0, y:0, z:0 });
  const [lastFlipTime, setLastFlipTime] = useState(0);

  useEffect(() => {
    const fetchCards = async () => {
      try {
        const response = await API.get('/flashcards');
        const cardsData = response.data;
        if (cardsData.length === 0) {
          Alert.alert('Brak fiszek w bazie');
        } else {
          setCards(cardsData);
          setCurrentCardIndex(0);
        }
      } catch (error) {
        console.error('Cards error:', error);
        Alert.alert('Błąd', 'Spróbuj ponownie.');
      }
    };

    fetchCards();
  }, []);

  useEffect(() => {
    Accelerometer.setUpdateInterval(500);

    const subscription = Accelerometer.addListener((accelerometerData) => {
      setData(accelerometerData);
        if(accelerometerData.y  > 1 || accelerometerData.y < -1){
          setIsFlipped(prevState => !prevState);
        }
  });
    return () => subscription && subscription.remove();
  }, []);


  const flipCard = () => {
    setIsFlipped(!isFlipped);
  };
  
  const handleNextCard = () => {
    setCurrentCardIndex((prevIndex) => (prevIndex + 1) % cards.length);
    setIsFlipped(false);
  };

  const handleAddCard = async () => {
    if (newWord === '' || newTranslation === '') {
      Alert.alert('Błąd', 'Proszę wypełnić oba pola.');
      return;
    }
    const newCard = { word: newWord, translation: newTranslation };

    try {
      await API.post('/flashcards', newCard);
      setCards([...cards, newCard]);
      setNewWord('');
      setNewTranslation('');
      setShowForm(false);
      Alert.alert('Sukces', 'Fiszka została dodana.');
    } catch (error) {
      console.error('Add card error:', error);
      Alert.alert('Błąd', 'Nie udało się dodać fiszki. Spróbuj ponownie.');
    }
  };
  const currentCard = cards[currentCardIndex];

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  return (
    
    <View style={styles.container}>

      <View style={styles.buttonsContainer}>
        <TouchableOpacity style={styles.button} onPress={handleNextCard}>
          <Text style={styles.buttonText}>Następna fiszka</Text>
        </TouchableOpacity>
      </View>
      {currentCard && (
      <TouchableOpacity style={styles.card} onPress={flipCard}>
        <Text style={styles.cardText}>
          {isFlipped ? currentCard.translation : currentCard.word}
        </Text>
      </TouchableOpacity>
      )}
      <TouchableOpacity style={styles.addButton} onPress={toggleForm}>
        <Text style={styles.addButtonText}>Dodaj fiszkę</Text>
      </TouchableOpacity>

      {showForm && (
        <View style={styles.formContainer}>
          <TextInput
            style={styles.input}
            placeholder="Słowo"
            value={newWord}
            onChangeText={setNewWord}
          />
          <TextInput
            style={styles.input}
            placeholder="Tłumaczenie"
            value={newTranslation}
            onChangeText={setNewTranslation}
          />
          <TouchableOpacity style={styles.submitButton} onPress={handleAddCard}>
            <Text style={styles.submitButtonText}>Dodaj</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    // dark mode conflicts with backgroundColor
    // backgroundColor: '#f9f9f9',
  },
  buttonsContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '95%',
    marginBottom: 20,
  },
  button: {
    flex: 1,
    backgroundColor: '#4CAF50', // zielony
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
  formContainer: {
    width: '90%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
    marginTop: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  submitButton: {
    backgroundColor: '#4CAF50',
    paddingVertical: 15,
    borderRadius: 8,
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 3,
  },
  submitButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: 'bold',
  },
});

export default CardsScreen;