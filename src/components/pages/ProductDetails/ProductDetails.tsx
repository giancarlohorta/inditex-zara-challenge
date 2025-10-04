import { useParams } from "react-router-dom";
import DefaultLayout from "../DefaultLayout";
import { useProductDetails } from "../../../hook/useProductDetails";
import Typography from "../../atoms/Typography";
import { formatText, uniqueProducts } from "../../../utils";
import BackIcon from "../../../assets/back.svg?react";
import clsx from "clsx";
import SpecsList from "../../organisms/SpecsList";
import Button from "../../atoms/Button";
import ScrollSimilarProducts from "../../organisms/ScrollSimilarProducts";
import ButtonColor from "../../atoms/ButtonColor";
import style from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error, selected, handleSelected, handleAddToCart } =
    useProductDetails(id);

  return (
    <DefaultLayout>
      <div className={style["back-container"]}>
        <Button variant="ghost" className={style["back-button"]} href="/">
          <BackIcon />
          <Typography
            size="sm"
            weight="light"
            color="primary"
            as="p"
            className={style["back-text"]}
          >
            BACK
          </Typography>
        </Button>
      </div>

      <div className={style.container}>
        {isLoading && <p>Loading...</p>}
        {error && <p>Error loading data.</p>}
        {data && (
          <>
            <div className={style["main-content"]}>
              <div className={style["image-content"]}>
                <img
                  src={selected.imageUrl || data.colorOptions[0].imageUrl}
                  alt={data.name}
                  className={style["product-image"]}
                />
              </div>
              <div className={style["details-content"]}>
                <Typography size="xl" weight="light" color="primary" as="h1">
                  {formatText(data.name)}
                </Typography>
                <Typography size="lg" weight="light" color="primary" as="p">
                  {!selected.price
                    ? `From ${data.basePrice} EUR`
                    : `${selected.price} EUR`}
                </Typography>
                <Typography
                  size="md"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["storage-title"]}
                >
                  Storage ¿hOW MUCH SPACE DO YOU NEED?
                </Typography>
                <div className={style["container-buttons"]}>
                  {data.storageOptions.map((storage) => (
                    <button
                      type="button"
                      key={storage.capacity}
                      className={clsx(
                        style["capacity-button"],
                        selected.capacity === storage.capacity &&
                          style["active"]
                      )}
                      onClick={() =>
                        handleSelected({
                          capacity: storage.capacity,
                          price: storage.price,
                        })
                      }
                    >
                      <Typography
                        size="md"
                        weight="light"
                        color="primary"
                        as="p"
                      >
                        {storage.capacity}
                      </Typography>
                    </button>
                  ))}
                </div>
                <Typography
                  size="md"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["color-title"]}
                >
                  "COLOR. PiCK YOUR FAVORITE"
                </Typography>
                <div className={style["container-buttons"]}>
                  {data.colorOptions.map((color) => (
                    <ButtonColor
                      key={color.name}
                      color={color}
                      selected={selected}
                      onSelected={handleSelected}
                    />
                  ))}
                </div>
                <Typography
                  size="sm"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["color-name"]}
                >
                  {selected.colorName}
                </Typography>
                <Button
                  disabled={!selected.capacity}
                  className={style["add-button"]}
                  variant="primary"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
            <div className={style["specs-content"]}>
              <Typography size="lg" weight="light" color="primary" as="h2">
                SPECIFICATIONS
              </Typography>
              <SpecsList data={data} />
            </div>
            <div className={style["similar-content"]}>
              <Typography size="lg" weight="light" color="primary" as="h2">
                SIMILAR ITEMS
              </Typography>
              <ScrollSimilarProducts
                list={uniqueProducts(data.similarProducts)}
              />
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductDetails;
