import NavBar from '@/components/NavBar';
import { ReactNode } from 'react';

const NavLayout = ({ children }: { children: ReactNode }) => {
  return (
    <>
      <NavBar />
      {children}
    </>
  );
};

export default NavLayout;
