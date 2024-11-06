const express = require('express');
const path = require('path');

const app = express();
const PORT = 3000;

// Sirve los archivos estáticos de la carpeta actual
app.use(express.static(path.join(__dirname)));

// Ruta para servir el HTML
app.get('/', (req, res) => {
    res.sendFile(path.join(__dirname, './index.html'));
});

app.listen(PORT, () => {
    console.log(`Servidor en http://localhost:${PORT}`);
});
