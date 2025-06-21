'use client';
import React, { useState } from 'react';
import axios from 'axios';
import './Portal.css';

const Dashboard = () => {
  const [url, setUrl] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [recommendation, setRecommendation] = useState('');
  const [reprovadas, setReprovadas] = useState([]);

  const renderDescription = (description) => {
    const match = description.match(/(.*)\[(.*?)\]\((.*?)\)/);

    if (match) {
      const textBeforeLink = match[1];
      const linkText = match[2];
      const linkUrl = match[3];
      return (
        <p>
          {textBeforeLink}
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>.
        </p>
      );
    }

    const linkOnlyMatch = description.match(/\[(.*?)\]\((.*?)\)/);
    if (linkOnlyMatch) {
      const linkText = linkOnlyMatch[1];
      const linkUrl = linkOnlyMatch[2];
      return (
        <p>
          <a href={linkUrl} target="_blank" rel="noopener noreferrer">
            {linkText}
          </a>
        </p>
      );
    }

    return <p>{description}</p>;
  };

  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setRecommendation('');
    setReprovadas([]);

    try {
      const response = await axios.post('http://localhost:3000/lighthouse/accessibility', { url });
      const notaAcessibilidade = response.data.notaAcessibilidade;

      setResult(notaAcessibilidade);
      setReprovadas(response.data.reprovadas || []);


      if (notaAcessibilidade < 50) {
        setRecommendation('🔴 Nota baixa: Contrate o nosso Pacote Básico de Acessibilidade para atingir uma nota média. Contate nossos especialistas para mais informações.');
      } else if (notaAcessibilidade < 80) {
        setRecommendation('🟡 Nota média: Contrate o nosso Pacote Intermediário para atingir um bom nível de acessibilidade. Contate nossos especialistas para mais informações.');
      } else {
        setRecommendation('🟢 Ótima nota! Seu site já atende bem aos padrões de acessibilidade. Caso queira melhorar ainda mais, contate o nosso Pacote Premium para garantir a melhor experiência para todos os usuários.');
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

      {(result !== null || recommendation) && (
        <div className="dashboard-content">
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

          {result !== null && (
            <div className="dashboard-details">
              {reprovadas.length > 0 && (
                <div className="problemas-encontrados">
                  <h4 className="problemas-encontrados-title">
                    <span role="img" aria-label="Warning">⚠️</span> Problemas Encontrados ({reprovadas.length})
                  </h4>
                  <ul className="problemas-lista">
                    {reprovadas.map((item) => (
                      <li key={item.id} className="problema-item">
                        <h5 className="problema-titulo">{item.title}</h5>
                        <div className="problema-descricao">
                          {renderDescription(item.description)}
                        </div>
                      </li>
                    ))}
                  </ul>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default Dashboard;
