import { useEffect, useState } from "react";
import styles from './AdminPainel.module.css';

const AdminPainel = () => {
  const [contratos, setContratos] = useState([]);

  useEffect(() => {
    fetch("https://backend-adacompany.onrender.com/api/contratos", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then((data) => setContratos(data.data || []))
      .catch((err) => console.error(err));
  }, []);

  const atualizarStatus = (id, status) => {
    fetch(`https://backend-adacompany.onrender.com/api/contratos/${id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify({ status_contrato: status }),
    })
      .then((res) => res.json())
      .then(() => window.location.reload());
  };

  return (
    <div className={styles.container}>
      <h2 className={styles.title}>Gerenciar Contratos</h2>
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
              <td>{c.orcamento?.cliente?.nome || "—"}</td>
              <td>{new Date(c.data_inicio).toLocaleDateString()}</td>
              <td>{new Date(c.data_entrega).toLocaleDateString()}</td>
              <td>R$ {Number(c.valor_contrato).toFixed(2)}</td>
              <td>{formatarStatus(c.status_contrato)}</td>
              <td>
                <select
                  value={c.status_contrato}
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
