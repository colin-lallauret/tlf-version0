import { IconAccueil, IconEchange, IconParcours, IconProfile } from '@/components/TabBarIcons';
import { BorderRadius, FontsFamilies, FontSizes, Palette, Spacings } from '@/constants/theme';
import { Tabs } from 'expo-router';
import React from 'react';
import { StyleSheet, Text, TouchableOpacity, View } from 'react-native';

function CustomTabBar({ state, descriptors, navigation }: any) {
  return (
    <View style={styles.tabBarContainer}>
      <View style={styles.tabBar}>
        {state.routes.map((route: any, index: number) => {
          const { options } = descriptors[route.key];
          const label = options.tabBarLabel !== undefined
            ? options.tabBarLabel
            : options.title !== undefined
              ? options.title
              : route.name;

          const isFocused = state.index === index;

          const onPress = () => {
            const event = navigation.emit({
              type: 'tabPress',
              target: route.key,
              canPreventDefault: true,
            });

            if (!isFocused && !event.defaultPrevented) {
              navigation.navigate(route.name);
            }
          };

          let IconComponent;
          if (route.name === 'home') IconComponent = IconAccueil;
          else if (route.name === 'parcours') IconComponent = IconParcours;
          else if (route.name === 'echange') IconComponent = IconEchange;
          else if (route.name === 'profile') IconComponent = IconProfile;

          const color = isFocused ? Palette.white : Palette.black;

          return (
            <TouchableOpacity
              key={route.key}
              accessibilityRole="button"
              accessibilityState={isFocused ? { selected: true } : {}}
              onPress={onPress}
              style={[
                styles.tabItem,
                isFocused && styles.tabItemFocused
              ]}
              activeOpacity={0.8}
            >
              {IconComponent && <IconComponent color={color} size={26} />}
              <Text style={[
                styles.tabLabel,
                { color: color }
              ]}>
                {label}
              </Text>
            </TouchableOpacity>
          );
        })}
      </View>
    </View>
  );
}

export default function TabLayout() {
  return (
    <Tabs
      tabBar={props => <CustomTabBar {...props} />}
      screenOptions={{ headerShown: false }}
    >
      <Tabs.Screen name="home" options={{ title: 'Accueil' }} />
      <Tabs.Screen name="parcours" options={{ title: 'Parcours' }} />
      <Tabs.Screen name="echange" options={{ title: 'Échange' }} />
      <Tabs.Screen name="profile" options={{ title: 'Profile' }} />
    </Tabs>
  );
}

const styles = StyleSheet.create({
  tabBarContainer: {
    position: 'absolute',
    bottom: Spacings.xl,
    left: Spacings.m, // 16
    right: Spacings.m, // 16
    alignItems: 'center',
  },
  tabBar: {
    flexDirection: 'row',
    backgroundColor: Palette.orangeLight,
    borderRadius: BorderRadius.full,
    height: 60,
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: Spacings.s,
    width: '100%',
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.15,
    shadowRadius: 10,
    elevation: 8,
  },
  tabItem: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    height: '85%',
    borderRadius: BorderRadius.full,
    paddingVertical: Spacings.xs,
  },
  tabItemFocused: {
    backgroundColor: Palette.orangeDark,
  },
  tabLabel: {
    fontFamily: FontsFamilies.body,
    fontSize: FontSizes.small,
    marginTop: 6,
    fontWeight: '600',
  }
});
