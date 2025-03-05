import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../../src/db/pool";

export default async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Método de la petición: ", req.method);

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  const client = getClient();
  await client.connect(); 
  console.log("Cliente de la base de datos conectado:", client);

  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }

    const query = `DELETE FROM todos WHERE id = $1 RETURNING *;`;
    const result = await client.query(query, [id]); 

    if (result.rowCount === 0) {
      return res.status(404).json({ message: "Task not found" });
    }

    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  } finally {
    client.end();
  }
}
