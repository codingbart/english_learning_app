import React, {useState} from 'react';
import { StyleSheet, View, Text, TextInput, TouchableOpacity, Image, Alert } from 'react-native';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../api/config';

export default function RegisterScreen({navigation}){
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [passwordVisible, setPasswordVisible] = useState(false);
 
   const handleRegister =  () =>{
    if (!email || !password || !name) {
      Alert.alert('Wszystkie pola muszą być uzupełnione');
      return;
    }
    const newUser = {email, password, name};

    API.post('/users', newUser)
    .then(response =>{
      console.log('User registered:', response.data);
      Alert.alert('Rejestracja przebiegła pomyślnie');
      navigation.replace('Login');
    })
    .catch(error =>{
      console.log('Registration error:', error.message);
      Alert.alert('Błąd rejestracji. Spróbuj ponownie.');
    });

   };

   

   const handleLogin = () =>{
        navigation.replace('Login');
   };
  
  
   return (
    <View style={styles.container}>

      <View style={styles.imageContainer}>
        <Image source={require('../../../assets/langly.png')} style={styles.image} />
      </View>

      <Text style={styles.title}>Welcome to Langly</Text>
      <Text style={styles.subtitle}>Please register to your account to continue</Text>

      <View style={styles.inputContainer}>
        <Icon name="account-circle" size={20} color="#777" style={styles.icon} />
        <TextInput placeholder="Name" style={styles.input} value={name} onChangeText={setName} />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="email-outline" size={20} color="#777" style={styles.icon} />
        <TextInput placeholder="Email" style={styles.input} value={email} onChangeText={setEmail}  />
      </View>
      <View style={styles.inputContainer}>
        <Icon name="lock-outline" size={20} color="#777" style={styles.icon} />
        <TextInput placeholder="Password" style={styles.input} secureTextEntry={!passwordVisible} value={password} onChangeText={setPassword} />
        <TouchableOpacity onPress={()=>setPasswordVisible(!passwordVisible)}>
            <Icon name={passwordVisible ? 'eye-off': 'eye'} size={20} color="#777" style={styles.icon} />
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.loginButton} onPress={handleRegister}>
        <Text style={styles.loginText}>Register</Text>
      </TouchableOpacity>


      <TouchableOpacity onPress={handleLogin}>
        <Text style={styles.createAccount}>Already have an account? Sign in!</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
      // dark mode conflicts with backgroundColor
    // backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
  imageContainer: {
    marginBottom: 20,
  },
  image: {
    width: 200, 
    height: 200, 
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 5,
  },
  subtitle: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  icon: {
    marginRight: 10,
  },
  input: {
    flex: 1,
    height: 40,
  },
  loginButton: {
    backgroundColor: '#4285F4',
    paddingVertical: 12,
    borderRadius: 8,
    marginTop: 10,
    width: '80%',
    alignItems: 'center',
  },
  loginText: {
    color: '#fff',
    fontWeight: 'bold',
    fontSize: 16,
  },
  createAccount: {
    color: '#4285F4',
    marginTop: 10,
    fontSize: 14,
  },
});


