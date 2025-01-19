import React from 'react';
import { StyleSheet, View, Text, ScrollView } from 'react-native';

function StatsScreen() {
  return (
    <ScrollView style={styles.container} contentContainerStyle={styles.contentContainer}>
      <Text style={styles.header}>Statistics</Text>

      <View style={styles.statsContainer}>
        <Text style={styles.statText}>Quizzes Taken: 10</Text>
        <Text style={styles.statText}>Average Quiz Score: 85%</Text>
        <Text style={styles.statText}>Flashcards Learned: 20</Text>
        <Text style={styles.statText}>Flashcards Completed: 75%</Text>
      </View>

      <View style={styles.achievementsContainer}>
        <Text style={styles.achievementHeader}>Achievements:</Text>
        <Text style={styles.statText}>- Beginner (Completed 10 quizzes)</Text>
        <Text style={styles.statText}>- Flashcard Master (Learned 50 flashcards)</Text>
      </View>
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1, // Ensure it fills the available space
    // dark mode conflicts with backgroundColor
    // backgroundColor: '#f9f9f9',
  },
  contentContainer:{
    justifyContent: 'center',
    alignItems: 'center',
    padding: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 30,
    textAlign: 'center',
    color: '#fff',
    paddingVertical: 15,
    width: '100%',
    backgroundColor: '#448AFF', 
    borderRadius: 12, 
    justifyContent: 'center',
    alignItems: 'center',
  },
  statsContainer: {
    width: '80%',
    marginBottom: 30,
    justifyContent: 'center',
    alignItems: 'center',
  },
  statText: {
    fontSize: 18,
    color: '#fff',
    marginBottom: 12,
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#82b1ff',
    paddingVertical: 12,
    borderRadius: 10,
    marginVertical: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
  },
  achievementsContainer: {
    width: '80%',
    marginTop: 20,
    padding: 10,
    borderTopWidth: 1,
    borderTopColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  achievementHeader: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 15,
    color: '#fff',
    textAlign: 'center',
    width: '100%',
    backgroundColor: '#448AFF',
    paddingVertical: 12,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },
});

export default StatsScreen;