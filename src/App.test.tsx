/* eslint-disable testing-library/no-node-access */
import { render, screen, fireEvent } from '@testing-library/react';
import App from './App';
import '@testing-library/jest-dom';

describe('ToDo App', () => {
  test('добавляет новую задачу и отображает во вкладке All', () => {
    render(<App />);
    const input = screen.getByLabelText(/новая задача/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);

    expect(screen.getByText('Тестовая задача')).toBeInTheDocument();
    expect(screen.getByText(/осталось задач: 1/i)).toBeInTheDocument();
  });

  test('отмечает задачу как выполненную и отображает в Completed', () => {
    render(<App />);
    const input = screen.getByLabelText(/новая задача/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);

    const checkbox = screen.getByRole('checkbox');
    fireEvent.click(checkbox);

    const taskText = screen.getByText('Тестовая задача').closest('.task-text');
    expect(taskText).toHaveClass('completed');
    expect(screen.getByText(/осталось задач: 0/i)).toBeInTheDocument();
  });

  test('очищает выполненные задачи', () => {
    render(<App />);
    const input = screen.getByLabelText(/новая задача/i);
    const addButton = screen.getByText(/add/i);
    const clearButton = screen.getByText(/clear completed/i);

    fireEvent.change(input, { target: { value: 'Тестовая задача' } });
    fireEvent.click(addButton);
    fireEvent.click(screen.getByRole('checkbox'));
    fireEvent.click(clearButton);

    expect(screen.queryByText('Тестовая задача')).not.toBeInTheDocument();
  });

  test('фильтрует активные задачи', () => {
    render(<App />);
    const input = screen.getByLabelText(/новая задача/i);
    const addButton = screen.getByText(/add/i);

    fireEvent.change(input, { target: { value: 'Активная задача' } });
    fireEvent.click(addButton);
    fireEvent.change(input, { target: { value: 'Завершенная задача' } });
    fireEvent.click(addButton);
    fireEvent.click(screen.getAllByRole('checkbox')[1]);
    fireEvent.click(screen.getByText(/active/i));

    expect(screen.getByText('Активная задача')).toBeInTheDocument();
    expect(screen.queryByText('Завершенная задача')).not.toBeInTheDocument();
  });
});