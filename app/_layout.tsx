import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { Stack } from "expo-router";
import * as SplashScreen from "expo-splash-screen";
import React, { useEffect } from "react";
import { GestureHandlerRootView } from "react-native-gesture-handler";
import { SugarContext } from "@/hooks/sugar-store";
import { PrivacyComplianceContext } from "@/hooks/privacy-compliance";
import { trpc, trpcClient } from "@/lib/trpc";

// Prevent the splash screen from auto-hiding before asset loading is complete.
SplashScreen.preventAutoHideAsync();

const queryClient = new QueryClient();

function RootLayoutNav() {
  return (
    <Stack screenOptions={{ 
      headerBackTitle: "Back",
      headerStyle: {
        backgroundColor: '#4CAF50',
      },
      headerTintColor: '#fff',
      headerTitleStyle: {
        fontWeight: 'bold',
      },
    }}>
      <Stack.Screen name="onboarding" options={{ headerShown: false }} />
      <Stack.Screen name="welcome" options={{ headerShown: true, title: "Definitions" }} />
      <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      <Stack.Screen 
        name="category/[id]" 
        options={{ 
          title: "Category",
          headerBackTitle: "Home",
        }} 
      />
      <Stack.Screen 
        name="sugar/[id]" 
        options={{ 
          title: "Sugar Details",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="compare" 
        options={{ 
          title: "Compare Sugars",
          headerBackTitle: "Back",
        }} 
      />
      <Stack.Screen 
        name="education" 
        options={{ 
          title: "Sugar Education",
          headerBackTitle: "Home",
        }} 
      />
    </Stack>
  );
}

export default function RootLayout() {
  useEffect(() => {
    SplashScreen.hideAsync();
  }, []);

  return (
    <trpc.Provider client={trpcClient} queryClient={queryClient}>
      <QueryClientProvider client={queryClient}>
        <PrivacyComplianceContext>
          <SugarContext>
            <GestureHandlerRootView style={{ flex: 1 }}>
              <RootLayoutNav />
            </GestureHandlerRootView>
          </SugarContext>
        </PrivacyComplianceContext>
      </QueryClientProvider>
    </trpc.Provider>
  );
}