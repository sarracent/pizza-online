# PIZZA ONLINE
This application was generated using JHipster 5.6.0, you can find documentation and help at [https://www.jhipster.tech/documentation-archive/v5.6.0](https://www.jhipster.tech/documentation-archive/v5.6.0).

Es una aplicación de comercio electrónico que gestiona pizzas, clientes, sus pedidos y facturas. Utilizará una base de datos Postgres en la producción y Angular del lado del cliente. La IU para el sitio web de compras será diferente de las funciones de back office, que solo estará disponible para los empleados que tienen un rol de administrador.

EXPLICACIÓN DE LAS ENTIDADES:

La entidad Pizza es el núcleo del modelo de dominio; contiene información de la pizza como nombre, descripción, precio, tipopizza e imagen, que es un blob. Nombre, precio y tipopizza son campos obligatorios. El precio también tiene una validación de valor mínimo. El campo tipopizza es una enumeración con valores definidos.

La entidad PizzaCategory se utiliza para agrupar las pizzas. Tiene nombre y descripción donde nombre es un campo obligatorio.

La entidad Cliente contiene los detalles de los clientes que utilizan el portal de compras en línea. La mayoría de los campos están marcados como requeridos, el campo de correo electrónico tiene validación de patrón de expresiones regulares. El campo de género es una enumeración.

Las entidades PizzaOrder y OrderItem se utilizan para rastrear los pedidos de pizza realizados por los clientes. PizzaOrder contiene la fecha y el estado, y el código del pedido, todos los campos obligatorios, mientras que OrderItem contiene información sobre la cantidad, el precio total y el estado de los pedidos individuales. Todos los campos son obligatorios y los campos de cantidad y precio total tienen una validación de valor mínima. OrderStatus y OrderItemStatus son campos de enumeración.

Las entidades de Factura y Envío se utilizan para rastrear la factura y el envío de los pedidos de las pizzas, respectivamente. La mayoría de los campos en Factura son obligatorios y los campos de estado y método de pago son enumerados.

Las enumeraciones se utilizan para contener el alcance de ciertos campos, lo que proporciona un control más granular sobre esos campos.

RELACIONES ENTRE ENTIDADES:

La primera que declaro es OneToOne unidireccional entre una entidad de Cliente y la entidad de Usuario incorporada. Significa que la entidad Cliente conoce al Usuario y es el propietario de la relación, pero el Usuario no conoce al Cliente y, por lo tanto, no podremos obtener clientes de un Usuario. Esto nos permite asignar clientes a la entidad Usuario y usarlos para fines de autorización, lo que garantiza que un cliente solo pueda asignarse a un usuario del sistema.
#Customer (1) -----> (1) User

La segunda relación que declaro es ManyToOne entre OrderItem y Pizza. Significa que OrderItem conoce a Pizza, pero Pizza no sabe acerca de OrderItem. Esto mantiene el diseño limpio, ya que no quiero saber sobre los pedidos de pizzas para este caso de uso.
#OrderItem (*) -----> (1) Pizza

Por último OneToMany. Todos son bidireccionales, lo que significa que tanto la entidad de origen como la entidad de destino se conocen entre sí.

Declaro que un cliente puede tener varios pedidos de pizzas, PizzaOrder puede tener múltiples OrderItems y Facturas, Factura puede tener muchos Envíos y PizzaCategory puede tener muchas Pizzas. Desde la entidad de destino, las entidades de origen se mapean como ManyToOne.
#Customer (1) <-----> (*) PizzaOrder, PizzaOrder (1) <-----> (*) OrderItem, PizzaOrder (1) <-----> (*) Invoice, Invoice (1) <-----> (*) Shipment, PizzaCategory (1) <-----> (*) Pizza

También declaro una clase de servicio para todas las entidades. También habilito la paginación para algunas de las entidades que pueden obtener muchas entradas a lo largo del tiempo.

El diagrama muestra el modelo completo, con todas las entidades y sus relaciones como se muestra en JDL Studio:

![pizza-online](https://user-images.githubusercontent.com/30700200/48433223-5a6b0680-e755-11e8-84fc-a337bbe9a234.jpg)

PERSONALIZACIÓN DE INTERFAZ GENERADA PARA UNA ENTIDAD:

A continuación personalizo la pantalla de listado de pizzas para mejorar la experiancia de usuario y hacerlo mucho más atractivo para el usuario final. También agrego un opción de filtro del lado del cliente para filtrar la lista.

También instalo un tema para Bootstrap 4. Bootswatch https://bootswatch.com/, es una buena colección de temas, en este caso instalo una llamado materia.

Vista para rol USER:

![user](https://user-images.githubusercontent.com/30700200/48437928-7d9bb300-e761-11e8-8ba7-2a3f483b0b5a.jpg)

Vista para rol ADMIN:

![admin](https://user-images.githubusercontent.com/30700200/48438111-f13dc000-e761-11e8-89f5-0a010239fe96.jpg)

AUTORIZACIÓN CON SPRING SECURITY:

Para este caso de uso:

- Los usuarios normales solo deben tener acceso para ver el listado de las pizzas, el pedido de la pizza, order item, la factura y el envío.
- Los usuarios normales no deben tener acceso para crear / editar / eliminar entidades a través de la API de CRUD.
- Los usuarios normales no deben poder acceder al pedido de la pizza, order item, la factura y el envío hecho por otros usuarios.

Estos problemas los resuelvo utilizando las características proporcionadas por Spring Security.

## Development

To start your application in the dev profile, simply run:

    


For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using angular-cli

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts


## Building for production

To optimize the app application for production, run:


To ensure everything worked, run:



Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./gradlew test

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Then, run a Sonar analysis:

```
./gradlew -Pprod clean test sonarqube
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a  database in a docker container, run:

    docker-compose -f src/main/docker/.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://www.jhipster.tech
[JHipster 5.6.0 archive]: https://www.jhipster.tech/documentation-archive/v5.6.0

[Using JHipster in development]: https://www.jhipster.tech/documentation-archive/v5.6.0/development/
[Using Docker and Docker-Compose]: https://www.jhipster.tech/documentation-archive/v5.6.0/docker-compose
[Using JHipster in production]: https://www.jhipster.tech/documentation-archive/v5.6.0/production/
[Running tests page]: https://www.jhipster.tech/documentation-archive/v5.6.0/running-tests/
[Code quality page]: https://www.jhipster.tech/documentation-archive/v5.6.0/code-quality/
[Setting up Continuous Integration]: https://www.jhipster.tech/documentation-archive/v5.6.0/setting-up-ci/

## Development

To start your application in the dev profile, simply run:

    ./mvnw


For further instructions on how to develop with JHipster, have a look at [Using JHipster in development][].

### Using angular-cli

You can also use [Angular CLI][] to generate some custom client code.

For example, the following command:

    ng generate component my-component

will generate few files:

    create src/main/webapp/app/my-component/my-component.component.html
    create src/main/webapp/app/my-component/my-component.component.ts
    update src/main/webapp/app/app.module.ts


## Building for production

To optimize the app application for production, run:

    ./mvnw -Pprod clean package

To ensure everything worked, run:

    java -jar target/*.war


Refer to [Using JHipster in production][] for more details.

## Testing

To launch your application's tests, run:

    ./mvnw clean test

For more information, refer to the [Running tests page][].

### Code quality

Sonar is used to analyse code quality. You can start a local Sonar server (accessible on http://localhost:9001) with:

```
docker-compose -f src/main/docker/sonar.yml up -d
```

Then, run a Sonar analysis:

```
./mvnw -Pprod clean test sonar:sonar
```

For more information, refer to the [Code quality page][].

## Using Docker to simplify development (optional)

You can use Docker to improve your JHipster development experience. A number of docker-compose configuration are available in the [src/main/docker](src/main/docker) folder to launch required third party services.

For example, to start a postgresql database in a docker container, run:

    docker-compose -f src/main/docker/postgresql.yml up -d

To stop it and remove the container, run:

    docker-compose -f src/main/docker/postgresql.yml down

You can also fully dockerize your application and all the services that it depends on.
To achieve this, first build a docker image of your app by running:

    ./mvnw package -Pprod jib:dockerBuild

Then run:

    docker-compose -f src/main/docker/app.yml up -d

For more information refer to [Using Docker and Docker-Compose][], this page also contains information on the docker-compose sub-generator (`jhipster docker-compose`), which is able to generate docker configurations for one or several JHipster applications.

## Continuous Integration (optional)

To configure CI for your project, run the ci-cd sub-generator (`jhipster ci-cd`), this will let you generate configuration files for a number of Continuous Integration systems. Consult the [Setting up Continuous Integration][] page for more information.

[JHipster Homepage and latest documentation]: https://www.jhipster.tech
[JHipster 5.6.0 archive]: https://www.jhipster.tech/documentation-archive/v5.6.0

[Using JHipster in development]: https://www.jhipster.tech/documentation-archive/v5.6.0/development/
[Using Docker and Docker-Compose]: https://www.jhipster.tech/documentation-archive/v5.6.0/docker-compose
[Using JHipster in production]: https://www.jhipster.tech/documentation-archive/v5.6.0/production/
[Running tests page]: https://www.jhipster.tech/documentation-archive/v5.6.0/running-tests/
[Code quality page]: https://www.jhipster.tech/documentation-archive/v5.6.0/code-quality/
[Setting up Continuous Integration]: https://www.jhipster.tech/documentation-archive/v5.6.0/setting-up-ci/


