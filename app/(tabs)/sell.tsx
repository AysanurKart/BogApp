import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, ScrollView, Image, FlatList, Text } from 'react-native';
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
    if (bookTitle && category && subcategory && year && publisher && price && author) { 
      const newBook: Book = {
        category,
        subcategory,
        bookTitle,
        year,
        publisher,
        price,
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

      setCategory('');
      setSubCategory('');
      setBookTitle('');
      setYear('');
      setPublisher('');
      setPrice('');
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

        <Button title="Vælg billede" onPress={selectImage} color="#007AFF" />
        
        {imageUri && (
          <Image source={{ uri: imageUri }} style={styles.imagePreview} />
        )}

        <Button title="Upload" onPress={handleUpload} color="#007AFF" />

        <ThemedText type="title" style={styles.sectionTitle}>Mine Bøger</ThemedText>
        <FlatList
          data={books}
          keyExtractor={(item, index) => index.toString()}
          renderItem={({ item }) => (
            <View style={styles.bookItem}>
              <Text style={styles.bookTitle}>{item.bookTitle}</Text>
              <Text style={styles.bookPublisher}>Forlag: {item.publisher}</Text>
              <Text style={styles.bookAuthor}>Forfatter: {item.author}</Text> 
              <Text style={styles.price}>Pris: {item.price} Kr</Text> 
              {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.bookImage} />}
              <Button title="Slet" onPress={() => deleteBook(item)} color="#FF3B30" />
            </View>
          )}
        />
      </ScrollView>
    </ThemedView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
  },
  headerContainer: {
    alignItems: 'center',
    marginBottom: 16,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 8,
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
    marginBottom: 16,
  },
  picker: {
    height: 50,
    width: '100%',
    marginBottom: 16,
  },
  input: {
    height: 40,
    borderColor: 'gray',
    borderWidth: 1,
    marginBottom: 16,
    paddingLeft: 8,
  },
  imagePreview: {
    width: '100%',
    height: 200,
    marginVertical: 16,
    resizeMode: 'contain',
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 20,
  },
  bookItem: {
    borderColor: 'gray',
    borderWidth: 1,
    borderRadius: 8,
    padding: 10,
    marginVertical: 8,
  },
  bookTitle: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  bookPublisher: {
    fontSize: 14,
  },
  bookAuthor: {
    fontSize: 14,
  },
  price: {
    fontSize: 14,
    fontWeight: 'bold',
  },
  bookImage: {
    width: '100%',
    height: 100,
    marginVertical: 8,
    resizeMode: 'contain',
  },
});

export default BrowseScreen;
