import clsx from "clsx";
import { ReactNode } from "react";
import { Link } from "react-router-dom";
import style from "./ButtonLink.module.css";

interface ButtonLinkProps {
  icon: ReactNode;
  to: string;
  count?: number;
  className?: string;
  ariaLabel?: string;
  testId?: string;
}

const ButtonLink = ({
  icon,
  to,
  count,
  className,
  ariaLabel,
  testId,
}: ButtonLinkProps) => {
  const showCount = typeof count === "number";

  return (
    <Link
      to={to}
      className={clsx(style.button, className)}
      aria-label={ariaLabel}
      data-testid={testId}
    >
      {icon}
      {showCount && (
        <span className={style.count} aria-live="polite" aria-atomic="true">
          {count}
        </span>
      )}
    </Link>
  );
};

export default ButtonLink;
