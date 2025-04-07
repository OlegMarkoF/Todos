import React, { useState } from "react";
import { Typography, Tabs, Tab, Button } from "@mui/material";
import TaskInput from "./components/TaskInput";
import TaskList from "./components/TaskList";
import TaskCounter from "./components/TaskCounter";
import { Task } from "./types";

const App: React.FC = () => {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [activeTab, setActiveTab] = useState("all");

  const addTask = (text: string) => {
    const newTask: Task = { id: Date.now(), text, completed: false };
    setTasks([...tasks, newTask]);
  };

  const toggleTask = (id: number) => {
    setTasks(
      tasks.map((task) =>
        task.id === id ? { ...task, completed: !task.completed } : task
      )
    );
  };

  const clearCompleted = () => {
    setTasks(tasks.filter((task) => !task.completed));
  };

  const filteredTasks = () => {
    switch (activeTab) {
      case "active":
        return tasks.filter((task) => !task.completed);
      case "completed":
        return tasks.filter((task) => task.completed);
      case "all":
      default:
        return tasks;
    }
  };

  const incompleteTasks = tasks.filter((task) => !task.completed);

  return (
    <main className="app-container">
      <Typography variant="h2" className="app-title">
        ToDo List
      </Typography>
      <div className="todo-list-container">
        <TaskInput onAddTask={addTask} />
        <TaskCounter count={incompleteTasks.length} />
        <div className="task-list-wrapper">
          <TaskList
            title=""
            tasks={filteredTasks()}
            onToggleTask={toggleTask}
          />
        </div>
        <footer className="app-footer">
          <Tabs
            value={activeTab}
            onChange={(e, newValue) => setActiveTab(newValue)}
            className="app-tabs"
            centered
            indicatorColor="primary" // Явно указываем цвет индикатора
            textColor="primary"
          >
            <Tab label="All" value="all" className="app-tab" />
            <Tab label="Active" value="active" className="app-tab" />
            <Tab label="Completed" value="completed" className="app-tab" />
            <Button
              color="secondary"
              onClick={clearCompleted}
              disabled={tasks.filter((task) => task.completed).length === 0}
              className="clear-button"
            >
              Clear completed
            </Button>
          </Tabs>
        </footer>
      </div>
      <div className="todo-list-container_next"></div>
      <div className="todo-list-container_last"></div>
    </main>
  );
};

export default App;
