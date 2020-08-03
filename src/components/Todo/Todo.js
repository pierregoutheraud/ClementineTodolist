import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import InputCheck from "../InputCheck/InputCheck";
import { AntDesign } from "@expo/vector-icons";
import { deleteTodo, updateTodo } from "../../modules/todos";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 10,
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
  close: {
    padding: 10,
  },
});

// Using React.memo to prevent re-rendering all todos when only one is updated
export default React.memo(({ todo }) => {
  const { id, title: defaultTitle, completed } = todo;
  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultTitle);
  const timeout = useRef(null);

  function handleDelete() {
    dispatch(deleteTodo(id));
  }

  function handleChangeCompleted(completed) {
    dispatch(updateTodo(id, { completed }));
  }

  function handleChangeTitle(text) {
    setTitle(text);
    clearTimeout(timeout.current);
    timeout.current = setTimeout(() => {
      dispatch(updateTodo(id, { title: text }));
    }, 300);
  }

  return (
    <View style={styles.container}>
      <InputCheck
        style={styles.icon}
        defaultCompleted={completed}
        onChange={handleChangeCompleted}
      />
      <View style={styles.content}>
        <TextInput
          style={styles.title}
          onChangeText={handleChangeTitle}
          value={title}
          multiline
        />
      </View>
      <TouchableOpacity style={styles.close} onPress={handleDelete}>
        <AntDesign name="close" size={20} color="black" />
      </TouchableOpacity>
    </View>
  );
});
