import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);

  useEffect(() => {
    const fetchUsuarios = async () => {
      try {
        const response = await axios.get('http://localhost:3000/usuarios');
        setUsuarios(response.data);
      } catch (error) {
        console.error('Erro ao buscar usuários:', error);
      }
    };

    fetchUsuarios();
  }, []);

  return (
    <div>
      <h3>Lista de Usuários cadastrados:</h3>
      {usuarios.length > 0 ? (
        <ul>
          {usuarios.map((usuario, index) => (
            <li key={usuario.id || index}>
              {usuario.nome || `Usuário ${index + 1}`}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário cadastrado.</p>
      )}
    </div>
  );
}

export default UsuariosList;
