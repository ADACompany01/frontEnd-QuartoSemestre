import React from 'react';
import { useNavigate } from 'react-router-dom';
import { jwtDecode } from 'jwt-decode';
import './LoginPage.css';

export default function SignIn() {
  const navigate = useNavigate();
  const [email, setEmail] = React.useState('');
  const [senha, setSenha] = React.useState('');
  const [erro, setErro] = React.useState('');
  const apiUrl = 'https://backend-adacompany.onrender.com';

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch(`${apiUrl}/auth/login`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, senha }),
      });

      if (response.ok) {
        const result = await response.json();
<<<<<<< Updated upstream

        // Verifica se o token foi retornado antes de salvá-lo
        if (result.token) {
          const token = result.token;
          localStorage.setItem('token', token);
          localStorage.setItem('token', result.token);
          const decodedToken = jwtDecode(token);
          const userRole = decodedToken.tipo_usuario;
          localStorage.setItem('userRole', userRole);
          console.log('Role do usuário:', userRole);
          console.log('Login com sucesso');
          alert('Login com sucesso!');
          if (userRole === 'cliente') {
            navigate('/portalcliente');
          } else if (userRole === 'funcionario') {
            navigate('/portalcliente');
          } else {
            navigate('/');
          }
        } else {
          console.error('Token de autenticação não encontrado na resposta');
        }
=======
        const token = result.token;
        localStorage.setItem('token', token);
        const decoded = jwtDecode(token);
        const role = decoded.role;
        localStorage.setItem('userRole', role);
        navigate(role === 'cliente' ? '/portalcliente' : '/admin');
>>>>>>> Stashed changes
      } else {
        setErro('Credenciais inválidas. Tente novamente.');
      }
    } catch (err) {
      setErro('Erro na comunicação com o servidor.');
    }
  };

  return (
    <div className="login-container">
      <form className="login-card" onSubmit={handleSubmit}>
        <h2 className="login-title">Login</h2>

        <label className="login-label">Email</label>
        <input
          className="login-input"
          type="email"
          placeholder="email@exemplo.com"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />

        <label className="login-label">Senha</label>
        <input
          className="login-input"
          type="password"
          placeholder="••••••••"
          value={senha}
          onChange={(e) => setSenha(e.target.value)}
          required
        />

        {erro && <p className="login-error">{erro}</p>}

        <button type="submit" className="login-button">Entrar</button>

        <div className="login-divider">ou</div>

        <button className="login-button-outline" onClick={() => alert('Login com Google')}>
          Login com Google
        </button>
        <button className="login-button-outline" onClick={() => alert('Login com Facebook')}>
          Login com Facebook
        </button>

        <p className="login-register">
          Não tem conta? <a href="/#SignUpClient">Cadastre-se</a>
        </p>
      </form>
    </div>
  );
}
