import * as cdk from '@aws-cdk/core';
import * as lambda from '@aws-cdk/aws-lambda';
import * as api from '@aws-cdk/aws-apigateway';
import * as dynamodb from '@aws-cdk/aws-dynamodb';
import * as lambdaEventSources from '@aws-cdk/aws-lambda-event-sources'

export class DeployStack extends cdk.Stack {
  constructor(scope: cdk.Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    // The code that defines your stack goes here
    var table1 = new dynamodb.Table(this, "table1", {
      tableName : "table1",
      partitionKey : { name : 'id', type : dynamodb.AttributeType.STRING },
      stream: dynamodb.StreamViewType.NEW_AND_OLD_IMAGES
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

    var loggerLambda = new lambda.Function(this, "LoggerLambda", {
      code : lambda.Code.fromAsset("../src/logger-lambda"),
      handler : "index.handler",
      runtime : lambda.Runtime.NODEJS_12_X
    });

    loggerLambda.addEventSource(new lambdaEventSources.DynamoEventSource(table1, {
      startingPosition: lambda.StartingPosition.TRIM_HORIZON,
      batchSize: 5,
      bisectBatchOnError: true,
      retryAttempts: 10
    }));
  }
}
