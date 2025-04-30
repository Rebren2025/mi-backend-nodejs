const express = require('express');
const mariadb = require('mariadb');

const app = express();
const port = 3000;

// Configuración de la conexión con la base de datos
const pool = mariadb.createPool({
  host: 'mysql-rebren2025.alwaysdata.net', // Reemplázalo con tu host de base de datos
  user: '411475_db_u_root',           // Reemplázalo con tu usuario
  password: 'J1u3m5s7.2025',    // Reemplázalo con tu contraseña
  database: 'rebren2025_01',            // Reemplázalo con el nombre de tu base de datos
  connectionLimit: 5
});

// Ruta para obtener todos los justificantes
app.get('/justificantes', async (req, res) => {
  let conn;
  try {
    conn = await pool.getConnection();
    const rows = await conn.query('SELECT * FROM justificantes');
    res.json(rows);  // Devuelve los resultados como JSON
  } catch (err) {
    console.error(err);
    res.status(500).send('Error al obtener los datos');
  } finally {
    if (conn) conn.release();
  }
});

app.listen(port, () => {
  console.log(`Servidor en ejecución en http://localhost:${port}`);
});
