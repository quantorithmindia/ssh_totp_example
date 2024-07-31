import { TOTP } from 'totp-generator'; // Assuming 'totp-generator' exports TOTP directly
import * as logger from './logger.js';

/**
 * Generates a Time-Based One-Time Password (TOTP) using the provided secret.
 * If the secret is not found, an error message is logged and an empty string is returned.
 *
 * @returns {string} The generated TOTP or an empty string if an error occurs.
 */
function generateTOTP(): string {
    const secret = process.env.TOTP_SECRET;
    if (!secret) {
        logger.error('TOTP secret not found');
        return ''; // Return an empty string to indicate failure
    }

    const { otp, expires } = TOTP.generate(secret);
    logger.log('OTP generated successfully', { otp, expires });
    return otp;
}

export { generateTOTP };