import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { StyleSheet, Text, View, TouchableOpacity } from "react-native";
import { FILTERS, FILTERS_TEXT } from "../../constants/filters";
import { setFilter } from "../../modules/filter";
import { clearCompletedTodos } from "../../modules/todos";
import colors from "../../constants/colors";

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 15,
    alignItems: "center",
    height: 60,
    borderTopWidth: 2,
    borderColor: "rgba(0,0,0,.1)",
    backgroundColor: "#fff",
  },
  filters: {
    flexDirection: "row",
  },
  filter: {
    padding: 4,
    paddingHorizontal: 6,
    marginHorizontal: 1,
    borderWidth: 1,
    borderColor: "transparent",
    borderRadius: 4,
  },
  filterActive: {
    borderColor: "black",
    color: "red",
  },
  filterText: {
    color: colors.gray,
  },
  filterTextActive: {
    color: "black",
  },
});

export default function Footer({ todos }) {
  const dispatch = useDispatch();
  const todosCompleted = todos.filter(todo => todo.completed);
  const currentFilter = useSelector(state => state.filter);

  function handlePress(filter) {
    dispatch(setFilter(filter));
  }

  function handleClearAll() {
    dispatch(clearCompletedTodos());
  }

  const filters = Object.values(FILTERS).map(filter => {
    const active = filter === currentFilter;
    return (
      <TouchableOpacity
        key={filter}
        style={[styles.filter, active && styles.filterActive]}
        onPress={() => handlePress(filter)}
        accessibilityRole="menuitem"
        accessibilityLabel={`${FILTERS_TEXT[filter]} button`}
      >
        <Text style={[styles.filterText, active && styles.filterTextActive]}>
          {FILTERS_TEXT[filter]}
        </Text>
      </TouchableOpacity>
    );
  });

  return (
    <View style={styles.container}>
      <Text>
        {todosCompleted.length}/{todos.length}
      </Text>
      <View style={styles.filters} accessibilityRole="menu">
        {filters}
      </View>
      <TouchableOpacity onPress={handleClearAll} accessibilityRole="link">
        <Text>Clear completed</Text>
      </TouchableOpacity>
    </View>
  );
}
