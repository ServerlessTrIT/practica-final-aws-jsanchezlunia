import json
import boto3

def handler(event, context):
    car = json.loads(event['body'])
    
    key = {
    	'licenseplate': car['licenseplate']
    }
    
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Cars')
    result = table.delete_item(Key=key)
    
    body = {
    	"message": "delete",
    	"input": car
    }      
    
    response = {
    	'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
	'body': json.dumps(body)
    }  
        
    return response
