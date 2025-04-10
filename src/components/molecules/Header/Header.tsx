import LogoIcon from "../../../assets/logo.svg?react";
import BagIcon from "../../../assets/bag-icon.svg?react";
import ButtonLink from "../../atoms/ButtonLink";
import style from "./Header.module.css";

const Header = () => {
  return (
    <header aria-label="Main Header" className={style.header}>
      <ButtonLink
        to="/"
        icon={<LogoIcon aria-label="MBST logo" role="img" />}
        className={style.logo}
      />

      <nav aria-label="main navegation">
        <ButtonLink
          to="/cart"
          icon={<BagIcon aria-hidden="true" />}
          count={0}
        />
      </nav>
    </header>
  );
};

export default Header;
