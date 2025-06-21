import React, { useState } from 'react';
import './SignUpClient.css';

export default function SignUpClient() {
  const [formData, setFormData] = useState({
    id: '',
    nomeCliente: '',
    telefone: '',
    cep: '',
    logradouro: '',
    complemento: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    ddd: '',
    cnpj: '',
    email: '',
    senha: '',
    telefoneUsuario: '',
    nomeCompleto: '',
  });

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const buscarEndereco = async () => {
    if (!formData.cep) return;
    try {
      const response = await fetch(`https://viacep.com.br/ws/${formData.cep}/json/`);
      const data = await response.json();
      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }
      setFormData({
        ...formData,
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || '',
        estado: data.uf || '',
        ddd: data.ddd || '',
      });
    } catch (error) {
      console.error('Erro ao buscar o CEP', error);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('https://backend-adacompany.onrender.com/clientes/cadastro', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formData),
      });

      if (response.ok) {
        alert('Cliente cadastrado com sucesso!');
        setFormData({});
      } else {
        alert('Erro ao cadastrar cliente.');
      }
    } catch (error) {
      console.error('Erro no cadastro:', error);
    }
  };

  return (
    <div className="signup-container">
      <div className="signup-card">
        <h2 className="signup-title">Cadastro de Cliente</h2>
        <form onSubmit={handleSubmit} className="signup-form">
          {Object.keys(formData).map((field) => (
            <div className="form-group" key={field}>
              <label>{field}</label>
              <input
                type={field === 'senha' ? 'password' : 'text'}
                name={field}
                value={formData[field] || ''}
                onChange={handleChange}
                onBlur={field === 'cep' ? buscarEndereco : undefined}
                placeholder={`Digite ${field}`}
              />
            </div>
          ))}
          <button type="submit" className="signup-button">Cadastrar</button>
        </form>

        <div className="signup-divider">ou</div>

        <div className="signup-social-buttons">
          <button>Login com Google</button>
          <button>Login com Facebook</button>
        </div>
      </div>
    </div>
  );
}
