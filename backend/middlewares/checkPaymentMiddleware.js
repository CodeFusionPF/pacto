const checkUserExists = require("../database/helper/DBcheckUserExists")
const checkProductExists = require("../database/helper/DBCheckProductExists");
const DBProductGetId = require("../database/controllers/products/productGet/DBProductGetId");
const DBShoppingCartRemoveProduct =  require("../database/controllers/transactions/shoppingcart/DBShoppingCartRemoveProduct");
const DBShoppingCartGet = require("../database/controllers/transactions/shoppingcart/DBShoppingCartGet");

const checkProductsPayment = async(req,res,next) =>{

    //token usuario
    const userId = req.userId;
    //productos del shopping cart del usuario
    // const shoppingCart  = req.body;
    //validar el usuario
    const user = await checkUserExists(userId,null);


    //productos con formato mercado pago
    const formattingProducts = [];
    let foundUnavailableProducts = false;


    if(user){

        const productsMercadoPago = Promise.all(user.shoppingCart.products.map(async(item)=>{
            console.log(item)

            //validar existencia del producto
            const realProduct = await checkProductExists(item.product._id);
            
            if(realProduct){
                // const productStock = await DBProductGetId(item.product._id);
                
                
                //validar si tenemos stock\
                // console.log(item.ammount)
                // console.log()

                if(item.ammount <= realProduct.stock){
                    console.log('tenemos inventario')
                    

                    const productMercadoPago = {
                        id: item.product._id,
                        title: item.product.name,
                        currency_id: "COP",
                        description: user.email,
                        picture_url: item.product.images[0],
                        category_id: item.product.category,
                        quantity: item.ammount,
                        unit_price: item.product.price
                    };
        
                    console.log(productMercadoPago);
                    formattingProducts.push(productMercadoPago);

                }
                else{
                    console.log('Cantidad más alta de la que hay en stock')
                    // //remover producto
                    // //en este caso se remueve directamente el producto del carrito, al enviar una cantidad mas alta de la que esta en stock
                    // //en un futuro solo remover si el stock es 0 o simplemente validar si existe
                     foundUnavailableProducts = true;
                    // // await DBShoppingCartRemoveProduct(userId,item.product._id);           
                }
            }
        })) 

        await productsMercadoPago;

        // const newShoppingCart = await DBShoppingCartGet(userId);
        if(foundUnavailableProducts) return res.status(409).json({error: "El producto ya no está disponible en el la cantidad seleccionada"});

    }
    // console.log(formattingProducts);
    //enviar data al controller
    req.body = {emailUser: user.email,items:formattingProducts};

    next();

}

module.exports = checkProductsPayment