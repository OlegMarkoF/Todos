import React, { useState } from 'react';
import { TextField, Button, Box } from '@mui/material';

interface TaskInputProps {
  onAddTask: (text: string) => void;
}

const TaskInput: React.FC<TaskInputProps> = ({ onAddTask }) => {
  const [input, setInput] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (input.trim()) {
      onAddTask(input.trim());
      setInput('');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} className="task-input">
      <TextField
        label="Новая задача"
        value={input}
        onChange={(e) => setInput(e.target.value)}
        variant="outlined"
        className="task-input-field"
      />
      <Button type="submit" variant="contained" color="primary" className="task-input-button">
        Add
      </Button>
    </Box>
  );
};

export default TaskInput;