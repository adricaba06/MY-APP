import { Pool } from "pg";
import "dotenv/config";  // Asegúrate de que dotenv está configurado correctamente

// Crear una instancia de Pool para manejar las conexiones a PostgreSQL
const pool = new Pool({
  host: process.env.POSTGRES_HOST,
  user: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DB,
  port: Number(process.env.POSTGRES_PORT), // Asegúrate de convertir el puerto a un número
  idleTimeoutMillis: 30000, // Tiempo de espera antes de cerrar conexiones inactivas
});

export { pool };

const testConnection = async () => {
  try {
    const res = await pool.query("SELECT NOW()");
    console.log("DB Connected:", res.rows[0]);
  } catch (error) {
    console.error("Error connecting to the database:", error);
  }
};

// Ejecutar la prueba de conexión (opcional, no es necesario si solo quieres usar el pool)
testConnection();
