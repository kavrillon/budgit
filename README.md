# Vuetify Webpack SSR Template

> Vuetify SSR Webpack Template

## Build Setup

``` bash
vue init vuetifyjs/webpack-ssr

cd webpack-ssr

# npm
npm install

# yarn
yarn
```

For additional information, please visit the [Official Documentation](https://vuetifyjs.com).

## Resources

- [Vuetifyjs](https://vuetifyjs.com)


## TODO

### Doing
- BO: API/Server separation
- API: Handle API errors
  List of managed status code: 
  http://blog.restcase.com/rest-api-error-codes-101/
  http://thecodebarbarian.com/80-20-guide-to-express-error-handling
  Simple :
    200 - OK
    400 - Bad Request (Client Error) - A json with error \ more details should return to the client.
      - status
      - type
      - message
      - technical 
    401 - Unauthorized
    404 - Not Found
    500 - Internal Server Error - A json with an error should return to the client only when there is no security risk by doing that.
- API: Auto doc: http://apidocjs.com/

### Next
- FO: Axios global conf
- DB: schema Account/Transaction
- DB: how to manage refs (full copy vs reference)

### Ideas
- BO: states: https://github.com/vuejs/vuex/blob/dev/examples/counter-hot/Counter.vue
- DB: LocalStorage
- FO: SEO
- CHORE: Travis
- CHORE: Tests U
- CHORE: Tests E&E
- FO: 404 page
- BO: User auth : find standard solution / mongo schema / security 
- FO: account management 
- API: auth
- API: pagination
- BO: logger
- API: search method

### Done
- Layout & app skeleton
- ChartJS
- SASS: https://medium.com/@mahesh.ks/using-sass-scss-in-vue-js-2-d472af0facf9
- BO: routing: 
  https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
  http://catlau.co/how-to-modularize-routes-with-the-express-router/
- BO: Archi Server (Mongo/Mongoose/API): https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44
- BO: Seeds

