import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import '@testing-library/jest-dom';
import Form, {formProps} from '../src/app/components/Form';

describe("Form Component", () => {
  test("renders the form correctly", () => {
    render(<Form submit={() => {}} />);

    expect(screen.getByPlaceholderText("Task Name")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add a Description")).toBeInTheDocument();
    expect(screen.getByPlaceholderText("Add a Date ( yyyy-mm-dd )")).toBeInTheDocument();
    expect(screen.getByRole("button", { name: /submit/i })).toBeInTheDocument();
  });

  test("updates input fields correctly", () => {
    render(<Form submit={() => {}} />);

    const titleInput = screen.getByPlaceholderText("Task Name");
    const descriptionInput = screen.getByPlaceholderText("Add a Description");
    const dateInput = screen.getByPlaceholderText("Add a Date ( yyyy-mm-dd )");

    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test description" } });
    fireEvent.change(dateInput, { target: { value: "2025-02-25" } });

    expect(titleInput).toHaveValue("Test Task");
    expect(descriptionInput).toHaveValue("This is a test description");
    expect(dateInput).toHaveValue("2025-02-25");
  });

  test("calls submit function with correct values", () => {
    const mockSubmit = jest.fn();
    render(<Form submit={mockSubmit} />);

    const titleInput = screen.getByPlaceholderText("Task Name");
    const descriptionInput = screen.getByPlaceholderText("Add a Description");
    const dateInput = screen.getByPlaceholderText("Add a Date ( yyyy-mm-dd )");
    const submitButton = screen.getByRole("button", { name: /submit/i });

    fireEvent.change(titleInput, { target: { value: "Test Task" } });
    fireEvent.change(descriptionInput, { target: { value: "This is a test description" } });
    fireEvent.change(dateInput, { target: { value: "2025-02-25" } });

    fireEvent.click(submitButton);

    expect(mockSubmit).toHaveBeenCalledWith("Test Task", "This is a test description", "2025-02-25");
    expect(mockSubmit).toHaveBeenCalledTimes(1);
  });
});

