import * as React from 'react';
import Box from '@mui/material/Box';
import Button from '@mui/material/Button';
import CssBaseline from '@mui/material/CssBaseline';
import Divider from '@mui/material/Divider';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import Stack from '@mui/material/Stack';
import MuiCard from '@mui/material/Card';
import Select from '@mui/material/Select';
import MenuItem from '@mui/material/MenuItem';
import { styled } from '@mui/material/styles';
import AppTheme from '../shared-theme/AppTheme';
import { GoogleIcon, FacebookIcon, SitemarkIcon } from './CustomIcons';
import ColorModeSelect from '../shared-theme/ColorModeSelect';
import { Navigate } from 'react-router-dom';

const Card = styled(MuiCard)(({ theme }) => ({
  display: 'flex',
  flexDirection: 'column',
  alignSelf: 'center',
  width: '100%',
  padding: theme.spacing(4),
  gap: theme.spacing(2),
  margin: 'auto',
  boxShadow:
    'hsla(220, 30%, 5%, 0.05) 0px 5px 15px 0px, hsla(220, 25%, 10%, 0.05) 0px 15px 35px -5px',
  [theme.breakpoints.up('sm')]: {
    width: '450px',
  },
}));

const SignUpContainer = styled(Stack)(({ theme }) => ({
  height: '2000px',
  minHeight: '100%',
  padding: theme.spacing(2),
  [theme.breakpoints.up('sm')]: {
    padding: theme.spacing(4),
  },
}));

