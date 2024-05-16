require('dotenv').config({override: true});
if(!process.env.TOTP_SECRET) throw new Error('TOTP_SECRET environment variable not found');
if(!process.env.SSH_HOST) throw new Error('SSH_HOST environment variable not found');
if(!process.env.SSH_USER) throw new Error('SSH_USER environment variable not found');
require('./ssh_handler').test()