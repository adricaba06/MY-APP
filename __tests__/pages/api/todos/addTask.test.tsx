import handler from "../../../../src/pages/api/todos/addTask"; // Ruta de tu API
import { getClient } from "../../../../src/db/pool"; // Ruta para mockear la BD
import { NextApiRequest, NextApiResponse } from "next"; // Importamos los tipos de Next.js

jest.mock("../../../../src/db/pool"); // Mockeamos la conexión a la BD

describe("POST /api/todos/addTask", () => {
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

  it("Debe devolver 201 y el objeto insertado si los datos son válidos", async () => {
    const newTodo = {
      title: "Test",
      description: "prueba",
      selecionada: false,
      done: false,
      date: "2024-03-04",
    };

    mockQuery.mockResolvedValueOnce({ rows: [newTodo] });

    // Simulamos req
    const req = {
      method: "POST",
      body: newTodo,
    } as NextApiRequest;

    // Simulamos res
    const res = {
      status: jest.fn().mockReturnThis(), // Simula res.status()
      json: jest.fn(), // Simula res.json()
    } as unknown as NextApiResponse;
    

    // Ejecutamos el handler de la API directamente
    await handler(req, res);

    // Verificamos que la respuesta sea la esperada
    expect(res.status).toHaveBeenCalledWith(201);
    expect(res.json).toHaveBeenCalledWith(newTodo);
    expect(mockQuery).toHaveBeenCalledWith(
      "INSERT INTO todos (title, description, selecionada, done, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;",
      [newTodo.title, newTodo.description, newTodo.selecionada, newTodo.done, newTodo.date]
    );
  });

  it("Debe devolver 400 si faltan datos requeridos", async () => {
    // Mock de req
    const req = {
      method: "POST",
      body: { title: "Falta descripción" },
    } as NextApiRequest;

    // Simulamos res
    const res = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    } as unknown as NextApiResponse;

    await handler(req, res);

    expect(res.status).toHaveBeenCalledWith(400);
    expect(res.json).toHaveBeenCalledWith({ message: "Faltan campos requeridos" });
  });

  it("Debe devolver 500 en caso de error del servidor", async () => {
    mockQuery.mockRejectedValueOnce(new Error("Error en la base de datos"));

    const req = {
      method: "POST",
      body: {
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
    expect(res.json).toHaveBeenCalledWith({ message: "Error del servidor interno" });
  });
});