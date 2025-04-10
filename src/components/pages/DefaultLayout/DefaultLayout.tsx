import { ReactNode } from "react";
import Header from "../../molecules/Header";
import { useLocation } from "react-router-dom";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const location = useLocation();

  const hideHeaderRoutes = ["/cart"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      {shouldShowHeader && <Header />}
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
