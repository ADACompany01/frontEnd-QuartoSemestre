'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [reprovadas, setReprovadas] = useState([]);
  const [aprovadas, setAprovadas] = useState([]);
  const [manuais, setManuais] = useState([]);
  const [naoAplicaveis, setNaoAplicaveis] = useState([]);

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setRecommendation('');
    setReprovadas([]);
    setAprovadas([]);
    setManuais([]);
    setNaoAplicaveis([]);

    try {
      const response = await axios.post('https://backend-adacompany.onrender.com/lighthouse/accessibility', { url });
      const notaAcessibilidade = response.data.notaAcessibilidade;

      setResult(notaAcessibilidade);
      setReprovadas(response.data.reprovadas || []);
      setAprovadas(response.data.aprovadas || []);
      setManuais(response.data.manuais || []);
      setNaoAplicaveis(response.data.naoAplicaveis || []);

      if (notaAcessibilidade < 50) {
        setRecommendation('🔴 Nota baixa: Recomendamos o Pacote Básico de Acessibilidade para atingir uma nota média.');
      } else if (notaAcessibilidade < 80) {
        setRecommendation('🟡 Nota média: Recomendamos o Pacote Intermediário para atingir um bom nível de acessibilidade.');
      } else {
        setRecommendation('🟢 Ótima nota! Seu site já atende bem aos padrões de acessibilidade.');
      }
    } catch (error) {
      console.error(error);
      setRecommendation('Erro ao processar o diagnóstico. Verifique o link e tente novamente.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="portal-dashboard dashboard-container">
      <h2 className="dashboard-title">Diagnóstico de Acessibilidade</h2>

      <input
        type="text"
        placeholder="Digite o link do seu site (ex: https://exemplo.com)"
        value={url}
        onChange={(e) => setUrl(e.target.value)}
        className="dashboard-input"
      />

      <button
        onClick={handleAnalyze}
        disabled={loading || !url}
        className="portal-button dashboard-button"
      >
        {loading ? 'Analisando...' : 'Analisar Acessibilidade'}
      </button>

      {result !== null && (
        <div className="dashboard-result">
          <h3>Resultado Lighthouse:</h3>
          <p>Nota de Acessibilidade: <strong>{result}</strong> / 100</p>
        </div>
      )}

      {recommendation && (
        <div className="dashboard-recommendation">
          <p>{recommendation}</p>
        </div>
      )}

      {/* NOVO BLOCO - Detalhamento das auditorias */}
      {result !== null && (
        <div className="dashboard-details">
          <h3>Detalhamento da Auditoria:</h3>

          <div className="audit-section">
            <h4>❌ Reprovadas:</h4>
            {reprovadas.length > 0 ? (
              <ul>
                {reprovadas.map((item) => (
                  <li key={item.id}><strong>{item.title}</strong>: {item.description}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhuma reprovação.</p>
            )}
          </div>

          <div className="audit-section">
            <h4>✅ Aprovadas:</h4>
            {aprovadas.length > 0 ? (
              <ul>
                {aprovadas.map((item) => (
                  <li key={item.id}><strong>{item.title}</strong></li>
                ))}
              </ul>
            ) : (
              <p>Nenhum item aprovado.</p>
            )}
          </div>

          <div className="audit-section">
            <h4>⚠️ Requer Verificação Manual:</h4>
            {manuais.length > 0 ? (
              <ul>
                {manuais.map((item) => (
                  <li key={item.id}><strong>{item.title}</strong>: {item.description}</li>
                ))}
              </ul>
            ) : (
              <p>Nenhum item manual.</p>
            )}
          </div>

          <div className="audit-section">
            <h4>🚫 Não Aplicável:</h4>
            {naoAplicaveis.length > 0 ? (
              <ul>
                {naoAplicaveis.map((item) => (
                  <li key={item.id}><strong>{item.title}</strong></li>
                ))}
              </ul>
            ) : (
              <p>Nenhum item não aplicável.</p>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
