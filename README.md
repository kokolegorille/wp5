# Webpack 5 starter kit

May 2021

## Installation

$ mkdir wp5
$ cd wp5/

$ mkdir -p src/css src/js src/fonts dist
$ touch src/index.js
$ touch src/index.html
$ touch src/css/app.scss

$ npm init -y

$ git init .
$ vim .gitignore

```
/dist
/node_modules
npm-debug.log
.DS_Store
```

$ git add .
$ git commit -m "Initial commit"

### Dev Packages

$ npm install -D webpack webpack-cli

$ npm install -D webpack-dev-server html-webpack-plugin

$ npm install -D mini-css-extract-plugin css-loader sass sass-loader terser-webpack-plugin css-minimizer-webpack-plugin
$ npm install -D @babel/core @babel/preset-env @babel/preset-react babel-loader

### Optional Dev Packages

$ npm install -D webpack-manifest-plugin
$ npm install -D copy-webpack-plugin

### Packages

$ npm i react react-dom
$ npm i phoenix 