def call(def apiFile){

    def test = libraryResource 'openApiSChema/package.json'
       writeFile file: "package.json", text: test
    def zschemaValidator = libraryResource 'openApiSChema/zschemaValidator.js'
       writeFile file: "zschemaValidator.js", text: zschemaValidator  
    def validatorTest = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "validatorTest.js", text: validatorTest
    sh "npm install";
    sh "node validatorTest.js ${apiFile} > testResults"
	console.log("testResults: ${testResults}"
    def apiResult  = sh(returnStdout: true, script: "node validatorTest.js ${apiFile}").split("\r?\n")    
return apiResult;
}
