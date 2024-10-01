import { StyleSheet, TextInput, TouchableOpacity } from 'react-native';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';
import { useState } from 'react';

export default function LoginScreen() {
  const navigation = useNavigation();

  // State to hold user input
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleLogin = () => {
    // Logic to log in the user can be added here
    console.log('User logged in:', { email, password });
  };

  const handleRegisterRedirect = () => {
    // Navigate to register screen
    navigation.navigate('opret' as never); // Assume your registration screen is named 'createUser'
  };

  return (
    <ThemedView style={styles.container}>
      <ThemedText type="title">Log ind</ThemedText>
      
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

      <TouchableOpacity style={styles.button} onPress={handleLogin}>
        <ThemedText type="Button">Log ind</ThemedText>
      </TouchableOpacity>

      <TouchableOpacity onPress={handleRegisterRedirect}>
        <ThemedText type="default">Ny bruger? Opret dig her</ThemedText>
      </TouchableOpacity>
    </ThemedView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 30,
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
