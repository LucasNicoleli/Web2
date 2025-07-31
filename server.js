const express = require('express');
const app = express();
const port = 3000;
const fs = require('fs');

const readusuarios = () => {
    const data = fs.readFileSync('./usuarios.json')
    return JSON.parse(dados);
 }

 const writeUsuarios = () => {
  fs.writeFileSync('./usuarios.json', JSON.stringify(usuarios, null, 2));
 }



app.use(express.json());

app.listen(port, () => {
    console.log(`Servidor rodando em http://localhost:${port}`);
  });

app.get('/', (req, res) => {
  res.send('SERVIDOR NODE JS + Express rodando');
});

app.get('/usuarios', (req, res) => {
  const usuarios = readusuarios();
  res.json(usuarios);
});

app.get('/usuarios/:id', (req, res) => {
    const id = req.params.id;
    const usuario = usuarios.find(u => u.id === parseInt(id));
    if (usuario) {
        res.json(usuario);
    } else {
        res.status(404).send('Usuário não encontrado');
    }
  });

  app.delete('/usuarios/:id', (req, res) => {

    const id = parseInt(req.params.id);
    usuario = usuarios.filter(u => u.id !== id)
    res.json({message: `Usuário com id ${id} 
        nome: ${id.nome} deletado com sucesso!`});
  })

app.post('/usuarios', (req, res) => {
    const usuarios = readusuarios();
    const novoUsuario = {
        id: usuarios.length + 1,
        nome: req.body.nome
    }
});
    
    






