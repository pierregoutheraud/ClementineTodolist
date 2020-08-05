import React, { useEffect } from "react";
import { StyleSheet, View } from "react-native";
import { useDispatch, useSelector } from "react-redux";
import TodosList from "../components/TodosList/TodosList";
import { fetchTodos, selectFilteredTodos } from "../modules/todos";
import AddTodo from "../components/AddTodo/AddTodo";
import Footer from "../components/Footer/Footer";

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default function Home() {
  const dispatch = useDispatch();
  const todos = useSelector(state => state.todos);
  const filteredTodos = useSelector(selectFilteredTodos);

  useEffect(() => {
    dispatch(fetchTodos());
  }, []);

  if (!todos) {
    return null;
  }

  return (
    <View style={styles.container}>
      <AddTodo />
      <TodosList todos={filteredTodos} />
      <Footer todos={todos} />
    </View>
  );
}
