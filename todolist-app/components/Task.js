import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from "react-native";
//task
const Task = (props) => {
  const { text, isCompleted, onPress, onDelete } = props;

  return (
    <TouchableOpacity onPress={onPress}>
      <View style={styles.item}>
        <View style={styles.itemLeading}>
          <View style={styles.square}>
            {isCompleted && <Text style={styles.checkmark}>&#10003;</Text>}
          </View>
          <Text
            style={[styles.text, isCompleted ? styles.completedText : null]}
          >
            {text}
          </Text>
        </View>
        {/* Delete button */}
        <TouchableOpacity onPress={onDelete} style={styles.deleteButton}>
          <Text style={styles.deleteButtonText}>Delete</Text>
        </TouchableOpacity>
      </View>
    </TouchableOpacity>
  );

};

const styles = StyleSheet.create({
  item: {
    backgroundColor: "#FFF",
    padding: 16,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    shadowColor: "#000000",
    shadowRadius: 14,
    shadowOpacity: 0.1,
    marginBottom: 16,
  },
  itemLeading: {
    flexDirection: "row",
    alignItems: "center",
    flexWrap: "wrap",
  },
  square: {
    backgroundColor: "#8DDFDA",
    borderRadius: 4,
    width: 24,
    height: 24,
    opacity: 0.4,
    marginRight: 16,
    alignItems: "center",
    justifyContent: "center",
  },
  text: {
    maxWidth: "80%",
    fontSize: 17,
  },
  checkmark: {
    color: "#000",
    fontSize: 15,
  },
  completedText: {
    textDecorationLine: "line-through",
    color: "#888",
  },
  deleteButton: {
    backgroundColor: 'red', // Choose a suitable color
    padding: 10,
    borderRadius: 5,
    marginLeft: 10, // Add some margin if needed
  },
  deleteButtonText: {
    color: '#FFFFFF', // Text color that contrasts with the button
  },
});

export default Task;