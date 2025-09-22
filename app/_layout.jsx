import { Stack } from "expo-router";
import { AuthProvider } from "../authContext";
import { EntriesProvider } from "../assets/contexts/EntriesContext";

export default function Layout() {
  return (
    <AuthProvider>
      <EntriesProvider>
        <Stack screenOptions={{ headerShown: false }}>
          {/* Auth Screens */}
          <Stack.Screen name="index" />
          <Stack.Screen name="signup" />

          {/* Goals group */}
          <Stack.Screen name="goals" />
        </Stack>
      </EntriesProvider>
    </AuthProvider>
  );
}
