import { Tabs } from 'expo-router'
import { Ionicons } from "@expo/vector-icons"

export default function GoalsLayout() {

  return (
      <Tabs
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: 'black',
          tabBarInactiveTintColor: 'grey',
        }}>
        <Tabs.Screen
          name="index"
          options={{
            title: 'Home',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'home' : 'home-outline'}
                color="black"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Write',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'create' : 'create-outline'}
                color="black"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="read"
          options={{
            title: 'Entries',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'book' : 'book-outline'}
                color="black"
              />
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            tabBarIcon: ({ focused }) => (
              <Ionicons
                size={24}
                name={focused ? 'person' : 'person-outline'}
                color="black"
              />
            ),
          }}
        />
      </Tabs>
  )
}
