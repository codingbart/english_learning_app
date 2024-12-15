import { StyleSheet, View, Text } from 'react-native';

export default function StatsScreen() {
  return (
    <View style={styles.container}>
      <Text>Statistics</Text>
      <Text>Quizzes Taken: 10</Text>
      <Text>Flashcards Learned: 20</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
