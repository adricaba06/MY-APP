import handler from "../../../../src/pages/api/todos/deleteTask"; // Ruta de tu API
import { getClient } from "../../../../src/db/pool"; // Ruta para mockear la BD
import { NextApiRequest, NextApiResponse } from "next"; // Importamos los tipos de Next.js

jest.mock("../../../../src/db/pool"); // Mockeamos la conexión a la BD

describe("API/todos/deleteTask", () => {
  let mockQuery: jest.Mock;
  let mockClient: { connect: jest.Mock; query: jest.Mock; end: jest.Mock };

  beforeEach(() => {
    mockQuery = jest.fn();
    mockClient = {
      connect: jest.fn(),
      query: mockQuery,
      end: jest.fn(),
    };

    (getClient as jest.Mock).mockReturnValue(mockClient); // Simulamos la conexión
  });

  it("Debe eliminar un todo y devolver 200", async () => {
    const todoToDelete = {
      title: "Test",
      description: "prueba",
      selecionada: false,
      done: false,
      date: "2024-03-04",
      id: 1,
    };

    // Simulamos que la consulta DELETE fue exitosa y eliminó el todo
    mockQuery.mockResolvedValueOnce({ rowCount: 1, rows: [todoToDelete] });

    const req = {
      method: "DELETE",
      body: { id: 1 }, 
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(200); 
    expect(res.json).toHaveBeenCalledWith({ message: "Task deleted successfully" });
    expect(mockQuery).toHaveBeenCalledWith("DELETE FROM todos WHERE id = $1 RETURNING *;", [
      1,
    ]);
  });

  it("Debe devolver 400 si faltan datos requeridos", async () => {
    const req = {
      method: "DELETE",
      body: { title: "Falta descripción" }, // Datos incompletos
    } as NextApiRequest;

    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({
      message: "Missing required fields",
    });
  });

  it("Debe devolver 404 si no se encuentra la tarea", async () => {
    mockQuery.mockResolvedValueOnce({ rowCount: 0, rows: [] }); //FUERXZO que no se haya encontrado tarea

    const req = {
      method: "DELETE",
      body: { id: 999 }, // ID que no existe
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
      method: "DELETE",
      body: {
        title: "Test",
        description: "prueba",
        selecionada: false,
        done: false,
        date: "2024-03-04",
        id: 1,
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
