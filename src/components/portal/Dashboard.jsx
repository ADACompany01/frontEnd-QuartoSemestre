import Card from './Card';

const Dashboard = () => (
  <div className="portal-dashboard">
    <Card title="Orçamentos" value="5" />
    <Card title="Contratos" value="3" />
    <Card title="Projetos" value="2 em andamento, 1 finalizado" />
  </div>
);

export default Dashboard;