import { useState } from "react";
import { StyleSheet, View, FlatList, Button } from "react-native";
import { StatusBar } from "expo-status-bar";

import GoalItem from "./components/GoalItem";
import GoalInput from "./components/Goalnput";

const App = () => {
  const [isModalVisible, setIsModalVisible] = useState(false);
  const [courseGoals, setCourseGoals] = useState([]);

  const showAddGoalModal = () => {
    setIsModalVisible(true);
  };

  const hideAddGoalModal = () => {
    setIsModalVisible(false);
  };

  const addGoalHandler = (enteredGoalText) => {
    setCourseGoals((currentCouseGoals) => [
      ...currentCouseGoals,
      { text: enteredGoalText, id: Math.random().toString() },
    ]);
    hideAddGoalModal();
  };

  const deleteGoalHandler = (id) => {
    setCourseGoals((currentCouseGoals) => {
      return currentCouseGoals.filter((goal) => goal.id !== id);
    });
  };

  return (
    <>
      <StatusBar style="light"/>
      <View style={styles.appContainer}>
        <Button
          onPress={showAddGoalModal}
          title="Add New Goal"
          color="#a065ec"
        />
        <GoalInput
          onAddGoal={addGoalHandler}
          visible={isModalVisible}
          onCancel={hideAddGoalModal}
        />
        <View style={styles.goalsContainer}>
          <FlatList
            data={courseGoals}
            renderItem={(itemData) => {
              return (
                <GoalItem
                  text={itemData.item.text}
                  id={itemData.item.id}
                  onDeleteGoal={deleteGoalHandler}
                />
              );
            }}
            keyExtractor={(item, index) => item.id}
          ></FlatList>
        </View>
      </View>
    </>
  );
};

const styles = StyleSheet.create({
  appContainer: {
    flex: 1,
    paddingTop: 50,
    paddingHorizontal: 16,
  },
  goalsContainer: {
    flex: 5,
  },
});

export default App;
