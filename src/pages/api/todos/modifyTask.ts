import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../../src/db/pool";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const client = getClient();
  await client.connect(); // Conectar el cliente aquí
  console.log("Cliente de la base de datos conectado:", client);

  try {
    const { id, title, description, date } = req.body;

    // Verifica que los datos estén llegando correctamente
    console.log("Datos recibidos:", { id, title, description, date });

    // Validación de los datos recibidos
    if (!id || typeof id !== 'number' || !title || !description || !date) {
      return res.status(400).json({
        message: "ID must be a number, and title, description, and date cannot be empty",
      });
    }

    // Consulta para actualizar la tarea
    const query = "UPDATE todos SET title = $1, description = $2, date = $3 WHERE id = $4 RETURNING *;";

    console.log("Ejecutando consulta:", query);
    console.log("Valores:", [title, description, date, id]);

    const result = await client.query(query, [title, description, date, id]);
    console.log("Resultado de la consulta:", result.rowCount); // Verifica cuántas filas se actualizaron

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" }); // Si no se encontró la tarea, retorna un 404
    }

    // Devolver la tarea actualizada
    res.status(200).json({ message: "Task updated successfully" });

  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.end(); // Asegúrate de cerrar la conexión después de la consulta
  }
}
