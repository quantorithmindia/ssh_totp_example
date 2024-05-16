const totp = require('totp-generator').TOTP;
const logger = require('./logger');

/**
 * Generates a Time-Based One-Time Password (TOTP) using the provided secret.
 * If the secret is not found, an error message is logged and no OTP is generated.
 *
 * @returns {string} The generated TOTP.
 */
function generateTOTP() {
    const secret = process.env.TOTP_SECRET || '';
    if(!secret) return logger.error('TOTP secret not found');
    const { otp, expires } = totp.generate(secret);
    logger.log('OTP generated successfully', {otp, expires})
    return otp;
}

module.exports = {
    generateTOTP
}