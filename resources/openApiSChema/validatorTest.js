"use strict";
const util = require("util");
const ZSchema = require("z-schema");
const { openapi } = require("openapi-schemas");
const yaml = require("js-yaml");
const fs = require('fs');
const path = require("path");
const apiValidator = require("./zschemaValidator.js")
const SwaggerParser = require("swagger-parser");
var shell = require('shelljs');
const { throws } = require("assert");
const { error } = require("console");

const apiFile = `${process.argv[2]}`
const commitId = `${process.argv[3]}`

const isConfig = false;

async function validate (apiFile, isConfig) {
    if (!(fs.existsSync(apiFile, 'utf8'))) {
        throw Error(`api spec doc file does not exist: ${apiFile}`)
    }
    let apiJSON;
    let schema = undefined;
    if(isConfig){
        apiJSON = SwaggerParser.YAML.parse(fs.readFileSync(apiFile, 'utf8'));

        const schemaObject = fs.readFileSync(path.resolve(__dirname, '../schemas/OAS_Config.yaml'), 'utf8');
        schema = SwaggerParser.YAML.parse(schemaObject);
    } else {
        try {
            apiJSON = await SwaggerParser.parse(apiFile);
            shell.echo("API name: %s, Version: %s, Type: %s", apiJSON.info.title, apiJSON.info.version, (apiJSON.openapi ? `openapi ${apiJSON.openapi}` : 'swagger 2.0' ));
        } catch (e) {
            //console.log(e);
            throw e;
        }
    }
 let isValid;       
try{    
     isValid =  apiValidator(apiJSON, null);
} catch(error){
    console.log("in error catch block");
    //console.log(JSON.stringify(error))
    throw error;  // generates an error object 

}
let result;
if(isValid){
    result =  JSON.stringify({"validated": `${isValid}`,
    "DODItem": "OpenAPISchemaValidation",
    "Description": "Validates API specification with open API SChema",
    "API name": apiJSON.info.title,
    "squad": "undefined",
    "commitID": commitId,
    "status": "Passed",
    "message": `${apiJSON.info.title} validated with open API schema for ${commitId}`

    })
    console.log(result);
    //return result;

    }
else{
    result =  JSON.stringify({"validated": `${isValid}`,
    "DODItem": "OpenAPISchemaValidation",
    "Description": "Validates API specification with open API SChema",
    "API name": apiJSON.info.title,
    "squad": "undefined",
    "commitID": commitId,
    "status": "Failed",
    "message": `${apiJSON.info.title} validated with open API schema for ${commitId}`
    })
    console.log(result);
    //return result;

    }
    return result;

}

 return validate(apiFile, false);
