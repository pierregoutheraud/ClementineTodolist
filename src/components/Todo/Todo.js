import React from "react";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import InputCheck from "../InputCheck/InputCheck";
import { AntDesign } from "@expo/vector-icons";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
  },
  icon: {},
  content: {
    flex: 1,
    marginHorizontal: 13,
  },
  title: {
    fontSize: 16,
  },
});

export default function Todo({ todo }) {
  const { title, completed } = todo;

  function handleDelete() {}
  function handleChangeCompleted(completed) {}

  return (
    <View style={styles.container}>
      <InputCheck
        style={styles.icon}
        defaultCompleted={completed}
        onChange={handleChangeCompleted}
      />
      <View style={styles.content}>
        <Text style={styles.title}>{title}</Text>
      </View>
      <TouchableOpacity onPress={handleDelete}>
        <AntDesign name="close" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
}
