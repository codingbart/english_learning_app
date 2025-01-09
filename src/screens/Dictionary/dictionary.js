import { StyleSheet, View, Text, TextInput } from 'react-native';
import Icon from 'react-native-ico-font-awesome'


export default function DictionaryScreen() {
  return (
    <View style={styles.container}>
    <View style={styles.inputContainer}>
      <Icon name="magnifying-glass" size={20} color="#777" style={styles.icon}/>
      <TextInput placeholder="Search a word" style={styles.input} />
    </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { 
    flex: 1,
    backgroundColor: '#fff', 
    justifyContent: 'top',
    alignItems: 'center',
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
    paddingHorizontal: 10,
    marginVertical: 10,
    width: '80%',
  },
  input: { 
    borderWidth: 1, 
    borderColor: '#ccc', 
    padding: 10, 
    width: '80%', 
    marginVertical: 10,
  },
  icon: {
    marginRight: 10,
  },
});
