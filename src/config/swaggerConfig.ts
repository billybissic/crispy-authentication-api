import swaggerJsdoc from 'swagger-jsdoc';

const options = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: 'Crispy Authentication API Documentation',
            version: '1.0.0',
            description: 'API documentation for Crispy Authentication',
        },
    },
    apis: ['./src/router/administrators/*.ts',
           './src/router/authenticate/*.ts',
           './src/router/users/*.ts',
           './src/router/web-panel/*.ts'], // Path to your API files
};

const swaggerSpec = swaggerJsdoc(options);
export default swaggerSpec;