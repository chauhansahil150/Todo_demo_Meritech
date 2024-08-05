npm init -y

npm i express dotenv

npm i -D typescript @types/express @types/node

npx tsc --init

## in tsconfig.json change
{
  "compilerOptions": {
    ...
    "outDir": "./dist"
    ...
  }
}

npm i -D nodemon ts-node

npx ts-node src/index.ts

## in package.json change
{
  "scripts": {
    "build": "npx tsc",
    "start": "node dist/index.js",
    "dev": "nodemon src/index.ts"
  }
}


