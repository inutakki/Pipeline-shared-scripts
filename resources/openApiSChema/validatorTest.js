"use strict";
const util = require("util");
const ZSchema = require("z-schema");
const { openapi } = require("openapi-schemas");
const yaml = require("js-yaml");
const fs = require('fs');
const path = require("path");
const ZschemaValidator = require("./zschemaValidator.js")
const SwaggerParser = require("swagger-parser");

let apiFile = "./definitions/swagger.yaml"
if(process.argv[2]){
    console.log(process.argv[2]);
    apiFile = process.argv[2];
}
 
const isConfig = false;

async function validate (apiFile, isConfig) {
    console.log("inside Function");
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
            //apiJSON = await parser(apiFile);
            apiJSON = await SwaggerParser.parse(apiFile);
            console.log("API name: %s, Version: %s, Type: %s", apiJSON.info.title, apiJSON.info.version, (apiJSON.openapi ? `openapi ${apiJSON.openapi}` : 'swagger 2.0' ));
        } catch (e) {
            console.log(e);
        }
    }
const a =  ZschemaValidator(apiJSON, null);

if(a){
   const result =  JSON.stringify({"validated": `${a}`,
    "DODItem": "OpenAPISchemaValidation",
    "Description": "Validates API specification with open API SChema",
    "API name": apiJSON.info.title,
    "squad": "undefined",
    "commitID": "commitID",
    "status": "Passed",
    "message": `${apiJSON.info.title} validated with open API schema for commitID`

    } )
    console.log(result);
    return result;
    }
}

 return validate(apiFile, false);

 
