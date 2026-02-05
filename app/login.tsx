import { BorderRadius, FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import { useRouter } from 'expo-router';
import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import {
    Image,
    KeyboardAvoidingView,
    Platform,
    SafeAreaView,
    StyleSheet,
    Text,
    TextInput,
    TouchableOpacity,
    View
} from 'react-native';

export default function LoginScreen() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const { signIn } = useAuth();
    const router = useRouter();

    const handleLogin = () => {
        signIn(email, password);
    };

    return (
        <SafeAreaView style={styles.container}>
            <StatusBar style="dark" />
            <KeyboardAvoidingView
                behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
                style={styles.flex}
            >
                <View style={styles.content}>
                    {/* Header avec Logo */}
                    <View style={styles.header}>
                        <Image
                            source={require('@/assets/images/logo.png')}
                            style={styles.logo}
                            resizeMode="contain"
                        />
                    </View>

                    {/* Titre Principal */}
                    <Text style={styles.mainTitle}>Hâte de préparer{"\n"}ton voyage ?</Text>

                    <View style={styles.form}>
                        <Text style={styles.sectionTitle}>Connexion</Text>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Adresse e-mail</Text>
                            <TextInput
                                style={styles.input}
                                value={email}
                                onChangeText={setEmail}
                                autoCapitalize="none"
                                cursorColor={Palette.black}
                            />
                        </View>

                        <View style={styles.inputGroup}>
                            <Text style={styles.label}>Mot de passe</Text>
                            <TextInput
                                style={styles.input}
                                value={password}
                                onChangeText={setPassword}
                                secureTextEntry
                                cursorColor={Palette.black}
                            />
                        </View>

                        <TouchableOpacity style={styles.rememberMe}>
                            <View style={styles.checkboxCircle} />
                            <Text style={styles.rememberText}>Se souvenir de moi</Text>
                        </TouchableOpacity>

                        <TouchableOpacity style={styles.loginButton} onPress={handleLogin}>
                            <Text style={styles.loginButtonText}>Se connecter</Text>
                        </TouchableOpacity>

                        <View style={styles.linksContainer}>
                            <TouchableOpacity><Text style={styles.linkText}>Je n’ai pas de compte</Text></TouchableOpacity>
                            <TouchableOpacity><Text style={styles.linkText}>Mot de passe perdu</Text></TouchableOpacity>
                        </View>
                    </View>
                </View>
            </KeyboardAvoidingView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.white,
    },
    flex: {
        flex: 1,
    },
    content: {
        flex: 1,
        paddingHorizontal: Spacings.l, // 24
        paddingTop: Spacings.xxl,
    },
    header: {
        alignItems: 'center',
        marginBottom: Spacings.xl,
    },
    logo: {
        width: 180,
        height: 80,
    },
    mainTitle: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.title,
        color: Palette.black,
        lineHeight: 40,
        marginBottom: Spacings.xxl,
    },
    sectionTitle: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.subtitle,
        fontWeight: '600',
        color: Palette.black,
        marginBottom: Spacings.m,
    },
    form: {
        width: '100%',
    },
    inputGroup: {
        marginBottom: Spacings.m,
    },
    label: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        marginBottom: Spacings.s,
    },
    input: {
        backgroundColor: '#E5E4D7',
        borderRadius: BorderRadius.m,
        height: 50,
        paddingHorizontal: Spacings.m,
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
    },
    rememberMe: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacings.xl,
    },
    checkboxCircle: {
        width: 20,
        height: 20,
        borderRadius: 10,
        backgroundColor: '#E5E4D7',
        marginRight: Spacings.s,
    },
    rememberText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
    },
    loginButton: {
        backgroundColor: Palette.black,
        paddingVertical: Spacings.m,
        borderRadius: BorderRadius.m,
        alignItems: 'center',
        width: 200,
        alignSelf: 'center', // Center the button
        marginBottom: Spacings.l,
    },
    loginButtonText: {
        color: Palette.white,
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        fontWeight: '600',
    },
    linksContainer: {
        alignItems: 'center',
        gap: Spacings.s,
    },
    linkText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        textDecorationLine: 'underline',
    },
});