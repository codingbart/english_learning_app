import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

function SettingsScreen() {
  const { toggleTheme } = useContext(ThemeContext);

  const [newName, setNewName] = useState('');
  const [isNameChanging, setIsNameChanging] = useState(false);

  const handleChangeName = () => {
    setIsNameChanging(true);
  };

  const handleSaveName = () => {
    if (newName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }
    Alert.alert('Success', `Your name has been changed to ${newName}`);
    setIsNameChanging(false);
    setNewName('');
  };

  const handleToggleDarkMode = () => {
    toggleTheme();
  };

  const handleChangeProfilePicture = () => {
    Alert.alert('Change Profile Picture', 'You can change your profile picture here.');
  };

  const handleResetStats = async () => {
    try {
      await AsyncStorage.removeItem('lastQuizScore');
      Alert.alert('Reset Stats', 'Your achievements and stats have been reset.');
    } catch (error) {
      console.error('Error resetting stats:', error);
      Alert.alert('Error', 'There was an error resetting your stats. Please try again.');
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.header}>Settings</Text>
      
      {isNameChanging ? (
        <View style={styles.formContainer}>
          <TextInput
            value={newName}
            onChangeText={setNewName}
            placeholder="Enter new name"
            style={styles.input}
          />
          <TouchableOpacity style={styles.button} onPress={handleSaveName}>
            <Text style={styles.buttonText}>Save Name</Text>
          </TouchableOpacity>
        </View>
      ) : (
        <View style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={handleChangeName}>
            <Text style={styles.buttonText}>Change Name</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleToggleDarkMode}>
            <Text style={styles.buttonText}>Toggle Dark Mode</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleChangeProfilePicture}>
            <Text style={styles.buttonText}>Change Profile Picture</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={handleResetStats}>
            <Text style={styles.buttonText}>Reset Stats and Achievements</Text>
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
    padding: 20,
    // dark mode conflicts with backgroundColor
    // backgroundColor: '#f9f9f9',
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 40,
    textAlign: 'center',
    color: '#fff',
    backgroundColor: '#448AFF', // White background for header
    paddingVertical: 12,
    borderRadius: 12, // Rounded corners for header
    width: '100%',
    marginBottom: 30,
  },
  buttonContainer: {
    width: '80%',
    marginTop: 20,
  },
  formContainer: {
    width: '80%',
    marginTop: 20,
  },
  button: {
    backgroundColor: '#82b1ff',
    borderRadius: 10, // Rounded corners for buttons
    paddingVertical: 15,
    marginBottom: 15,
    justifyContent: 'center',
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    textAlign: 'center',
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    borderRadius: 10, // Rounded corners for input
    marginBottom: 15,
    fontSize: 16,
    backgroundColor: '#fff', // Background color for input
  },
});

export default SettingsScreen;