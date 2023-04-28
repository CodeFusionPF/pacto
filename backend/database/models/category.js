const mongoose = require("mongoose")
const mainCategorySchema = require("../schemas/categorySchema");

// Instanciacion de categorias principales y secundarias
//FALTA ADMINISTRACION DE ERROR

const Category = mongoose.model("Category", mainCategorySchema)

const createMainCategories = async () => {

    const stateCategories = await Category.find()

    if (stateCategories.length != 0) return

    const Audio = new Category({
        name: "Audio",
        subCategories: [
            { name: "Parlantes" },
            { name: "Audífonos" },
            { name: "Tocadiscos y accesorios" },
            { name: "Home theaters" },
            { name: "Micrófonos y amplificadores" },
            { name: "Audio portátil accesorios" },
            { name: "Equipos de Dj y accesorios" },
            { name: "Amplificadores y receivers" },
            { name: "Asistentes virtuales" },
            { name: "Drivers, cornetas y diafragmas" },
            { name: "Estudios de grabación" },
            { name: "Grabadores" },
            { name: "Megáfonos" },
            { name: "Minicomponentes" },
            { name: "Torres de sonido" },
            { name: "Otros de audio" },
        ]
    })
    const Video = new Category({
        name: "Video",
        subCategories: [
            { name: "Video Beams y pantallas" },
            { name: "Cámaras y accesorios" },
            { name: "Cámaras de fotografía" },
            { name: "Accesorios para cámaras" },
            { name: "Drones" },
            { name: "Cables para cámaras" },
            { name: "Instrumentos ópticos" },
            { name: "Lentes para cámaras" },
            { name: "Otros" }
        ]
    })

    const Computacion = new Category({
        name: "Computación",
        subCategories: [
            { name: "Accesorios antiestática" },
            { name: "Accesorios para PC Gaming" },
            { name: "Almacenamiento" },
            { name: "Cables y Hubs USB" },
            { name: "Componentes de PC" },
            { name: "Conectividad y redes" },
            { name: "Estabilizadores y UPS" },
            { name: "Impresión" },
            { name: "Lectores y Scanners" },
            { name: "Limpieza y cuidado de PCs" },
            { name: "Monitores y accesorios" },
            { name: "Palms, agendas y accesorios" },
            { name: "PC de escritorio" },
            { name: "Periféricos de PC" },
            { name: "Portátiles y accesorios" },
            { name: "Software" },
            { name: "Tablets y accesorios" },
            { name: "Otros" },
        ]
    })

    const Celulares = new Category({
        name: "Celulares y Telefonos",
        subCategories: [
            { name: "Telefonia" },
            { name: "Accesorios" },
            { name: "Repuestos para telefonia" },
            { name: "Smartwatches y accesorios" },
            { name: "Telefonia IP" },
            { name: "Radios y handies" },
            { name: "Otros" }
        ]
    })

    const LibrosFisicos = new Category({
        name: "Libros fisicos",
        subCategories: [
            { name: "Novela" },
            { name: "Cuentos" },
            { name: "Libros infantiles" },
            { name: "Comics" },
            { name: "Otros" },
        ]
    })
    const Electrodomesticos = new Category({
        name: "Electrodomesticos",
        subCategories: [
            { name: "Lavado" },
            { name: "Refrigeración", },
            { name: "Pequeños electrodomésticos" },
            { name: "Climatización" }, { name: "Coccion" },
            { name: "Dispensadores y purificadores" },
            { name: "Otros electrodomésticos" }
        ]
    })
    const BellezayCuidado = new Category({
        name: "Belleza y cuidado personal",
        subCategories: [
            { name: "Artefactos para el cabello" },
            { name: "Otros" },
        ]

    })
    const AccesoriosVehiculos = new Category({
        name: "Accesorios para vehiculos",
        subCategories: [
            { name: "Llantas" },
            { name: "Equipos de sonido para vehículos" },
            { name: "Repuestos para vehiculos" },
            { name: "Autopartes" },
            { name: "Otros" }
        ]
    })
    const Agro = new Category({
        name: "Agro",
        subCategories: [
            { name: "Máquinas y herramientas" },
            { name: "Otros" },
        ]
    })
    const AntiguedadesyColecciones = new Category({
        name: "Antiguedades y colecciones",
        subCategories: [
            { name: "Antiguedades" },
            { name: "Colecciones" },
            { name: "Otros" },
        ]
    })
    const Papeleriaymobiliario = new Category({
        name: "Papeleria y mobiliario de negocio",
        subCategories: [
            { name: "Calculadoras" },
            { name: "Guillotinas" },
            { name: "Estanterías" },
            { name: "Vitrinas" },
            { name: "Sillas y escritorios" },
            { name: "Tableros y corchos" },
            { name: "Otros" },
        ]
    })
    const ConsolasVideojuegos = new Category({
        name: "Consolas y videojuegos",
        subCategories: [
            { name: "Consolas" },
            { name: "Videojuegos" },
            { name: "Accesorios para consola" },
            { name: "Accesorios para PC Gamming" },
            { name: "Otros" },
        ]
    })
    const Herramientas = new Category({
        name: "Herramientas, Audio y video",
        subCategories: [
            { name: "Herramientas eléctricas" },
            { name: "Herramientas manuales" },
            { name: "Instrumentos de medición" },
            { name: "Accesor" },
            { name: "Otros" },
        ]
    })

    const Instrumentos = new Category({
        name: "Instrumentos musicales",
        subCategories: [
            { name: "Instrumentos de viento" },
            { name: "Instrumentos de cuerda" },
            { name: "Baterías y percusión" },
            { name: "Teclados y pianos" },
            { name: "Otros" }
        ]
    })
    const JuegosJuguetes = new Category({
        name: "Juegos y juguetes",
        subCategories: [
            { name: "Juegos didácticos y de mesa" },
            { name: "Juguetes" },
            { name: "Pares perdidos" },
            { name: "Otros" },
        ]
    })
    const FiestasPiñatas = new Category({
        name: "Fiestas y piñatas",
        subCategories: [
            { name: "Mobiliario de fiestas" },
            { name: "Infladores de bombas" },
            { name: "Disfraces de fiesta" },
            { name: "Otros" },
        ]
    })
    const Saludyequipo = new Category({
        name: "Salud y equipamento medico",
        subCategories: [
            { name: "Masajeadores" },
            { name: "Sillas de ruedas" },
            { name: "Bastones" },
            { name: "Ortopedia" },
            { name: "Otros" },
        ]
    })

    const newCategories = await Category.insertMany([Audio, Video, Computacion, Celulares, LibrosFisicos, Electrodomesticos, BellezayCuidado, AccesoriosVehiculos, Agro, AntiguedadesyColecciones,
        Papeleriaymobiliario, ConsolasVideojuegos, Herramientas, Instrumentos, JuegosJuguetes, FiestasPiñatas, Saludyequipo])

}

module.exports = { createMainCategories, Category }
