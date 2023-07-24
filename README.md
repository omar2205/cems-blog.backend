## Description

A Nestjs backend for a blog. A task for cems-it.com.

## Installation

```bash
$ pnpm install
```

## Running the app

Note: copy `.env.example` and rename it to `.env` and update the variables.

To get a JWT secret generate a 32 char with this command:
```
$ openssl rand -base64 32
```

```bash
# development
$ pnpm run start

# watch mode
$ pnpm run start:dev

# production mode
$ pnpm run start:prod
```
