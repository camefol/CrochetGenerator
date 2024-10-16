import React from "react";
import { ImageBackground, StyleSheet, View } from "react-native";


export const Background = ({ children }) => {

    return (
        <ImageBackground 
        source={require('@/assets/images/CrochetBackground.jpg')} 
        style={styles.background}
        resizeMode="cover"
        >
              <View style={styles.overlay} />
              {children}
        </ImageBackground>
    )
}

const styles = StyleSheet.create({
    background: {
      flex: 1,
      width: '100%',
      height: '100%',
    },
    overlay: {
        ...StyleSheet.absoluteFillObject,  // Fills the entire screen
        backgroundColor: 'rgba(255, 255, 255, 0.4)',  // Semi-transparent white overlay
      },
  });