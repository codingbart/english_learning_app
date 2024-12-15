import { StyleSheet, View, Text } from 'react-native';

export default function IrregularsScreen() {
  return (
    <View style={styles.container}>
      <Text>Irregular Verbs</Text>
      <Text>Go - Went - Gone</Text>
      <Text>Be - Was/Were - Been</Text>
      <Text>Have - Had - Had</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
