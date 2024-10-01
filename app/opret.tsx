import { StyleSheet, View, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';
import { useState } from 'react';

export default function CreateUserScreen() {
  const navigation = useNavigation();

  // State to hold user input
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleCreateUser = () => {
    // Logic to create user can be added here
    console.log('User created:', { firstName, lastName, email, password });
  };

  const handleLoginRedirect = () => {
    // Navigate to login screen
    navigation.navigate('login' as never); // Assume your login screen is named 'login'
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Opret Bruger</ThemedText>
      
      <TextInput
        style={styles.input}
        placeholder="Navn"
        value={firstName}
        onChangeText={setFirstName}
      />
      <TextInput
        style={styles.input}
        placeholder="Efternavn"
        value={lastName}
        onChangeText={setLastName}
      />
      <TextInput
        style={styles.input}
        placeholder="Mail"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
      />
      <TextInput
        style={styles.input}
        placeholder="Kode"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <TextInput
        style={styles.input}
        placeholder="Gentag kode"
        value={confirmPassword}
        onChangeText={setConfirmPassword}
        secureTextEntry
      />

      <TouchableOpacity style={styles.button} onPress={handleCreateUser}>
        <ThemedText type="Button">Opret Bruger</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleLoginRedirect}>
        <ThemedText type="default">Allerede bruger? Log ind her</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    borderRadius: 5,
    paddingHorizontal: 10,
    width: '50%',
    margin: 20,
  },
  button: {
    backgroundColor: '#A1CEDC',
    padding: 10,
    borderRadius: 5,
    width: '50%', // Make it larger if needed
    alignItems: 'center',
    marginBottom: 10,
  },
});
