import React from "react";
import { StyleSheet, View, ScrollView } from "react-native";
import Todo from "../Todo/Todo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function TodosList({ todos }) {
  const list = todos.map(todo => {
    return <Todo key={todo.id} todo={todo} />;
  });

  return (
    <View style={styles.container}>
      <ScrollView>{list}</ScrollView>
    </View>
  );
}
