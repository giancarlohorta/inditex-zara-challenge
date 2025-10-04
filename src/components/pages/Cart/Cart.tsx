import DefaultLayout from "../DefaultLayout";
import { useCart } from "../../../hook/useCart";
import Button from "../../atoms/Button";
import style from "./Cart.module.css";
import Typography from "../../atoms/Typography";
import { formatText } from "../../../utils";

const Cart = () => {
  const { cart, totalCartItems, removeFromCart, totalCart } = useCart();

  return (
    <DefaultLayout>
      <div className={style.container}>
        <Typography
          size="xl"
          weight="light"
          color="primary"
          as="h1"
        >{`CART (${totalCartItems})`}</Typography>
        <div className={style["cart-content"]}>
          {cart.map((item) => (
            <div key={item.id} className={style["cart-item"]}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={style["item-image"]}
              />

              <div className={style["item-details"]}>
                <Typography size="sm" weight="regular" color="primary" as="h2">
                  {formatText(item.name)}
                </Typography>
                <Typography
                  size="sm"
                  weight="light"
                  color="primary"
                  as="p"
                >{`${formatText(item.capacity)} | ${formatText(item.color)}`}</Typography>
                <Typography
                  size="sm"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["item-price"]}
                >{`${item.price} EUR`}</Typography>
                <button
                  className={style.remove}
                  onClick={() =>
                    removeFromCart(item.id, item.capacity, item.color)
                  }
                >
                  Eliminar
                </button>
              </div>
            </div>
          ))}
        </div>
        <div className={style.footer}>
          {totalCartItems > 0 && (
            <div className={style.checkout}>
              <Typography
                size="md"
                weight="regular"
                color="primary"
                as="p"
                className={style["total-label"]}
              >
                TOTAL
              </Typography>
              <Typography
                size="md"
                weight="regular"
                color="primary"
                as="p"
                className={style["total-price"]}
              >{`${totalCart} EUR`}</Typography>
            </div>
          )}
          <Button
            className={style["footer-button"]}
            variant="secondary"
            href="/"
          >
            CONTINUE SHOPPING
          </Button>

          {totalCartItems > 0 && (
            <Button
              className={style["footer-button"]}
              variant="primary"
              onClick={() => alert("Payment successful!")}
            >
              PAY
            </Button>
          )}
        </div>
      </div>
    </DefaultLayout>
  );
};

export default Cart;
