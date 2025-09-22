import { View, Text, StyleSheet, SafeAreaView, ScrollView, TouchableOpacity, Modal, Pressable } from 'react-native';
import { FontAwesome } from '@expo/vector-icons';
import { useState } from 'react';

const quotes = [
  {
    id: 1,
    text: "Life is like riding a bicycle. To keep your balance, you must keep moving. There will be times when you feel overwhelmed, and you may stumble or fall. But what truly matters is that you get up, learn from your mistakes, and continue moving forward. Every challenge you encounter is a lesson in resilience, and every success is a reward for persistence. In the grand tapestry of life, it is the small, steady efforts that shape your destiny.",
    author: "Albert Einstein"
  },
  {
    id: 2,
    text: "You may not control all the events that happen to you, but you can decide not to be reduced by them. In the face of adversity, it is your strength of character and the choices you make that define who you are. Embrace your uniqueness, stand tall, and allow your courage to guide you through uncertainty. Life is a continuous journey of self-discovery, and the trials you face are simply opportunities to rise higher and shine brighter.",
    author: "Maya Angelou"
  },
  {
    id: 3,
    text: "Success is not final, failure is not fatal: it is the courage to continue that counts. When confronted with obstacles, setbacks, and moments of doubt, do not allow yourself to be paralyzed by fear. Each failure carries with it the seeds of growth, and each success is a stepping stone to greater achievements. Remember that perseverance and tenacity, even in the smallest actions, ultimately pave the path toward lasting fulfillment and accomplishment.",
    author: "Winston Churchill"
  },
  {
    id: 4,
    text: "To be yourself in a world that is constantly trying to make you something else is the greatest accomplishment. Society will present countless pressures, distractions, and expectations, but your authenticity is your greatest strength. Trust your instincts, cultivate your passions, and live according to your own values. By doing so, you inspire others to embrace their own uniqueness, and in that, you create ripples of positive change that extend far beyond your immediate surroundings.",
    author: "Ralph Waldo Emerson"
  },
  {
    id: 5,
    text: "Optimism is the faith that leads to achievement. Nothing can be done without hope and confidence. Life will present challenges that seem insurmountable, but it is through the lens of optimism that we discover possibility where others see impossibility. Even in darkness, there is light waiting to be found. Believe in yourself, trust the journey, and let your perseverance illuminate the path forward, because hope, once kindled, can move mountains and transform lives.",
    author: "Helen Keller"
  },
];

const Home = () => {
  const [selectedQuote, setSelectedQuote] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const openModal = (quote) => {
    setSelectedQuote(quote);
    setModalVisible(true);
  };

  const closeModal = () => {
    setModalVisible(false);
    setSelectedQuote(null);
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>MOODSCAPE</Text>
      </View>

      <View style={styles.content}>
        <Text style={styles.greeting}>Welcome!</Text>
        <Text style={styles.subheading}>Boost your mood with these quotes.</Text>
      </View>

      <ScrollView contentContainerStyle={styles.quoteList}>
        {quotes.map((quote) => (
          <View key={quote.id} style={styles.card}>
            <View style={styles.cardHeader}>
              <Text style={styles.cardTitle}>Quote {quote.id}</Text>
              <FontAwesome name="bookmark" size={20} color="#16A34A" />
            </View>
            <Text style={styles.cardAuthor}>by {quote.author}</Text>
            <Text style={styles.cardText} numberOfLines={3} ellipsizeMode="tail">
              {quote.text}
            </Text>

            <TouchableOpacity style={styles.button} onPress={() => openModal(quote)}>
              <Text style={styles.buttonText}>Read more</Text>
            </TouchableOpacity>
          </View>
        ))}
      </ScrollView>

      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="fade"
        onRequestClose={closeModal}
      >
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <ScrollView contentContainerStyle={{ paddingBottom: 20 }}>
              <Text style={styles.modalAuthor}>by {selectedQuote?.author}</Text>
              <Text style={[styles.modalText, { textAlign: 'justify' }]}>{selectedQuote?.text}</Text>
            </ScrollView>
            <Pressable style={styles.closeButton} onPress={closeModal}>
              <Text style={styles.closeButtonText}>Close</Text>
            </Pressable>
          </View>
        </View>
      </Modal>
    </SafeAreaView>
  );
};

export default Home;

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: '#FAF9F6', paddingLeft: 24, paddingRight: 24, paddingTop: 24, },
  header: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 24, marginTop: 24, },
  title: { fontSize: 28, fontWeight: 'bold', color: '#14532D' },
  content: { marginBottom: 16 },
  greeting: { fontSize: 20, fontWeight: 'bold', color: '#16A34A', marginBottom: 4 },
  subheading: { fontSize: 16, color: '#64748B' },
  quoteList: { paddingBottom: 16 },
  card: { borderWidth: 2, borderColor: '#16A34A', borderRadius: 12, padding: 16, marginBottom: 16, backgroundColor: '#FFFFFF' },
  cardHeader: { flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 },
  cardTitle: { fontSize: 18, fontWeight: 'bold', color: '#16A34A' },
  cardAuthor: { fontSize: 14, color: '#14532D', marginBottom: 8 },
  cardText: { fontSize: 14, color: '#64748B', marginBottom: 12, textAlign: 'justify' },
  button: { backgroundColor: '#16A34A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, alignSelf: 'flex-start' },
  buttonText: { color: '#FFFFFF', fontWeight: 'bold' },
  modalOverlay: { flex: 1, backgroundColor: 'rgba(0,0,0,0.5)', justifyContent: 'center', alignItems: 'center' },
  modalContent: { backgroundColor: '#FFF', borderRadius: 12, padding: 24, marginHorizontal: 16, maxHeight: '80%', width: '90%' },
  modalAuthor: { fontSize: 16, fontWeight: 'bold', color: '#16A34A', marginBottom: 12 },
  modalText: { fontSize: 14, color: '#64748B' },
  closeButton: { backgroundColor: '#16A34A', paddingVertical: 8, paddingHorizontal: 16, borderRadius: 6, alignSelf: 'flex-end', marginTop: 12 },
  closeButtonText: { color: '#FFF', fontWeight: 'bold' },
});
