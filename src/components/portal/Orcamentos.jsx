import { useEffect, useState } from 'react';
import Table from './Table';
import { getUserId } from '../../utils';

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const token = localStorage.getItem('token');
  const userId = getUserId(); // Usa a função utilitária

  // Função para deixar o status bonito
  const formatarStatus = (status) => {
    switch (status) {
      case 'em_analise': return 'Em Análise';
      case 'aprovado': return 'Aprovado';
      case 'concluido': return 'Concluído';
      case 'cancelado': return 'Cancelado';
      case 'em_andamento': return 'Em Andamento';
      default: return 'Pendente';
    }
  };

  useEffect(() => {
    const fetchOrcamentos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== DEBUG ORÇAMENTOS ===');
        console.log('User ID:', userId);
        console.log('Token:', token ? 'Presente' : 'Ausente');
        console.log('Token completo:', token);
        
        if (!userId) {
          throw new Error('User ID não encontrado no token');
        }
        
        if (!token) {
          throw new Error('Token não encontrado no localStorage');
        }

        console.log('Fazendo requisição para:', 'https://backend-adacompany.onrender.com/api/orcamentos');

        const response = await fetch('https://backend-adacompany.onrender.com/api/orcamentos', {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`,
          },
        });

        console.log('Status da resposta:', response.status);
        console.log('Headers da resposta:', response.headers);

        if (!response.ok) {
          const errorText = await response.text();
          console.log('Erro da resposta:', errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);

        // Filtra os orçamentos do usuário logado
        const orcamentosDoUsuario = data.data ? data.data.filter(o => o.id_cliente === userId) : [];
        console.log('Orçamentos filtrados:', orcamentosDoUsuario);
        console.log('Total de orçamentos encontrados:', orcamentosDoUsuario.length);
        
        setOrcamentos(orcamentosDoUsuario);
      } catch (err) {
        console.error('Erro ao buscar orçamentos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchOrcamentos();
  }, [userId, token]);

  // Transforma os dados no formato que o <Table> espera
  const rows = orcamentos.map(o => [
    o.pacote?.nome || '—',
    new Date(o.data_orcamento).toLocaleDateString(),
    `R$ ${Number(o.valor_orcamento).toFixed(2)}`,
    formatarStatus(o.status),
  ]);

  if (loading) {
    return <div>Carregando orçamentos...</div>;
  }

  if (error) {
    return <div>Erro ao carregar orçamentos: {error}</div>;
  }

  return (
    <div>
      <div className="portal-header-row">
        <h2>Orçamentos</h2>
        <button className="portal-button">Solicitar Orçamento</button>
      </div>
      <Table
        headers={['Nome', 'Data', 'Valor', 'Status']}
        rows={rows}
      />
    </div>
  );
};

export default Orcamentos;
