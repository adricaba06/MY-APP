import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "@/db/pool";

export default async function handleDelete(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Método de la petición: ", req.method);

  if (req.method !== "DELETE") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { id } = req.body;
    if (!id) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const query = `DELETE FROM todos WHERE id = $1;`;
    await getClient().query(query, [id]);
    //ejecutamos la query en la base de datos
    res.status(201).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
