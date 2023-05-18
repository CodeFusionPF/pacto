const getWalletsDB = require('../../database/controllers/wallets/DBGetWallets');

const getWallets = async (req, res) =>{

    try{
        const wallets = await getWalletsDB();

        if (wallets){
            let totalPendingBalance = 0;
            let totalReceivableBalance = 0;

            for (const wallet of wallets){

                if (wallet.pendingBalance > 0){
                    totalPendingBalance += wallet.pendingBalance;
                }

                if (wallet.receivableBalance > 0){
                   
                    totalReceivableBalance += wallet.receivableBalance;
                }
            }

            return res.status(200).json({
                wallets,
                totalPendingBalance,
                totalReceivableBalance
            })
        }

        return res.status(404).json({msg: "Error 404! Not found"});
    } catch(err){
        return res.status(500).json({
            error: err.message,
            msg: "Error de conexión en el servidor"
        });
    }
}

module.exports = {getWallets}