const LogAdmin = require("../../models/logadmin");
const logActives = require("./handlers/logActives");

const logAdminPostDay = async () => {
    try {

        const today = new Date();
        today.setHours(0, 0, 0, 0);
        const tomorrow = new Date(today);
        tomorrow.setDate(today.getDate() + 1);
        const logToday = await LogAdmin.findOne({ date: { $gte: today.toISOString(), $lt: tomorrow.toISOString() } })
        if (logToday === null) {
            const newLog = new LogAdmin()
            logActives(null, null, newLog)
            return newLog
        }
        else {
            return logToday
        }

    } catch (error) {
        throw Error(error)
    }

}

module.exports = logAdminPostDay