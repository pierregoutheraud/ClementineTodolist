import React, { useEffect } from "react";
import { StyleSheet, Text, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TodosList from "../components/TodosList/TodosList";
import { fetchTodos } from "../modules/todos";
import AddTodo from "../components/AddTodo/AddTodo";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (!todos) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AddTodo />
      <TodosList todos={todos} />
    </View>
  );
}
