const {NodeSSH} = require("node-ssh");
const logger = require("./logger");
const ssh = new NodeSSH()

/**
 * Connects to an SSH server, executes the "ls" command, and logs the output or error message.
 * If environment variables are provided, they will be used to configure the SSH connection.
 */
function test() {
    const sshConfig = {
        host: process.env.SSH_HOST,
        username: process.env.SSH_USER,
        tryKeyboard: true,
        onKeyboardInteractive: (name, instructions, instructionsLang, prompts, finish) => {
            logger.log('Keyboard interactive');
            logger.log(prompts[0].prompt);
            let otp = require('./totp_handler').generateTOTP();
            finish([otp]);
        }
    };

    if(process.env.SSH_PORT) sshConfig.port = process.env.SSH_PORT;
    if(process.env.SSH_PASSWORD) sshConfig.password = process.env.SSH_PASSWORD;
    if(process.env.SSH_PRIVATE_KEY_PATH) sshConfig.privateKeyPath = process.env.SSH_PRIVATE_KEY_PATH;
    if(process.env.SSH_PRIVATE_KEY) sshConfig.privateKey = process.env.SSH_PRIVATE_KEY;
    if(process.env.SSH_PRIVATE_KEY_PASSPHRASE) sshConfig.passphrase = process.env.SSH_PRIVATE_KEY_PASSPHRASE;

    logger.log('Connecting to SSH server');

    ssh.connect(sshConfig).then((client) => {
        logger.log('Connected to SSH server');
        logger.log('Executing command - ls');
        client.execCommand('ls').then((result) => {
            if(result.stderr) {
                logger.error('************ERROR EXECUTION************');
                logger.error(result.stderr);
                logger.error('******************************');
            } else {
                logger.log('************OUTPUT************');
                logger.log(result.stdout);
                logger.log('******************************');
            }
            return client.dispose();
        }).catch((err) => {
            logger.error('************ERROR EXECUTION************');
            logger.error(err);
            logger.error('******************************');
            return client.dispose();
        });
    });
}

module.exports = {
    test
}