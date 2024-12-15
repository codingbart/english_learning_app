import { StyleSheet, View, Text, TextInput } from 'react-native';

export default function DictionaryScreen() {
  return (
    <View style={styles.container}>
      <Text>Search for a word</Text>
      <TextInput placeholder="Type a word" style={styles.input} />
      <Text>Results will appear here.</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
  input: { borderWidth: 1, borderColor: '#ccc', padding: 10, width: '80%', marginVertical: 10 },
});
