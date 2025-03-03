import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/db/pool";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id, title, description, date } = req.body;

    // Verifica que los datos están llegando correctamente
    console.log("Datos recibidos:", { id, title, description, date });

    if (!id || id.trim() === "" || !title || !description || !date) {
      return res.status(400).json({ message: "Title and description cannot be empty" });
    }

    // Verifica si el 'id' es un string válido
    if (typeof id !== 'string') {
      return res.status(400).json({ message: "Invalid or missing 'id'" });
    }

    // Consulta para actualizar la tarea
    const query = `UPDATE todos SET title = $1, description = $2 WHERE id = $3`;
    await getClient().query(query, [title, description, id,]);

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
