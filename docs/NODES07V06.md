# VIDEO 06 - Ejercicio añadir validaciones, CORS y despliegue para el front

En este ejercicio partiremos del código del ejercicio de la sesión 6: la api de libros y autores.

Sobre esta API debes hacer las siguientes modificaciones:

**PASO 1**

Añade las siguientes validaciones:

Author:

- Nombre: debe tener entre 3 y 20 caracteres, sin espacios por delante o por detrás y con mensajes personalizados de error
- País: debe pertenecer a una lista de elementos, estar en mayúsculas y sin espacios por delante y por detrás

Libro:

- Título: debe tener entre 3 y 20 caracteres, sin espacios por delante o por detrás y con mensajes personalizados de error
- Páginas: debe valer entre 1 y 1000 y con mensajes personalizados de error
- Nombre de editorial: debe tener entre 3 y 20 caracteres, sin espacios por delante o por detrás y con mensajes personalizados de error
- País de editorial: debe pertenecer a una lista de elementos, estar en mayúsculas y sin espacios por delante y por detrás

**PASO 2**

Haz que la API devuelva un 400 cuando se intente crear o modificar un elemento y los datos no cumplan las validaciones.

**PASO 3**

Añade las cabeceras adecuadas para que no tengamos problemas de CORS al consumir la API desde localhost:3000 y publica tu API en vercel

**PASO 4**

Crea un pequeño frontal con la tecnología que quieras (React o Javascript/HTML) que consuma nuestra API y pinte los datos de los libros de la siguiente manera.

![libros.png](/docs/assets/libros.png)

**PASO 5**

Normaliza los datos que ya existieran en la base de datos para que todos cumplan las nuevas restricciones.

Para ello deberás crear dos scripts que normalicen libros y autores respectivamente.

Recuerda que puedes encontrar todo el contenido que hemos visto en los vídeos, en el siguiente repositorio:

<https://github.com/The-Valley-School/node-s7-validation-and-cors>
