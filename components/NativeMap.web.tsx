import { LocationObject } from 'expo-location';
import React from 'react';
import { StyleSheet, Text, View } from 'react-native';

type Props = {
    location: LocationObject | null;
};

export default function NativeMap({ location }: Props) {
    return (
        <View style={styles.webMapPlaceholder}>
            <Text>Carte non disponible sur le web pour cette démo</Text>
            {location && <Text style={{ marginTop: 5, fontSize: 10, color: '#666' }}>GPS: {location.coords.latitude}, {location.coords.longitude}</Text>}
        </View>
    );
}

const styles = StyleSheet.create({
    webMapPlaceholder: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        backgroundColor: '#eee',
        height: '100%',
        width: '100%',
    },
});
