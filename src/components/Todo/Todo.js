import React, { useState, useRef } from "react";
import { useDispatch } from "react-redux";
import { StyleSheet, View, TouchableOpacity, TextInput } from "react-native";
import InputCheck from "../InputCheck/InputCheck";
import { AntDesign } from "@expo/vector-icons";
import { deleteTodo, updateTodo } from "../../modules/todos";
import ViewImage from "../ViewImage/ViewImage";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    alignItems: "center",
    padding: 15,
    paddingHorizontal: 10,
    borderBottomWidth: 1,
    borderColor: "rgba(0,0,0,.1)",
  },
  content: {
    flexDirection: "row",
    alignItems: "center",
    flex: 1,
    marginHorizontal: 10,
  },
  title: {
    fontSize: 16,
    flex: 1,
  },
  touchableRight: {
    padding: 10,
  },
  iconRight: {
    opacity: 0.5,
  },
  image: {
    marginRight: 10,
  },
});

// Using React.memo to prevent re-rendering all todos when only one is updated
export default React.memo(({ todo }) => {
  const { id, title: defaultTitle, image = null, completed } = todo;
  const timeout = useRef(null);
  const input = useRef(null);
  const dispatch = useDispatch();
  const [title, setTitle] = useState(defaultTitle);
  const [isFocus, setIsFocus] = useState(false);

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

  function handleDone() {
    input.blur();
  }

  function handleFocus() {
    setIsFocus(true);
  }

  function handleBlur() {
    setIsFocus(false);
  }

  return (
    <View style={styles.container}>
      <InputCheck
        style={styles.icon}
        defaultCompleted={completed}
        onChange={handleChangeCompleted}
      />
      <View style={styles.content}>
        {image && <ViewImage style={styles.image} image={image} />}
        <TextInput
          ref={input}
          style={styles.title}
          onChangeText={handleChangeTitle}
          value={title}
          multiline
          onFocus={handleFocus}
          onBlur={handleBlur}
          scrollEnabled={false}
          accessibilityLabel="Title"
        />
      </View>
      {isFocus ? (
        <TouchableOpacity
          style={styles.touchableRight}
          onPress={handleDone}
          accessibilityLabel="Edit"
          accessibilityRole="button"
        >
          <AntDesign
            name="check"
            size={20}
            style={styles.iconRight}
            color={colors.green}
          />
        </TouchableOpacity>
      ) : (
        <TouchableOpacity
          style={styles.touchableRight}
          onPress={handleDelete}
          accessibilityLabel="Delete"
          accessibilityRole="button"
        >
          <AntDesign
            name="close"
            size={20}
            style={styles.iconRight}
            color={colors.red}
          />
        </TouchableOpacity>
      )}
    </View>
  );
});
