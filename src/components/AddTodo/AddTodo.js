import React, { useState, useRef } from "react";
import { StyleSheet, View, TextInput, TouchableOpacity } from "react-native";
import { useDispatch } from "react-redux";
import { createTodo } from "../../modules/todos";
import InputImage from "../InputImage/InputImage";
import { AntDesign } from "@expo/vector-icons";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    padding: 17,
    paddingHorizontal: 13,
    borderBottomWidth: 2,
    borderColor: colors.gray,
    alignItems: "center",
  },
  inputImage: {
    marginRight: 10,
  },
  input: {
    flex: 1,
  },
  textInput: {
    fontSize: 22,
  },
  image: {},
  send: {
    width: 40,
    height: 40,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default function AddTodo() {
  const dispatch = useDispatch();
  const [title, setTitle] = useState("");
  const [image, setImage] = useState(null);
  const input = useRef(null);

  function handleSubmit() {
    dispatch(createTodo({ title, image }));
    setTitle("");
    setImage(null);
    input.current.blur();
  }

  function handleChangeImage(image) {
    setImage(image);
  }

  const canSend = title.length || image;

  return (
    <View style={styles.container}>
      <InputImage
        style={styles.inputImage}
        onChange={handleChangeImage}
        image={image}
      />
      <View style={styles.input}>
        <TextInput
          ref={input}
          style={styles.textInput}
          placeholder="What will you do today?"
          value={title}
          onChangeText={text => setTitle(text)}
          onSubmitEditing={handleSubmit}
          blurOnSubmit
        />
      </View>
      <TouchableOpacity
        style={styles.send}
        onPress={handleSubmit}
        disabled={!canSend}
        accessibilityLabel="Add todo"
        accessibilityRole="button"
      >
        <AntDesign
          name="plus"
          size={24}
          color={canSend ? "green" : colors.gray}
        />
      </TouchableOpacity>
    </View>
  );
}
