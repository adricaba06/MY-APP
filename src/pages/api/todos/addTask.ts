import { NextApiRequest, NextApiResponse } from "next";
import { pool } from "@/db/pool";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  console.log("Método de la petición: ", req.method);  

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Method Not Allowed" });
  }

  try {
    const { title, description, selecionada, done, id } = req.body; //extraemos los datos del body
    if (
      !title ||
      !description ||
      selecionada === undefined ||
      done === undefined ||
      !id
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const query = `INSERT INTO todos (title, description, selecionada, done, id) VALUES ($1, $2, $3, $4, $5)`;
    await pool.query(query, [title, description, selecionada, done, id]); //ejecutamos la query en la base de datos
    res.status(201).json({ message: "Task added successfully" });
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}
