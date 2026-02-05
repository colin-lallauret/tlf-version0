import NativeMap from '@/components/NativeMap';
import { BorderRadius, FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

// Mock data extension for detail view
const USER_DETAILS: Record<string, any> = {
    '1': {
        firstName: 'Pierre',
        lastName: 'DESCHAMPS',
        location: 'Toulon',
        image: 'https://i.pravatar.cc/150?img=11',
        about: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a mauris at justo ultrices aliquam non in leo. Nulla blandit faucibus posuere. Integer pellentesque ac risus non commodo. Donec eu consequat nunc, ut finibus nunc.',
        recommendations: [
            { id: '101', name: 'Restaurant 1', image: 'https://picsum.photos/200/150?random=10' },
            { id: '102', name: 'Café 1', image: 'https://picsum.photos/200/150?random=11' },
            { id: '103', name: 'Restaurant 2', image: 'https://picsum.photos/200/150?random=12' },
        ]
    },
    '2': {
        firstName: 'Aurélie',
        lastName: 'LANGLOIS',
        location: 'Toulon',
        image: 'https://i.pravatar.cc/150?img=5',
        about: 'Exploratrice culinaire, toujours en quête de nouvelles expériences gustatives.',
        recommendations: [
            { id: '201', name: 'La Table Japonaise', image: 'https://picsum.photos/200/150?random=20' },
            { id: '202', name: 'Le Petit Café', image: 'https://picsum.photos/200/150?random=21' },
        ]
    }
};

// Fallback data
const DEFAULT_USER = {
    firstName: 'Utilisateur',
    lastName: 'Inconnu',
    location: 'Paris',
    image: 'https://i.pravatar.cc/150',
    about: 'Aucune description disponible pour cet utilisateur.',
    recommendations: []
};

export default function UserDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const user = USER_DETAILS[id as string] || { ...DEFAULT_USER };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Custom Back Button */}
                <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                    <Ionicons name="arrow-undo-outline" size={24} color="white" />
                </TouchableOpacity>

                {/* Profile Header */}
                <View style={styles.header}>
                    <Image source={{ uri: user.image }} style={styles.profileImage} />
                    <View style={styles.nameContainer}>
                        <Text style={styles.firstName}>{user.firstName}</Text>
                        <Text style={styles.lastName}>{user.lastName}</Text>
                    </View>
                </View>

                <View style={styles.infoContainer}>
                    {/* Location */}
                    <View style={styles.locationRow}>
                        <Ionicons name="location-sharp" size={24} color={Palette.black} />
                        <Text style={styles.locationText}>{user.location}</Text>
                    </View>

                    {/* About Section */}
                    <View style={styles.aboutSection}>
                        <View style={styles.aboutHeader}>
                            <Ionicons name="information-circle" size={24} color={Palette.black} />
                            <Text style={styles.aboutTitle}>À propos</Text>
                        </View>
                        <View style={styles.aboutContainer}>
                            <Text style={styles.aboutText}>{user.about}</Text>
                        </View>
                    </View>

                    {/* Recommendations */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Mes top recommandations</Text>
                        <ScrollView horizontal showsHorizontalScrollIndicator={false} contentContainerStyle={styles.recoList}>
                            {user.recommendations.map((item: any) => (
                                <View key={item.id} style={styles.recoCard}>
                                    <Image source={{ uri: item.image }} style={styles.recoImage} />
                                    <Text style={styles.recoName}>{item.name}</Text>
                                </View>
                            ))}
                        </ScrollView>
                    </View>

                    {/* Map Section */}
                    <View style={styles.section}>
                        <Text style={styles.sectionTitle}>Carte interactive</Text>
                        <View style={styles.mapContainer}>
                            <NativeMap location={null} />
                        </View>
                    </View>
                </View>

                <View style={{ height: 40 }} />
            </ScrollView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.white,
    },
    scrollContent: {
        paddingBottom: Spacings.xxl * 3,
    },
    header: {
        alignItems: 'center',
        marginTop: Spacings.l,
        marginBottom: Spacings.l,
    },
    backButton: {
        position: 'absolute',
        left: Spacings.l,
        top: 0,
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        backgroundColor: Palette.black,
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    profileImage: {
        width: 120,
        height: 120,
        borderRadius: 60, // Circle
        marginBottom: Spacings.m,
    },
    nameContainer: {
        flexDirection: 'row',
        gap: Spacings.xs,
        alignItems: 'baseline',
    },
    firstName: {
        fontFamily: 'Unbounded_400Regular',
        fontSize: 24, // Custom for header
        color: Palette.black,
    },
    lastName: {
        fontFamily: 'Unbounded_700Bold',
        fontSize: 24, // Custom for header
        color: Palette.black,
        textTransform: 'uppercase',
    },
    infoContainer: {
        paddingHorizontal: Spacings.l,
    },
    locationRow: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacings.s,
        marginBottom: Spacings.l,
    },
    locationText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
    },
    aboutSection: {
        marginBottom: Spacings.xl,
    },
    aboutHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        gap: Spacings.s,
        marginBottom: Spacings.s,
    },
    aboutTitle: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.subtitle,
        color: Palette.black,
    },
    aboutContainer: {
        borderRadius: BorderRadius.l,
        borderWidth: 1,
        borderColor: '#38BDF8', // Blue border
        padding: Spacings.m,
        backgroundColor: Palette.white,
    },
    aboutText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        lineHeight: 24,
    },
    section: {
        marginBottom: Spacings.xl,
    },
    sectionTitle: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.subtitle,
        color: Palette.black,
        marginBottom: Spacings.m,
    },
    recoList: {
        paddingRight: Spacings.l,
        gap: Spacings.m,
    },
    recoCard: {
        width: 160,
    },
    recoImage: {
        width: 160,
        height: 120,
        borderRadius: BorderRadius.l,
        marginBottom: Spacings.s,
    },
    recoName: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
    },
    mapContainer: {
        height: 250,
        borderRadius: BorderRadius.l,
        overflow: 'hidden',
        backgroundColor: '#e1e1e1',
    },
});
