import Card from './Card';

const Dashboard = () => (
  <div className="portal-dashboard">
    <Card title="Orçamentos" value="5" />
    <Card title="Contratos" value="3" />
    <Card title="Projetos" value="2 em andamento, 1 finalizado" />
  </div>
);

<<<<<<< Updated upstream
export default Dashboard;
=======
  const handleAnalyze = async () => {
    if (!url) return;
    setLoading(true);
    setResult(null);
    setRecommendation('');

    try {
      const response = await axios.post('https://backend-adacompany.onrender.com/lighthouse/accessibility', { url });
      const notaAcessibilidade = response.data.accessibilityScore;

      setResult(notaAcessibilidade);

      if (notaAcessibilidade < 50) {
        setRecommendation('🔴 Nota baixa: Recomendamos o Pacote Básico de Acessibilidade para atingir uma nota média. Entre em contato com nossos especialistas e faça um orçamento');
      } else if (notaAcessibilidade < 80) {
        setRecommendation('🟡 Nota média: Recomendamos o Pacote Intermediário para atingir um bom nível de acessibilidade. Entre em contato com nossos especialistas e faça um orçamento');
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
    </div>
  );
};

export default Dashboard;
>>>>>>> Stashed changes
