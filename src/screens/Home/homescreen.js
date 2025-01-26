import React, {useState, useEffect} from 'react';
import { StyleSheet, View, Text, Dimensions, Alert, Image, ScrollView} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import Icon from 'react-native-vector-icons/MaterialCommunityIcons';
import API from '../../api/config';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useNavigation } from '@react-navigation/native';
import * as MediaLibrary from 'expo-media-library';
import * as FileSystem from 'expo-file-system';


function HomeScreen() {
  const navigation = useNavigation();
  const [userName, setUserName] = useState('');
  const [profilePicture, setProfilePicture] = useState(null);
  const [lastQuizScore, setLastQuizScore] = useState(null);
  const recentWords = ['Hello', 'World', 'React', 'Native', 'JavaScript'];


  useEffect(() => {
    const handleUserName = async () => {
      try {
        const userId = await AsyncStorage.getItem('userId');
        if (userId) {
          const response = await API.get('/users');
          const users = response.data;
          const user = users.find((u) => u.id === userId);
          if (user) {
            setUserName(user.name);
            if (user.profilePicture) {
              console.log('Loaded profile picture URI:', user.profilePicture);
              const resolvedUri = await resolveMediaLibraryUri(user.profilePicture);
              setProfilePicture(resolvedUri || require('../../../assets/default.jpg')); 
            }else{
              setProfilePicture(require('../../../assets/default.jpg'));
            }
          }
        }
      } catch (error) {
        console.error('User error:', error);
        Alert.alert('Błąd', 'Spróbuj ponownie.');
      }
    };

    const fetchLastQuizScore = async () => {
      try {
        const score = await AsyncStorage.getItem('lastQuizScore');
        if (score) {
          setLastQuizScore(JSON.parse(score));
        }else {
          setLastQuizScore(null);
        }
      } catch (error) {
        console.error('Error fetching last quiz score:', error);
      }
    };

    handleUserName();
    fetchLastQuizScore();

    const focusListener = navigation.addListener('focus', () => {
      fetchLastQuizScore();
      handleUserName();
    });

    return () => {
      focusListener();
    }
    
  }, []);

  const resolveMediaLibraryUri = async (uri) => {
    try {
      if (uri.startsWith('ph://')) {
        const assetInfo = await MediaLibrary.getAssetInfoAsync(uri);
        if (assetInfo && assetInfo.localUri) {
          return assetInfo.localUri; 
        } else {
          const fileUri = `${FileSystem.documentDirectory}profile_${Date.now()}.jpg`;
          const fileInfo = await FileSystem.getInfoAsync(fileUri); 
          if(!fileInfo.exists){
          await FileSystem.copyAsync({
            from: uri,
            to: fileUri,
          });
        }
          return fileUri;
        }
      } else {
        return uri; 
      }
    } catch (error) {
      console.log('Error resolving URI:', error);
      return null;
    }
  };
  


  const screenWidth = Dimensions.get('window').width;

  const renderWordItem = ({ item }) => (
    <View style={styles.carouselItem}>
      <Text style={styles.wordText}>{item}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <ScrollView>
      <View style={styles.card}>
      {profilePicture ? (
            <Image
              source={typeof profilePicture === 'string' ? { uri: profilePicture } : profilePicture}
              style={styles.profilePicture}
              onError={() => {
                console.error('Failed to load profile picture');
                setProfilePicture(require('../../../assets/default.jpg')); 
              }}
            />
          ) : (
            <Icon name="account-circle" size={80} color="#555" />
          )}
        <Text style={styles.title}>Welcome, {userName}!</Text>
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
        <Text style={styles.cardTitle}>Wynik ostatniego quizu</Text>
        {lastQuizScore ? (
          <Text style={styles.cardContent}>
            Prawidłowe odpowiedzi: {lastQuizScore.correctAnswers}{'\n'}
            Błędne odpowiedzi: {lastQuizScore.incorrectAnswers}
          </Text>
        ) : (
          <Text style={styles.cardContent}>Brak wyników</Text>
        )}
      </View>
      </ScrollView>
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
    padding: 44,
    marginVertical: 10,
    borderRadius: 10,
    elevation: 3,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    alignItems: 'center',
  },
  title: {
    fontSize: 25,
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
  cardTitle: {
    fontSize: 14,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  cardContent: {
    fontSize: 14,
  },
  profilePicture: {
    width: 120,
    height: 120,
    borderRadius: 40,
    marginVertical: 20,
  }
});

export default HomeScreen;