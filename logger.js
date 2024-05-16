const logger = require('log-beautify');

function log(...data) {
    logger.info(data)
    return undefined;
}

function error(...data) {
    logger.error(data)
    return undefined;
}

module.exports = {
    log,
    error
}