# ejercicioPractico
Ejercicio práctico evaluable

Comandos CLI utilizados:

Crear el bucket:

__aws s3api create-bucket --bucket bucketjsanchez --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1__


Subir index.html, app.js y error.html al bucket, para que así quede desplegado el front como web estática:

aws s3 cp frontSPA/index.html s3://bucketjsanchez/index.html
aws s3 cp frontSPA/app.js s3://bucketjsanchez/app.js
aws s3 cp frontSPA/error.html s3://bucketjsanchez/error.html


Configurar el bucket como web estática:

aws s3api put-bucket-website --bucket bucketjsanchez --website-configuration file://configuration.json


Crear política para el bucket:

aws s3api put-bucket-policy --bucket bucketjsanchez --policy file://policy.json


Crear distribución de CloudFront:

aws cloudfront create-distribution --origin-domain-name bucketjsanchez.s3.amazonaws.com --default-root-object index.html

* Campo DomainName devuelto como respuesta al crear la distribución CloudFront: https://d35pae3md6s6dl.cloudfront.net


Para desplegar el backend utilizando el framework Serverless, utilizamos el siguiente comando:

sls deploy


Implementación adicional:

* Se ha añadido la posibilidad de editar un item, para lo que se ha incluido el botón "Modificar", y una nueva vista para la modificación, en la que el campo "Matrícula" está bloqueado, ya que es el identificador del item.
