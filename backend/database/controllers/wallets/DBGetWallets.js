const Wallet = require('../../models/wallet');

const getWalletsDB = async () =>{

    try{
        const wallets = await Wallet.find().where({$or: [
            {pendingBalance : {$gt: 0}},
            {receivableBalance : {$gt: 0}}
        ]})
        .populate({
            path: "user",
            select: ["firstname", "lastname", "email", "phone"]
        })
        .lean();

        if (wallets){
            return wallets;
        }
        
        return false;
    } catch(err){
        throw new Error(`Error al traer las wallets ${err}`);
    }

}

module.exports = getWalletsDB;