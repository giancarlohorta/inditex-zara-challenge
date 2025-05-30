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
          content={`CART (${totalCartItems})`}
          size="xl"
          weight="light"
          color="primary"
          as="h1"
        />
        <div className={style["cart-content"]}>
          {cart.map((item) => (
            <div key={item.id} className={style["cart-item"]}>
              <img
                src={item.imageUrl}
                alt={item.name}
                className={style["item-image"]}
              />

              <div className={style["item-details"]}>
                <Typography
                  content={formatText(item.name)}
                  size="sm"
                  weight="regular"
                  color="primary"
                  as="h2"
                />
                <Typography
                  content={`${formatText(item.capacity)} | ${formatText(item.color)}`}
                  size="sm"
                  weight="light"
                  color="primary"
                  as="p"
                />
                <Typography
                  content={`${item.price} EUR`}
                  size="sm"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["item-price"]}
                />
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
                content={`TOTAL`}
                size="md"
                weight="regular"
                color="primary"
                as="p"
                className={style["total-label"]}
              />
              <Typography
                content={`${totalCart} EUR`}
                size="md"
                weight="regular"
                color="primary"
                as="p"
                className={style["total-price"]}
              />
            </div>
          )}
          <Button className={style["footer-button"]} type="secondary" link="/">
            CONTINUE SHOPPING
          </Button>

          {totalCartItems > 0 && (
            <Button
              // disabled={!selected.capacity}
              className={style["footer-button"]}
              type="primary"
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
