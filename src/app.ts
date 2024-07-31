import * as dotenv from 'dotenv'; // Import dotenv as a module
import * as sshHandler from './ssh_handler.js'; // Import your ssh_handler module

dotenv.config({ override: true }); // Load environment variables, allowing overrides

// Use type assertions to enforce the existence and string type of environment variables
const TOTP_SECRET = process.env.TOTP_SECRET as string;
const SSH_HOST = process.env.SSH_HOST as string;
const SSH_USER = process.env.SSH_USER as string;

if (!TOTP_SECRET) {
    throw new Error('TOTP_SECRET environment variable not found');
}
if (!SSH_HOST) {
    throw new Error('SSH_HOST environment variable not found');
}
if (!SSH_USER) {
    throw new Error('SSH_USER environment variable not found');
}

// Call your SSH handler's test function
sshHandler.test();