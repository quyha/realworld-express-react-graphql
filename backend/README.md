# Pinme v2

### Installation

1. Clone/download repo
2. Go to the folder application using cd command on your cmd or terminal. Run `yarn install`

### Usage

**Development**

App served `http://localhost:3001`

- Copy `.env.example` file to `.env.development` on the root folder.
- Open your `.env.development` file and change the values to your needs
- Run `yarn run dev`

**Eslint**
- Run `yarn run lint` to identify problematic patterns found in code
- Run `yarn run lint:fix` to fix the code

**Production**

Build app once to `/build`. App served `http://localhost:9009`

- Copy `.env.example` file to `.env` on the root folder
- Open your `.env.development` file and change the values to your needs
- Run `yarn run build`
