# Budg'It

## Project setup

```sh
yarn install
```

### Compiles and hot-reloads for development

```sh
yarn serve
```

### Compiles and minifies for production

```sh
yarn build
```

### Run your unit tests

```sh
yarn test:unit
```

### Run your end-to-end tests

```sh
yarn test:e2e
```

### Lints and fixes files

```sh
yarn lint
```

### Customize configuration

See [Configuration Reference](https://cli.vuejs.org/config/).

## Technical infos

### Transitions

Routing transitions :

- the `enter` transition is managed by containers: as it is asynchronous, the router can't manage them.
- the `leave` transition is managed by the router: it is synchronous, and the router has to know when to change page.
