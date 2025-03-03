import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../db/pool";

export default async function handleToggleDone(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Método recibido:", req.method);  // Verifica qué método llega

  // Asegúrate de que el método sea PUT
  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed", received: req.method });
  }

  try {
    const { done, id } = req.body;

    if (!id || done === undefined) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    console.log("ID recibido:", id, "Nuevo estado done:", done);

    // Convertir done a booleano en caso de que venga como string
    const doneBoolean = done === true || done === "true";

    const client = getClient();
    await client.connect();  // Conectarse explícitamente a la base de datos
    console.log("Conexión exitosa a la base de datos");

    const query = `UPDATE todos SET done = $2 WHERE id = $1;`;
    const result = await client.query(query, [id, doneBoolean]);

    console.log("Filas afectadas:", result.rowCount);

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task updated successfully" });
  } catch (error) {
    console.error("Error updating task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    // Asegurarse de que la conexión se cierre siempre
    const client = getClient();
    await client.end();
  }
}
