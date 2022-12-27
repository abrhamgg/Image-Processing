# Image Processing API

This project aims to give you a real-world scenario in which you would read and write to your disk via a Node.js express server rather than a database. The project you create serves two purposes: to prepare you for setting up scalable code and architecture for real-world projects and tie together some of the most popular middleware and utilities found in Node.js projects. This project barely touches the surface of what is possible but will prove your ability to use what you’ve learned in real-world scenarios.

## Getting Started

### Installing dependencies

Make sure you have installed node and npm.

Clone this repo and add npm to the project
```
npm init -y
```

Install Typescript and make the neccessary configuration changes
```
npm i --save-dev typescript
npm i --save-dev ts-node
```

Install and configure jasmine 
``` npm i jasmine ```

Install and configre express
```npm i express```

Install and confugure prettier, Eslint
```
npm i prettier
npm i eslint
```

### Running the server
``` npm run start ```

### Usage
``` http://localhost:3000/api/images?filename=fjord&width=500&height=500```

- filename: is the name of image file in the images/full directory without extension.
- height: height of the newly processed image.
- width: width of the newly processed image.

### Compiling the project to javascript
run ```npm run build ``` and a directory called dist will be created at the root of the project directory.

The package.json, .prettierrc , eslintrc files are already found at the repo so you can look at these files if you have any problems configuring the project.
