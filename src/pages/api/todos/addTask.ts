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
    const { title, description, selecionada, done, date } = req.body; //extraemos los datos del body
    if (
      !title ||
      !description ||
      selecionada === undefined ||
      done === undefined ||
      !date
    ) {
      return res.status(400).json({ message: "Missing required fields" });
    }
    const query = `INSERT INTO todos (title, description, selecionada, done, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    const result = await pool.query(query, [title, description, selecionada, done, date]); //ejecutamos la query en la base de datos
    res.status(201).json(result.rows[0]); // Devolver la tarea creada
  } catch (error) {
    console.error("Error adding task:", error);
    return res.status(500).json({ message: "Internal Server Error" });
  }
}