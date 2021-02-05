import groovy.json.JsonSlurperClassic
def call(def apiFile = "./definitions/swagger.yml"){

    def test = libraryResource 'openApiSChema/package.json'
       writeFile file: "package.json", text: test
    def zschemaValidator = libraryResource 'openApiSChema/zschemaValidator.js'
       writeFile file: "zschemaValidator.js", text: zschemaValidator  
    def validatorTest = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "validatorTest.js", text: validatorTest
        def commitHash = sh (returnStdout: true, script:"git log -n 1 --pretty=format:'%H'")
    sh "npm install";
    def apiResult;
    dir("${pwd}"){
         apiResult  = sh(returnStdout: true, script: "node validatorTest.js ${apiFile} ${commitHash}").split("\r?\n")    
       println("result: " + apiResult);
    }
       // println("result: " + result1);
       def jsonResult = new JsonSlurperClassic().parseText(apiResult[apiResult.length -1])
     println("Inside Groovy function: "+ jsonResult.validated)

return apiResult[apiResult.length -1];
}
