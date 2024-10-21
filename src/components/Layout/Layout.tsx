// src/components/Layout/Layout.tsx
import SearchBar from '../SearchBar/SearchBar';

import './Layout.scss';

const Layout: React.FC<{ children: React.ReactNode }> = ({ children }) => (
  <div className="layout-wrapper">
    <SearchBar />
    <div className="content-wrapper">
      {children}
    </div>
  </div>
);

export default Layout;
