// app/_layout.jsx
import React from 'react';
import { Stack } from 'expo-router';
import { AuthProvider, useAuth } from '../hooks/useAuth';
import { Provider as PaperProvider } from 'react-native-paper';
import { View, ActivityIndicator } from 'react-native';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { useRouter, useSegments } from 'expo-router';

function LoadingScreen() {
  return (
    <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#091429' }}>
      <ActivityIndicator size="large" color="#38BFA7" />
    </View>
  );
}

// Auth navigation logic
function AuthNavigator() {
  const { isAuthenticated, loading } = useAuth();
  const router = useRouter();
  const segments = useSegments();

  React.useEffect(() => {
    if (loading) return; // Wait for auth to load

    const inAuthGroup = segments[0] === 'tabs';

    if (!isAuthenticated && inAuthGroup) {
      // User is not authenticated but trying to access protected routes
      router.replace('/');
    } else if (isAuthenticated && !inAuthGroup) {
      // User is authenticated but not in protected area - redirect to tabs
      router.replace('/tabs/home');
    }
  }, [isAuthenticated, loading, segments]);

  if (loading) {
    return <LoadingScreen />;
  }

  return (
    <Stack
      screenOptions={{
        headerShown: false,
        contentStyle: { backgroundColor: '#091429' },
        gestureEnabled: false,
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
  );
}

export default function RootLayout() {
  return (
    <AuthProvider>
      <SafeAreaProvider>
        <PaperProvider>
          <AuthNavigator />
        </PaperProvider>
      </SafeAreaProvider>
    </AuthProvider>
  );
}