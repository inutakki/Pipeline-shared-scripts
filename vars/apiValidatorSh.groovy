import groovy.json.JsonSlurperClassic
def call(def apiFile = "./definitions/swagger.yml"){

    def test = libraryResource 'openApiSChema/package.json'
       writeFile file: "precommit-dod/package.json", text: test
    def zschemaValidator = libraryResource 'openApiSChema/zschemaValidator.js'
       writeFile file: "precommit-dod/zschemaValidator.js", text: zschemaValidator  
    def validatorTest = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "precommit-dod/validatorTest.js", text: validatorTest
        def commitHash = sh (returnStdout: true, script:"git log -n 1 --pretty=format:'%H'")
    def apiResult
    try{

        sh "cd precommit-dod; npm install";
       def testResult;
       
       sh "node precommit-dod/validatorTest.js ${apiFile} ${commitHash} > testResult"
        def a = readFile file: "./testResult";
        println("${a}");
        def jsonResult = new JsonSlurperClassic().parseText(a[a.length -1])
        println("Inside Groovy function: "+ jsonResult.validated);
        println("SUccessfully Completed api SChema Validation");
    } catch(error){
        
        println(error)
        throw error
        //currentBuild.result = 'FAILED'
    }

return jsonResult;
}