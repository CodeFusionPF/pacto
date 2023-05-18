const LogAdmin = require("../../models/logadmin");
const logActives = require("./handlers/logActives");
const logBalanceToday = require("./handlers/logBalanceToday");
const logReviews = require("./handlers/logReviews");
const logQuestions = require("./handlers/logQuestions"); //Por crash del deploy, ajusté el nombre de este archivo (de logquestions a logQuestions)
const logAdminPostDay = require("./logAdminPostDay");

const LogAdminController = async (valuemain, valuesecondary, query) => {
    try {
        const logToday = await logAdminPostDay()
        if (query === "balance") {
            await logBalanceToday(valuemain, valuesecondary, logToday)
        }
        else if (query === "actives") {
            await logActives(valuemain, valuesecondary, logToday)
        }
        else if (query === "reviews") {
            await logReviews(valuemain, logToday)
        }
        else if (query === "questions") {
            await logQuestions(valuemain, logToday)
        }

    } catch (error) {
        throw Error(error)
    }

}

module.exports = LogAdminController