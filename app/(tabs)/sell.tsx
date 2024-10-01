import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, ScrollView, FlatList, Image } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import * as ImagePicker from 'expo-image-picker';


interface Book {
  category: string;
  subcategory: string;
  bookTitle: string;
  year: string;
  publisher: string; 
  price: string;
  location: string;
  postalCode: string; // New field for postal code
  city: string; // New field for city
  author: string;
  imageUri?: string;
}

const BrowseScreen = () => {
  const [category, setCategory] = useState('');
  const [subcategory, setSubCategory] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
  const [location, setLocation] = useState('');
  const [postalCode, setPostalCode] = useState(''); // New state for postal code
  const [city, setCity] = useState(''); // New state for city
  const [author, setAuthor] = useState('');
  const [imageUri, setImageUri] = useState<string | undefined>(undefined);
  const [books, setBooks] = useState<Book[]>([]);

  useEffect(() => {
    const loadBooks = async () => {
      try {
        const storedBooks = await AsyncStorage.getItem('books');
        if (storedBooks) {
          setBooks(JSON.parse(storedBooks));
        } else {
          console.log("Ingen bøger fundet i AsyncStorage.");
        }
      } catch (error) {
        console.error("Fejl ved indlæsning af bøger:", error);
      }
    };

    loadBooks();
  }, []);

  const handleUpload = async () => {
    if (bookTitle && category && subcategory && year && publisher && price && author && postalCode && city) { // Ensure new fields are filled
      const newBook: Book = {
        category,
        subcategory,
        bookTitle,
        year,
        publisher,
        price,
        location,
        postalCode, // Include postal code
        city, // Include city
        author,
        imageUri,
      };

      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);

      try {
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        Alert.alert('Bogen er blevet uploadet!', `Titel: ${bookTitle}, Forfatter: ${author}`); 
      } catch (error) {
        console.error("Fejl ved gemme bogen", error);
        Alert.alert('Fejl', 'Kunne ikke gemme bogen.');
      }

      // Reset fields
      setCategory('');
      setSubCategory('');
      setBookTitle('');
      setYear('');
      setPublisher('');
      setPrice('');
      setLocation('');
      setPostalCode(''); // Reset postal code
      setCity(''); // Reset city
      setAuthor('');
      setImageUri(undefined);
    } else {
      Alert.alert('Fejl', 'Udfyld venligst alle felter.');
    }
  };

  const deleteBook = async (bookToDelete: Book) => {
    try {
      const updatedBooks = books.filter(book => book.bookTitle !== bookToDelete.bookTitle);
      setBooks(updatedBooks);
      await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
      Alert.alert('Bogen er blevet slettet!', `Titel: ${bookToDelete.bookTitle}`);
    } catch (error) {
      console.error("Fejl ved sletning af bog:", error);
      Alert.alert('Fejl', 'Kunne ikke slette bogen.');
    }
  };

  const selectImage = () => {
    Alert.alert(
      'Vælg billede',
      'Hvordan vil du vælge billedet?',
      [
        {
          text: 'Kamera',
          onPress: openCamera,
        },
        {
          text: 'Bibliotek',
          onPress: openImageLibrary,
        },
        {
          text: 'Annuller',
          style: 'cancel',
        },
      ]
    );
  };

  const openCamera = async () => {
    const permissionResult = await ImagePicker.requestCameraPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Adgang til kameraet er påkrævet!');
      return;
    }

    const result = await ImagePicker.launchCameraAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Get the URI from the first asset
    }
  };

  const openImageLibrary = async () => {
    const permissionResult = await ImagePicker.requestMediaLibraryPermissionsAsync();
    if (permissionResult.granted === false) {
      alert('Adgang til billedbiblioteket er påkrævet!');
      return;
    }

    const result = await ImagePicker.launchImageLibraryAsync({
      mediaTypes: ImagePicker.MediaTypeOptions.Images,
      quality: 1,
    });

    if (!result.canceled && result.assets && result.assets.length > 0) {
      setImageUri(result.assets[0].uri); // Get the URI from the first asset
    }
  };

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/bog.png')}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.headerText}>FlipShelf</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={styles.title}>Sælg din bog</ThemedText>

        <Picker
          selectedValue={category}
          onValueChange={(itemValue: string) => setCategory(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Vælg kategori" value="" />
          <Picker.Item label="Studiebøger" value="Studiebøger" />
          <Picker.Item label="Fantasy" value="Fantasy" />
          <Picker.Item label="Romatisk" value="Romantisk" />
          <Picker.Item label="Thriller" value="Thriller" />
          <Picker.Item label="Scifi" value="Scifi" />
          <Picker.Item label="Romcom" value="Romcom" />
          <Picker.Item label="Krimi" value="Krimi" />
          <Picker.Item label="Biografier" value="Biografier" />
          <Picker.Item label="Sundhed" value="Sundhed" />
          <Picker.Item label="Mad og Drikke" value="Mad og Drikke" />
          <Picker.Item label="Økonomi" value="Økonomi" />
          <Picker.Item label="Erhverv og ledelse" value="Erhverv og ledelse" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Studieretning"
          value={subcategory}
          onChangeText={setSubCategory}
        />
        <TextInput
          style={styles.input}
          placeholder="Overskrift på bog"
          value={bookTitle}
          onChangeText={setBookTitle}
        />
        <TextInput
          style={styles.input}
          placeholder="Årstal"
          value={year}
          onChangeText={setYear}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Forlag"
          value={publisher} 
          onChangeText={setPublisher}
        />
        <TextInput
          style={styles.input}
          placeholder="Forfatter"
          value={author}
          onChangeText={setAuthor}
        />
        <TextInput
          style={styles.input}
          placeholder="Pris"
          value={price}
          onChangeText={setPrice}
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="Postnummer"
          value={postalCode}
          onChangeText={setPostalCode} // Update postal code
          keyboardType="numeric"
        />
        <TextInput
          style={styles.input}
          placeholder="By"
          value={city}
          onChangeText={setCity} // Update city
        />
        
        <Button title="Vælg billede" onPress={selectImage} color="#007AFF" />
        
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}

        <Button title="Upload Bog" onPress={handleUpload} color="#007AFF" />
        
        <ThemedText type="title" style={styles.title}>Dine bøger</ThemedText>
        <FlatList
          data={books}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              {item.imageUri && (
                <Image source={{ uri: item.imageUri }} style={styles.bookImage} />
              )}
              <View style={styles.bookDescription}>
                <ThemedText style={styles.bookTitle}>{item.bookTitle}</ThemedText>
                <ThemedText>Forfatter: {item.author}</ThemedText>
                <ThemedText>År: {item.year}</ThemedText>
                <ThemedText>Forlag: {item.publisher}</ThemedText>
                <ThemedText>Pris: {item.price} DKK</ThemedText>
                <ThemedText>Postnummer: {item.postalCode}</ThemedText>
                <ThemedText>By: {item.city}</ThemedText>
                <Button title="Slet" onPress={() => deleteBook(item)} color="red" />
              </View>
            </View>
          )}
          keyExtractor={(item, index) => index.toString()}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 20,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 10,
  },
  headerText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  scrollContainer: {
    paddingBottom: 20,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  picker: {
    marginBottom: 10,
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 4,
    padding: 10,
    marginBottom: 10,
  },
  imagePreview: {
    width: '100%',
    height: 150,
    marginVertical: 10,
    resizeMode: 'cover',
  },
  bookItem: {
    flexDirection: 'column', // Stack elements vertically
    alignItems: 'flex-start', // Align content to the left
    paddingVertical: 10,
    borderBottomWidth: 1,
    borderBottomColor: '#ccc',
  },
  bookImage: {
    width: 200, // Make the image wide
    height: 300, // Give the image a fixed height
    marginBottom: 10, // Space between image and text
  },
  bookDescription: {
    paddingHorizontal: 10, // Padding for the description
  },
  bookTitle: {
    fontWeight: 'bold',
    fontSize: 18,
    marginBottom: 5,
  },
});

export default BrowseScreen;
