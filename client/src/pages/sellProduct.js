import Head from "next/head";
import Link from "next/link";
import Router from 'next/router';
import Image from "next/image";
import style from "../styles/sellProduct.module.css";
import { Spinner } from "react-bootstrap";
import { useState, useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchCategories } from '@/redux/features/categories/categoriesSlice';
import { addProduct } from "../api/productsApi"

// Objeto para validar los campos del formulario
const validation = {
    name: {
      minLength: 5,
      maxLength: 80,
      forbiddenWords: ['palabra1', 'palabra2'],
      onlyNumbers: /^[\d]*$/,
      invalidChars: /@/,
      required: true,
    },
    description: {
      minLength: 5,
      maxLength: 2000,
      forbiddenWords: ['palabra1', 'palabra2'],
      onlyNumbers: /^[\d]*$/,
      invalidChars: /@/,
      required: true,
    },
    stock: {
      min: 1,
      max: 10,
      required: true,
    },
    price: {
      min: 100,
      max: 10000000,
      required: true,
    },
    images: {
      maxFiles: 4,
      allowedFormats: /(\.jpg|\.jpeg|\.png)$/,
      maxSize: 4 * 1024 * 1024, // 4 MB
      required: true,
    },
};


export default function sellProduct(){
    // LÓGICA DEL COMPONENTE
    const dispatch = useDispatch();
    const categories = useSelector((state) => state.categories.categories);
    
    const categoriesStatus = useSelector((state) => state.categories.status);
    // TO-DO: gestionar el posible error
    const categoriesError = useSelector((state) => state.categories.error);

    // Estado para el formulario
    const [product,setProduct] = useState({
        name:"",
        description:"",
        category:"",
        subcategory:"",
        state:"",
        stock:"",
        price:"",
        images:[]
    });

    // Estados para la categoría y subcategoría seleccionadas
    const [selectedCategory, setSelectedCategory] = useState(null);   
    const [selectedSubcategory, setSelectedSubcategory] = useState(null);
    // Estado para el estado del producto seleccionado
    const [selectedStatus, setSelectedStatus] = useState("");
    // Estado para previsualizar las imagenes seleccionadas
    const [previews, setPreviews] = useState([]);  
    // Estado para el spinner de carga
    const [isSubmitting, setIsSubmitting] = useState(false);
    // Estado para los errores del formulario
    const [formErrors, setFormErrors] = useState({
        name: "",
        description: "",
        stock: "",
        price: "",
        images: "",
    }); 
    
    
    useEffect(() => {
        // Si las categorías no están cargadas en el estado global, las solicita al servidor
        if (categoriesStatus === 'idle') {
          dispatch(fetchCategories());
        }
    }, [categoriesStatus, dispatch]);

    // Función para validar si todos los campos del formulario tienen datos
    const isFormComplete = () => {
        return (
          product.name &&
          product.description &&
          product.stock &&
          product.price &&
          product.images.length > 0
        );
    };

    // Función para gestionar los cambios en los inputs del formulario
    const handleChange = (e) => {
        const { name, value, type, files } = e.target;
        
        // Validar el campo que cambió
        let errorMessage = "";
        switch (name) {
          case "name":
            errorMessage = validateName(value);
            break;
          case "description":
            errorMessage = validateDescription(value);
            break;
          case "stock":
            errorMessage = validateStock(value);
            break;
          case "price":
            errorMessage = validatePrice(value);
            break;
          case "images":
            errorMessage = validateImages(files);
            break;
          default:
            break;
        }
        
        // Actualizar el estado de los errores del formulario
        setFormErrors((prevErrors) => ({
          ...prevErrors,
          [name]: errorMessage,
        }));
      
        // Actualizar el estado del producto con las imágenes seleccionadas
        if (type === "file" && errorMessage === "") {
            setProduct((prevData) => ({
                ...prevData,
                [name]: [...product.images, ...files],
            }));

            //Pasos para poder previsualizar las imagenes antes de publicar el producto
            const filesArray = Array.from(files);
            const filesURL = filesArray.map(file => URL.createObjectURL(file));
            setPreviews([...previews, ...filesURL]);
        } else if (type === "file" && errorMessage !== "") {
            e.target.value = "";
        } else {
            setProduct((prevData) => ({
                ...prevData,
                [name]: value,
            }));
        }
    };

    //********************************************************************* */
    // TO-DO: terminar de implementar la funcionalidad de eliminar la imagen
    const removeImage = (index) => {
        setProduct((prevState) => {
          const newImages = prevState.images.filter((_, i) => i !== index);
          return { ...prevState, images: newImages };
        });
      
        setPreviews((prevState) => prevState.filter((_, i) => i !== index));
    };
    //********************************************************************** */

    // Función para gestionar el cambio de categoría
    const handleCategoryChange = (e) => {
        setSelectedCategory(e.target.value);
        setSelectedSubcategory(null);
    }

    // Función para gestionar el submit del formulario
    const handleSubmit = async (event)=>{
        event.preventDefault();
        // Setear el estado de carga para mostrar el spinner
        setIsSubmitting(true);

        // Crear el objeto FormData para enviar los datos del formulario
        const form = new FormData();
        if (product.name) form.append("name", product.name);
        if (product.description) form.append("description", product.description);
        if (selectedCategory) form.append("category", selectedCategory);
        if (selectedSubcategory) form.append("subcategory", selectedSubcategory);
        if (selectedStatus) form.append("state", selectedStatus);
        if (product.stock) form.append("stock", product.stock);
        if (product.price) form.append("price", product.price);
        if (product.images.length > 0) {
            product.images.forEach((image) => {
                form.append('images', image);
            });
        }

        try {
            // Realiza la petición al backend para crear el producto
            const newProduct = await addProduct(form);

            // Limpiar el formulario
            setProduct({
                name:"",
                description:"",
                category:"",
                subcategory:"",
                state:"",
                stock:"",
                price:"",
                images:[]
            });
            // Liberar los objetos URL creados para previsualizar las imagenes
            previews.forEach(preview => URL.revokeObjectURL(preview));
            // Limpiar el array de previsualizaciones
            setPreviews([]);

            // Redirigir a la página de detalle del producto publicado
            Router.push(`/productos/${newProduct._id}`);

        } catch (error) {
            console.log(error);
            // Mostrar un mensaje de error
            alert("Error al publicar el producto");
        }
        finally {
            // Setear el estado de carga para ocultar el spinner
            setIsSubmitting(false);
        }
    }

    // Función para gestionar el cancelar el formulario
    const handleCancel = (event)=>{
        event.preventDefault();
        // Limpiar el formulario
        setProduct({
            name:"",
            description:"",
            category:"",
            subcategory:"",
            state:"",
            stock:"",
            price:"",
            images:[]
        });
        // Liberar los objetos URL creados para previsualizar las imagenes
        previews.forEach(preview => URL.revokeObjectURL(preview));
        // Limpiar el array de previsualizaciones
        setPreviews([]);
        // Redirigir a la página de productos
        Router.push('/productos');
    }


    // FUNCIONES DE VALIDACIÓN
    const validateName = (value) => {
        if (validation.name.required && !value.trim()) {
          return "El nombre es requerido.";
        }
        if (value.length < validation.name.minLength) {
          return `El nombre debe tener al menos ${validation.name.minLength} caracteres.`;
        }
        if (value.length > validation.name.maxLength) {
          return `El nombre no debe tener más de ${validation.name.maxLength} caracteres.`;
        }
        if (validation.name.onlyNumbers.test(value)) {
          return "El nombre no puede ser sólo números.";
        }
        if (validation.name.invalidChars.test(value)) {
          return "El nombre no puede contener '@'.";
        }
        if (validation.name.forbiddenWords.some((word) => value.includes(word))) {
          return "El nombre contiene palabras inadecuadas.";
        }
        return "";
      };
      
      const validateDescription = (value) => {
        if (validation.description.required && !value.trim()) {
          return "La descripción es requerida.";
        }
        if (value.length < validation.description.minLength) {
          return `La descripción debe tener al menos ${validation.description.minLength} caracteres.`;
        }
        if (value.length > validation.description.maxLength) {
          return `La descripción no debe tener más de ${validation.description.maxLength} caracteres.`;
        }
        if (validation.description.onlyNumbers.test(value)) {
          return "La descripción no puede ser sólo números.";
        }
        if (validation.description.invalidChars.test(value)) {
          return "La descripción no puede contener '@'.";
        }
        if (validation.description.forbiddenWords.some((word) => value.includes(word))) {
          return "La descripción contiene palabras inadecuadas.";
        }
        return "";
      };
      
      const validateStock = (value) => {
        if (validation.stock.required && !value) {
          return "El stock es requerido.";
        }
        if (value < validation.stock.min) {
          return `El stock mínimo es ${validation.stock.min}.`;
        }
        if (value > validation.stock.max) {
          return `El stock máximo es ${validation.stock.max}.`;
        }
        return "";
      };
      
      const validatePrice = (value) => {
        if (validation.price.required && !value) {
          return "El precio es requerido.";
        }
        if (value < validation.price.min) {
          return `El precio mínimo es ${validation.price.min}.`;
        }
        if (value > validation.price.max) {
          return `El precio máximo es ${validation.price.max}.`;
        }
        return "";
      };
      
      const validateImages = (files) => {
        if (product.images.length + files.length > validation.images.maxFiles) {
          return `No se pueden subir más de ${validation.images.maxFiles} imágenes.`;
        }
        for (let file of files) {
          if (!validation.images.allowedFormats.test(file.name)) {
            return "Sólo se admiten imágenes en formato .jpg, .jpeg o .png.";
          }
          if (file.size > validation.images.maxSize) {
            return `Las imágenes no deben pesar más de ${validation.images.maxSize / (1024 * 1024)} MB.`;
          }
        }
        return "";
      };



    // RENDERIZADO DEL COMPONENTE
    return (
        <div className= {style.container}>
            <Head>
                <title>PACTO | Publica tu producto</title>
                <meta name="description" content="PACTO" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/pacto-logo.png" />
            </Head>

            <div className={style.main}>
                <Link href="/">
                    <Image className= {style.logo} priority src="/pacto-logo.png" alt="logo" width="85" height="88"/>
                </Link>

                <div className={style.titleProdut}>
                    <h1>Publica tu producto</h1>
                    <p>
                        <Link href="/productos" title="Volver a la lista de productos">
                        Todos los productos 
                        </Link> / 
                        <span>Agregar un producto</span>
                    </p>
                </div>

                <div className={style.formContainer}>
                    <form className={style.formProduct} onSubmit={handleSubmit}>

                        {/* Sección para el nombre y la descripción del producto */}
                        <div className={style.formSection}>
                            <h3>Nombre & descripción</h3>
                            <hr />

                            <label htmlFor="name">Nombre del producto</label>
                            <input onChange={handleChange} type="text" id="name" name="name" placeholder="Ej: iPhone 12 Pro Max"/>
                            {
                                formErrors.name && <p className={style.errorMessage}>{formErrors.name}</p>
                            }

                            <label htmlFor="description">Descripción</label>
                            <textarea onChange={handleChange} id="description" name="description" placeholder="Ingresar la descripción del producto"></textarea>
                            {
                                formErrors.description && <p className={style.errorMessage}>{formErrors.description}</p>
                            }
                        </div>

                        {/* Sección para la info básica del producto */}
                        <div className={style.formSection}>
                            <h3>Información básica</h3>
                            <hr />
                            
                            <div className={style.basicInfo}>

                                {/* Select de CATEGORÍAS */}
                                <div className={style.infoItem}>
                                    <label htmlFor="category">Categoría</label>
                                    <select 
                                    name="category" 
                                    value={selectedCategory || ""}
                                    onChange={handleCategoryChange} 
                                    required
                                    >   
                                        <option disabled value="" >Selecciona una categoría</option>
                                        {
                                            categories && categories.length > 0 &&
                                            categories.map((category) => (
                                                <option key={category._id} value={category.name}>
                                                  {category.name}
                                                </option>
                                            ))
                                        }
                                    </select>
                                </div>

                                {/* Select de SUBCATEGORÍAS */}
                                <div className={style.infoItem}>
                                    <label htmlFor="subCategory">Sub-categoría</label>
                                    <select 
                                    id="subCategory" 
                                    name="subCategory"  
                                    value={selectedSubcategory || ""}
                                    onChange={(e) => setSelectedSubcategory(e.target.value)}
                                    disabled={!selectedCategory}
                                    required
                                    >
                                        <option disabled value="">Selecciona una subcategoría</option>
                                        {
                                        selectedCategory &&
                                        categories.find((category) => category.name === selectedCategory)
                                        .subCategories.map((subcategory) => (
                                            <option key={subcategory._id} value={subcategory.name}>
                                            {subcategory.name}
                                            </option>
                                        ))}
                                    </select>
                                </div>

                                {/* Select de ESTADO DEL PRODUCTO */}
                                <div className={style.infoItem}>
                                <label htmlFor="status">Estado del producto</label>
                                    <select  
                                    id="status" 
                                    name="state" 
                                    value={selectedStatus || ""} 
                                    onChange={(e) => setSelectedStatus(e.target.value)}
                                    required
                                    >
                                        <option disabled value="">Selecciona una opción</option>
                                        <option value="Nuevo">Nuevo</option>
                                        <option value="Usado">Usado</option>
                                        <option value="Reacondicionado">Reacondicionado</option>
                                    </select>
                                </div>
                            </div>
                            
                            <div className={style.basicInfo}>

                                {/* Input de STOCK */}
                                <div className={style.infoItem}>
                                    <label htmlFor="stock">Stock</label>
                                    <input 
                                    type="number" 
                                    id="stock" 
                                    name="stock" 
                                    placeholder="Ej: 1" 
                                    value={product.stock} 
                                    onChange={handleChange}
                                    min="1"
                                    max="100"
                                    required
                                    />
                                    { 
                                        formErrors.stock && <p className={style.errorMessage}>{formErrors.stock}</p>
                                    }
                                </div>

                                {/* Input de PRECIO */}
                                <div className={style.infoItem}>
                                    <label htmlFor="price">Precio</label>
                                    <input 
                                    type="number" 
                                    id="price" 
                                    name="price" 
                                    placeholder="Ej: 100000" 
                                    value={product.price} 
                                    onChange={handleChange}/>
                                    { 
                                        formErrors.price && <p className={style.errorMessage}>{formErrors.price}</p>
                                    }
                                </div>
                            </div>
                        </div>


                        {/* Sección para cargar las fotos del producto */}
                        <div className={style.formSection}>
                            <h3>Cargar Fotos</h3>
                            <hr />
                            <p className={style.infoSmall}>Formatos admitidos: .jpg o.png</p>
                            <input className={style.photoSelector} 
                            type="file" 
                            id="images" 
                            name="images" 
                            accept=".jpg, .jpeg, .png" 
                            onChange={handleChange} 
                            disabled={product.images.length >= validation.images.maxFiles}
                            multiple 
                            />
                            <label htmlFor="images" className={style.photoSelectorLabel}>{`Selecciona hasta ${validation.images.maxFiles} fotos`}</label>
                            
                            {
                                formErrors.images && <p className={style.errorMessage}>{formErrors.images}</p>
                            }
                            {
                                validation.images.required && (product.images.length === 0) 
                                && <p className={style.errorMessage}>Al menos una foto es requerida.</p> 
                            }

                            {/* Sección para previsualizar las imágenes seleccionadas */}
                            <div className={style.previewsContainer}>
                                {
                                    previews.map((preview, index) => (
                                        <div key={index} className={style.previewItem}>
                                            <Image className= {style.previewImage} priority src={preview} alt="preview" width="100" height="100"/>
                                            <button
                                                type="button"
                                                className={style.removeImageButton}
                                                // TO-DO: terminar de implementar la funcionalidad de eliminar la imagen
                                                onClick={() => removeImage(index)}
                                            >
                                            X
                                            </button>
                                        </div>
                                    ))
                                }
                            </div>
                        </div>

                        {/* Sección para los botones de submit y cancelar */}
                        <div className={style.buttons}>
                            <button 
                            className={style.buttonSubmit} 
                            type="submit"
                            disabled={!isFormComplete() || Object.values(formErrors).some((error) => error) || isSubmitting}
                            title="Todos los datos deben estar completos y correctos para poder publicar el producto"
                            >
                                {isSubmitting ? (
                                    <Spinner animation="border" size="sm" />
                                ) : (
                                    "Publicar"
                                )}
                            </button>

                            <button className={style.buttonCancel} type="reset" onClick={handleCancel}>Cancelar</button>
                        </div>
                        <div className={style.alertInfo} >
                          { 
                            (!isFormComplete() || Object.values(formErrors).some((error) => error)) && <p>Todos los datos deben estar completos y correctos para poder publicar tu producto</p>
                          }        
                        </div>
                    </form>
                </div>
            </div>
        </div>
    )
}