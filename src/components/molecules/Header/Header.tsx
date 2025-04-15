import LogoIcon from "../../../assets/logo.svg?react";
import BagIcon from "../../../assets/bag-icon.svg?react";
import Button from "../../atoms/Button";
import style from "./Header.module.css";

interface HeaderProps {
  cart?: boolean;
  count?: number;
}

const Header = ({ cart, count }: HeaderProps) => {
  const showCount = typeof count === "number";
  return (
    <header aria-label="Main Header" className={style.header}>
      <Button type="link" className={style.logo} link="/">
        <LogoIcon aria-label="MBST logo" role="img" focusable="false" />
      </Button>

      {cart && (
        <nav aria-label="Main navigation" role="navigation">
          <Button type="link" className={style.logo} link="/cart">
            <BagIcon role="img" aria-label="Shopping cart" focusable="false" />
            {showCount && (
              <span
                className={style.count}
                aria-live="polite"
                aria-atomic="true"
              >
                {count}
              </span>
            )}
          </Button>
        </nav>
      )}
    </header>
  );
};

export default Header;
