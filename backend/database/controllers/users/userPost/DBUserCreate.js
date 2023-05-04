const User = require("../../../models/user")

const createUser = async (user) => {
    try {
        const newUser = new User({ ...user, verified: false })
        const response = newUser.save()
        return response
    } catch (error) {
        throw Error(error)
    }
}

module.exports = createUser