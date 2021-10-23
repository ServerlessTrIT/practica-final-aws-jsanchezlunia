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
    	'headers': {
    	    'Access-Control-Allow-Origin': '*',
    	    'Access-Control-Allow-Methods': 'OPTIONS, GET'
    	},
	'body': json.dumps(body)
    }  
        
    return response
