import { useParams } from "react-router-dom";
import DefaultLayout from "../DefaultLayout";
import { useProductDetails } from "../../../hook/useProductDetails";
import Typography from "../../atoms/Typography";
import { formatText } from "../../../utils";
import BackIcon from "../../../assets/back.svg?react";
import clsx from "clsx";
import SpecsList from "../../organisms/SpecsList";
import Button from "../../atoms/Button";
import style from "./ProductDetails.module.css";
import ScrollSimilarProducts from "../../organisms/ScrollSimilarProducts";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error, selected, handleSelected, handleAddToCart } =
    useProductDetails(id);

  return (
    <DefaultLayout>
      <div className={style["back-container"]}>
        <Button type="link" className={style["back-button"]} link="/">
          <BackIcon />
          <Typography
            content="BACK"
            size="sm"
            weight="light"
            color="primary"
            as="p"
            className={style["back-text"]}
          />
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
                <Typography
                  content={formatText(data.name)}
                  size="xl"
                  weight="light"
                  color="primary"
                  as="h1"
                />
                <Typography
                  content={
                    !selected.price
                      ? `From ${data.basePrice} EUR`
                      : `${selected.price} EUR`
                  }
                  size="lg"
                  weight="light"
                  color="primary"
                  as="p"
                />
                <Typography
                  content="Storage ¿hOW MUCH SPACE DO YOU NEED?"
                  size="md"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["storage-title"]}
                />
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
                        content={storage.capacity}
                        size="md"
                        weight="light"
                        color="primary"
                        as="p"
                      />
                    </button>
                  ))}
                </div>
                <Typography
                  content="COLOR. PiCK YOUR FAVORITE"
                  size="md"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["color-title"]}
                />
                <div className={style["container-buttons"]}>
                  {data.colorOptions.map((color) => (
                    <button
                      key={color.name}
                      className={clsx(
                        style["color-button"],
                        selected.hexCode === color.hexCode && style["active"]
                      )}
                      onClick={() =>
                        handleSelected({
                          hexCode: color.hexCode,
                          imageUrl: color.imageUrl,
                          colorName: color.name,
                        })
                      }
                      aria-label={color.name}
                    >
                      <span
                        style={{
                          backgroundColor: color.hexCode,
                          width: "20px",
                          height: "20px",
                          display: "block",
                        }}
                      ></span>
                    </button>
                  ))}
                </div>
                <Typography
                  content={selected.colorName}
                  size="sm"
                  weight="light"
                  color="primary"
                  as="p"
                  className={style["color-name"]}
                />
                <Button
                  disabled={!selected.capacity}
                  className={style["add-button"]}
                  type="primary"
                  onClick={handleAddToCart}
                >
                  ADD TO CART
                </Button>
              </div>
            </div>
            <div className={style["specs-content"]}>
              <Typography
                content="SPECIFICATIONS"
                size="lg"
                weight="light"
                color="primary"
                as="h2"
              />
              <SpecsList data={data} />
            </div>
            <div className={style["similar-content"]}>
              <Typography
                content="SIMILAR ITEMS"
                size="lg"
                weight="light"
                color="primary"
                as="h2"
              />
              <ScrollSimilarProducts list={data.similarProducts} />
            </div>
          </>
        )}
      </div>
    </DefaultLayout>
  );
};

export default ProductDetails;
