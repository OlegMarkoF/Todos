import React from 'react';
import { Typography, List, ListItem, Checkbox, ListItemText } from '@mui/material';
import { Task } from '../types';

interface TaskListProps {
  title: string;
  tasks: Task[];
  onToggleTask: (id: number) => void;
}

const TaskList: React.FC<TaskListProps> = ({ tasks, onToggleTask }) => {
  return (
    <div className="task-list">
      {tasks.length === 0 ? (
        <Typography className="task-list-empty">Список пуст</Typography>
      ) : (
        <List>
          {tasks.map(task => (
            <ListItem key={task.id} dense className="task-item">
              <Checkbox
                checked={task.completed}
                onChange={() => onToggleTask(task.id)}
                className="task-checkbox"
              />
              <ListItemText
                primary={task.text}
                className={task.completed ? 'task-text completed' : 'task-text'}
              />
            </ListItem>
          ))}
        </List>
      )}
    </div>
  );
};

export default TaskList;