import Head from "next/head"
import Link from "next/link"
import Image from "next/image"
import style from "../styles/sellProduct.module.css"


export default function sellProduct(){

    return (
        <div className= {style.container}>
            <Head>
                <title>PACTO | Publica tu producto</title>
                <meta name="description" content="PACTO" />
                <meta name="viewport" content="width=device-width, initial-scale=1" />
                <link rel="icon" href="/pacto-logo.png" />
            </Head>

            <Link href="/">
                <Image className= {style.logo} priority src="/pacto-logo.png" alt="logo" width="85" height="88"/>
            </Link>

            <div className={style.titleProdut}>
                <h1>Publica tu producto</h1>
                <p>Todos los productos / <span>Agregar un producto</span></p>
            </div>

            <div className="formContainer">
                <form className={style.formProduct}>
                    <h3>Nombre & descripción</h3>
                   
                    <label htmlFor="name">Nombre del producto</label>
                    <input type="text" id="name" name="name" placeholder="Ej: iPhone 12 Pro Max"/>

                    <label htmlFor="description">Descripción</label>
                    <textarea id="description" name="description" placeholder="Ingresar la descripción del producto"></textarea>

                    <div className={style.statusProduct}>
                        <label htmlFor="category">Categoría</label>
                        <select id="category" name="category">
                            <option value="select">selecciona una opción</option>
                            <option value="value1">Celulares</option>
                            <option value="value2" selected>Computadoras</option>
                            <option value="value3">Accesorios</option>
                            <option value="value4">Otros</option>
                        </select>

                        <label htmlFor="status">Estado del producto</label>
                        <select id="status" name="status">
                            <option value="value1">Nuevo</option>
                            <option value="value2" selected>Como nuevo</option>
                            <option value="value2" selected>Muy bueno</option>
                            <option value="value2" selected>Bueno</option>
                            <option value="value2" selected>Regular</option>
                            <option value="value2" selected>Malo</option>
                            <option value="value2" selected>Para piezas</option>
                        </select>

                        <label htmlFor="price">Precio</label>
                        <input type="number" id="price" name="price" placeholder="Ej: 100000"/>
                    </div>

                    <h3>Cargar Fotos</h3>
                    <label htmlFor="image">Selecciona los archivos necesarios</label>
                    <input className={style.photo} type="file" id="image" name="image[]" placeholder="Ej: 10" multiple />

                    <div className={style.buttons}>
                        <button className={style.buttonSubmit} type="submit">Publicar</button>
                        <button className={style.buttonCancel} type="reset">Cancelar</button>
                    </div>
                </form>

                    
            </div>

        </div>
    )
}