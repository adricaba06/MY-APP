import { getClient } from "../../../db/pool";
import type { NextApiRequest, NextApiResponse } from "next";

interface Task {
  id: number;
  title: string;
  description: string;
  selecionada: boolean;
  done: boolean;
}

// Handler para obtener todas las tareas desde la base de datos
export const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM todos");
    const todos: Task[] = result.rows;
    return res.status(200).json(todos);
  } catch (err) {
    console.error("Error al obtener las tareas:", err);
    return res.status(500).json({ message: "Error al obtener las tareas" });
  } finally {
    await client.end();
  }
};

// Este handler maneja las solicitudes GET para obtener todas las tareas

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  const client = getClient();
  try {
    await client.connect();
    const result = await client.query("SELECT * FROM todos");
    res.status(200).json(result.rows);
  } catch (error) {
    console.error("Error fetching tasks:", error);
    res.status(500).json({ error: "Error fetching tasks" });
  } finally {
    await client.end();
  }
}