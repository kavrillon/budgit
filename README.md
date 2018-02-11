# Budg'It

## Resources

- [Vuetifyjs](https://vuetifyjs.com)

## Doc

### API

#### HTTP errors
- 200 - OK: Return the result of the operation
- 400 - Bad Request (Client Error) - Return a json with error
  - status: 400
  - type: CastError|DuplicateError|ImmutableError|ValidationError
  - fields: list of fields having problems (name + error)
- 404 - Not Found
- 500 - Internal Server Error
  - status: 500
  
## TODO

### Doing
- API: Auto doc: http://apidocjs.com/

### Next
- FO: Axios global conf

### Ideas
- CHORE: Travis
- CHORE: Tests U & I
- CHORE: Tests E&E: snapshots
- CHORE: live reload sur API
- CHORE: github conf (project/travis/coverage)
- DB: LocalStorage
- DB: how to manage refs (full copy vs reference)
- DB: schema Account/Transaction
- API: manage not modified on PUT/PATCH
- API: auth
- API: pagination
- API: stack trace when not on prod
- API: search method
- API: manage endpoints with deep objects
- BO: states: https://github.com/vuejs/vuex/blob/dev/examples/counter-hot/Counter.vue
- BO: User auth : find standard solution / mongo schema / security 
- BO: logger
- FO: SEO
- FO: 404 page
- FO: 500 page
- FO: account management 
- FO: dashboard

### Done & refs
- Layout & app skeleton
- ChartJS
- SASS: https://medium.com/@mahesh.ks/using-sass-scss-in-vue-js-2-d472af0facf9
- BO: routing: 
  https://scotch.io/tutorials/keeping-api-routing-clean-using-express-routers
  http://catlau.co/how-to-modularize-routes-with-the-express-router/
- BO: Archi Server (Mongo/Mongoose/API): https://hackernoon.com/lets-build-a-web-app-with-vue-chart-js-and-an-api-544eb81c4b44
- BO: Seeds
- BO: API/Server separation
- API: replace/update : return old/new/diff object
- API: PATCH return diff object
- API: Handle API errors
  https://github.com/jmtvms/mongoose-express-error-handler/blob/master/index.js
  http://thecodebarbarian.com/mongoose-error-handling
  List of managed status code: 
  http://blog.restcase.com/rest-api-error-codes-101/
  http://thecodebarbarian.com/80-20-guide-to-express-error-handling
  https://github.com/mongodb/mongo/blob/master/src/mongo/base/error_codes.err
