import { Image, StyleSheet } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { useNavigation } from 'expo-router';

export default function HomeScreen() {
  const navigation = useNavigation();

  const handleFetchInfo = () => {
    navigation.navigate('reviews' as never);
  };

  const handleNavigateToSell = () => {
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
    justifyContent: 'center', 
    gap: 8,
    marginVertical: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 8,
    alignItems: 'center', 
  },
  reactLogo: {
    height: 178,
    width: 290,
    alignSelf: 'center',
  },
  buttonContainer: {
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#FFBB33',
    padding: 10, 
    borderRadius: 5,
    alignItems: 'center',
    marginVertical: 5,
    width: '100%',
  },
});
