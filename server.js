const express = require('express');
const path = require('path');
const app = express();
const PORT = process.env.PORT || 3000;

// Servir arquivos estáticos da pasta public
app.use(express.static(path.join(__dirname, 'public')));

// Endpoint opcional para buscar o conteúdo (útil se quiser integrar com GitHub Actions ou CMS depois)
app.get('/api/content', (req, res) => {
  res.sendFile(path.join(__dirname, 'data', 'content.json'));
});

app.listen(PORT, () => {
  console.log(`✅ Servidor rodando em http://localhost:${PORT}`);
});
