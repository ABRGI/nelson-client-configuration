# Nelson Client Configuration
A repository handling configurations for clients

# Requirements
- NodeJS 14 or later.

# Setup the project
- Run `npm i` to install required packages.
- Run `npm run export` to export clients.
- Run `npm run start <client name>`.
- The project will run at port 5000 by default and use the config and language file from selected client, make sure the proxy port in BUI is the same as this project to make configurations and languages work.
- Using Visual Studio Code, install i18n-ally extension and set the path to `src/language` to manage translations.