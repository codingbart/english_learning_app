import { StyleSheet, View, Text, TextInput, TouchableOpacity, Alert } from 'react-native';
import React, { useState, useContext } from 'react';
import { ThemeContext } from '../../context/ThemeContext';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';
import * as FileSystem from 'expo-file-system';
import API from '../../api/config';

function SettingsScreen() {
  const { toggleTheme } = useContext(ThemeContext);

  const [newName, setNewName] = useState('');
  const [isNameChanging, setIsNameChanging] = useState(false);

  const handleChangeName = () => {
    setIsNameChanging(true);
  };

  const handleSaveName = async () => {
    if (newName.trim() === '') {
      Alert.alert('Error', 'Please enter a valid name.');
      return;
    }

    try {
      const userId = await AsyncStorage.getItem('userId');
      if (userId) {
        const response = await API.get('/users');
        const users = response.data;
        const user = users.find((u) => u.id === userId);
        if (user) {
          user.name = newName;
          await API.put(`/users/${userId}`, user);
          Alert.alert('Success', `Your name has been changed to ${newName}`);
        }
      }
    } catch (error) {
      console.error('Error updating name:', error);
      Alert.alert('Error', 'There was an error updating your name. Please try again.');
    }

    setIsNameChanging(false);
    setNewName('');
  };

  const handleToggleDarkMode = () => {
    toggleTheme();
  };

  const handleChangeProfilePicture = async () => {
      const { status } = await ImagePicker.requestCameraPermissionsAsync();
  if (status !== 'granted') {
    Alert.alert('Permission to access camera is required!');
    return;
  }

  const result = await ImagePicker.launchCameraAsync({
    allowsEditing: true,
    aspect: [1, 1],
    quality: 1,
  });

  if (!result.cancelled) {
    const userId = await AsyncStorage.getItem('userId');
    if (userId) {
      const fileName = `${userId}_profile.jpg`;
      const fileUri = `${FileSystem.documentDirectory}${fileName}`;

      await FileSystem.copyAsync({
        from: result.uri,
        to: fileUri,
      });

      try {
        const response = await API.get('/users');
        const users = response.data;
        const user = users.find((u) => u.id === userId);
        if (user) {
          user.profilePicture = fileName; // Zapisz pełną ścieżkę do zdjęcia
          await API.put(`/users/${userId}`, user);
          Alert.alert('Success', 'Profile picture updated successfully.');
        }
      } catch (error) {
        console.error('Error updating profile picture:', error);
        Alert.alert('Error', 'There was an error updating your profile picture. Please try again.');
      }
    }
  }
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