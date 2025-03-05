import { NextApiRequest, NextApiResponse } from "next";
import { getClient } from "../../../db/pool";

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  console.log("Método de la petición:", req.method);
  const client = getClient();
  await client.connect(); // Conectar el cliente aquí
  console.log("Cliente de la base de datos conectado:", client);

  if (req.method !== "POST") {
    return res.status(405).json({ message: "Método no permitido" });
  }

  try {
    const { title, description, selecionada, done, date } = req.body;
    console.log("Datos recibidos:", req.body);

    if (!title || !description || selecionada === undefined || done === undefined || !date) {
      return res.status(400).json({ message: "Faltan campos requeridos" });
    }

    const query = `INSERT INTO todos (title, description, selecionada, done, date) VALUES ($1, $2, $3, $4, $5) RETURNING *;`;
    console.log("Ejecutando consulta:", query);
    console.log("Valores:", [title, description, selecionada, done, date]);

    const result = await client.query(query, [title, description, selecionada, done, date]);
    console.log("Resultado de la consulta:", result.rows[0]);

    res.status(201).json(result.rows[0]);
  } catch (error) {
    console.error("Error al añadir la tarea:", error);
    return res.status(500).json({ message: "Error del servidor interno" });
  } finally {
    client.end(); // Asegúrate de cerrar la conexión después de la consulta
  }
}