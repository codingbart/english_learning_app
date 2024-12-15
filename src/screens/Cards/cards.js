import { StyleSheet, View, Text, Button } from 'react-native';

export default function CardsScreen() {
  return (
    <View style={styles.container}>
      <Text>Word: Apple</Text>
      <Text>Translation: Jabłko</Text>
      <Button title="Mark as Known" onPress={() => alert('Marked as known')} />
      <Button title="Next Card" onPress={() => alert('Next card')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
