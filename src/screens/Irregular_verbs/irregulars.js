import React, {useState, useEffect} from 'react';
import {StyleSheet, View, Text, Alert} from 'react-native';
import Carousel from 'react-native-snap-carousel';
import API from '../../api/config';
function IrregularsScreen() {
  
  const[irregularVerbs, setIrregularVerbs] = useState([]);

  useEffect(() => {
    const fetchIrregularVerbs = async () => {
      try {
        const response = await API.get('/irregularVerbs');
        setIrregularVerbs(response.data);
      } catch (error) {
        console.error('Error fetching irregular verbs:', error);
        Alert.alert('Nie udało się pobrać danych. Spróbuj ponownie.');
      }
    };

    fetchIrregularVerbs();
  }, []);

  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Czasownik: {item.baseForm}</Text>
      <Text style={styles.cardText}>Czas przeszły: {item.pastSimple}</Text>
      <Text style={styles.cardText}>Czasownik w III formie: {item.pastParticiple}</Text>
      <Text style={styles.cardText}>Tłumaczenie: {item.translation}</Text>
    </View>
  );

  return (
    <View style={styles.container}>
      <Carousel
        data={irregularVerbs}
        renderItem={renderItem}
        sliderWidth={350}
        itemWidth={300}
        layout="default"
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
      paddingTop: 200, 
    },
  card: {
    backgroundColor: 'lightblue',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: '#000',
    shadowOpacity: 0.1,
    shadowOffset: { width: 0, height: 3 },
    shadowRadius: 5,
    elevation: 3,
    width: 250,
    height: 200,
  },
  cardText: {
    fontSize: 16,
    marginBottom: 15,
    textAlign: 'center',
    fontWeight: 'bold',
  },
});

export default IrregularsScreen;
