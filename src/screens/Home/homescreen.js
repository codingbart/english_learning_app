import React, {useState} from 'react';
import { StyleSheet, View, Text, Dimensions, Alert } from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useEffect } from 'react';

function HomeScreen() {
  const [userName, setUserName] = useState('');
  const lastAchievement = '10 Flashcards Completed';
  const recentWords = ['Hello', 'World', 'React', 'Native', 'JavaScript'];
  const completionPercentage = 80;

  useEffect(() => {
    const handleUserName = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if(userId){
          const response = await API.get('/users');
          const users = response.data;
          const user = users.find((u) => u.id === userId); 
          if (user) {
            setUserName(user.name);
          }
        }
      } catch (error) {
        console.error('User error:', error);
        Alert.alert('Błąd', 'Spróbuj ponownie.');
      }
    };

    handleUserName();
  }, []);


  const screenWidth = Dimensions.get('window').width;

  const renderWordItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.wordText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>

      <View style={styles.card}>
        <Icon name="account-circle" size={50} color="#555" />
        <Text style={styles.title}>Welcome, {userName}!</Text>
        <Text style={styles.subtitle}>Last Achievement: {lastAchievement}</Text>
      </View>

      <View style={styles.card}>
        <Icon name="book-open-variant" size={30} color="#4285F4" />
        <Text style={styles.sectionTitle}>Recent Words Learned</Text>
        <Carousel
          data={recentWords}
          renderItem={renderWordItem}
          sliderWidth={screenWidth}
          itemWidth={screenWidth * 0.6} 
          inactiveSlideScale={0.8}
          inactiveSlideOpacity={0.6}
        />
      </View>

      <View style={styles.card}>
        <Icon name="progress-check" size={30} color="#34A853" />
        <Text style={styles.sectionTitle}>Flashcards Completion</Text>
        <Text style={styles.percentage}>{completionPercentage}% Completed</Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    // dark mode conflicts with backgroundColor
    // backgroundColor: '#FFFBF0',
    padding: 10,
  },
  card: {
    backgroundColor: '#fff',
    padding: 20,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 10,
  },
  subtitle: {
    fontSize: 14,
    color: '#555',
    marginTop: 5,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginVertical: 10,
  },
  carouselItem: {
    backgroundColor: '#4285F4',
    borderRadius: 10,
    paddingVertical: 20,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
  },
  wordText: {
    fontSize: 18,
    color: '#fff',
    fontWeight: 'bold',
  },
  percentage: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#34A853',
    marginTop: 5,
  },
});

export default HomeScreen;