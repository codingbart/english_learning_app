import React from 'react';
import { StyleSheet, View, Text, TouchableOpacity } from 'react-native';
import Carousel from 'react-native-snap-carousel';

const irregularVerbs = [
  { base: 'Go', past: 'Went', pastParticiple: 'Gone', translation: 'Iść' },
  { base: 'Be', past: 'Was/Were', pastParticiple: 'Been', translation: 'Być' },
  { base: 'Have', past: 'Had', pastParticiple: 'Had', translation: 'Mieć' },
  { base: 'Eat', past: 'Ate', pastParticiple: 'Eaten', translation: 'Jeść' },
  { base: 'Take', past: 'Took', pastParticiple: 'Taken', translation: 'Brać' },
];

export default function IrregularsScreen() {
  const renderItem = ({ item }) => (
    <View style={styles.card}>
      <Text style={styles.cardText}>Czasownik: {item.base}</Text>
      <Text style={styles.cardText}>Czas przeszły: {item.past}</Text>
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
        paddingTop: 200, // Dodać przestrzeń na górze ekranu, aby nie przykrywać nagłówka statusu
      },
  card: {
    backgroundColor: '#fff',
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
