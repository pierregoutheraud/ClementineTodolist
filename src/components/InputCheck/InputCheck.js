import React, { useState } from "react";
import { StyleSheet, View, TouchableOpacity } from "react-native";
import { Feather } from "@expo/vector-icons";
import colors from "../../constants/colors";

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
  circleCompleted: {
    borderWidth: 2,
    borderColor: colors.green,
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
      <View style={[styles.circle, completed && styles.circleCompleted]}>
        {completed && <Feather name="check" size={22} color={colors.green} />}
      </View>
    </TouchableOpacity>
  );
}
