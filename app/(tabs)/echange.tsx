import { FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import React from 'react';
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const DISCUSSIONS = [
    {
        id: '1',
        name: 'Pierre DESCHAMPS',
        avatar: 'https://i.pravatar.cc/150?img=11',
        date: '14:26',
        unreadCount: 1,
        message: 'a envoyé un message'
    },
    {
        id: '2',
        name: 'Aurélie LANGLOIS',
        avatar: 'https://i.pravatar.cc/150?img=5',
        date: '14:26',
        unreadCount: 4,
        message: '4 nouveaux messages'
    },
    {
        id: '3',
        name: 'Ludovic DA SILVA',
        avatar: 'https://i.pravatar.cc/150?img=3',
        date: 'hier',
        unreadCount: 0,
        message: 'Vus'
    },
    {
        id: '4',
        name: 'Vanessa MAILLARD',
        avatar: 'https://i.pravatar.cc/150?img=9',
        date: '29/11/2025',
        unreadCount: 0,
        message: 'Vus'
    }
];

export default function EchangeScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTitle}>Discussions</Text>
            </View>

            <FlatList
                data={DISCUSSIONS}
                keyExtractor={item => item.id}
                renderItem={({ item }) => (
                    <TouchableOpacity style={styles.itemContainer}>
                        <Image source={{ uri: item.avatar }} style={styles.avatar} />

                        <View style={styles.contentContainer}>
                            <View style={styles.topRow}>
                                <Text style={styles.name}>{item.name}</Text>
                                <Text style={styles.date}>{item.date}</Text>
                            </View>

                            <View style={styles.bottomRow}>
                                <Text style={styles.message} numberOfLines={1}>{item.message}</Text>
                                {item.unreadCount > 0 && (
                                    <View style={styles.badge}>
                                        <Text style={styles.badgeText}>{item.unreadCount}</Text>
                                    </View>
                                )}
                            </View>
                        </View>
                    </TouchableOpacity>
                )}
                contentContainerStyle={styles.listContent}
            />
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.white,
    },
    header: {
        paddingHorizontal: Spacings.l,
        paddingTop: Spacings.l,
        paddingBottom: Spacings.l,
        backgroundColor: Palette.white,
    },
    headerTitle: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.title,
        color: Palette.black,
    },
    listContent: {
        paddingBottom: Spacings.xxl * 3,
    },
    itemContainer: {
        flexDirection: 'row',
        paddingHorizontal: Spacings.l,
        paddingVertical: Spacings.m,
        alignItems: 'center',
    },
    avatar: {
        width: 70,
        height: 70,
        borderRadius: 35,
        backgroundColor: '#f0f0f0',
    },
    contentContainer: {
        flex: 1,
        marginLeft: Spacings.m,
        justifyContent: 'center',
    },
    topRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'baseline',
        marginBottom: 6,
    },
    name: {
        fontFamily: FontsFamilies.body,
        fontSize: 18,
        color: Palette.black,
        flex: 1,
    },
    date: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.caption,
        color: Palette.orangeDark,
    },
    bottomRow: {
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    message: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        flex: 1,
        marginRight: 10,
    },
    badge: {
        backgroundColor: Palette.green,
        minWidth: 24,
        height: 24,
        borderRadius: 12,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 6,
    },
    badgeText: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.small,
        color: Palette.white,
        fontWeight: 'bold',
    },
});
