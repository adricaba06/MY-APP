import React from "react";
import {
  render,
  screen,
  fireEvent,
  waitFor,
  act,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import Home from "../src/app/page";
import fetchMock from "jest-fetch-mock";
import Button from "../src/app/components/button";

fetchMock.enableMocks();

describe("Home", () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  it("renders correctly", async () => {
    // Simulamos una respuesta exitosa de fetch
    await act(async () => {
      fetchMock.mockResponseOnce(
        JSON.stringify([{ id: 1, title: "Task 1", description: "Test Task" }])
      );

      render(<Home />);
    });

    await waitFor(() => screen.getByRole("button", { name: /new task/i }));

    // Obtenemos los botones con getByRole o getByLabelText
    const newTaskButton =
      screen.getByRole("button", { name: /new task/i }) ||
      screen.getByLabelText(/new task/i);
    const deleteTaskButton =
      screen.getByRole("button", { name: /delete task/i }) ||
      screen.getByLabelText(/delete task/i);

    // Verificamos que los botones estén presentes en el page
    expect(newTaskButton).toBeInTheDocument();
    expect(deleteTaskButton).toBeInTheDocument();
  });

  it("calls delete task correctly", async () => {
    const mockDeleteFunction = jest.fn(); 

    render(<Button onClick={mockDeleteFunction}>Delete Task</Button>);

    const deleteButton = await screen.findByText("Delete Task"); 
    fireEvent.click(deleteButton);

    expect(mockDeleteFunction).toHaveBeenCalled(); 
  });

  it("calls add task correctly", async () => {
    const mockAddFunction = jest.fn(); 

    render(<Button onClick={mockAddFunction}>add Task</Button>);

    const addButton = await screen.findByText("add Task"); 
    fireEvent.click(addButton);

    expect(mockAddFunction).toHaveBeenCalled(); 
  });


});
