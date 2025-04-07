import React from 'react';
import { Typography } from '@mui/material';

interface TaskCounterProps {
  count: number;
}

const TaskCounter: React.FC<TaskCounterProps> = ({ count }) => {
  return (
    <Typography className="task-counter">
      Осталось задач: {count}
    </Typography>
  );
};

export default TaskCounter;