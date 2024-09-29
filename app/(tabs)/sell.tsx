import React, { useState, useEffect } from 'react';
import { StyleSheet, View, TextInput, Button, Alert, ScrollView, Image, FlatList, Text } from 'react-native';
import { Picker } from '@react-native-picker/picker';
import { ThemedText } from '@/components/ThemedText';
import { ThemedView } from '@/components/ThemedView';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { launchImageLibrary, ImagePickerResponse } from 'react-native-image-picker';

interface Book {
  university: string;
  fieldOfStudy: string;
  bookTitle: string;
  year: string;
  publisher: string; 
  price: string;
  imageUri?: string;
}

const BrowseScreen = () => {
  const [university, setUniversity] = useState('');
  const [fieldOfStudy, setFieldOfStudy] = useState('');
  const [bookTitle, setBookTitle] = useState('');
  const [year, setYear] = useState('');
  const [publisher, setPublisher] = useState('');
  const [price, setPrice] = useState('');
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
    if (bookTitle && university && fieldOfStudy && year && publisher && price) {
      const newBook: Book = {
        university,
        fieldOfStudy,
        bookTitle,
        year,
        publisher,
        price,
        imageUri,
      };

      const updatedBooks = [...books, newBook];
      setBooks(updatedBooks);

      try {
        await AsyncStorage.setItem('books', JSON.stringify(updatedBooks));
        Alert.alert('Bogen er blevet uploadet!', `Titel: ${bookTitle}`);
      } catch (error) {
        console.error("Fejl ved gemme bogen", error);
        Alert.alert('Fejl', 'Kunne ikke gemme bogen.');
      }


      setUniversity('');
      setFieldOfStudy('');
      setBookTitle('');
      setYear('');
      setPublisher('');
      setPrice('');
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
    launchImageLibrary({ mediaType: 'photo', quality: 1 }, (response: ImagePickerResponse) => {
      console.log('Image Picker Response:', response); 
      if (response.didCancel) {
        console.log('User cancelled image picker');
      } else if (response.assets && response.assets.length > 0) {
        setImageUri(response.assets[0].uri);
      } else {
        console.error('ImagePicker Error: ', response);
      }
    });
  };
  

  return (
    <ThemedView style={styles.container}>
      <View style={styles.headerContainer}>
        <Image
          source={require('@/assets/images/bog.png')}
          style={styles.logo}
        />
        <ThemedText type="title" style={styles.headerText}>BOOKSWAP</ThemedText>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContainer}>
        <ThemedText type="title" style={[styles.title]}>Sælg din bog</ThemedText>

        <Picker
          selectedValue={university}
          onValueChange={(itemValue: string) => setUniversity(itemValue)}
          style={styles.picker}
        >
          <Picker.Item label="Vælg Universitet" value="" />
          <Picker.Item label="Copenhagen Business School" value="Copenhagen Business School" />
          <Picker.Item label="Københavns Universitet" value="Københavns Universitet" />
          <Picker.Item label="Roskilde Universitet" value="Roskilde Universitet" />
          <Picker.Item label="Carlsberg Campus" value="Carlsberg Campus" />
          <Picker.Item label="Aalborg Universitet" value="Aalborg Universitet" />
          <Picker.Item label="NEXT" value="NEXT" />
        </Picker>

        <TextInput
          style={styles.input}
          placeholder="Retning"
          value={fieldOfStudy}
          onChangeText={setFieldOfStudy}
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
      </ScrollView>

      <ThemedText type="title" style={styles.sectionTitle}>Mine Bøger</ThemedText>
      <FlatList
        data={books}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.bookItem}>
            <Text style={styles.bookTitle}>{item.bookTitle}</Text>
            <Text style={styles.bookPublisher}>Forlag: {item.publisher}</Text>
            {item.imageUri && <Image source={{ uri: item.imageUri }} style={styles.bookImage} />}
            <Button title="Slet" onPress={() => deleteBook(item)} color="#FF3B30" />
          </View>
        )}
      />
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
    paddingBottom: 16,
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
    paddingHorizontal: 8,
  },
  imagePreview: {
    width: 100,
    height: 300,
    marginVertical: 10,
  },
  bookImage: {
    width: 50,
    height: 75,
    marginVertical: 10,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginVertical: 16,
  },
  bookItem: {
    padding: 10,
    borderBottomColor: 'gray',
    borderBottomWidth: 1,
  },
  bookTitle: {
    fontSize: 18,
  },
  bookPublisher: {
    fontSize: 14,
    color: 'gray',
  },
});

export default BrowseScreen;
