import { NodeSSH, Config } from 'node-ssh';
import * as logger from './logger.js';  // Adjust import based on your logger's export style
import * as totpHandler from './totp_handler.js'; // Import your TOTP handler

const ssh = new NodeSSH();

/**
 * Connects to an SSH server, executes the "ls" command, and logs the output or error message.
 * If environment variables are provided, they will be used to configure the SSH connection.
 */
async function test() {
    const sshConfig: Config = {
        host: process.env.SSH_HOST!, // Non-null assertion as host is required
        username: process.env.SSH_USER!, // Non-null assertion as username is required
        tryKeyboard: true,
        onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
            logger.log('Keyboard interactive');
            logger.log(prompts[0].prompt);
            const otp = totpHandler.generateTOTP(); // Assuming generateTOTP returns a string
            finish([otp]);
        }
    };

    // Optional config, using type guards to ensure correct types if values exist
    if (process.env.SSH_PORT) sshConfig.port = parseInt(process.env.SSH_PORT, 10);
    if (process.env.SSH_PASSWORD) sshConfig.password = process.env.SSH_PASSWORD;
    if (process.env.SSH_PRIVATE_KEY_PATH) sshConfig.privateKeyPath = process.env.SSH_PRIVATE_KEY_PATH;
    if (process.env.SSH_PRIVATE_KEY) sshConfig.privateKey = process.env.SSH_PRIVATE_KEY;
    if (process.env.SSH_PRIVATE_KEY_PASSPHRASE) sshConfig.passphrase = process.env.SSH_PRIVATE_KEY_PASSPHRASE;

    logger.log('Connecting to SSH server');

    try {
        const client = await ssh.connect(sshConfig); // Connect and handle promises with async/await
        logger.log('Connected to SSH server');
        logger.log('Executing command - ls');
        const result = await client.execCommand('ls');

        if (result.stderr) {
            logger.error('************ERROR EXECUTION************');
            logger.error(result.stderr);
            logger.error('******************************');
        } else {
            logger.log('************OUTPUT************');
            logger.log(result.stdout);
            logger.log('******************************');
        }

    } catch (err) { // Catch any errors that may have occured
        logger.error('************ERROR EXECUTION************');
        logger.error(err);
        logger.error('******************************');
    }
}

export { test };  // Export using ES module syntax