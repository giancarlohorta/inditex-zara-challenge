import { useState } from "react";
import { usePhones } from "../../../hook/usePhones";
import DefaultLayout from "../DefaultLayout";
import SearchArea from "../../organisms/SearchArea";
import ListItem from "../../organisms/ListItem";
import style from "./Products.module.css";

const Products = () => {
  const [searchValue, setSearchValue] = useState("");
  const { data, isLoading, error } = usePhones(searchValue);

  const handleSearch = (value: string) => setSearchValue(value);

  const isEmpty = data?.length === 0;
  const count = data?.length || 0;

  return (
    <DefaultLayout>
      <div className={style.container}>
        <SearchArea count={count} onEnter={handleSearch} />

        {!isLoading && error && <p>Erro ao carregar os dados.</p>}
        {!isLoading && isEmpty && <h2>Nenhum produto encontrado</h2>}
        {isLoading && <p>Carregando...</p>}
        {!isLoading && data && <ListItem list={data} />}
      </div>
    </DefaultLayout>
  );
};

export default Products;
