
# LAB - 07

<!-- ## Project: Project Name Here -->
## Express

### Author: Mohammad Samara

### Links and Resources

* [submission PR](https://github.com/mohammad-samara/api-server/pull/2)
* [swagger documentation](https://app.swaggerhub.com/apis/mohammad-samara/json-server/0.1)

### Modules

**timestamp.js** , **logger.js** , **500.js**, **404.js**

#### Exported Values and Methods

`node index.js`
This will start listening.

`timestamp.js`
This will give us the date for the request.

`logger.js`
This will console our method, date and path.

`404.js`
This will console for not exist route.

`500.js`
This will console the server errors.

### Setup

#### `.env`

const PORT = port || process.env.PORT || 3000;

#### How to initialize/run your application

* `npm init -y`
* `npm index.js`
* use git,postman or sawgger to use crud methods.

#### Tests

* `npm test`

#### UML

![UML](/assets/uml-lab-class07.jpg)
