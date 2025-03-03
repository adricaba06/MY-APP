import React from "react";
import { render, screen, fireEvent } from "@testing-library/react";
import "@testing-library/jest-dom";
import { getTodos } from "../../../../src/pages/api/todos";
import { NextApiRequest, NextApiResponse } from "next";

interface Todo {
  //
}

const rowsMock: Todo[] = [];

const queryMock = jest.fn();

const jsonMock = jest.fn();

const statusMock = jest.fn((status) => ({
  json: jsonMock
}));

jest.mock('../../../../src/db/pool', () => ({
  getClient: () => {
    return {
      query: queryMock
    };
  }
}));

describe("get todos ", () => {

  it("http 200", async () => {
    const request: NextApiRequest = {} as any;
    const response: NextApiResponse = {
      status: statusMock,
    } as any;
    queryMock.mockImplementation(() => Promise.resolve({
      rows: rowsMock
    }));
    await getTodos(request, response);
    expect(queryMock).toHaveBeenCalledWith("SELECT * FROM todos");
    expect(statusMock).toHaveBeenCalledWith(200);
    expect(jsonMock).toHaveBeenCalledWith(rowsMock);
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
    expect(queryMock).toHaveBeenCalledWith("SELECT * FROM todos");
    expect(statusMock).toHaveBeenCalledWith(500);
    expect(jsonMock).toHaveBeenCalledWith({"message": "Error al obtener las tareas"});
  });
});
