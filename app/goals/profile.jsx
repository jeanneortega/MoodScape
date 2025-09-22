// app/goals/profile.jsx
import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { auth, db } from "../../firebaseConfig"; // adjust path if needed
import { doc, getDoc, updateDoc } from "firebase/firestore";
import { signOut } from "firebase/auth";
import { useRouter } from "expo-router";

export default function ProfileScreen() {
  const [userData, setUserData] = useState(null);
  const [bio, setBio] = useState("");
  const [editing, setEditing] = useState(false);
  const router = useRouter();

  useEffect(() => {
    const fetchUserData = async () => {
      const user = auth.currentUser;
      if (!user) return;

      const docRef = doc(db, "users", user.uid);
      const docSnap = await getDoc(docRef);

      if (docSnap.exists()) {
        setUserData(docSnap.data());
        setBio(docSnap.data().bio || "Selfcare isn't selfish, it's necessary.");
      }
    };

    fetchUserData();
  }, []);

  const handleSaveBio = async () => {
    if (!auth.currentUser) return;
    try {
      const docRef = doc(db, "users", auth.currentUser.uid);
      await updateDoc(docRef, { bio });
      setEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update bio.");
    }
  };

  const handleLogout = async () => {
    try {
      await signOut(auth);
      router.replace("/"); // go back to login
    } catch (error) {
      console.error(error);
      alert("Error logging out.");
    }
  };

  return (
    <View style={styles.container}>
      {/* MoodScape title */}
      <Text style={styles.title}>MOODSCAPE</Text>

      {/* Profile row */}
      <View style={styles.profileRow}>
        <View style={{ flex: 1 }}>
          <Text style={styles.name}>{userData?.username}</Text>

          <View style={styles.bioRow}>
            {editing ? (
              <TextInput
                style={styles.bioInput}
                value={bio}
                onChangeText={setBio}
                autoFocus
                multiline
              />
            ) : (
              <Text style={styles.subtitle}>{bio}</Text>
            )}

            <TouchableOpacity
              onPress={editing ? handleSaveBio : () => setEditing(true)}
            >
              <Ionicons
                name={editing ? "checkmark" : "create-outline"}
                size={18}
                color="#14532D"
                style={{ marginLeft: 6 }}
              />
            </TouchableOpacity>
          </View>
        </View>

        {/* Profile placeholder */}
        <View style={styles.avatar}>
          <Ionicons name="person-outline" size={36} color="#14532D" />
        </View>
      </View>

      {/* Separator */}
      <View style={styles.separator} />

      {/* Logout button bottom left */}
      <TouchableOpacity style={styles.logoutBtn} onPress={handleLogout}>
        <Ionicons name="log-out-outline" size={20} color="#14532D" />
        <Text style={styles.logoutText}>LOG OUT</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FAF9F6",
    padding: 24,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#14532D",
    marginBottom: 32,
    textTransform: "uppercase",
    marginTop: 24,
  },
  profileRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  name: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#14532D",
    marginBottom: 4,
  },
  subtitle: {
    fontSize: 14,
    color: "#64748B",
    flex: 1,
  },
  bioRow: {
    flexDirection: "row",
    alignItems: "center",
  },
  bioInput: {
    flex: 1,
    borderBottomWidth: 1,
    borderColor: "#16A34A",
    fontSize: 14,
    color: "#111827",
    paddingVertical: 2,
  },
  avatar: {
    width: 64,
    height: 64,
    borderWidth: 2,
    borderColor: "#14532D",
    borderRadius: 12,
    alignItems: "center",
    justifyContent: "center",
    marginLeft: 16,
  },
  separator: {
    height: 1,
    backgroundColor: "#14532D",
    marginVertical: 24,
  },
  logoutBtn: {
    flexDirection: "row",
    alignItems: "center",
    marginTop: "auto",
  },
  logoutText: {
    fontSize: 14,
    color: "#64748B",
    marginLeft: 6,
    fontWeight: "600",
  },
});
