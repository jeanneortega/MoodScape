import { useRouter, Link } from 'expo-router';
import React, { useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  TextInput,
  TouchableOpacity,
  Alert,
} from 'react-native';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { auth } from '../firebaseConfig.js';

export default function Home() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleLogin = () => {
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        console.log('Signed in:', userCredential.user.email);
        router.push('./goals'); 
      })
      .catch((err) => {
        Alert.alert('Login error', err.message);
      });
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>MOODSCAPE</Text>

      <View style={styles.taglineBox}>
        <Text style={styles.tagline}>
          a personal space for self-discovery, reflection,
          and growth.
        </Text>
      </View>

      <TextInput
        placeholder="Enter Email or Username"
        placeholderTextColor="#64748B"
        style={styles.input}
        value={email}
        onChangeText={setEmail}
      />
      <TextInput
        placeholder="Enter Password"
        placeholderTextColor="#64748B"
        secureTextEntry
        style={styles.input}
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity style={styles.loginBtn} onPress={handleLogin}>
        <Text style={styles.loginText}>LOG IN</Text>
      </TouchableOpacity>

      <Text style={styles.signupText}>
        No account?{' '}
        <Link href="/signup" style={styles.signupLink}>
          Click here to sign up.
        </Link>
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#FAF9F6',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  title: {
    fontSize: 36,
    fontWeight: 'bold',
    color: '#14532D',
    marginBottom: 20,
  },
  taglineBox: {
    backgroundColor: '#14532D',
    borderRadius: 12,
    paddingVertical: 16,
    paddingHorizontal: 24,
    marginBottom: 30,
  },
  tagline: {
    color: '#FFFFFF',
    fontSize: 14,
    textAlign: 'center',
    lineHeight: 20,
  },
  input: {
    width: '100%',
    borderWidth: 2,
    borderColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 12,
    paddingHorizontal: 12,
    fontSize: 14,
    color: '#111827',
    marginBottom: 12,
    backgroundColor: '#FEFEFA',
  },
  loginBtn: {
    width: '100%',
    backgroundColor: '#16A34A',
    borderRadius: 8,
    paddingVertical: 14,
    alignItems: 'center',
    marginBottom: 12,
  },
  loginText: {
    color: '#FFFFFF',
    fontSize: 16,
    fontWeight: 'bold',
  },
  signupText: {
    fontSize: 14,
    color: '#111827',
  },
  signupLink: {
    color: '#16A34A',
    fontWeight: 'bold',
  },
});
