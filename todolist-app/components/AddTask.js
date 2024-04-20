import React, { useState } from "react";
import { View, StyleSheet, Text, TouchableOpacity, TextInput, Keyboard, Alert } from "react-native";

const AddTask = (props) => {
  const [task, setTask] = useState("");
  const { onAddTaskPress } = props;

  const handleAddTask = () => {
    // Extra Exercise II: Users should not be able to add an empty task. 
    if (task.trim().length > 0) { // if the string is not empty
      onAddTaskPress( task.trim() );
      Keyboard.dismiss();
      setTask("");
    } else {
      // if the string is empty display error message
      Alert.alert("Nope!", "You cannot add an empty task, sorry.");
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.textInput}
        placeholder="Write a task"
        value={task}
        onChangeText={setTask}
      />
      <TouchableOpacity style={styles.button} onPress={handleAddTask}>
        <Text style={styles.text}>Add</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: "#F5F1F1",
    padding: 16,
    flexDirection: "row",
    alignItems: "center",
  },
  textInput: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: "#FFF",
    borderRadius: 8,
    fontSize: 17,
  },
  button: {
    marginLeft: 10,
    backgroundColor: "#558CF6",
    borderRadius: 8,
    padding: 10,
  },
  text: {
    color: "#FFF",
    fontWeight: "bold",
    fontSize: 17,
  },
});

export default AddTask;