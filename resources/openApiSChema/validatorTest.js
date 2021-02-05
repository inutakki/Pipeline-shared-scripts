"use strict";
const util = require("util");
const ZSchema = require("z-schema");
const { openapi } = require("openapi-schemas");
const yaml = require("js-yaml");
const fs = require('fs');
const path = require("path");
const ZschemaValidator = require("./zschemaValidator.js")
const SwaggerParser = require("swagger-parser");

let apiFile = "./definitions/swagger.yml"
if(process.argv[2] != null){
    apiFile = process.argv[2]
}
let commitId;
if(process.argv[3] != null){
    commitId = process.argv[3];
}
const isConfig = false;

async function validate (apiFile) {
    if (!(fs.existsSync(apiFile, 'utf8'))) {
        throw Error(`api spec doc file does not exist: ${apiFile}`)
    }
    let apiJSON;
    let schema = undefined;
    /*if(isConfig){
        apiJSON = SwaggerParser.YAML.parse(fs.readFileSync(apiFile, 'utf8'));

        const schemaObject = fs.readFileSync(path.resolve(__dirname, '../schemas/OAS_Config.yaml'), 'utf8');
        schema = SwaggerParser.YAML.parse(schemaObject);
    } else {*/
        try {
            apiJSON = await SwaggerParser.parse(apiFile);
            //console.log("API name: %s, Version: %s, Type: %s", apiJSON.info.title, apiJSON.info.version, (apiJSON.openapi ? `openapi ${apiJSON.openapi}` : 'swagger 2.0' ));
        } catch (e) {
            console.log(e);
        }
    //}
const isValid =  ZschemaValidator(apiJSON, null);
if(isValid){
   const result =  JSON.stringify({"validated": `${isValid}`,
    "DODItem": "OpenAPISchemaValidation",
    "Description": "Validates API specification with open API SChema",
    "API name": apiJSON.info.title,
    "squad": "undefined",
    "commitID": commitId,
    "status": "Passed",
    "message": `${apiJSON.info.title}  validated with open API schema for ${process.argv[3]}`

    } )
    console.log(result);
    return result;
    }
}
//console.log(process.argv[2]);
 return validate(apiFile);