import { useEffect, useState } from "react";
import styles from './AdminPainel.module.css';

const AdminPainel = () => {
  const [contratos, setContratos] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchContratos = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('=== DEBUG CONTRATOS ===');
        const token = localStorage.getItem("token");
        console.log('Token:', token ? 'Presente' : 'Ausente');
        
        const response = await fetch("https://backend-adacompany.onrender.com/contratos", {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });
        
        console.log('Status da resposta:', response.status);
        
        if (!response.ok) {
          const errorText = await response.text();
          console.log('Erro da resposta:', errorText);
          throw new Error(`HTTP error! status: ${response.status} - ${errorText}`);
        }

        const data = await response.json();
        console.log('Dados recebidos:', data);
        
        setContratos(data.data || data || []);
      } catch (err) {
        console.error('Erro ao buscar contratos:', err);
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchContratos();
  }, []);

  const atualizarStatus = async (id, status) => {
    try {
      console.log('Atualizando contrato:', id, 'para status:', status);
      
      const response = await fetch(`https://backend-adacompany.onrender.com/contratos/${id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${localStorage.getItem("token")}`,
        },
        body: JSON.stringify({ status_contrato: status }),
      });

      if (!response.ok) {
        const errorText = await response.text();
        throw new Error(`Erro ao atualizar: ${response.status} - ${errorText}`);
      }

      const result = await response.json();
      console.log('Contrato atualizado:', result);
      
      // Recarrega os dados em vez de recarregar a página
      window.location.reload();
    } catch (error) {
      console.error('Erro ao atualizar contrato:', error);
      alert(`Erro ao atualizar contrato: ${error.message}`);
    }
  };

  if (loading) {
    return <div className={styles.container}>Carregando contratos...</div>;
  }

  if (error) {
    return <div className={styles.container}>Erro ao carregar contratos: {error}</div>;
  }

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciar Contratos</h2>
      {contratos.length === 0 ? (
        <p>Nenhum contrato encontrado.</p>
      ) : (
        <table className={styles.table}>
          <thead>
            <tr>
              <th>Cliente</th>
              <th>Início</th>
              <th>Entrega</th>
              <th>Valor</th>
              <th>Status</th>
              <th>Atualizar</th>
            </tr>
          </thead>
          <tbody>
            {contratos.map((c) => (
              <tr key={c.id_contrato}>
                <td>
                  {c.orcamento?.pacote?.cliente?.nome || 
                   c.orcamento?.cliente?.nome || 
                   c.cliente?.nome || 
                   "—"}
                </td>
                <td>{c.data_inicio ? new Date(c.data_inicio).toLocaleDateString() : "—"}</td>
                <td>{c.data_entrega ? new Date(c.data_entrega).toLocaleDateString() : "—"}</td>
                <td>R$ {Number(c.valor_contrato || 0).toFixed(2)}</td>
                <td>{formatarStatus(c.status_contrato)}</td>
                <td>
                  <select
                    value={c.status_contrato || ""}
                    onChange={(e) => atualizarStatus(c.id_contrato, e.target.value)}
                  >
                    <option value="EM_ANALISE">Em Análise</option>
                    <option value="EM_ANDAMENTO">Em Andamento</option>
                    <option value="CONCLUIDO">Concluído</option>
                    <option value="CANCELADO">Cancelado</option>
                  </select>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
};

const formatarStatus = (status) => {
  switch (status) {
    case 'EM_ANALISE': return 'Em Análise';
    case 'EM_ANDAMENTO': return 'Em Andamento';
    case 'CONCLUIDO': return 'Concluído';
    case 'CANCELADO': return 'Cancelado';
    default: return '—';
  }
};

export default AdminPainel;
