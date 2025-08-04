const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');
const cors = require('cors');
const path = require('path');

app.use(cors());
app.use(express.json());

const filePath = path.join(__dirname, 'usuarios.json');

const readUsuarios = () => {
  if (!fs.existsSync(filePath)) {
    fs.writeFileSync(filePath, '[]');
  }
  const data = fs.readFileSync(filePath);
  return JSON.parse(data);
};

const writeUsuarios = (usuarios) => {
  fs.writeFileSync(filePath, JSON.stringify(usuarios, null, 2));
};

app.listen(port, () => {
  console.log(`Servidor rodando em http://localhost:${port}`);
});

app.get('/', (req, res) => {
  res.send('SERVIDOR NODE JS + Express rodando');
});

app.get('/usuarios', (req, res) => {
  const usuarios = readUsuarios();
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
  const usuarios = readUsuarios();
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (usuario) {
    res.json(usuario);
  } else {
    res.status(404).send('Usuário não encontrado');
  }
});

app.delete('/usuarios/:id', (req, res) => {
  const usuarios = readUsuarios();
  const id = parseInt(req.params.id);
  const usuario = usuarios.find(u => u.id === id);
  if (!usuario) {
    return res.status(404).send('Usuário não encontrado');
  }
  const usuariosAtualizados = usuarios.filter(u => u.id !== id);
  writeUsuarios(usuariosAtualizados);
  res.json({ message: `Usuário com id ${id} deletado com sucesso!` });
});

app.post('/usuarios', (req, res) => {
  const usuarios = readUsuarios();
  const { nome } = req.body;

  if (!nome || typeof nome !== 'string') {
    return res.status(400).send('Nome inválido');
  }

  const novoUsuario = {
    id: usuarios.length > 0 ? usuarios[usuarios.length - 1].id + 1 : 1,
    nome
  };

  usuarios.push(novoUsuario);
  writeUsuarios(usuarios);
  res.status(201).json(novoUsuario);
});
