import { FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

export default function ParcoursScreen() {
    return (
        <SafeAreaView style={styles.container}>
            <View style={styles.content}>
                <Text style={styles.emoji}>🚧</Text>
                <Text style={styles.title}>En travaux</Text>
                <Text style={styles.subtitle}>
                    Cette page est actuellement en cours de construction. Revenez plus tard !
                </Text>
            </View>
        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: Palette.white,
        alignItems: 'center',
        justifyContent: 'center',
    },
    content: {
        alignItems: 'center',
        padding: Spacings.l,
    },
    emoji: {
        fontSize: 64,
        marginBottom: Spacings.l,
    },
    title: {
        fontFamily: FontsFamilies.title,
        fontSize: FontSizes.title,
        color: Palette.black,
        marginBottom: Spacings.s,
        textAlign: 'center',
    },
    subtitle: {
        fontFamily: FontsFamilies.body,
        fontSize: FontSizes.body,
        color: Palette.black,
        textAlign: 'center',
        opacity: 0.7,
        lineHeight: 24,
    },
});
