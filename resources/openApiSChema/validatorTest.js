"use strict";
const util = require("util");
const ZSchema = require("z-schema");
const { openapi } = require("openapi-schemas");
const yaml = require("js-yaml");
const fs = require('fs');
const path = require("path");
const zschemaValidator = require("./zschemaValidator.js")
const SwaggerParser = require("swagger-parser");
var shell = require('shelljs');
const { throws } = require("assert");
const { error } = require("console");

const apiFile = `${process.argv[2]}`
const commitId = `${process.argv[3]}`

async function validate (apiFile, isConfig) {
    
    if (!(fs.existsSync(apiFile, 'utf8'))) {
        throw Error(`api spec doc file does not exist: ${apiFile}`)
    }

    let apiJSON;
    let isValid;
    let schema = undefined;
    let parseError = false;
    let result = {
    "DODItem": "OpenAPISchemaValidation",
    "Description": "Validates API specification with open API SChema",
    "squad": "undefined",
    "commitID": commitId
   }   
    try{
        if(isConfig){
            apiJSON = SwaggerParser.YAML.parse(fs.readFileSync(apiFile, 'utf8'));

            const schemaObject = fs.readFileSync(path.resolve(__dirname, '../schemas/OAS_Config.yaml'), 'utf8');
            schema = SwaggerParser.YAML.parse(schemaObject);
        } else {
            try {
                apiJSON = await SwaggerParser.parse(apiFile);
                let type = apiJSON.openapi ? `openapi ${apiJSON.openapi}` : 'swagger 2.0' ;
                shell.exec(`echo 'API name: ${apiJSON.info.title} Version: ${apiJSON.info.version} Type: ${type}'`);
            } catch (e) {
                parseError = true;
                result['status'] = 'FAILED';
                result['message'] =  `Error: parse Error while validaing Swagger.yaml file: ${e}`;            
                throw e;
            }
        }
          
    try{    
        isValid =  zschemaValidator(apiJSON, null);
        result['status'] =  'PASSED'
        result['message'] =  'Open API Schema validation Check passed'
    } catch(error){
        console.log("in error catch block");
        result['status'] =  'FAILED'
        result['message'] =  `Error: Error while validaing Swagger.yaml file: ${error.getMessage()}`
        throw error;  // generates an error object 
    }
    // return result;
    } finally{
        const jsonResult = JSON.stringify(result)
        console.log (jsonResult);
    }
}
 return validate(apiFile, false);
