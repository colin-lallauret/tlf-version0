import NativeMap from '@/components/NativeMap';
import { BorderRadius, FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import { Stack, useLocalSearchParams, useRouter } from 'expo-router';
import React from 'react';
import { Image, ScrollView, StyleSheet, Text, TouchableOpacity, View } from 'react-native';

const RESTAURANT_DETAILS: Record<string, any> = {
    '1': {
        name: 'Restaurant 1',
        image: 'https://picsum.photos/400/250?random=1',
        tags: ['Traditionnel', 'Restaurant'],
        address: '3 Rue Louis Jourdan,\n83000 Toulon,\nFrance',
        recommender: {
            firstName: 'Pierre',
            lastName: 'DESCHAMPS',
            avatar: 'https://i.pravatar.cc/150?img=11',
            note: 3.5,
            message: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed a mauris at justo ultrices aliquam non in leo.'
        }
    },
    '2': {
        name: 'Chez Mario',
        image: 'https://picsum.photos/400/250?random=2',
        tags: ['Italien', 'Pizzeria'],
        address: '8 Boulevard Italien,\n75009 Paris',
        recommender: {
            firstName: 'Marie',
            lastName: 'CURIE',
            avatar: 'https://i.pravatar.cc/150?img=5',
            note: 4,
            message: 'Les meilleures pizzas de Paris, pâte fine et croustillante. Service un peu long mais ça vaut le coup.'
        }
    }
};

const DEFAULT_RESTAURANT = {
    name: 'Restaurant 1',
    image: 'https://picsum.photos/400/250',
    tags: ['Traditionnel', 'Restaurant'],
    address: 'Adresse non disponible',
    recommender: {
        firstName: 'Pierre',
        lastName: 'DESCHAMPS',
        avatar: 'https://i.pravatar.cc/150',
        note: 3.5,
        message: 'Lorem ipsum dolor sit amet.'
    }
};

export default function RestaurantDetailScreen() {
    const { id } = useLocalSearchParams();
    const router = useRouter();
    const resto = RESTAURANT_DETAILS[id as string] || { ...DEFAULT_RESTAURANT };

    const renderStars = (note: number) => {
        const stars = [];
        for (let i = 1; i <= 5; i++) {
            let iconName: keyof typeof Ionicons.glyphMap = 'star-outline';
            if (i <= Math.floor(note)) {
                iconName = 'star';
            } else if (i === Math.ceil(note) && !Number.isInteger(note)) {
                iconName = 'star-half';
            }

            stars.push(
                <Ionicons
                    key={i}
                    name={iconName}
                    size={24}
                    color={Palette.black}
                    style={{ marginRight: 4 }}
                />
            );
        }
        return <View style={styles.starsRow}>{stars}</View>;
    };

    return (
        <View style={styles.container}>
            <Stack.Screen options={{ headerShown: false }} />

            <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
                {/* Header Image with Back Button */}
                <View style={styles.imageContainer}>
                    <Image source={{ uri: resto.image }} style={styles.headerImage} resizeMode="cover" />

                    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
                        <Ionicons name="arrow-undo-outline" size={24} color="white" />
                    </TouchableOpacity>

                    {/* Dots Overlay (Mockup mostly) */}
                    <View style={styles.dotsContainer}>
                        <View style={[styles.dot, styles.activeDot]} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                        <View style={styles.dot} />
                    </View>
                </View>

                <View style={styles.content}>
                    {/* Title */}
                    <Text style={styles.restaurantName}>{resto.name}</Text>

                    {/* Recommender Info */}
                    <View style={styles.recommenderSection}>
                        <View style={styles.avatarRow}>
                            <Image source={{ uri: resto.recommender.avatar }} style={styles.avatar} />
                            <Text style={styles.firstName}>{resto.recommender.firstName} </Text>
                            <Text style={styles.lastName}>{resto.recommender.lastName}</Text>
                        </View>
                        <View style={styles.tagsRow}>
                            {resto.tags.map((tag: string, index: number) => (
                                <View key={index} style={styles.tag}>
                                    <Text style={styles.tagText}>{tag}</Text>
                                </View>
                            ))}
                        </View>
                    </View>

                    {/* Commentaire / Avis */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="information-circle" size={24} color={Palette.black} />
                            <Text style={styles.sectionTitle}>L’avis de {resto.recommender.firstName} {resto.recommender.lastName}</Text>
                        </View>
                        <Text style={styles.reviewText}>{resto.recommender.message}</Text>
                        {renderStars(resto.recommender.note)}

                        <TouchableOpacity style={styles.messageButton}>
                            <Text style={styles.messageButtonText}>Envoyer un message</Text>
                        </TouchableOpacity>
                    </View>

                    {/* Adresse */}
                    <View style={styles.section}>
                        <View style={styles.sectionHeader}>
                            <Ionicons name="navigate-circle" size={24} color={Palette.black} />
                            <Text style={styles.sectionTitle}>L’adresse</Text>
                        </View>
                        <Text style={styles.addressText}>{resto.address}</Text>
                    </View>

                    {/* Carte */}
                    <View style={styles.mapSection}>
                        <Text style={[styles.sectionTitle, { marginBottom: Spacings.s, marginLeft: Spacings.l }]}>Carte interactive</Text>
                        <View style={styles.mapContainer}>
                            <NativeMap location={null} />
                        </View>
                    </View>

                </View>
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
    imageContainer: {
        position: 'relative',
        height: 300,
        width: '100%',
    },
    headerImage: {
        width: '100%',
        height: '100%',
    },
    backButton: {
        position: 'absolute',
        top: 60,
        left: Spacings.l,
        width: 40,
        height: 40,
        borderRadius: BorderRadius.full,
        backgroundColor: Palette.black, // or white usually for contrast on image
        justifyContent: 'center',
        alignItems: 'center',
        zIndex: 10,
    },
    dotsContainer: {
        position: 'absolute',
        bottom: 20,
        flexDirection: 'row',
        width: '100%',
        justifyContent: 'center',
        gap: 8,
    },
    dot: {
        width: 8,
        height: 8,
        borderRadius: 4,
        backgroundColor: 'rgba(255,255,255,0.5)',
    },
    activeDot: {
        backgroundColor: Palette.orangeDark,
        width: 8,
        height: 8,
    },
    content: {
        flex: 1,
    },
    restaurantName: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.title,
        color: Palette.black,
        textAlign: 'center',
        marginVertical: Spacings.l,
    },
    recommenderSection: {
        paddingHorizontal: Spacings.l,
        marginBottom: Spacings.l,
    },
    avatarRow: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacings.m,
    },
    avatar: {
        width: 50,
        height: 50,
        borderRadius: 25,
        marginRight: Spacings.s,
    },
    firstName: {
        fontFamily: 'Unbounded_400Regular',
        fontSize: FontSizes.body,
        color: Palette.black,
    },
    lastName: {
        fontFamily: 'Unbounded_700Bold',
        fontSize: FontSizes.body,
        color: Palette.black,
        textTransform: 'uppercase',
    },
    tagsRow: {
        flexDirection: 'row',
        gap: Spacings.s,
    },
    tag: {
        backgroundColor: Palette.orangeLight,
        paddingHorizontal: Spacings.m,
        paddingVertical: 6,
        borderRadius: BorderRadius.s,
    },
    tagText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.caption,
        color: Palette.black,
    },
    section: {
        paddingHorizontal: Spacings.l,
        marginBottom: Spacings.l,
    },
    sectionHeader: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: Spacings.s,
        gap: Spacings.s,
    },
    sectionTitle: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.subtitle,
        color: Palette.black,
    },
    reviewText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        marginBottom: Spacings.m,
        lineHeight: 24,
    },
    starsRow: {
        flexDirection: 'row',
        marginBottom: Spacings.l,
    },
    messageButton: {
        backgroundColor: Palette.green,
        borderRadius: BorderRadius.s,
        paddingVertical: 14,
        alignItems: 'center',
    },
    messageButtonText: {
        fontFamily: FontsFamilies.body,
        color: Palette.white,
        fontSize: FontSizes.body,
        fontWeight: '600',
    },
    addressText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        lineHeight: 24,
    },
    mapSection: {
        marginTop: Spacings.s,
    },
    mapContainer: {
        height: 350,
        width: '100%',
        backgroundColor: '#e1e1e1',
    },
});
