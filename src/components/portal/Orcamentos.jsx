import Table from './Table';

const Orcamentos = () => (
  <div>
    <div className="portal-header-row">
      <h2>Orçamentos</h2>
      <button className="portal-button">Solicitar Orçamento</button>
    </div>
    <Table
      headers={['Nome', 'Data', 'Valor', 'Status']}
      rows={[
        ['Orçamento 1', '01/05/2025', 'R$ 1.000', 'Aprovado'],
        ['Orçamento 2', '03/05/2025', 'R$ 2.500', 'Pendente'],
      ]}
    />
  </div>
);

export default Orcamentos;