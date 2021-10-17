import json
import boto3

def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Cars')
    
    licenseplate = event['pathParameters']['id']
    key = {
    	'licenseplate': licenseplate
    }
    result = table.get_item(Key=key)
    item = result.get('Item',{})
    
    body = {
    	"item": item
    }      
    
    response = {
    	'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
	'body': json.dumps(body)
    }  
        
    return response
