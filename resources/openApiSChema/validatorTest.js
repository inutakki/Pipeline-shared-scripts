"use strict";
const util = require("util");
const ZSchema = require("z-schema");
const { openapi } = require("openapi-schemas");
const yaml = require("js-yaml");
const fs = require('fs');
const path = require("path");
const ZschemaValidator = require("./zschemaValidator.js")
const SwaggerParser = require("swagger-parser");



const apiFile = process.argv[2]
const commitId = process.argv[3]

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
            console.log("API name: %s, Version: %s, Type: %s", apiJSON.info.title, apiJSON.info.version, (apiJSON.openapi ? `openapi ${apiJSON.openapi}` : 'swagger 2.0' ));
        } catch (e) {
            console.log(e);
        }
    }
    const isValid =  ZschemaValidator(apiJSON);
    if(isValid){
        const result =  JSON.stringify({"validated": isValid,
        "DODItem": "OpenAPISchemaValidation",
        "Description": "Validates API specification with open API SChema",
        "API name": apiJSON.info.title,
        "squad": "undefined",
        "commitID": commitId,
        "status": "Passed",
        "message": `${apiJSON.info.title} successfully validated with open API schema for ${commitId}`
        })
        return result;
    }
}
 return validate(apiFile, null);