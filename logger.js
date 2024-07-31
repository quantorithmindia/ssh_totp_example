const logger = require('log-beautify');

function log(...data) {
    data.unshift("🟢");
    logger.info(data.toString())
}

function error(...data) {
    data.unshift("🔴");
    logger.error(data.toString())
}

module.exports = {
    log,
    error
}