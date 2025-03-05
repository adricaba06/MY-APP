import handler from "../../../../src/pages/api/todos/modifyTask"; 
import { getClient } from "../../../../src/db/pool"; // Ruta para mockear la BD
import { NextApiRequest, NextApiResponse } from "next"; // Importamos los tipos de Next.js

jest.mock("../../../../src/db/pool"); // Mockeamos la conexión a la BD

let mockQuery: jest.Mock;
let mockClient: { connect: jest.Mock; query: jest.Mock; end: jest.Mock };

describe("PUT /api/todos/modifyTask", () => {
  beforeEach(() => {
    mockQuery = jest.fn();
    mockClient = {
      connect: jest.fn(),
      query: mockQuery,
      end: jest.fn(),
    };

    (getClient as jest.Mock).mockReturnValue(mockClient); // Simulamos la conexión
  });

  it("Debe devolver 200 y el objeto actualizado si los datos son válidos", async () => {
    const todoToChange = {
      id: 1,
      title: "Test",
      description: "prueba",
      selecionada: false,
      done: false,
      date: "2024-03-04",
    };

    // Simulamos que la consulta UPDATE fue exitosa y actualizó el todo
    mockQuery.mockResolvedValueOnce({ rowCount: 1, rows: [todoToChange] });

    // Simulamos req
    const req = {
      method: "PUT",
      body: todoToChange,
    } as NextApiRequest;

    // Simulamos res
    const res = {
      status: jest.fn().mockReturnThis(), // Simula res.status()
      json: jest.fn(), // Simula res.json()
    } as unknown as NextApiResponse;

    // Ejecutamos el handler de la API directamente
    await handler(req, res);

    // Verificamos que la respuesta sea la esperada
    expect(res.status).toHaveBeenCalledWith(200); // Cambiado a 200
    expect(res.json).toHaveBeenCalledWith({ message: "Task updated successfully" }); // Mensaje actualizado
    expect(mockQuery).toHaveBeenCalledWith(
      expect.stringMatching(/UPDATE todos SET title = \$1, description = \$2, date = \$3 WHERE id = \$4 RETURNING \*;/),
      [
        todoToChange.title,
        todoToChange.description,
        todoToChange.date,
        todoToChange.id,
      ]
    );
    
  });

  it("Debe devolver 400 si faltan datos requeridos", async () => {
    const req = {
      method: "PUT",
      body: { title: "Falta descripción" }, // Datos incompletos
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "ID must be a number, and title, description, and date cannot be empty", // Mensaje actualizado
    });
  });

  it("Debe devolver 404 si no se encuentra la tarea", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0, rows: [] }); // Simulamos que no se encontró ninguna tarea

    const req = {
      method: "PUT",
      body: { id: 999, title: "No existe", description: "Tarea no encontrada", selecionada: false, done: false, date: "2024-03-04" },
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(404);
    expect(res.json).toHaveBeenCalledWith({ message: "Task not found" });
  });

  it("Debe devolver 500 en caso de error del servidor", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Internal Server Error"));

    const req = {
      method: "PUT",
      body: {
        id: 1,
        title: "Test",
        description: "prueba",
        selecionada: false,
        done: false,
        date: "2024-03-04",
      },
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(500);
    expect(res.json).toHaveBeenCalledWith({ message: "Internal Server Error" });
  });
});
