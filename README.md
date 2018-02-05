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
CREATE: done
PUT: create a validator that check if every property is defined
PATCH: /
GET: not found
DEL: /


### Doing
- API: Handle API errors
  https://github.com/jmtvms/mongoose-express-error-handler/blob/master/index.js
  http://thecodebarbarian.com/mongoose-error-handling
  List of managed status code: 
  http://blog.restcase.com/rest-api-error-codes-101/
  http://thecodebarbarian.com/80-20-guide-to-express-error-handling
  https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
  HTTP_ERRORS :
    200 - OK
      - status: 'OK'
    400 - Bad Request (Client Error) - A json with error \ more details should return to the client.
      - status: 'ERROR'
      - type
      - message
      - technical 
    500 - Internal Server Error - A json with an error should return to the client only when there is no security risk by doing that.
      - status: 'ERROR'
      - message: '...'
  DB_ERRORS
    Faire un mapping DB_ERRORS <-> HTTP_ERRORS
    Définir la liste des DB_ERRORS
    Dans le CORSServices: interception des erreurs DB, levée d'erreurs HTTP
    Pas besoin d'un type d'erreur interne => trop de complexité
    Les erreurs HTTP possède l'objet et le status à afficher => plus besoin de multiples handlers
    Par contre prévoir un handler par défaut avec 500 et pas trop d'infos pour les cas non gérés
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
- FO: 500 page
- BO: User auth : find standard solution / mongo schema / security 
- FO: account management 
- API: auth
- API: pagination
- BO: logger
- API: search method
- CHORE: live reload sur API
- DB: replace: return new resource instead of nbModiifed

### Done
- Layout & app skeleton
- ChartJS
- SASS: https://medium.com/@mahesh.ks/using-sass-scss-in-vue-js-2-d472af0facf9
- BO: routing: 
  https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
  http://catlau.co/how-to-modularize-routes-with-the-express-router/
- BO: Archi Server (Mongo/Mongoose/API): https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44
- BO: Seeds
- BO: API/Server separation
