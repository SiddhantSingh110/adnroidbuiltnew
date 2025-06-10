// app/+layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { Slot } from 'expo-router';

// Create a utility component for protected routes
function AuthWrapper() {
  const { isAuthenticated, loading } = useAuth();
  
  if (loading) {
    return <LoadingScreen />;
  }
  
  return <Slot />;
}

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
      <ActivityIndicator size="large" color="#1a66ff" />
    </View>
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <Stack
            screenOptions={{
              headerShown: false, // This will hide the header globally
              contentStyle: { backgroundColor: '#091429' },
              gestureEnabled: false, // Disable gestures at root level
              animation: 'fade',
            }}
          >
            <Stack.Screen name="index" options={{ headerShown: false }} />
            <Stack.Screen name="login" options={{ headerShown: false }} />
            <Stack.Screen name="register" options={{ headerShown: false }} />
            <Stack.Screen name="tabs" options={{ headerShown: false, gestureEnabled: false }} />
            
            {/* Add policies routes */}
            <Stack.Screen name="policies/index" options={{ headerShown: false }} />
            <Stack.Screen name="policies/terms" options={{ headerShown: false }} />
            <Stack.Screen name="policies/privacy" options={{ headerShown: false }} />
            <Stack.Screen name="policies/google-api" options={{ headerShown: false }} />
            <Stack.Screen name="policies/security" options={{ headerShown: false }} />
          </Stack>
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}