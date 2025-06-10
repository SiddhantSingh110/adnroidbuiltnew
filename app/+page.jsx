import React, { useEffect, useRef } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Dimensions, Image, Animated } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { useRouter } from 'expo-router';
import { LinearGradient } from 'expo-linear-gradient';
import { SafeAreaView } from 'react-native-safe-area-context';
import { useFocusEffect } from '@react-navigation/native';

const { width, height } = Dimensions.get('window');

export default function HomeScreen() {
  const router = useRouter();
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const slideAnim = useRef(new Animated.Value(50)).current;

  const startAnimation = () => {
    // Reset animation values
    fadeAnim.setValue(0);
    slideAnim.setValue(50);
    
    // Start animations
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 600,
        useNativeDriver: true,
      })
    ]).start();
  };

  // Use useFocusEffect instead of useEffect to handle screen focus
  useFocusEffect(
    React.useCallback(() => {
      startAnimation();
    }, [])
  );

  return (
    <>
      <StatusBar style="light" translucent backgroundColor="transparent" />
      <SafeAreaView style={styles.safeArea} edges={['top']}>
        <LinearGradient
          colors={['#091429', '#0F2248', '#162F65']}
          style={styles.background}
        />
        
        <View style={styles.overlay}>
          <View style={styles.logoContainer}>
            <Animated.View 
              style={[
                styles.logoWrapper,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }]
                }
              ]}
            >
              <Image 
                source={require('../assets/images/health_logo_splash.png')}
                style={styles.logo}
                resizeMode="contain"
              />
            </Animated.View>
            
            <Animated.View 
              style={[
                styles.textContainer,
                {
                  opacity: fadeAnim,
                  transform: [{ translateY: slideAnim }],
                }
              ]}
            >
              <Text style={styles.tagline}>
                AI-Powered Care. Personalized for You.
              </Text>
              <Text style={styles.description}>
                Advanced AI-based health reporting tool
              </Text>
            </Animated.View>
          </View>

          <Animated.View 
            style={[
              styles.buttonContainer,
              {
                opacity: fadeAnim,
                transform: [{ translateY: slideAnim }]
              }
            ]}
          >
            <LinearGradient
              colors={['#2C7BE5', '#38BFA7']}
              start={{ x: 0, y: 0 }}
              end={{ x: 1, y: 0 }}
              style={styles.buttonGradient}
            >
              <TouchableOpacity
                style={styles.button}
                onPress={() => router.push('/login')}
                activeOpacity={0.8}
              >
                <Text style={styles.buttonText}>Sign In</Text>
              </TouchableOpacity>
            </LinearGradient>

            <TouchableOpacity
              style={styles.secondaryButton}
              onPress={() => router.push('/register')}
              activeOpacity={0.7}
            >
              <Text style={styles.secondaryButtonText}>Create Account</Text>
            </TouchableOpacity>
          </Animated.View>

          <Animated.View 
            style={[
              styles.footerContainer,
              { opacity: fadeAnim }
            ]}
          >
            <Text style={styles.footerText}>
              Securely manage your health reports with AI-powered insights
            </Text>
          </Animated.View>
        </View>
      </SafeAreaView>
    </>
  );
}

const styles = StyleSheet.create({
  safeArea: {
    flex: 1,
    backgroundColor: '#091429',
  },
  background: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
  },
  overlay: {
    flex: 1,
    padding: 24,
    justifyContent: 'space-between',
  },
  logoContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingTop: height * 0.05,
  },
  logoWrapper: {
    alignItems: 'center',
    justifyContent: 'center',
    // Fixed dimensions to prevent layout shift
    width: width * 0.9,
    height: height * 0.25, // Reduced from 0.3 to 0.25
    marginBottom: 20,
  },
  logo: {
    width: '100%',
    height: '100%',
    maxWidth: width * 0.8, // Slightly smaller max width
    maxHeight: height * 0.2, // Controlled max height
  },
  textContainer: {
    alignItems: 'center',
    paddingHorizontal: 20,
  },
  tagline: {
    fontSize: 28,
    fontWeight: '700',
    color: '#fff',
    textAlign: 'center',
    letterSpacing: 0.5,
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#a0c0ff',
    textAlign: 'center',
    letterSpacing: 0.3,
  },
  buttonContainer: {
    width: '100%',
    paddingHorizontal: 8,
    paddingBottom: 20,
  },
  buttonGradient: {
    borderRadius: 50,
    overflow: 'hidden',
    marginBottom: 15,
    elevation: 5,
    shadowColor: '#2C7BE5',
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.3,
    shadowRadius: 5,
  },
  button: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '700',
    letterSpacing: 0.5,
  },
  secondaryButton: {
    paddingVertical: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderWidth: 1,
    borderColor: 'rgba(255, 255, 255, 0.4)',
    borderRadius: 50,
    marginTop: 5,
  },
  secondaryButtonText: {
    color: '#fff',
    fontSize: 18,
    fontWeight: '600',
  },
  footerContainer: {
    paddingBottom: 10,
  },
  footerText: {
    color: '#eee',
    textAlign: 'center',
    fontSize: 14,
    letterSpacing: 0.2,
  },
});