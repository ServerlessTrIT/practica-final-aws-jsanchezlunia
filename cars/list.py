import json
import boto3

def handler(event, context):
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Cars')
    result = table.scan()
    items = result.get('Items',[])
    
    body = {
    	"items": items
    }      
    
    response = {
    	'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
	'body': json.dumps(body)
    }  
        
    return response
