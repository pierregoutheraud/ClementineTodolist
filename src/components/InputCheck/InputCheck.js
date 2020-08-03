import React, { useState } from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    padding: 5,
  },
  circle: {
    height: 30,
    width: 30,
    borderWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
    borderRadius: 25,
    justifyContent: "center",
    alignItems: "center",
  },
  completed: {
    borderColor: "green",
  },
});

export default function Todo({
  style,
  defaultCompleted = false,
  onChange = () => {},
}) {
  const [completed, setCompleted] = useState(defaultCompleted);

  function handlePress() {
    const newCompleted = !completed;
    setCompleted(newCompleted);
    onChange(newCompleted);
  }

  return (
    <TouchableOpacity style={[styles.container, style]} onPress={handlePress}>
      <View style={[styles.circle, completed && styles.completed]}>
        {completed && <AntDesign name="check" size={20} color="green" />}
      </View>
    </TouchableOpacity>
  );
}
