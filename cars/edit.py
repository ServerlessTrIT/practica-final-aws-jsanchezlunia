import json
import boto3

# Identificamos el elemento a modificar a partir del parámetro de la URL.
# Otra alternativa era utilizar el fichero create.py tanto para crear como para modificar, y no implementar este edit.py.
def handler(event, context):
    car = json.loads(event['body'])
    item = {
    	"licenseplate": event['pathParameters']['id'],
    	"brand": car['brand'],
    	"model": car['model']
    }
      
    dynamodb = boto3.resource('dynamodb')
    table = dynamodb.Table('Cars')
    result = table.put_item(Item=item)
    
    body = {
    	"message": "edit",
    	"input": car
    }
    
    response = {
    	'statusCode': result['ResponseMetadata']['HTTPStatusCode'],
    	'headers': {
    	    'Access-Control-Allow-Origin': '*',
    	    'Access-Control-Allow-Methods': 'OPTIONS, POST'
    	},
	'body': json.dumps(item)
    }  
        
    return response
