import { useProducts } from "../../../hook/useProducts";
import DefaultLayout from "../DefaultLayout";
import SearchArea from "../../organisms/SearchArea";
import ListItem from "../../organisms/ListItem";
import style from "./Products.module.css";

const Products = () => {
  const { data, isLoading, error, handleSearch, isEmpty, count } =
    useProducts();

  return (
    <DefaultLayout>
      <div className={style.container}>
        <SearchArea count={count} onEnter={handleSearch} />

        {error && <p>Error loading data.</p>}
        {isEmpty && <h2>No products found</h2>}
        {isLoading && <p>Loading...</p>}
        {data && <ListItem list={data} />}
      </div>
    </DefaultLayout>
  );
};

export default Products;
