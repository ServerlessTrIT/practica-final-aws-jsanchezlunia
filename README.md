# ejercicioPractico
Ejercicio práctico evaluable

Comandos CLI utilizados:

Crear el bucket en S3 para poder desplegar posteriormente el frontend:

`aws s3api create-bucket --bucket bucketjsanchez --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1`

* URL devuelta como respuesta: `http://bucketjsanchez.s3.amazonaws.com/`


Subir *index.html*, *app.js* y *error.html* al bucket, para que así quede desplegado el front como web estática:

`aws s3 cp frontSPA/index.html s3://bucketjsanchez/index.html`

`aws s3 cp frontSPA/app.js s3://bucketjsanchez/app.js`

`aws s3 cp frontSPA/error.html s3://bucketjsanchez/error.html`


Configurar el bucket como web estática:

`aws s3api put-bucket-website --bucket bucketjsanchez --website-configuration file://s3deploy/configuration.json`


Crear política para el bucket:

`aws s3api put-bucket-policy --bucket bucketjsanchez --policy file://s3deploy/policy.json`


Crear distribución de CloudFront:

`aws cloudfront create-distribution --origin-domain-name bucketjsanchez.s3.amazonaws.com --default-root-object index.html`

* Campo *DomainName* devuelto como respuesta al crear la distribución CloudFront: `d35pae3md6s6dl.cloudfront.net`. Es el dominio asignado por CloudFront y tiene asociado un certificado SSL. Por tanto, se puede acceder a la web desplegada en la URL `https://d35pae3md6s6dl.cloudfront.net`


Para desplegar el backend utilizando el framework Serverless, utilizamos el siguiente comando:

`sls deploy`

Como resultado de la ejecución, nos muestra por pantalla el API key y la URL de los endpoints del backend, utilizados en el fichero de JavaScript del frontend para realizar las peticiones al backend.


__Implementación adicional:__

Se ha añadido al front la posibilidad de editar un item, para lo que se ha incluido el botón "Modificar" desde el listado de items, y su correspondiente nueva vista para la modificación de los campos del item, en la que el campo "Matrícula" está bloqueado para solo lectura, ya que es el identificador del item. Para esta modificación, se ha ampliado el fichero *app.js*:
* Se incluye el uso del método GET para obtener el item por id, para pintar sus datos en la vista de modificación.
* El método para crear un item se reemplaza por un PUT, y se introduce un nuevo método para actualizar item, mediante POST.

De esta forma se le da uso a todos los endpoints implementados en el backend.
