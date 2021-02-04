def call(){

    def package = libraryResource 'openApiSChema/package.js'
       writeFile file: "package.json" text: package
    def zschemaValidator = libraryResource 'openApiSChema/zschemaValidator.js'
       writeFile file: "zschemaValidator.js" text: package  
    def validatorTest = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "validatorTest.js", text: validatorTest
    sh "npm install";
    sh(returnStdout: true, script: "node validatorTest.js").trim();
}