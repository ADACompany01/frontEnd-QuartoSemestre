import { useEffect, useState } from 'react';
import Table from './Table';

const Orcamentos = () => {
  const [orcamentos, setOrcamentos] = useState([]);
  const userId = localStorage.getItem('userId'); // ou o método que você usa para guardar o login

  useEffect(() => {
    fetch(`https://backend-adacompany.onrender.com/api/contratos=${userId}`)
      .then(res => res.json())
      .then(data => setOrcamentos(data))
      .catch(err => console.error('Erro ao buscar orçamentos:', err));
  }, []);

  // Transforma os dados no formato que o <Table> espera
  const rows = orcamentos.map(o => [
    o.nomeServico || '—',
    new Date(o.data).toLocaleDateString(),
    `R$ ${Number(o.valor).toFixed(2)}`,
    formatarStatus(o.status),
  ]);

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
