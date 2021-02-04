def call(){

    def test = libraryResource 'openApiSChema/package.json'
       writeFile file: "package.json", text: test
    def zschemaValidator = libraryResource 'openApiSChema/zschemaValidator.js'
       writeFile file: "zschemaValidator.js", text: zschemaValidator  
    def validatorTest = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "validatorTest.js", text: validatorTest
    //sh "npm install";
    //def value = sh(returnStdout: true, script: "node validatorTest.js")
    //return value;
}