const express = require("express")
const mongoose = require("mongoose")
const morgan = require("morgan")
const bodyParser = require("body-parser")
const cookieParser = require("cookie-parser")
const cors = require("cors")
const expressValidator = require("express-validator")
require("dotenv").config()

const swaggerJsDoc = require("swagger-jsdoc")
const swaggerUi = require("swagger-ui-express")

const app = express()

//import Routes
const authRoutes = require("./routes/auth");
const usuarioRoutes = require("./routes/usuario")
const formaPagoRoutes = require("./routes/formaPago")
const proyectoRoutes = require("./routes/proyecto")
const proveedorRoutes = require("./routes/proveedor")
const trxRoutes = require("./routes/transaccion")

//**  Manager concection DataBase
// modern connection
const db = async () => {
    try {
        const success = await mongoose.connect(process.env.DATABASE, {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true, 
            useFindAndModify: false
        });
        console.log('DB Connected'); 
    } catch (error) {
        console.log('DB Connection Error', error);
    }
}
// execute db connection
db();

//** End Manager Connection Data Base */
// middlewares
app.use(morgan("dev"));
app.use(bodyParser.json());
app.use(cookieParser());
app.use(expressValidator());
app.use(cors());  // Habilita la conexión de equipos remotos


const swaggerOptions = {
    swaggerDefinition: {
        openapi: '3.0.0',
        info: {
            version: "1.0.0",
            title: "Control de Gastos",
            description: "Control de Gastos API Information",
            contact: {
                name: "daniel_dev"
            },
            servers: ["http://localhost:8001"]
        }
    },
    // definition the apis with swagger 
    apis: ['./routes/*.js']
};

// final definitions with swagger-express
const swaggerDocs = swaggerJsDoc(swaggerOptions);
app.use("/api-docs", swaggerUi.serve, swaggerUi.setup(swaggerDocs));

 
/* routes middlewares */
app.use("/api", authRoutes);
app.use("/api", usuarioRoutes);
app.use("/api", formaPagoRoutes);
app.use("/api", proyectoRoutes);
app.use("/api", proveedorRoutes);
app.use("/api", trxRoutes);


// port
const port = process.env.PORT || 8000;

// listen port
app.listen(port, () => {
    console.log(`Server is running on port ${port}`);
});
  