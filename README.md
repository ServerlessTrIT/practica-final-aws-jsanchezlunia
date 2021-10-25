# ejercicioPractico
Ejercicio práctico evaluable

Comandos CLI utilizados:

Crear el bucket:

aws s3api create-bucket --bucket bucketjsanchez --region eu-central-1 --create-bucket-configuration LocationConstraint=eu-central-1


Subir index.html, app.js y error.html al bucket:

aws s3 cp index.html s3://bucketjsanchez/index.html
aws s3 cp app.js s3://bucketjsanchez/app.js
aws s3 cp error.html s3://bucketjsanchez/error.html


Configurar el bucket como web estática:

aws s3api put-bucket-website --bucket bucketjsanchez --website-configuration file://configuration.json


Crear política para el bucket:

aws s3api put-bucket-policy --bucket bucketjsanchez --policy file://policy.json


Crear distribución de CloudFront:

aws cloudfront create-distribution --origin-domain-name bucketjsanchez.s3.amazonaws.com --default-root-object index.html

* Campo DomainName devuelto al como respuesta: https://d35pae3md6s6dl.cloudfront.net
