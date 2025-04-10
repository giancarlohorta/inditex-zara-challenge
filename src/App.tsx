import "./App.css";
import { usePhones } from "./hook/usePhones";
import { Product } from "./types/product";

function App() {
  const { data, isLoading, error } = usePhones();

  if (isLoading) return <p>Carregando...</p>;
  if (error) return <p>Erro ao carregar os dados.</p>;

  return (
    <div>
      {data.map((phone: Product) => (
        <div key={phone.id}>
          <img src={phone.imageUrl} alt={phone.name} />
          <h2>{phone.name}</h2>
          <p>{phone.brand}</p>
          <p>{phone.basePrice}€</p>
        </div>
      ))}
    </div>
  );
}

export default App;
