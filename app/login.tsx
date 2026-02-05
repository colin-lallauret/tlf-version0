import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Dimensions,
    KeyboardAvoidingView,
    Platform,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

const { width } = Dimensions.get('window');

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const { signIn } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        if (signIn(email, password)) {
            // Navigate is handled by the Auth Guard in _layout, but we can double check
        } else {
            setError('Identifiants invalides');
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
            style={styles.container}
        >
            <StatusBar style="light" />
            <View style={styles.contentContainer}>
                <View style={styles.headerContainer}>
                    <Text style={styles.appName}>Travel Local Food</Text>
                    <Text style={styles.title}>Bienvenue</Text>
                    <Text style={styles.subtitle}>Connectez-vous pour continuer</Text>
                </View>

                <View style={styles.formContainer}>
                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Email</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="admin@tlf.com"
                            placeholderTextColor="#666"
                            value={email}
                            onChangeText={setEmail}
                            autoCapitalize="none"
                            keyboardType="email-address"
                        />
                    </View>

                    <View style={styles.inputGroup}>
                        <Text style={styles.label}>Mot de passe</Text>
                        <TextInput
                            style={styles.input}
                            placeholder="•••••••"
                            placeholderTextColor="#666"
                            value={password}
                            onChangeText={setPassword}
                            secureTextEntry
                        />
                    </View>

                    {error ? <Text style={styles.errorText}>{error}</Text> : null}

                    <TouchableOpacity style={styles.button} onPress={handleLogin}>
                        <Text style={styles.buttonText}>Se connecter</Text>
                    </TouchableOpacity>
                </View>
            </View>
        </KeyboardAvoidingView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#0F172A', // Dark Slate Blue
        justifyContent: 'center',
        alignItems: 'center',
    },
    contentContainer: {
        width: '100%',
        maxWidth: 400,
        padding: 24,
        alignItems: 'center',
    },
    headerContainer: {
        alignItems: 'center',
        marginBottom: 40,
    },
    appName: {
        color: '#38BDF8', // Light Blue
        fontSize: 18,
        fontWeight: '600',
        marginBottom: 8,
        letterSpacing: 1,
    },
    title: {
        fontSize: 32,
        fontWeight: 'bold',
        color: '#FFFFFF',
        marginBottom: 8,
    },
    subtitle: {
        fontSize: 16,
        color: '#94A3B8', // Slate 400
    },
    formContainer: {
        width: '100%',
        backgroundColor: 'rgba(30, 41, 59, 0.5)', // Slate 800 with opacity
        padding: 24,
        borderRadius: 24,
        borderWidth: 1,
        borderColor: 'rgba(255, 255, 255, 0.1)',
    },
    inputGroup: {
        marginBottom: 20,
    },
    label: {
        color: '#E2E8F0', // Slate 200
        marginBottom: 8,
        fontSize: 14,
        fontWeight: '500',
    },
    input: {
        backgroundColor: '#1E293B', // Slate 800
        borderRadius: 12,
        padding: 16,
        color: '#FFFFFF',
        borderWidth: 1,
        borderColor: '#334155', // Slate 700
        fontSize: 16,
    },
    button: {
        backgroundColor: '#38BDF8', // Sky 400
        paddingVertical: 16,
        borderRadius: 12,
        marginTop: 12,
        alignItems: 'center',
        shadowColor: '#38BDF8',
        shadowOffset: {
            width: 0,
            height: 4,
        },
        shadowOpacity: 0.3,
        shadowRadius: 8,
        elevation: 4,
    },
    buttonText: {
        color: '#0F172A',
        fontSize: 16,
        fontWeight: 'bold',
    },
    errorText: {
        color: '#F87171', // Red 400
        marginBottom: 16,
        textAlign: 'center',
    },
});
