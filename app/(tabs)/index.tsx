import { Image, StyleSheet, TouchableOpacity, View, FlatList } from 'react-native';
import ParallaxScrollView from '@/components/ParallaxScrollView';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import { useNavigation } from 'expo-router';

const categories = [
  'Romantik',
  'Studiebøger',
  'Fantasy',
  'Krimi',
  'Thriller',
  'Matematik',
  'Børnebøger',
  // Flere kategorier kan tilføjes her
];

// Liste over baggrundsfarver
const categoryColors = [
  '#FFB6C1', // Romantik
  '#ADD8E6', // Studiebøger
  '#90EE90', // Fantasy
  '#FFD700', // Krimi
  '#FF4500', // Thriller
  '#FF8C00', // Matematik
  '#9370DB', // Børnebøger
];

export default function HomeScreen() {
  const navigation = useNavigation();

  const renderCategoryItem = ({ item, index }: { item: string; index: number }) => (
    <View style={[styles.categoryItem, { backgroundColor: categoryColors[index % categoryColors.length] }]}>
      <ThemedText type="default">{item}</ThemedText>
    </View>
  );

  return (
    <View style={styles.container}>
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
          <ThemedText type="title">FlipShelf</ThemedText>
        </ThemedView>
        <ThemedView style={styles.stepContainer}>
          <ThemedText type="subtitle">Del og opdag brugte bøger</ThemedText>
          <ThemedText>Find din næste yndlingsbog blandt vores udvalg</ThemedText>
        </ThemedView>

        <ThemedView style={styles.buttonContainer}>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('reviews' as never)}>
            <ThemedText type="default">Bog anmeldelser</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('sell' as never)}>
            <ThemedText type="default">Sælg din bog</ThemedText>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => navigation.navigate('opret' as never)}>
            <ThemedText type="default">Opret bruger</ThemedText>
          </TouchableOpacity>
        </ThemedView>

        <ThemedView style={styles.categoryContainer}>
          <ThemedText type="subtitle">Vælg din kategori</ThemedText>
          <FlatList
            data={categories}
            renderItem={renderCategoryItem}
            keyExtractor={(item) => item}
            horizontal
            showsHorizontalScrollIndicator={false}
          />
        </ThemedView>
      </ParallaxScrollView>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FFBB33',
  },
  titleContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    gap: 8,
    marginVertical: 20,
  },
  stepContainer: {
    gap: 8,
    marginBottom: 50,
    alignItems: 'center',
  },
  reactLogo: {
    height: 300,
    width: 300,
    alignSelf: 'center',
    justifyContent: 'center',
  },
  buttonContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  button: {
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 15,
    marginVertical: 10,
    width: '80%',
    alignItems: 'center',
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
  categoryContainer: {
    marginVertical: 20,
    alignItems: 'center',
    padding: 20,
    width:'100%',
  },
  categoryItem: {
    borderRadius: 10,
    padding: 15,
    marginHorizontal: 10,
    elevation: 5,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.2,
    shadowRadius: 3,
  },
});
