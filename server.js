import express from "express";
import mysql from "mysql2";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

// ✅ Definir __dirname correctamente (ESM no lo trae por defecto)
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// ✅ Configuración inicial
const app = express();
const PORT = process.env.PORT || 3000;

app.use(cors());
app.use(express.json());

// ✅ Conexión MySQL (Usando los valores que estaban en el código funcional)
const db = mysql.createConnection({
    host: "localhost",
    user: "root",
    password: "",
    database: "votaciones"
});

db.connect((err) => {
    if (err) {
        console.error("❌ Error al conectar con MySQL:", err);
        // Opcional: Cerrar el proceso si la conexión a DB es crítica
        // process.exit(1); 
    } else {
        console.log("✅ Conexión exitosa con MySQL.");
    }
});

// ------------------------------------
// ✅ Rutas de la API
// ------------------------------------

// ✅ RUTA PRINCIPAL
app.get("/", (req, res) => {
    res.status(200).send(`
        <html>
            <head><title>Servidor Activo</title></head>
            <body style="font-family: Arial; text-align: center; margin-top: 60px;">
                <h1>🚀 Servidor Activo</h1>
                <p>Usa <a href="/influencers">/influencers</a> para ver los datos.</p>
            </body>
        </html>
    `);
});

// ✅ Obtener todos los influencers
app.get("/influencers", (req, res) => {
    db.query("SELECT * FROM influencers", (err, results) => {
        if (err) {
            console.error("❌ Error al obtener datos:", err);
            res.status(500).json({ error: "Error al obtener influencers" });
        } else {
            res.json(results);
        }
    });
});

// ✅ Votar “Grato”
app.post("/votar/si/:id", (req, res) => {
    const { id } = req.params;
    db.query("UPDATE influencers SET votosSi = votosSi + 1 WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("❌ Error al votar:", err);
            res.status(500).json({ error: "Error al registrar voto" });
        } else {
            res.json({ success: true, message: "Voto registrado como 'Grato'" });
        }
    });
});

// ✅ Votar “No Grato”
app.post("/votar/no/:id", (req, res) => {
    const { id } = req.params;
    db.query("UPDATE influencers SET votosNo = votosNo + 1 WHERE id = ?", [id], (err) => {
        if (err) {
            console.error("❌ Error al votar:", err);
            res.status(500).json({ error: "Error al registrar voto" });
        } else {
            res.json({ success: true, message: "Voto registrado como 'No Grato'" });
        }
    });
});

// ✅ Registrar una nueva visita
app.post("/registrar-visita", (req, res) => {
    db.query("INSERT INTO visitas () VALUES ()", (err) => {
        if (err) {
            console.error("❌ Error al registrar visita:", err);
            res.status(500).json({ error: "Error al registrar visita" });
        } else {
            res.json({ success: true, message: "Visita registrada" });
        }
    });
});

// ✅ Obtener el total de visitas
app.get("/total-visitas", (req, res) => {
    db.query("SELECT COUNT(*) AS total FROM visitas", (err, results) => {
        if (err) {
            console.error("❌ Error al obtener visitas:", err);
            res.status(500).json({ error: "Error al obtener visitas" });
        } else {
            // results es un array, results[0] contiene { total: N }
            res.json(results[0]);
        }
    });
});

// ------------------------------------
// ✅ Servir archivos estáticos (Angular)
// ------------------------------------

// ✅ Servir los archivos estáticos del build de Angular
// Asegúrate de que el path 'dist/star-influence/browser' sea correcto para tu proyecto
app.use(express.static(path.join(__dirname, "dist/star-influence/browser")));

// ✅ Redirigir cualquier otra ruta no API al index.html de Angular (para routing de SPA)
app.use((req, res) => {
    res.sendFile(path.join(__dirname, "dist/star-influence/browser/index.html"));
});

// ------------------------------------
// ✅ Iniciar Servidor (Sólo una vez)
// ------------------------------------
app.listen(PORT, () => {
    console.log(`🚀 Servidor corriendo en http://localhost:${PORT}`);
    console.log(`🌐 Entorno: ${process.env.NODE_ENV || 'Desarrollo'}`);
});