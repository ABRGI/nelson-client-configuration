# Nelson Client Configuration
A repository handling configurations for clients

# Requirements
- NodeJS 14 or later.
- FontAwesome Pro SVG files download from FontAwesome website.

# Setup the project
- Run `npm i` to install required packages.
- Run `npm run export` to export clients. Run `npm run export dummy` to export clients with fake data on some ID.
- Run `npm run start <client name> <port>`.
- The project will run at port 5000 by default if no port is in the request and use the config and language file from selected client, make sure the proxy port in BUI is the same as this project to make configurations and languages work.
- Using Visual Studio Code, install i18n-ally extension and set the path to `src/language` to manage translations.

# Setup and run icon host project
- In FontAwesome files, copy all folders in `svgs` folder to `serve/icon` in Nelson Client Configuration project.
- Run `npm run start icon <port>`.
- The project will run at port 5001 by default if no port is in the request. Make sure to setup proxy in BUI and MUI and the port is not conflicting with the client configurations.