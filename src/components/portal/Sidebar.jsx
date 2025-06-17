import { Link } from "react-router-dom";

const Sidebar = () => {
  const menu = [
    { label: 'Dashboard', path: '' },
    { label: 'Orçamentos', path: 'orcamentos' },
    { label: 'Contratos', path: 'contratos' },
    { label: 'Projetos', path: 'projetos' }];

  return (
    <aside className="portal-sidebar">
      <h2>Cliente Portal</h2>
      <nav className="portal-nav">
        {menu.map(({ label, path }) => (
          <Link key={path} to={`/portalcliente/${path}`}>
            {label}
          </Link>
        ))}
      </nav>
    </aside>
  );
};

export default Sidebar;