import { Tabs } from "expo-router";
import React from "react";
import { Home, BookOpen, Heart, BookOpenCheck, Shield } from "lucide-react-native";
import { colors } from "@/constants/colors";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        tabBarActiveTintColor: colors.primary,
        headerShown: true,
        tabBarStyle: {
          borderTopColor: colors.border,
        },
        headerStyle: {
          backgroundColor: colors.primary,
        },
        headerTintColor: '#fff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: "Sugar Types",
          tabBarIcon: ({ color }) => <Home color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="education"
        options={{
          title: "Learn",
          tabBarIcon: ({ color }) => <BookOpen color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="glossary"
        options={{
          title: "Glossary",
          tabBarIcon: ({ color }) => <BookOpenCheck color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="favorites"
        options={{
          title: "Favorites",
          tabBarIcon: ({ color }) => <Heart color={color} size={24} />,
        }}
      />
      <Tabs.Screen
        name="privacy"
        options={{
          title: "Privacy",
          tabBarIcon: ({ color }) => <Shield color={color} size={24} />,
        }}
      />
    </Tabs>
  );
}