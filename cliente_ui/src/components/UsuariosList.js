import React, { useEffect, useState } from 'react';
import axios from 'axios';

function UsuariosList() {
  const [usuarios, setUsuarios] = useState([]);

  const fetchUsuarios = async () => {
    const response = await axios.get('http://localhost:3000/usuarios');
    setUsuarios(response.data);
  };

  useEffect(() => {
    fetchUsuarios();
  }, []);

  return (
    <div>
      <h3>Lista de Usuários cadastrados: </h3>
      {usuarios.length > 0 ? (
        <ul>
          {usuarios.map((usuario, index) => (
            <li key={index}>
              {usuario.nome} 
              ||
               'Usuário ${index+1} '
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