// app/goals/read.jsx
import React, { useState } from 'react';
import {
  View,
  Text,
  ScrollView,
  SafeAreaView,
  StyleSheet,
  Modal,
  TextInput,
  TouchableOpacity,
} from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useEntries } from '../../assets/contexts/EntriesContext';

const ReadScreen = () => {
  const { entries, updateEntry, deleteEntry } = useEntries();

  const [editingEntry, setEditingEntry] = useState(null);
  const [editedText, setEditedText] = useState('');

  const handleDelete = async (id) => {
    await deleteEntry(id);
  };

  const handleEdit = (entry) => {
    setEditingEntry(entry);
    // handle both string and object `text`
    setEditedText(typeof entry.text === 'string' ? entry.text : entry.text?.text || '');
  };

  const saveEdit = async () => {
    await updateEntry(editingEntry.id, editedText);
    setEditingEntry(null);
    setEditedText('');
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MOODSCAPE</Text>
      </View>

      <Text style={styles.greeting}>Your past reflections</Text>
      <Text style={styles.subheading}>Read what you’ve written so far.</Text>

      <ScrollView contentContainerStyle={styles.entriesContainer}>
        {entries.length === 0 ? (
          <Text
            style={{
              fontSize: 16,
              color: '#64748B',
              textAlign: 'center',
              marginTop: 20,
            }}
          >
            No entries yet. Your reflections will appear here.
          </Text>
        ) : (
          entries.map((item, index) => (
            <View key={item.id} style={styles.card}>
              <View style={styles.cardHeader}>
                <Text style={styles.entryNumber}>
                  {String(index + 1).padStart(2, '0')}
                </Text>
                <View style={styles.dateBadge}>
                  <Text style={styles.dateText}>
                    {item.createdAt?.toDate
                      ? item.createdAt.toDate().toLocaleDateString()
                      : ''}
                  </Text>
                </View>
              </View>

              {/* ✅ Safe rendering for string or object */}
              <Text style={styles.entryText}>
                {typeof item.text === 'string' ? item.text : item.text?.text}
              </Text>

              <View style={styles.actionRow}>
                <TouchableOpacity onPress={() => handleEdit(item)}>
                  <Ionicons name="create-outline" size={20} color="#166534" />
                </TouchableOpacity>
                <TouchableOpacity onPress={() => handleDelete(item.id)}>
                  <Ionicons name="trash-outline" size={20} color="#B91C1C" />
                </TouchableOpacity>
              </View>
            </View>
          ))
        )}
      </ScrollView>

      <Modal visible={!!editingEntry} transparent animationType="slide">
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>
            <Text style={styles.modalTitle}>Edit Entry</Text>
            <TextInput
              style={styles.input}
              value={editedText}
              onChangeText={setEditedText}
              multiline
            />
            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.saveBtn} onPress={saveEdit}>
                <Text style={styles.saveText}>Save</Text>
              </TouchableOpacity>
              <TouchableOpacity
                style={styles.cancelBtn}
                onPress={() => setEditingEntry(null)}
              >
                <Text style={styles.cancelText}>Cancel</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default ReadScreen;

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
  entriesContainer: {
    paddingBottom: 80,
  },
  card: {
    borderWidth: 2,
    borderColor: '#16A34A',
    borderRadius: 12,
    padding: 16,
    marginBottom: 16,
    backgroundColor: '#FEFEFA',
  },
  cardHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 8,
  },
  entryNumber: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#16A34A',
    marginRight: 8,
  },
  dateBadge: {
    backgroundColor: '#16A34A',
    borderRadius: 6,
    paddingVertical: 2,
    paddingHorizontal: 8,
  },
  dateText: {
    color: '#FFFFFF',
    fontSize: 14,
    fontWeight: 'bold',
  },
  entryText: {
    fontSize: 16,
    color: '#111827',
    marginBottom: 8,
  },
  actionRow: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 16,
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.4)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#FFFFFF',
    borderRadius: 12,
    padding: 20,
    width: '85%',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 12,
  },
  input: {
    borderWidth: 1,
    borderColor: '#16A34A',
    borderRadius: 8,
    padding: 10,
    minHeight: 80,
    textAlignVertical: 'top',
    marginBottom: 16,
  },
  modalButtons: {
    flexDirection: 'row',
    justifyContent: 'flex-end',
    gap: 12,
  },
  saveBtn: {
    backgroundColor: '#16A34A',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  saveText: {
    color: '#FFFFFF',
    fontWeight: 'bold',
  },
  cancelBtn: {
    backgroundColor: '#E5E7EB',
    paddingVertical: 6,
    paddingHorizontal: 14,
    borderRadius: 6,
  },
  cancelText: {
    color: '#111827',
  },
});
