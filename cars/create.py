import json
import boto3

def handler(event, context):
    car = json.loads(event['body'])
    item = {
    	"licenseplate": car['licenseplate'],
    	"brand": car['brand'],
    	"model": car['model']
    }
      
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Cars')
    result = table.put_item(Item=item)
    
    body = {
    	"message": "create",
    	"input": car
    }
    
    response = {
    	'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
    	'headers': {
    	    'Access-Control-Allow-Origin': '*',
    	    'Access-Control-Allow-Methods': 'OPTIONS, POST'
    	},
	'body': json.dumps(body)
    }  
        
    return response
