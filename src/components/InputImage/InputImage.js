import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity, Image } from "react-native";
import { MaterialCommunityIcons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import Constants from "expo-constants";
import * as Permissions from "expo-permissions";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 30,
    height: 30,
  },
  touchable: {
    // Bigger zone to press
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

// Controlled component with value image
export default function InputImage({
  style,
  image = null,
  onChange = () => {},
}) {
  async function handlePress() {
    if (Constants.platform.ios) {
      const { status } = await Permissions.askAsync(Permissions.CAMERA_ROLL);
      console.log(status);
      if (status !== "granted") {
        alert("Sorry, we need camera roll permissions to make this work!");
      }
    }

    try {
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.All,
        allowsEditing: true,
        quality: 1,
      });
      if (!result.cancelled) {
        onChange(result.uri);
      }
    } catch (e) {
      console.log(e);
    }
  }

  return (
    <View style={[styles.container, style]}>
      <TouchableOpacity style={styles.touchable} onPress={handlePress}>
        {image ? (
          <Image source={{ uri: image }} style={styles.image} />
        ) : (
          <MaterialCommunityIcons
            style={styles.add}
            name="image-plus"
            size={24}
            color={colors.gray}
          />
        )}
      </TouchableOpacity>
    </View>
  );
}
