# VIDEO 04 - Introducción a CORS

En este vídeo hemos hablado sobre CORS:

<https://developer.mozilla.org/en-US/docs/Web/HTTP/CORS>

CORS significa "Cross-Origin Resource Sharing" y es una política de seguridad implementada por los navegadores web para proteger a los usuarios de sitios web maliciosos que intentan acceder a recursos de otros dominios sin permiso.

Cuando un sitio web solicita recursos (como datos JSON, imágenes, videos, etc.) de otro dominio utilizando una API, CORS determina si la solicitud debe ser permitida o denegada. Si el servidor que aloja los recursos tiene habilitada la política de CORS, entonces el servidor puede enviar una respuesta que incluye los encabezados necesarios para permitir que el navegador del usuario acceda a los recursos.

CORS es una medida de seguridad importante para proteger a los usuarios de la web y garantizar que los sitios web solo puedan acceder a los recursos que tienen permiso para usar.

Por defecto el CORS nos bloqueará las peticiones que realicemos a nuestra API desde un frontal que esté en otro dominio, por lo que para que funcione tendremos que añadir la cabecera Access-Control-Allow-Origin a nuestras respuestas, indicando como valor la ruta desde la cual se va a consumir nuestra API

Este es un ejemplo de un método de Brand:

```jsx
// CRUD: READ
router.get("/:id", async (req, res) => {
  res.set("Access-Control-Allow-Origin", "http://localhost:3000");
  try {
    const id = req.params.id;
    const brand = await Brand.findById(id);
    if (brand) {
      res.json(brand);
    } else {
      res.status(404).json({});
    }
  } catch (error) {
    console.error(error);
    res.status(500).json(error);
  }
});
```

Otra opción menos segura es permitir todos los dominios:

```jsx
res.set("Access-Control-Allow-Origin", "*");
```
