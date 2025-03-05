import { NextApiRequest, NextApiResponse } from "next";
import getTodos from "../../../../src/pages/api/todos";
import { getClient } from "../../../../src/db/pool"; 

interface Todo {
  //
}

const rowsMock: Todo[] = [];

const queryMock = jest.fn();
const endMock = jest.fn(); // Añadir el mock del método end

const jsonMock = jest.fn();
const statusMock = jest.fn((status) => ({
  json: jsonMock
}));

jest.mock('../../../../src/db/pool', () => ({
  getClient: jest.fn(() => ({
    connect: jest.fn(),
    query: queryMock,
    end: endMock // Incluir el método end en el mock
  }))
}));

describe("get todos", () => {

  it("http 200", async () => {
    const request: NextApiRequest = {} as any;
    const response: NextApiResponse = {
      status: statusMock,
    } as any;
    queryMock.mockImplementation(() => Promise.resolve({
      rows: rowsMock
    }));
    await getTodos(request, response);
    console.log("Mock de query (200):", queryMock.mock.calls);
    console.log("Mock de status (200):", statusMock.mock.calls);
    console.log("Mock de json (200):", jsonMock.mock.calls);
    expect(queryMock).toHaveBeenCalledWith("SELECT * FROM todos");
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(rowsMock);
    expect(endMock).toHaveBeenCalled(); // Verificar que el método end ha sido llamado
  });

  it("http 500", async () => {
    const request: NextApiRequest = {} as any;
    const response: NextApiResponse = {
      status: statusMock,
    } as any;
    queryMock.mockImplementation(() => {
      throw new Error("Something");
    });
    await getTodos(request, response);
    console.log("Mock de query (500):", queryMock.mock.calls);
    console.log("Mock de status (500):", statusMock.mock.calls);
    console.log("Mock de json (500):", jsonMock.mock.calls);
    expect(queryMock).toHaveBeenCalledWith("SELECT * FROM todos");
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({"message": "Error al obtener las tareas"});
    expect(endMock).toHaveBeenCalled(); // Verificar que el método end ha sido llamado
  });
});
