import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../db/pool";

interface Task {
  id: number;
  title: string;
  description: string;
  selecionada: boolean;
  done: boolean;
}

const getTodos = async (req: NextApiRequest, res: NextApiResponse) => {
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

export default getTodos;
