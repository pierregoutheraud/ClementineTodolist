import React, { useState } from "react";
import { StyleSheet, View, TextInput } from "react-native";
import { useDispatch } from "react-redux";
import { createTodo } from "../../modules/todos";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 17,
    paddingHorizontal: 13,
    borderBottomWidth: 2,
    borderColor: "rgba(0,0,0,.2)",
    alignItems: "center",
  },
  input: {
    flex: 1,
  },
  textInput: {
    fontSize: 22,
  },
  image: {},
});

export default function AddTodo() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");

  function handleSubmit() {
    dispatch(createTodo({ title }));
    setTitle("");
  }

  return (
    <View style={styles.container}>
      <View style={styles.input}>
        <TextInput
          style={styles.textInput}
          placeholder="What will you do today ?"
          value={title}
          onChangeText={text => setTitle(text)}
          onSubmitEditing={handleSubmit}
        />
      </View>
    </View>
  );
}
