import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as api from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';

export class DeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    var table1 = new dynamodb.Table(this, "table1", {
      tableName : "table1",
      partitionKey : { name : 'id', type : dynamodb.AttributeType.STRING }
    });

    var dynamoDbProxyLambda = new lambda.Function(this, "DynamoDbProxyLambda", {
      code : lambda.Code.fromAsset("../src/dynamodb-proxy-lambda"),
      handler : "index.handler",
      runtime : lambda.Runtime.NODEJS_12_X
    });

    table1.grantReadWriteData(dynamoDbProxyLambda);

    var dynamoDbApiGateway = new api.LambdaRestApi(this, "DynamoDbApiGateway", {
      handler : dynamoDbProxyLambda
    });
  }
}
