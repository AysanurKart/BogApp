import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleFetchInfo = () => {
    // Naviger til reviews skærm
    navigation.navigate('reviews' as never);
  };

  const handleNavigateToSell = () => {
    // Naviger til sell skærm
    navigation.navigate('sell' as never);
  };

  return (
    <ParallaxScrollView
      headerBackgroundColor={{ light: '#FFBB33', dark: '#1D3D47' }}
      headerImage={
        <Image
          source={require('@/assets/images/bog.png')}
          style={styles.reactLogo}
        />
      }
    >
      <ThemedView style={styles.titleContainer}>
        <ThemedText type="title">BookSwap</ThemedText>
      </ThemedView>
      <ThemedView style={styles.stepContainer}>
        <ThemedText type="subtitle">Del og opdag brugte bøger</ThemedText>
        <ThemedText>Find din næste yndlingsbog blandt vores udvalg</ThemedText>
      </ThemedView>

      <ThemedView style={styles.buttonContainer}>
        <TouchableOpacity style={styles.button} onPress={handleFetchInfo}>
          <ThemedText type="default">Bog anmeldelser</ThemedText>
        </TouchableOpacity>
        
        {/* Ny knap til at navigere til sell.tsx */}
        <TouchableOpacity style={styles.button} onPress={handleNavigateToSell}>
          <ThemedText type="default">Sælg din bog</ThemedText>
        </TouchableOpacity>
      </ThemedView>
    </ParallaxScrollView>
  );
}

const styles = StyleSheet.create({
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center', // Center title
    gap: 8,
    marginVertical: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: 'center', // Center text content
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center', // Center the logo horizontally
    marginVertical: 20, // Add some space above and below the logo
  },
  buttonContainer: {
    flexDirection: 'column', // Stack buttons vertically
    justifyContent: 'center', // Center buttons horizontally
    alignItems: 'center', // Center buttons vertically
    marginVertical: 20,
  },
  button: { // Button styles
    backgroundColor: '#FFBB33', // Background color
    padding: 10, // Adjust padding as necessary
    borderRadius: 5, // Rounded corners
    alignItems: 'center', // Center text inside button
    marginVertical: 5, // Add vertical margin between buttons
    width: '100%', // Width of the button
  },
});
