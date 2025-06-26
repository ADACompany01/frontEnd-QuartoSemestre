'use client';
import React, { useState } from 'react';
import axios from 'axios';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [problemasEncontrados, setProblemasEncontrados] = useState([]);

  const apiUrl = window.location.hostname === 'localhost' || window.location.hostname === '127.0.0.1'
    ? 'http://localhost:3000'
    : 'https://backend-adacompany.onrender.com';

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setRecommendation('');
    setProblemasEncontrados([]);


    try {
      const response = await axios.post(`${apiUrl}/lighthouse/accessibility`, { url });
      const notaAcessibilidade = response.data.notaAcessibilidade;

      setResult(notaAcessibilidade);
      setProblemasEncontrados(response.data.reprovadas || []);

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

  const renderAuditItems = (items) => {
    return items.length > 0 ? (
      <ul>
        {items.map((item) => (
          <li key={item.id}>
            <p className="problem-title">{item.title}</p>
            <p className="problem-description">{item.description}</p>
          </li>
        ))}
      </ul>
    ) : (
      <p>Nenhum problema encontrado nesta categoria.</p>
    );
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

      {recommendation && (
        <div className="dashboard-recommendation">
          <p>{recommendation}</p>
        </div>
      )}
      {result !== null && (
        <div className="lighthouse-result-container">
          <div className="lighthouse-header">
            <h3>Resultado Lighthouse:</h3>
            <p>Nota de Acessibilidade: {result} / 100</p>
          </div>
          <div className="lighthouse-score-circle">
            <span>{result}</span>
          </div>
          <p className="accessibility-text">Acessibilidade</p>
          <p className="recommendation-text">
            Essas verificações destacam oportunidades para melhorar a acessibilidade do seu app da Web. A detecção automática só cobre parte dos problemas, recomendamos entrar em contato com a nossa equipe para melhorias.
          </p>

          <div className="problemas-encontrados-container">
            <h4 className="problemas-encontrados-title">
              <span className="warning-icon">⚠️</span> Problemas Encontrados ({problemasEncontrados.length})
            </h4>
            {renderAuditItems(problemasEncontrados)}
          </div>
        </div>
      )}


      {/* NOVO BLOCO - Detalhamento das auditorias */}
      
    </div>
  );
};

export default Dashboard;
