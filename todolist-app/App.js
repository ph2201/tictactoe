import axios from 'axios'; 

import { KeyboardAvoidingView, StyleSheet, Text, View, FlatList } from "react-native";
import Task from "./components/Task";
import AddTask from "./components/AddTask";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { Platform } from "react-native";
import { TouchableOpacity } from 'react-native';

export default function App() {
  const [items, setItems] = useState([]);

  // adding a new task
  const handleAddTask = async (task) => {
    
    // update tasks
    // const newTask = { id: items.length + 1, title: task, isCompleted: false };
    // const updatedTasks = [...items, newTask]
    // setItems(updatedTasks);
    // console.log("Add detected. Index is ", task.id);
  
    // try {
    //   const response = await axios.post('http://localhost:9973/api/tasks', newTask);
    //   setItems(prevItems => [...prevItems, response.data]);
    // } catch (error) {
    //   console.error("Error adding tasks to server: ", error);
    // }
    const newTask = { title: task, isCompleted: false };
  
    try {
      const response = await axios.post('http://localhost:9973/api/tasks', newTask);
          
      // Extract the ID from the response
      const newTaskWithId = response.data;
  
      // Use the ID as needed
      console.log("Add detected. New task ID:", newTaskWithId.id);

      // Update state or perform other actions with the new task
      setItems(prevItems => [...prevItems, newTaskWithId]);
      } catch (error) {
          console.error("Error adding task: ", error);
      }
  };

  // pressing the task (completing it)
  const handleTaskPressed = async (index) => {
    console.log("Handle task pressed");
    let updatedTasks = [...items];
    
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted;
    
    updatedTasks.sort((a, b) => {
      if (a.isCompleted === b.isCompleted) {
        return 0; // Keep the original order if both a and b have the same completion status
      }
      return a.isCompleted ? 1 : -1; // Incomplete tasks appear first
    });
    
    // setItems(updatedTasks);
    
    try {
      // await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
      
      const response = await axios.get('http://localhost:9973/api/tasks');
      
      setItems(response.data);
    } catch (error) {
      console.error("Error saving tasks to server: ", error);
    }
  };

  const handleTaskUpdate = async (index) => {
    console.log("Update detected. Index is ", index);
    const updatedTasks = [...items];
    // console.log(index);
    index--; // adjust the index difference between item.id and the index; the firstly added task has id of 1, and the corresponding index is also 1. You can see this from the console prints. However, in line 79 we are accessing the array updatedTasks. Arrays are organized such that the first element is at the zero index. Therefore, to access the first element with ID 1, you must access 0, and hence the shift. Confirm with console:
    updatedTasks[index].isCompleted = !updatedTasks[index].isCompleted; // isComplete = true
    console.log("ISCOMPLETED IS: ", updatedTasks[index].isCompleted);
    console.log("in updated tasks, we are looking at the index ", index, "but the ID of the element at this index is ", updatedTasks[index].id);
    // This could be avoided by simply searching through the array and checking the condition of whether the ID of the element matches the ID of interest, but the particular setup in this case of the ID of each element works out such that such a more efficient approach is possible
    
    
    try {
      await axios.put(`http://localhost:9973/api/tasks/${updatedTasks[index].id}`, { title: updatedTasks[index].title, isCompleted: updatedTasks[index].isCompleted });
      setItems(updatedTasks);
    } catch (error) {
      console.error("Error updating task on server: ", error);
    }
  };

  // deleting a task
  const handleTaskDelete = async (index) => {
    console.log("Delete detected. Index is: ", index);
    // updating tasks, updated throughout, rerendered
    // let updatedTasks = [...items];
    // updatedTasks.splice(index, 1); // what does this do?
    // setItems(updatedTasks);
    try {
      // await AsyncStorage.setItem("task-list", JSON.stringify(updatedTasks));
      await axios.delete(`http://localhost:9973/api/tasks/${index}`);
      setItems(prevItems => prevItems.filter(item => item.id !== index));
      // setItems(prevItems => prevItems.filter((updatedTasks[index], i) => i !== index));

    } catch (error) {
      console.error("Error saving updated tasks to server: ", error);
    }
  };

  useEffect(() => {
    const loadTasks = async () => {
      try {
        const response = await axios.get('http://localhost:9973/api/tasks');
        setItems(response.data);
      } catch (error) {
        console.error("Error loading tasks from server: ", error);
      }
    };
    loadTasks();
  }, []);

const TodoList = ({ tasks, onToggleTask }) => {
  const renderItem = ({ item }) => (
    <TouchableOpacity onPress = { () => onToggleTask(item.id)} >
      <View style = { styles.item } >
        <View style = { styles.itemLeading } >
          <View style = { [ styles.square, item.isCompleted && styles.completedSquare ] } />
          <Text style = { [ styles.text, item.isCompleted && styles.completedText ] } > { item.title } 
          </Text> 
        </View>
      </View>
    </TouchableOpacity>
  );
  return (
    <FlatList
      data = { tasks }
      renderItem = { renderItem }
      keyExtractor = { item => item.id.toString() }
    />
  );
};
  

const renderItem = ({ item }) => (
  <Task
    text={item.title}
    isCompleted={item.isCompleted}
    onPress={() => handleTaskUpdate(item.id)}
    onDelete={() => handleTaskDelete(item.id)}
  />
);

return (
  <View style={styles.container}>
    <View style={styles.tasksWrapper}>
      <Text style={styles.sectionTitle}>Today's Tasks</Text>
      <FlatList
        data={items}
        renderItem={renderItem}
        keyExtractor={(item) => item.id.toString()}
        style={styles.items}
      />
    </View>
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={styles.addTaskContainer}
    >
      <AddTask onAddTaskPress={handleAddTask} />
    </KeyboardAvoidingView>
  </View>
);
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F1F1",
  },
  tasksWrapper: {
    paddingTop: 80,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 34,
    fontWeight: "bold",
  },
  items: {
    marginTop: 32,
  },
  addTaskContainer: {
    position: "absolute",
    bottom: 30,
    width: "100%",
  },
});