import { useParams } from "react-router-dom";
import DefaultLayout from "../DefaultLayout";
import { useProductDetails } from "../../../hook/useProductDetails";
import Typography from "../../atoms/Typography";
import { formatText } from "../../../utils";
import style from "./ProductDetails.module.css";

const ProductDetails = () => {
  const { id } = useParams();

  const { data, isLoading, error } = useProductDetails(id as string);

  return (
    <DefaultLayout>
      {isLoading && <p>Carregando...</p>}
      {error && <p>Erro ao carregar os dados.</p>}
      {data && (
        <div className={style.container}>
          <div className={style["main-content"]}>
            <img src={data.colorOptions[0].imageUrl} alt={data.name} />
            <div className={style["details-content"]}>
              <Typography
                content={formatText(data.name)}
                size="xl"
                weight="light"
                color="primary"
                as="h1"
              />
              <Typography
                content={`From ${data.basePrice} EUR`}
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
                    className={style["capacity-button"]}
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
                content="color. pick your favourite."
                size="md"
                weight="light"
                color="primary"
                as="p"
                className={style["color-title"]}
              />
              <div className={style["container-buttons"]}>
                {data.colorOptions.map((color) => (
                  <button key={color.name} className={style["color-button"]}>
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
              <button
                type="button"
                className={style["add-button"]}
                // disabled
              >
                ADD TO CART
              </button>
            </div>
            {/* <p>SPECIFICATIONS</p>
            <p>Marca: {data.brand}</p>
            <p>Descrição: {data.description}</p> */}
          </div>
          <div className={style["specs-content"]}>
            <Typography
              content="SPECIFICATIONS"
              size="lg"
              weight="light"
              color="primary"
              as="h2"
            />
            <ul>
              {Object.entries(data.specs).map(([key, value]) => (
                <li key={key}>
                  <Typography
                    content={`${key}: ${value}`}
                    size="md"
                    weight="light"
                    color="primary"
                    as="p"
                  />
                </li>
              ))}
            </ul>
          </div>
        </div>
      )}
    </DefaultLayout>
  );
};

export default ProductDetails;
