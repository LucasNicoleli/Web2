import React, { useState } from 'react';
import axios from 'axios';

export default function UsuariosForm() {
  const [nome, setNome] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!nome.trim()) return;

    try {
      await axios.post('http://localhost:3000/usuarios', { nome });
      setNome('');
      alert('Usuário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro ao salvar usuário:', error);
      alert('Erro ao salvar usuário');
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <label>Digite o nome do usuário</label>
      <input
        type="text"
        value={nome}
        onChange={(e) => setNome(e.target.value)}
      />
      <button type="submit">SALVAR</button>
    </form>
  );
}
