import { StyleSheet, Text, TouchableOpacity } from 'react-native';

import { ThemedText } from '@/components/themed-text';
import { ThemedView } from '@/components/themed-view';
import { useAuth } from '@/context/AuthContext';

export default function ProfileScreen() {
    const { signOut } = useAuth();

    return (
        <ThemedView style={styles.container}>
            <ThemedText type="title">Profile</ThemedText>

            <TouchableOpacity
                onPress={signOut}
                style={{
                    marginTop: 20,
                    backgroundColor: '#ef4444',
                    padding: 10,
                    borderRadius: 8,
                }}
            >
                <Text style={{ color: 'white', fontWeight: 'bold' }}>Se déconnecter</Text>
            </TouchableOpacity>
        </ThemedView>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});
