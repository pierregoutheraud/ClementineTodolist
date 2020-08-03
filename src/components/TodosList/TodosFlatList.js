import React from "react";
import { StyleSheet, View, FlatList } from "react-native";
import Todo from "../Todo/Todo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function TodosList({ todos }) {
  function renderItem({ item: todo }) {
    return <Todo todo={todo} />;
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={todos}
        renderItem={renderItem}
        keyExtractor={todo => "" + todo.id}
        initialNumToRender={50}
      />
    </View>
  );
}
