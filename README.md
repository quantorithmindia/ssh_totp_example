# 🗄️SSH with TOTP🔐  Example in NodeJS

This example shows how to connect to SSH with TOTP configured on server (Ex. Google Authenticator)

## Note

- Copy .env.example to .env
- Change the parameters for SSH related config and TOTP Secret
- Either provide SSH_PRIVATE_KEY_PATH or SSH_PRIVATE_KEY but not both (If available)
- Don't forget SSH_PRIVATE_KEY_PASSPHRASE (If Private Key is provided and is encrypted)
- TOTP_SECRET, SSH_HOST, SSH_USER are required environment variables
- SSH_PORT is optional and defaults to 22