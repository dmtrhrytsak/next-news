import { Toolbar } from './Toolbar';

const Layout = ({ children }) => {
  return (
    <>
      <Toolbar />
      <main>{children}</main>
    </>
  );
};

export default Layout;
