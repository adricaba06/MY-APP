import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/db/pool";

export default async function handleToggleDone(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Método de la petición: ", req.method);  

  if (req.method !== "PUT") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const {done, id} = req.body; 
    if (!id || done === undefined) {
        return res.status(400).json({ message: "Missing required fields" });
      }
      
    const query = `UPDATE todos SET done = NOT done WHERE id = $1;`;
    await pool.query(query, [id]); //ejecutamos la query en la base de datos
    res.status(201).json({ message: "Task changed successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
