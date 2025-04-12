import { useProducts } from "../../../hook/UseProducts";
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

        {error && <p>Erro ao carregar os dados.</p>}
        {isEmpty && <h2>Nenhum produto encontrado</h2>}
        {isLoading && <p>Carregando...</p>}
        {data && <ListItem list={data} />}
      </div>
    </DefaultLayout>
  );
};

export default Products;
