import { ReactNode } from "react";
import Header from "../../molecules/Header";
import { useLocation } from "react-router-dom";
import { useCart } from "../../../context/CartContext";

interface DefaultLayoutProps {
  children: ReactNode;
}

const DefaultLayout = ({ children }: DefaultLayoutProps) => {
  const location = useLocation();
  const { totalCartItems } = useCart();

  const hideHeaderRoutes = ["/cart"];
  const shouldShowHeader = !hideHeaderRoutes.includes(location.pathname);

  return (
    <>
      <Header cart={shouldShowHeader} count={totalCartItems} />
      <main>{children}</main>
    </>
  );
};

export default DefaultLayout;
