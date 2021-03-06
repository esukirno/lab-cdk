# Learn CDK Lab

This is a simple exercise to get to know CDK better.

At the end of this exercise, you should be able to deploy AWS resources shown in the architecture diagram below. We are going to setup a Lambda backed Rest API Gateway, that performs CRUD operations on DynamoDB table.
On top of that, we are going to stream the changes to each table onto another Lambda.

![Architecture diagram](Architecture%20diagram.png)


## Getting Started

### Prerequisites

* Install Node
```
https://github.com/coreybutler/nvm-windows
```

* Install and configure AWS CLI

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-install.html

https://docs.aws.amazon.com/cli/latest/userguide/cli-chap-configure.html

* Install CDK

Since this exercise is using typescript, use the following:
```
npm i -g aws-cdk
```

* Install typescript
```
npm i -g typescript
```

## Lab Instructions

### Exercise 1 Setup CDK project

1. From the root folder (where the README.md file is) creates `deploy` folder.
2. Navigate to `deploy` folder.
3. If this is the first time you use CDK. You might need to run `cdk bootstrap`. Otherwise run `cdk init app --language typescript` to initialise CDK project.
4. Run `npm run build` to build the project.
5. Run `cdk synth` to emit CloudFormation template.

### Exercise 2 Configure API gateway, Lambda, and DynamoDb

1. Open `lab-cdk` folder on your favorite IDE.
2. Open `lib/deploy-stack.cs` file.
3. Using CDK construct, create `DynamoDbProxyLambda` lambda. The source code is available on `src/dynamodb-proxy-lambda/index.js`.
4. Using CDK construct, create `DynamoDbApiGateway` Rest API Gateway for that Lambda.
5. Using CDK construct, create DynamoDb table `table1`.
6. Grant `DynamoDbProxyLambda` lambda, read and write access to DynamoDb table `table1`.
5. Run `npm run build` to build the project.
6. Run `cdk synth` to emit CloudFormation template.


### Exercise 3 Configure DynamoDb stream and logger Lambda
1. Open `lib/deploy-stack.cs` file.
2. Using CDK construct, create `StreamLogger` lambda. The source code is available on `src/stream-logger-lambda/index.js`.
3. Update DynamoDb table `table1` to stream record changes
4. Make `StreamLogger` lambda to handle `table1` stream
5. Run `npm run build` to build the project.
6. Run `cdk synth` to emit CloudFormation template.

### Exercise 4 Custom CDK construct
1. Open `lib/deploy-stack.cs` file.
2. Create custom CDK construct for resources created in Exercise 3
3. Bonus exercise: Create another DynamoDb `table2`, and stream its record changes to the same `StreamLogger` lambda by using the same custom CDK construct.

# References

* [CDK Typescript api references](https://docs.aws.amazon.com/cdk/api/latest/typescript/api/index.html)

# Authors
* Edwin Sukirno