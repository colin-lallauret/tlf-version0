import { BorderRadius, FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import { useAuth } from '@/context/AuthContext';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ProfileScreen() {
    const { signOut } = useAuth();

    return (
        <SafeAreaView style={styles.container}>
            <ScrollView contentContainerStyle={styles.scrollContent}>
                <Text style={styles.headerTitle}>Mon compte</Text>

                <View style={styles.profileHeader}>
                    <Image
                        source={{ uri: 'https://i.pravatar.cc/150?img=5' }} // Using a female avatar similar to mockup
                        style={styles.avatar}
                    />
                    <View style={styles.profileInfo}>
                        <Text style={styles.firstName}>Margot</Text>
                        <Text style={styles.lastName}>FERNANDEZ</Text>
                    </View>
                </View>

                <View style={styles.gridContainer}>
                    <TouchableOpacity style={styles.gridCard}>
                        <Text style={styles.cardText}>Mes informations</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridCard}>
                        <Text style={styles.cardText}>Gestion de mon abonnements</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridCard}>
                        <Text style={styles.cardText}>Confidentialité</Text>
                    </TouchableOpacity>

                    <TouchableOpacity style={styles.gridCard}>
                        <Text style={styles.cardText}>FAQ</Text>
                    </TouchableOpacity>
                </View>

                <TouchableOpacity
                    onPress={signOut}
                    style={styles.logoutButton}
                >
                    <Text style={styles.logoutText}>Se déconnecter</Text>
                </TouchableOpacity>
            </ScrollView>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.white,
    },
    scrollContent: {
        padding: Spacings.l,
        flexGrow: 1,
        paddingBottom: Spacings.xxl * 3,
    },
    headerTitle: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.title,
        color: Palette.black,
        marginBottom: Spacings.xxl,
        marginTop: Spacings.s,
    },
    profileHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacings.xxl, // 50 -> 40 (Spacings.xxl) close enough
        paddingHorizontal: Spacings.s, // 10 -> 8
    },
    avatar: {
        width: 100,
        height: 100,
        borderRadius: 50, // Circle
        marginRight: Spacings.l,
        backgroundColor: '#eee',
    },
    profileInfo: {
        justifyContent: 'center',
    },
    firstName: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.subtitle,
        color: Palette.black,
        marginBottom: Spacings.xs,
    },
    lastName: {
        fontFamily: FontsFamilies.bodyBold,
        fontSize: FontSizes.subtitle,
        color: Palette.black,
        textTransform: 'uppercase',
    },
    gridContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        justifyContent: 'space-between',
        gap: Spacings.m,
        marginBottom: Spacings.xxl,
    },
    gridCard: {
        width: '47%',
        aspectRatio: 1,
        backgroundColor: '#FFE4C4', // Peach
        borderRadius: BorderRadius.m,
        justifyContent: 'center',
        alignItems: 'center',
        padding: Spacings.m,
    },
    cardText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        textAlign: 'center',
        lineHeight: 22,
    },
    logoutButton: {
        backgroundColor: Palette.black,
        paddingVertical: Spacings.m,
        alignItems: 'center',
        borderRadius: BorderRadius.m,
        // Removed border color logic if not needed, simpler black button
        marginTop: 'auto',
        width: 180,
        alignSelf: 'center',
    },
    logoutText: {
        fontFamily: FontsFamilies.body,
        color: Palette.white,
        fontSize: FontSizes.body,
        fontWeight: '600',
    },
});
