const logger = require('log-beautify');

function log(...data) {
    const formattedMessage = `[🟢] - ${data}`;
    logger.info(formattedMessage)
}

function error(...data) {
    const formattedMessage = `[🔴] - ${data}`;
    logger.error(formattedMessage)
}

module.exports = {
    log,
    error
}