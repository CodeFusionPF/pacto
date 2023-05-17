const User = require("../../../models/user");
const Wallet = require("../../../models/wallet");
const Role = require("../../../models/role");
const LogAdminController = require("../../admin/LogAdminController");

const createUser = async (user, provider = null) => {
    try {
        const newWallet = new Wallet()
        const userRole = await Role.findOne().where({ role: "user" });
        let newUser;

        if (provider === null) {
            const codeverified = Math.floor(Math.random() * 900000) + 100000;
            newUser = new User({ ...user, verified: false, codeverified, recoverycode: null })

        } else {
            newUser = new User(user)

        }

        newWallet.user = newUser._id;
        const walletUser = await newWallet.save();

        newUser.wallet = walletUser._id;
        newUser.role = userRole._id;
        newUser.registrationdate = new Date()
        LogAdminController("users", newUser._id, "actives")
        const response = await newUser.save();
        return response
    } catch (error) {
        throw Error(error)
    }
}

module.exports = createUser