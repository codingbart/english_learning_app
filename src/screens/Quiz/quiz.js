import { StyleSheet, View, Text, Button } from 'react-native';

export default function QuizScreen() {
  return (
    <View style={styles.container}>
      <Text>Quiz Screen</Text>
      <Text>Translate the word: "Apple"</Text>
      <Button title="Option 1" onPress={() => alert('Wrong!')} />
      <Button title="Option 2" onPress={() => alert('Correct!')} />
      <Button title="Option 3" onPress={() => alert('Wrong!')} />
      <Button title="Option 4" onPress={() => alert('Wrong!')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
