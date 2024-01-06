
  [![powered by Gitmoji](https://img.shields.io/badge/gitmoji-%20😜%20😍-FFDD67.svg?style=flat-square)](https://gitmoji.dev)
  [![code style: prettier](https://img.shields.io/badge/code_style-prettier-ff69b4.svg?style=flat-square)](https://github.com/prettier/prettier)

# Challenge: Rather Labs

## Structure

### Tips

This endpoint gets the tips summary from **Bitfinex** with the best bid-ask. It uses the following endpoint and body:

- Endpoint: /book
- Query Param: symbol


### Market

This endpoint will create a new local orderbook from **Bitfinex**. It will be used by the endpoint to get the effective price sending the pair name, operation (buy or sell) and the amount. It uses the following endpoint and body:

- Endpoint: /market
- Body:
```json
{
    {
        "symbol": string,
        "operation": string,
        "amount": number,
        "limit": number
    }
    
}
```

Additionally, you can put a limit effective price to get the count needed or the max amount which you can buy.

## Pre-requirements

1. [NodeJS](https://nodejs.org/en/)
2. [Typescript](https://www.typescriptlang.org/)
3. [Postman](https://www.postman.com/) (optional)

## Testing

The tests are hosted in the `test` folder using Jest framework. 

### Run the test

To test the project you need to run the following command:
``` bash
npm test
```

This command run the test.

## Test the application

To test the application, you need to follow the next steps:

- Install dependecies with `npm i`.
- Copy the file `.env.example` to root folder with the name `.env`.
- Run nodemon with the command `npm run dev`. If you see the script, you can check that the linter is running with nodemon.
- Go to browser and go to the page `localhost:3000/swagger` to open swagger.
    - You can use Postman if you want.

## Contact

If you have problems or issues, you can write me in the email maurino208@gmail.com or via [LinkedIn](https://www.linkedin.com/in/maurino-juan-cruz).