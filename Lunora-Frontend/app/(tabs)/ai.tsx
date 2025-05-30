import { ThemedText } from '@/components/ThemedText';
import React from 'react'
import { StyleSheet, View } from 'react-native'
import { SafeAreaView } from 'react-native-safe-area-context';

export default function TabFourScreen() {
  return (
    <SafeAreaView style={styles.titleContainer}>
     <ThemedText>ai</ThemedText>
      <ThemedText>ai</ThemedText>
       <ThemedText>ai</ThemedText>
        <ThemedText>ai</ThemedText>
         <ThemedText>ai</ThemedText>
          <ThemedText>ai</ThemedText>
           <ThemedText>ai</ThemedText>
    </SafeAreaView>
  )
}

const styles = StyleSheet.create({
  headerImage: {
    color: '#808080',
    bottom: -90,
    left: -35,
    position: 'absolute',
  },
  titleContainer: {
    flexDirection: 'column',
    gap: 4,
    backgroundColor: 'red'
  },
});
