import style from "../styles/SearchBar.module.css";
import { useState } from "react";
import { useSelector,useDispatch } from "react-redux";
import debounce from "@/utils/debounce";
import { setFilters } from "@/redux/features/products/productsSlice";
import { useRouter } from "next/router";

export default function SearchBar() {
  const filters = useSelector(state => state.products.filters)
  const navigate = useRouter();

  const [input, setInput] = useState("");
  // const [suggestions, setSuggestions] = useState([]);

  

  const dispatch = useDispatch()
  // const handleChangeInput = (event) => {
  //   const { value } = event.target;
  //   setInput(value);
  //   if (!value) setSuggestions([]);
  //   else {
  //     const filteredProducts = products.copyItems.filter((product) =>
  //       product.category.toLowerCase().includes(value.toLowerCase())
  //     );
  //     const categories = [];
  //     const uniqueCategories = [];
  //     filteredProducts.forEach((product) => {
  //       if (!categories.includes(product.category)) {
  //         // si la categoría aún no está en el array
  //         categories.push(product.category);
  //         uniqueCategories.push(product);
  //       }
  //     });
  //     setSuggestions(uniqueCategories.slice(0, 4));
  //   }
  // };


  const handleChangeInput = (event) =>{
    const { value } = event.target;
    setInput(value)

  }

  const handleSubmit = (event) => {
    event.preventDefault;
    dispatch(setFilters({
      ...filters,
      name: input
    }));

    if(navigate.pathname !== "/productos"){
      navigate.push('/productos');
    }
    
  };

  const debouncedHandleSubmit = debounce(handleSubmit, 1000);
  

  return (
    <div className={style.container}>
      <input
        onChange={(e) => handleChangeInput(e)}
        autoComplete="off"
        type="text"
        name="text"
        className={style.input}
        placeholder="Buscar productos, marcas y más..."
        value={input}
      />
      <button onClick={debouncedHandleSubmit} className={style.search__btn}>
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          width="22"
          height="22"
        >
          <path
            d="M18.031 16.6168L22.3137 20.8995L20.8995 22.3137L16.6168 18.031C15.0769 19.263 13.124 20 11 20C6.032 20 2 15.968 2 11C2 6.032 6.032 2 11 2C15.968 2 20 6.032 20 11C20 13.124 19.263 15.0769 18.031 16.6168ZM16.0247 15.8748C17.2475 14.6146 18 12.8956 18 11C18 7.1325 14.8675 4 11 4C7.1325 4 4 7.1325 4 11C4 14.8675 7.1325 18 11 18C12.8956 18 14.6146 17.2475 15.8748 16.0247L16.0247 15.8748Z"
            fill="#efeff1"
          ></path>
        </svg>
      </button>
      {/* {suggestions.length > 0 && (
        <ul className={style.suggestions}>  
          {suggestions.map((product) => (
            <li onClick={() => handleClick(product.category)} name={product.category} key={product.id}>{product.category}</li>
          ))}
        </ul>
      )} */}
    </div>
  );
}
