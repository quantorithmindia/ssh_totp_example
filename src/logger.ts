import * as logger from 'log-beautify';

/**
 * Logs messages with a green indicator [🟢] at the INFO level.
 * @param data - The data to be logged.
 */
function log(...data: any[]) :void {
    const formattedMessage = `[🟢] - ${data.join(' ')}`;
    logger.info(formattedMessage);
}

/**
 * Logs error messages with a red indicator [🔴] at the ERROR level.
 * @param data - The data to be logged as an error.
 */
function error(...data: any[]) :void {
    const formattedMessage = `[🔴] - ${data.join(' ')}`;
    logger.error(formattedMessage);
}

export { log, error }; 