import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import { TaskComponent, TaskProps } from '../src/app/components/task';

const mockProps: TaskProps = {
  title: 'Test Task',
  description: 'This is a test task',
  id: '1',
  selecionada: false,
  done: false,
  date: '2025-02-24',
  changeSelect: jest.fn(),
  toggleDone: jest.fn(),
  remove: jest.fn(),
  modify: jest.fn(),
};

describe('TaskComponent', () => {
  it('renders task with title and description', () => {
    render(<TaskComponent {...mockProps} />);
    const titleElement = screen.getByText('Test Task');
    const descriptionElement = screen.getByText('This is a test task');
    expect(titleElement).toBeInTheDocument();
    expect(descriptionElement).toBeInTheDocument();
  });

  it('calls changeSelect when task is clicked', () => {
    render(<TaskComponent {...mockProps} />);
    const taskElement = screen.getByText('Test Task');
    fireEvent.click(taskElement);
    expect(mockProps.changeSelect).toHaveBeenCalledWith(mockProps.id);
  });

  it('calls toggleDone when button is clicked', () => {
    render(<TaskComponent {...mockProps} />);
    const toggleButton = screen.getByText("Set as done")
    fireEvent.click( toggleButton);
    expect(mockProps.toggleDone).toHaveBeenCalledWith(mockProps.id);
  });
  

  it('calls remove when delete button is clicked', () => {
    render(<TaskComponent {...mockProps} />);
    const deleteButton = screen.getByTestId('delete-button');
    fireEvent.click(deleteButton);
    expect(mockProps.remove).toHaveBeenCalledWith(mockProps.id);
  });

  it('calls modify when edit button is clicked', () => {
    render(<TaskComponent {...mockProps} />);
    const modifyButton = screen.getByTestId('modify-button');
    fireEvent.click(modifyButton);
    expect(mockProps.modify).toHaveBeenCalledWith(mockProps.id);
  });
});