export default function SignUpFuncionario(props) {
  const token = localStorage.getItem('token');

  if (!token) {
   return <Navigate to="/signin" />;
  }
  const [endereco, setEndereco] = React.useState({
    logradouro: '',
    bairro: '',
    localidade: '',
    uf: '',
    estado: '',
    ddd: '',
  });

  // Função para buscar o endereço pelo CEP
  const buscarEndereco = async (cep) => {
    if (!cep) return;

    try {
      const response = await fetch(`https://viacep.com.br/ws/${cep}/json/`);
      const data = await response.json();

      if (data.erro) {
        alert('CEP não encontrado');
        return;
      }

      setEndereco({
        logradouro: data.logradouro || '',
        bairro: data.bairro || '',
        localidade: data.localidade || '',
        uf: data.uf || '',
        estado: data.estado || '', // Pode ser vazio dependendo da resposta do ViaCEP
        ddd: data.ddd || '',
      });
    } catch (error) {
      console.error('Erro ao buscar o endereço:', error);
      alert('Erro ao buscar o endereço.');
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const data = new FormData(event.currentTarget);

    const formData = {
      _id: parseInt(data.get('_id')),
      nomeFuncionario: data.get('nomeFuncionario'),
      telefone: data.get('telefone'),
      endereco: {
        cep: data.get('cep'),
        logradouro: endereco.logradouro,
        complemento: data.get('complemento'),
        bairro: endereco.bairro,
        localidade: endereco.localidade,
        uf: endereco.uf,
        estado: endereco.estado,
        ddd: endereco.ddd,
      },
      localizacao: {
        type: 'Point',
        coordinates: [0,0] // Placeholder -  Latitude and Longitude will be added later.
      },
      cargo: data.get('cargo'),
      usuario: {
        email: data.get('email'),
        senha: data.get('senha'),
        tipoUsuario: 'admin',
        telefone: data.get('telefoneUsuario'),
        nomeCompleto: data.get('nomeCompleto'),
      },
    };

    try {
      const response = await fetch('https://api-ada-company.vercel.app/api/auth/registerFuncionario', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        const errorData = await response.json();
        throw new Error(`Erro ao registrar funcionário: ${errorData.message || response.statusText}`);
      }

      const result = await response.json();
      console.log(result);
      alert('Funcionário cadastrado com sucesso!');
    } catch (error) {
      console.error('Erro:', error);
      alert(`Erro ao cadastrar funcionário: ${error.message}`);
    }
  };
  return (
    <AppTheme {...props}>
      <CssBaseline enableColorScheme />
      <ColorModeSelect sx={{ position: 'fixed', top: '1rem', right: '1rem' }} />
      <SignUpContainer direction="column" justifyContent="space-between">
        <Card variant="outlined">
          <SitemarkIcon />
          <Typography component="h1" variant="h4">
            Cadastrar Funcionário
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            {/* ID e Nome */}
            <FormControl>
              <FormLabel htmlFor="_id">ID</FormLabel>
              <TextField name="_id" required fullWidth id="_id" type="number" placeholder="ID" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nomeFuncionario">Nome do funcionário</FormLabel>
              <TextField name="nomeFuncionario" required fullWidth id="nomeFuncionario" placeholder="Nome do funcionário" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="telefone">Telefone</FormLabel>
              <TextField name="telefone" required fullWidth id="telefone" placeholder="(11) 12345-6789" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="cargo">Cargo</FormLabel>
              <TextField name="cargo" required fullWidth id="cargo" placeholder="Cargo" />
            </FormControl>

            {/* CEP */}
            <FormControl>
              <FormLabel htmlFor="cep">CEP</FormLabel>
              <TextField
                name="cep"
                required
                fullWidth
                id="cep"
                placeholder="12345-678"
                onBlur={(e) => buscarEndereco(e.target.value)} // Aciona a busca ao perder o foco
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="logradouro">Logradouro</FormLabel>
              <TextField
                name="logradouro"
                required
                fullWidth
                id="logradouro"
                value={endereco.logradouro}
                onChange={(e) => setEndereco({ ...endereco, logradouro: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="complemento">Complemento</FormLabel>
              <TextField name="complemento" fullWidth id="complemento" placeholder="Apto 101" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="bairro">Bairro</FormLabel>
              <TextField
                name="bairro"
                required
                fullWidth
                id="bairro"
                value={endereco.bairro}
                onChange={(e) => setEndereco({ ...endereco, bairro: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="localidade">Localidade</FormLabel>
              <TextField
                name="localidade"
                required
                fullWidth
                id="localidade"
                value={endereco.localidade}
                onChange={(e) => setEndereco({ ...endereco, localidade: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="uf">UF</FormLabel>
              <TextField
                name="uf"
                required
                fullWidth
                id="uf"
                value={endereco.uf}
                onChange={(e) => setEndereco({ ...endereco, uf: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="estado">Estado</FormLabel>
              <TextField
                name="estado"
                required
                fullWidth
                id="estado"
                value={endereco.estado}
                onChange={(e) => setEndereco({ ...endereco, estado: e.target.value })}
              />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="ddd">DDD</FormLabel>
              <TextField name="ddd" required fullWidth id="ddd" placeholder="11" value={endereco.ddd} />
            </FormControl>
            {/* Usuário */}
            <FormControl>
              <FormLabel htmlFor="email">Email</FormLabel>
              <TextField name="email" required fullWidth id="email" placeholder="your@email.com" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="senha">Senha</FormLabel>
              <TextField name="senha" required fullWidth type="password" id="senha" placeholder="••••••" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="telefoneUsuario">Telefone do Usuário</FormLabel>
              <TextField name="telefoneUsuario" required fullWidth id="telefoneUsuario" placeholder="(11) 12345-6789" />
            </FormControl>
            <FormControl>
              <FormLabel htmlFor="nomeCompleto">Nome Completo do Usuário</FormLabel>
              <TextField name="nomeCompleto" required fullWidth id="nomeCompleto" placeholder="Nome Completo" />
            </FormControl>
            <Button type="submit" fullWidth variant="contained">
              Cadastrar
            </Button>
          </Box>
          <Divider>
            <Typography sx={{ color: 'text.secondary' }}>ou</Typography>
          </Divider>
          <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
            <Button fullWidth variant="outlined" startIcon={<GoogleIcon />}>
              Login com Google
            </Button>
            <Button fullWidth variant="outlined" startIcon={<FacebookIcon />}>
              Login com Facebook
            </Button>
          </Box>
        </Card>
      </SignUpContainer>
    </AppTheme>
  );
}
