import styles from "../styles/FilterPanel.module.css";
import Accordion from 'react-bootstrap/Accordion';
import 'bootstrap/dist/css/bootstrap.min.css';
import Slider from "react-slider";
import { useDispatch, useSelector } from "react-redux";
import { setFilters } from "@/redux/features/products/productsSlice";
import {AUDIO,BELLEZA,SALUD,FIESTAS,JUEGOS,HERAMIENTAS,INSTRUMENTOS,CONSOLAS,PAPELERIA,AGRO,ANTIGUEDADESYCOLECCIONES,ACCESORIOSVEHICULOS,ELECTRODOMESTICOS,LIBROS,CELULARES,COMPUTACION,VIDEO } from "@/utils/subcategoria";
import debounce from "@/utils/debounce";
import { resetState } from "@/redux/features/products/productsSlice";
import React, { useState, useEffect } from "react";
import LabelFilter from "./labelFilters";


const FilterPanel = ({ isVisible, setVisibility }) => {
  
    const dispatch = useDispatch()
    const filters = useSelector(state => state.products.filters)
    let timeoutId


    const [stateValue, setStateValue] = useState("default");

    //sirve para quitar el check del checkbox
    const [status, setStatus] = useState(filters.status)

    useEffect(() => {
      setStatus(filters.status);
    }, [filters.status]);
    
    // LÓGICA DEL COMPONENTE
      const handleCategoriaSelect = (event) => {
        const selectedOption = event.target.options[event.target.selectedIndex];
        const name = selectedOption.dataset.categoria;
        const value = selectedOption.value;
  
        // console.log(`Categoría seleccionada: ${name}`);
        // console.log(`Valor seleccionado: ${value}`);
        dispatch(setFilters({
          ...filters,
          categorias: {categoria: name, subcategoria: value}
        }));
      }

      // POR EL MOMENTO NO SE USA:
      // const debouncedhandleCategoriaSelect = debounce(handleCategoriaSelect, 1000);
  
  const handleReset = ()=>{
    dispatch(resetState())


  }



  const handlerFilterStatus = (e) => {
    const { value, checked } = e.target;
    const newStatusFilters = checked
        ? [...filters.status, value]
        : filters.status.filter(status => status !== value);

    dispatch(setFilters({ ...filters, status: newStatusFilters }));
  }

  // POR EL MOMENTO NO USAMOS EL DEBOUNCED
  // const debouncedhandlerFilterStatus = debounce(handlerFilterStatus, 800);

  const [price, setPrice] = useState({
    min: filters.price.min,
    max: filters.price.max
  })
    
  const handlePriceChange = (e) => {
    const {name, value} = e.target

    setPrice({
      ...price,
      [name]: value
    })
  }

  const handlePriceSearch = () => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => {
      dispatch(setFilters({
        ...filters,
        price: price
      }))
    }, 1000); 
  }

  useEffect(() => {
    setPrice({
      min: filters.price.min,
      max: filters.price.max
    })
  }, [filters.price]);

  //filters.categorias = { categoria, subcategoria}  {}
  //filters.status= [0, 1, 2]  []
  //filters.price= { min, max}  {min= 0, max=100}  
  //filters.name = 'algo' ""


    // RENDERIZADO DEL COMPONENTE
    return (
        <div className={
            isVisible ? `${styles.container} ${styles.panelVisible}` : styles.container
          }>
            {/* Header del panel de filtrado */}
            <div className={styles.panelHeader}>
              <h3>Filtros</h3>
              <button onClick={handleReset} className={styles.clearFiltersButton}>Borrar</button>
            </div>
            {/* Contenedor de las etiquetas de Filtrado*/}
            <div className={styles.labelsFilters}>
              {
                filters.categorias.categoria && <LabelFilter filter={filters.categorias} by='categorias'/>
              }
              {
                filters.name && <LabelFilter filter={filters.name} by='name' />
              }
              {
                filters.status.length !== 0 && <LabelFilter filter={filters.status} by='status'/>
              }
              {
                (filters.price.min !== 100 || filters.price.max !== 10000000) && <LabelFilter filter={filters.price} by='price'/>
              }
            </div>
            {/* Contenedor para los criterios de filtrado */}
            <div className={styles.panelBody}>
              {/* Sección para el filtrado por categorías */}
              <Accordion className={styles.panelSection}>
                <Accordion.Item eventKey="0">
                  <Accordion.Header>Categorías</Accordion.Header>
                  <Accordion.Body>
                    {/* audio */}
                    <select name="Audio" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                      <option disabled value="default">Audio</option>
                      {
                        AUDIO.map(subcategoria => (
                          <option key={subcategoria.name} value={subcategoria.name} data-categoria="Audio">
                            {subcategoria.name}
                          </option>
                        ))
                      }
                    </select>

                    {/* video */}
                    <select name="Video" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                      <option disabled value="default" >Video</option>
                      {
                        VIDEO.map(subcategoria =>
                          <option key={subcategoria.name} value={subcategoria.name} data-categoria="Video" >{subcategoria.name}</option>)
                      }
                    </select>
                   
                    {/* computacion */}
                    <select name="Computacion" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                      <option disabled defaultValue value="default" >Computación</option>
                      {
                        COMPUTACION.map(subcategoria =>
                          <option key={subcategoria.name} value={subcategoria.name} data-categoria="Computacion" >{subcategoria.name}</option>)
                      }
                    </select>
                  
                    {/* telefonos */}
                    <select name="Celulares y Telefonos" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                      <option disabled defaultValue value="default" >Celulares y Teléfonos</option>
                      {
                        CELULARES.map(subcategoria =>
                          <option key={subcategoria.name} value={subcategoria.name} data-categoria="Celulares y Telefonos" >{subcategoria.name}</option>)
                      }
                    </select>

                    {/* libros */}
                    <select name="Libros físicos" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                      <option disabled defaultValue value="default" >Libros físicos</option>
                      {
                        LIBROS.map(subcategoria =>
                          <option key={subcategoria.name} value={subcategoria.name} data-categoria="Libros físicos" >{subcategoria.name}</option>)
                      }
                    </select>
                    
                    {/* Electrodomesticos */}
                    <select name="Electrodomésticos" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Electrodomésticos</option>
                        {
                          ELECTRODOMESTICOS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Electrodomésticos" >{subcategoria.name}</option>)
                        }
                    </select>

                    {/* BellezayCuidado */}
                    <select name="Belleza y cuidado personal" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Belleza y cuidado personal</option>
                        {
                          BELLEZA.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Belleza y cuidado personal" >{subcategoria.name}</option>)
                        }
                    </select>
                    
                    {/* AccesoriosVehiculo */}
                    <select name="Accesorios para vehiculos" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Accesorios para vehículos</option>
                        {
                          ACCESORIOSVEHICULOS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Accesorios para vehiculos" >{subcategoria.name}</option>)
                        }
                    </select>

                    {/* Agro */}
                    <select name="Agro" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Agro</option>
                        {
                          AGRO.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Agro" >{subcategoria.name}</option>)
                        }
                    </select>

                    {/* Antiguedades y colecciones */}
                    <select name="Antiguedades y colecciones" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Antiguedades y colecciones</option>
                        {
                          ANTIGUEDADESYCOLECCIONES.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Antiguedades y colecciones" >{subcategoria.name}</option>)
                        }
                    </select>
                
                    {/* Papeleria y mobiliario de negocio */}
                    <select name="Papeleria y mobiliario de negocio" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Papeleria y mobiliario de negocio</option>
                        {
                          PAPELERIA.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Papeleria y mobiliario de negocio" >{subcategoria.name}</option>)
                        }
                    </select>
                    
                    {/* Consolas y videojuegos */}
                    <select name="Consolas y videojuegos" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Consolas y videojuegos</option>
                        {
                          CONSOLAS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Consolas y videojuegos" >{subcategoria.name}</option>)
                        }
                    </select>
                    
                    {/* Herramientas, Audio y video */}
                    <select name="Herramientas, Audio y video" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Herramientas, Audio y video</option>
                        {
                          HERAMIENTAS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Herramientas, Audio y video" >{subcategoria.name}</option>)
                        }
                    </select>

                    {/*Instrumentos musicales */}
                    <select name="Instrumentos musicales" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Instrumentos musicales</option>
                        {
                          INSTRUMENTOS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Instrumentos musicales" >{subcategoria.name}</option>)
                        }
                    </select>

                    {/*Juegos y juguetes*/}
                    <select name="Juegos y juguetes" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Juegos y juguetes</option>
                        {
                          JUEGOS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Juegos y juguetes" >{subcategoria.name}</option>)
                        }
                    </select>

                    {/*Fiestas y piñatas*/}
                    <select name="Fiestas y piñatas" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Fiestas y piñatas</option>
                        {
                          FIESTAS.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Fiestas y piñatas" >{subcategoria.name}</option>)
                        }
                    </select>
                    
                    {/*Salud y equipamento medico*/}
                    <select name="Salud y equipamento medico" id="categorias" value={stateValue} className={styles.selectItem} onChange={handleCategoriaSelect}>
                        <option disabled defaultValue value="default" >Salud y equipamento médico</option>
                        {
                          SALUD.map(subcategoria =>
                            <option key={subcategoria.name} value={subcategoria.name} data-categoria="Salud y equipamento medico" >{subcategoria.name}</option>)
                        }
                    </select>
                  </Accordion.Body>
                </Accordion.Item>
              </Accordion>

              {/* Sección para el filtrado por estado */}
              <Accordion className={styles.panelSection}>
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Estado</Accordion.Header>
                    <Accordion.Body>
                      <div className={styles.sectionItem}>
                      <input type="checkbox" id='Nuevo' value='Nuevo' checked={status.includes('Nuevo')} onChange={handlerFilterStatus} className={styles.checkItem} />
                        <label htmlFor="" className={styles.labelItem} >Nuevo</label>
                      </div>

                      <div className={styles.sectionItem}>
                      <input type="checkbox" id='Usado' value='Usado' checked={status.includes('Usado')} onChange={handlerFilterStatus} className={styles.checkItem} />
                        <label htmlFor="" className={styles.labelItem} >Usado</label>
                      </div>

                      <div className={styles.sectionItem}>
                      <input type="checkbox" id='Reacondicionado' value='Reacondicionado' checked={status.includes('Reacondicionado')} onChange={handlerFilterStatus} className={styles.checkItem} />
                        <label htmlFor="" className={styles.labelItem} >Reacondicionado</label>
                      </div>
                        
                    </Accordion.Body>
                  </Accordion.Item>
              </Accordion>

              {/* Sección para el filtrado por precio */}
              <Accordion className={styles.panelSection} >
                <Accordion.Item eventKey="0">
                    <Accordion.Header>Precio</Accordion.Header>
                    <Accordion.Body>

                      {/* Slider para el rango de precios*/}
                      {/* <Slider
                        className={styles.priceSlider}
                        thumbClassName={styles.thumb}
                        defaultValue={[filters.price.min, filters.price.max]}
                        step={100}
                        max={filters.price.max}
                        min={filters.price.min}
                        renderThumb={(props, state) => <div {...props}>{state.valueNow}</div>}
                        pearling
                        minDistance={10000}
                        value={[filters.price.min, filters.price.max]}
                        onChange={(newValue) => {handlePriceChange(newValue)}}
                      /> */}
                      <div className={styles.containerPrice}>
                      <label className={styles.labelPrice}>Precio minimo:</label>
                      <input className={styles.inputPrice} type="number" value={price.min} onChange={handlePriceChange} name="min" />

                      <label className={styles.labelPrice}>Precio maximo:</label>
                      <input className={styles.inputPrice} type="number" value={price.max} onChange={handlePriceChange} name="max" />

                      <button className={styles.buttonPrice} onClick={handlePriceSearch}>Buscar precio</button>
                      </div>
                      

                    </Accordion.Body>
                  </Accordion.Item>
              </Accordion>
            </div>

            {/* Footer del panel de filtrado */}
            <div className={styles.mobilePanelFooter}>
              <button className={styles.closePanelButton} onClick={setVisibility} >Ver resultados</button>
            </div>
        </div>
    );
}

export default FilterPanel;