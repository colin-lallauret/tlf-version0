import NativeMap from '@/components/NativeMap';
import { BorderRadius, FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import { Ionicons } from '@expo/vector-icons';
import * as Location from 'expo-location';
import { useRouter } from 'expo-router';
import React, { useEffect, useState } from 'react';
import { FlatList, Image, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native';
import { SafeAreaView } from 'react-native-safe-area-context';

const LOCAUX = [
  { id: '1', firstName: 'Pierre', lastName: 'DESCHAMPS', image: 'https://i.pravatar.cc/150?img=11' },
  { id: '2', firstName: 'Aurélie', lastName: 'LANGLOIS', image: 'https://i.pravatar.cc/150?img=5' },
  { id: '3', firstName: 'Ludovic', lastName: 'DA SILVA', image: 'https://i.pravatar.cc/150?img=3' },
];

const RESTOS = [
  { id: '1', name: 'Restaurant 1', image: 'https://picsum.photos/200/150?random=1' },
  { id: '2', name: 'Café 1', image: 'https://picsum.photos/200/150?random=2' },
  { id: '3', name: 'Restaurant 2', image: 'https://picsum.photos/200/150?random=3' },
];

export default function HomeScreen() {
  const [location, setLocation] = useState<Location.LocationObject | null>(null);
  const router = useRouter();

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status === 'granted') {
        let loc = await Location.getCurrentPositionAsync({});
        setLocation(loc);
      }
    })();
  }, []);

  const renderLocal = ({ item }: { item: typeof LOCAUX[0] }) => (
    <TouchableOpacity onPress={() => router.push(`/(tabs)/home/user/${item.id}`)} style={styles.localCard}>
      <Image source={{ uri: item.image }} style={styles.localImage} />
      <Text style={styles.localFirstName}>{item.firstName}</Text>
      <Text style={styles.localLastName}>{item.lastName}</Text>
    </TouchableOpacity>
  );

  const renderResto = ({ item }: { item: typeof RESTOS[0] }) => (
    <TouchableOpacity onPress={() => router.push(`/(tabs)/home/restaurant/${item.id}`)} style={styles.restoCard}>
      <Image source={{ uri: item.image }} style={styles.restoImage} />
      <Text style={styles.restoName}>{item.name}</Text>
    </TouchableOpacity>
  );

  return (
    <SafeAreaView style={styles.container} edges={['top']}>
      {/* Search Bar */}
      <View style={styles.headerContainer}>
        <View style={styles.searchBar}>
          <Ionicons name="search-outline" size={20} color={Palette.black} style={styles.searchIcon} />
          <TextInput
            placeholder="Rechercher..."
            placeholderTextColor="#666"
            style={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>

        {/* Locaux Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Les locaux engagés</Text>
          <FlatList
            data={LOCAUX}
            renderItem={renderLocal}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Top Adresses Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Les top adresses de la ville</Text>
          <FlatList
            data={RESTOS}
            renderItem={renderResto}
            keyExtractor={item => item.id}
            horizontal
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={styles.listContent}
          />
        </View>

        {/* Map Section */}
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>Carte interactive</Text>

          <View style={styles.filtersRow}>
            <TouchableOpacity style={[styles.filterChip, { backgroundColor: Palette.orangeDark }]}>
              <Text style={styles.filterTextActive}>Tous</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>Filtre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>Filtre</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.filterChip}>
              <Text style={styles.filterText}>Filtre</Text>
            </TouchableOpacity>
          </View>

          <View style={styles.mapContainer}>
            <NativeMap location={location} />
          </View>
        </View>

        <View style={{ height: 100 }} />
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Palette.white,
  },
  headerContainer: {
    paddingHorizontal: Spacings.l,
    paddingVertical: Spacings.s,
    backgroundColor: Palette.white,
  },
  searchBar: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#E5E4D7',
    borderRadius: BorderRadius.full,
    paddingHorizontal: Spacings.m,
    height: 50,
  },
  searchIcon: {
    marginRight: Spacings.s,
  },
  searchInput: {
    flex: 1,
    height: '100%',
    fontFamily: FontsFamilies.body,
    fontSize: FontSizes.body,
    color: Palette.black,
  },
  scrollContent: {
    paddingBottom: Spacings.xxl * 3, // Extra space for tab bar
  },
  section: {
    marginTop: Spacings.l,
    // paddingLeft: Spacings.l, // Removed to handle padding in sub-elements or maintain consistent layout
  },
  sectionTitle: {
    fontFamily: FontsFamilies.titleRegular,
    fontSize: FontSizes.subtitle, // 22
    color: Palette.black,
    marginBottom: Spacings.m,
    paddingHorizontal: Spacings.l,
  },
  listContent: {
    paddingHorizontal: Spacings.l,
    gap: Spacings.m,
  },
  // Local Card Styles
  localCard: {
    alignItems: 'flex-start',
    width: 120,
    marginRight: Spacings.s,
  },
  localImage: {
    width: 120,
    height: 120,
    borderRadius: BorderRadius.l,
    marginBottom: Spacings.s,
    backgroundColor: '#eee',
  },
  localFirstName: {
    fontFamily: FontsFamilies.body,
    fontSize: FontSizes.body,
    color: Palette.black,
  },
  localLastName: {
    fontFamily: FontsFamilies.body,
    fontWeight: '600',
    fontSize: FontSizes.body,
    color: Palette.black,
    textTransform: 'uppercase',
  },
  // Resto Card Styles
  restoCard: {
    width: 180,
    marginRight: Spacings.s,
  },
  restoImage: {
    width: 180,
    height: 130,
    borderRadius: BorderRadius.l,
    marginBottom: Spacings.s,
    backgroundColor: '#eee',
  },
  restoName: {
    fontFamily: FontsFamilies.body,
    fontSize: FontSizes.body,
    color: Palette.black,
  },
  // Map styles
  filtersRow: {
    flexDirection: 'row',
    paddingHorizontal: Spacings.l,
    gap: Spacings.s,
    marginBottom: Spacings.m,
  },
  filterChip: {
    paddingVertical: Spacings.s,
    paddingHorizontal: Spacings.m,
    borderRadius: BorderRadius.full,
    backgroundColor: '#E5E4D7',
  },
  filterText: {
    fontFamily: FontsFamilies.body,
    fontSize: FontSizes.caption,
    color: Palette.black,
  },
  filterTextActive: {
    fontFamily: FontsFamilies.bodyBold,
    fontSize: FontSizes.caption,
    color: Palette.white,
  },
  mapContainer: {
    height: 350,
    width: '100%',
    backgroundColor: '#e1e1e1',
  },
});
