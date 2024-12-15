import { StyleSheet, View, Text, Button } from 'react-native';

export default function SettingsScreen() {
  return (
    <View style={styles.container}>
      <Text>Settings</Text>
      <Button title="Change Name" onPress={() => alert('Change name clicked')} />
      <Button title="Toggle Dark Mode" onPress={() => alert('Dark mode toggled')} />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: 'center', alignItems: 'center' },
});
