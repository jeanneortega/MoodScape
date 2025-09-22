import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  SafeAreaView,
  StyleSheet,
  Alert,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEntries } from '../../assets/contexts/EntriesContext';

const CreateScreen = () => {
  const [entry, setEntry] = useState('');
  const { addEntry } = useEntries();

  const handleSubmit = async () => {
    if (entry.trim().length === 0) return;

    try {
      // our context addEntry expects just text
      await addEntry(entry);
      setEntry('');
      Alert.alert('Success', 'Your entry has been saved.');
    } catch (err) {
      Alert.alert('Error', err.message);
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MOODSCAPE</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>Hello!</Text>
        <Text style={styles.subheading}>Tell us how you feel today.</Text>

        <TextInput
          style={styles.input}
          placeholder="Write your thoughts here..."
          value={entry}
          onChangeText={setEntry}
          multiline
        />

        <TouchableOpacity style={styles.button} onPress={handleSubmit}>
          <Text style={styles.buttonText}>SUBMIT</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.quoteContainer}>
        <Text style={styles.quote}>
          Small steps toward self-awareness make a big difference.
        </Text>
      </View>
    </SafeAreaView>
  );
};

export default CreateScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    paddingTop: 24,
    paddingLeft: 24,
    paddingRight: 24,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 24,
    marginTop: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#14532D',
  },
  content: {
    flex: 1,
  },
  greeting: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#16A34A',
    marginBottom: 4,
  },
  subheading: {
    fontSize: 16,
    color: '#64748B',
    marginBottom: 16,
  },
  input: {
    borderWidth: 2,
    borderColor: '#16A34A',
    borderRadius: 12,
    padding: 16,
    minHeight: 200,
    textAlignVertical: 'top',
    backgroundColor: '#FEFEFA',
    fontSize: 16,
    color: '#111827',
  },
  button: {
    backgroundColor: '#16A34A',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 12,
    alignSelf: 'flex-start',
    marginTop: 16,
  },
  buttonText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
    fontSize: 16,
  },
  quoteContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'flex-start',
    paddingVertical: 16,
    borderTopWidth: 1,
    borderColor: '#E5E7EB',
  },
  quote: {
    marginLeft: 8,
    fontSize: 16,
    color: '#64748B',
    flexShrink: 1,
  },
});
