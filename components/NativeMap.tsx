import { LocationObject } from 'expo-location';
import React from 'react';
import { StyleSheet } from 'react-native';
import MapView, { Marker } from 'react-native-maps';

type Props = {
    location: LocationObject | null;
};

export default function NativeMap({ location }: Props) {
    return (
        <MapView
            style={styles.map}
            showsUserLocation={true}
            showsMyLocationButton={true}
            initialRegion={{
                latitude: location ? location.coords.latitude : 48.8566,
                longitude: location ? location.coords.longitude : 2.3522,
                latitudeDelta: 0.0922,
                longitudeDelta: 0.0421,
            }}
            region={location ? {
                latitude: location.coords.latitude,
                longitude: location.coords.longitude,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
            } : undefined}
        >
            {location && (
                <Marker
                    coordinate={{
                        latitude: location.coords.latitude,
                        longitude: location.coords.longitude,
                    }}
                    title="Ma position"
                    description="Je suis ici"
                />
            )}
        </MapView>
    );
}

const styles = StyleSheet.create({
    map: {
        width: '100%',
        height: '100%',
    },
});
