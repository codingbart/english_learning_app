import React, { useState } from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import Icon from 'react-native-ico-font-awesome'
import API from '../../api/config';

function DictionaryScreen() {
  const [word, setWord] = useState('');
  const [translation, setTranslation] = useState('');
  const [isPolishToEnglish, setIsPolishToEnglish] = useState(true);
  
  const handleSearch = async () => {
    try{
      if (word.trim()=== '') {
        Alert.alert('Błąd', 'Proszę wpisać słowo.');
        return;
      }

      const query = isPolishToEnglish
        ? `?word=${encodeURIComponent(word)}`
        : `?translation=${encodeURIComponent(word)}`;

      const response = await API.get(`/dictionary${query}`);
      console.log('API: ', response.data);
      if (response.data.length > 0) {
        const translationData = isPolishToEnglish ? response.data[0].translation : response.data[0].word;
        setTranslation(translationData);
      } else {
        Alert.alert('Błąd', 'Nie znaleziono tłumaczenia.');
        setTranslation('');
      }
    }catch(error){
      console.error('Search error:', error);
      Alert.alert('Nie udało się wyszukać tłumaczenia. Spróbuj ponownie.');
    }
  }  

  const toggleTranslationDirection = () => {
    setIsPolishToEnglish(!isPolishToEnglish);
    setTranslation(''); 
    setWord('');
  };
  
  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder={isPolishToEnglish ? 'Wpisz słowo po angielsku' : 'Wpisz słowo po polsku'}
        value={word}
        onChangeText={setWord}
      />
      <TouchableOpacity style={styles.searchButton} onPress={handleSearch}>
        <Text style={styles.searchButtonText}>🔍 Szukaj</Text>
      </TouchableOpacity>
      <TouchableOpacity style={styles.toggleButton} onPress={toggleTranslationDirection}>
        <Text style={styles.toggleButtonText}>
          {isPolishToEnglish ? 'EN -> PL' : 'PL -> EN'}
        </Text>
      </TouchableOpacity>
      {translation !== '' && (
        <View style={styles.translationContainer}>
          <Text style={styles.translationText}>{translation}</Text>
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
    padding: 20,
  },
  input: {
    width: '100%',
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 20,
  },
  searchButton: {
    backgroundColor: '#4CAF50',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  searchButtonText: {
    color: '#fff',
    fontSize: 18,
  },
  translationContainer: {
    marginTop: 20,
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOpacity: 0.2,
    shadowOffset: { width: 0, height: 4 },
    shadowRadius: 5,
  },
  translationText: {
    fontSize: 20,
    fontWeight: 'bold',
  },
  toggleButton: {
    backgroundColor: '#2196F3',
    padding: 10,
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
    marginBottom: 20,
  },
  toggleButtonText: {
    color: '#fff',
    fontSize: 18,
  },
});

export default DictionaryScreen;