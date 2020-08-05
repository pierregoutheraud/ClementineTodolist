import React, { useState } from "react";
import { StyleSheet, Image, TouchableOpacity, Modal } from "react-native";

const styles = StyleSheet.create({
  container: {},
  image: {
    width: 60,
    height: 60,
  },
  imageFullscreen: {
    width: "100%",
    height: "100%",
  },
});

// Using React.memo to prevent re-rendering all todos when only one is updated
export default function ViewImage({ image, style }) {
  const [modalVisible, setModalVisible] = useState(false);

  function handleToggleImage() {
    setModalVisible(!modalVisible);
  }

  return (
    <>
      <Modal
        animationType="slide"
        visible={modalVisible}
        accessibilityLabel="Modal"
      >
        <TouchableOpacity
          style={styles.modalContent}
          onPress={handleToggleImage}
          accessibilityLabel="Close image"
        >
          <Image
            style={styles.imageFullscreen}
            source={{ uri: image }}
            resizeMode="contain"
            accessibilityLabel="Image fullscreen"
          />
        </TouchableOpacity>
      </Modal>
      <TouchableOpacity
        style={[styles.container, style]}
        onPress={handleToggleImage}
        accessibilityLabel="Display image"
      >
        <Image
          style={styles.image}
          source={{ uri: image }}
          resizeMode="contain"
          accessibilityLabel="image"
        />
      </TouchableOpacity>
    </>
  );
}
