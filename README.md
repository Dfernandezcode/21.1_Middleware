# Notes on 21.1

<-------------------------What is middleware?------------------------------>

Middleware in web development, specifically in frameworks like Express, is a mechanism that allows you to add custom functionality to the request-response lifecycle. It acts as a bridge between the server and your application's routes.

Middleware functions are executed in the order they are defined and can perform various tasks such as:

Modifying the request or response objects: Middleware can add, modify, or remove properties and values from the request and response objects, allowing you to customize the data available to subsequent middleware or route handlers.

Performing authentication and authorization: Middleware can check if a user is authenticated and authorized to access certain routes or resources. It can verify credentials, validate tokens, and enforce access control rules.

Handling request preprocessing: Middleware can preprocess incoming requests, such as parsing request bodies, cookies, or query parameters, before they reach the route handlers. This allows you to transform and validate the data before it's processed further.

Logging and debugging: Middleware can log information about incoming requests, outgoing responses, and any errors that occur during the request-response cycle. This helps with debugging and monitoring the application.

Error handling: Middleware can catch errors that occur during the processing of a request and handle them appropriately. It can log the error, format the response, and prevent the application from crashing.

Applying cross-cutting concerns: Middleware allows you to apply common functionality across multiple routes or applications. For example, you can add middleware to handle CORS headers, compression, caching, or rate limiting.

By utilizing middleware, you can modularize and reuse code, keep your routes focused on specific tasks, and add layers of functionality to your application's request-response flow. Middleware provides flexibility and extensibility to your web application, making it easier to add new features and maintain existing ones.

# Notes 21.2

<----------------------Email and User passwords---------------------------->

Use npm i validator to run validation checks on user emails/passwords.

# const user = await User.findById(id).select("+password");

this line of code allows us to find passwords when doing find by id petitions.

----------- Unsecure login requests.

    -usually done with post.
    -401 error is usually done for incorrect passwords.

----------- Encrypting passwords with "brcypt".
