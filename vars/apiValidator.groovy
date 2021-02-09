import groovy.json.JsonSlurperClassic
def call(def apiFile = "./definitions/swagger.yml"){
    def location = pwd();
    println("location: "+ location)

    def test = libraryResource 'openApiSChema/package.json'
       writeFile file: "DOD/API_Schema_Validation/package.json", text: test
    def zschemaValidator = libraryResource 'openApiSChema/zschemaValidator.js'
       writeFile file: "DOD/API_Schema_Validation/zschemaValidator.js", text: zschemaValidator  
    def validatorTest = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "DOD/API_Schema_Validation/validatorTest.js", text: validatorTest
        def commitHash = sh (returnStdout: true, script:"git log -n 1 --pretty=format:'%H'")
    def apiResult
    try{

        sh "cd DOD/API_Schema_Validation; npm install";
        apiResult  = sh(returnStdout: true, script: "node DOD/API_Schema_Validation/validatorTest.js ${apiFile} ${commitHash}").split("\r?\n") 
        println("result: " + apiResult);
        def jsonResult = new JsonSlurperClassic().parseText(apiResult[apiResult.length -1])
        println("Inside Groovy function: "+ jsonResult.validated);
        println("SUccessfully Completed api SChema Validation");
        
        /*def apiResult  = sh(returnStdout: true, script: "node validatorTest.js ${apiFile} ${commitHash}").split("\r?\n")       
        println("result: " + apiResult);
        def jsonResult = new JsonSlurperClassic().parseText(apiResult[apiResult.length -1])
        println("Inside Groovy function: "+ jsonResult.validated)
        println("SUccessfully Completed api SChema Validation")
        
       println("apiResult:" + apiResult);*/
       /*def testResult;
       sh "cd precommit-dod; npm install; node validatorTest.js ../${apiFile} ${commitHash} > testResult"
        def a = readJson text: testResult;
        println("${a}");*/
    } catch(error){
        
        println(error)
        throw error
        //currentBuild.result = 'FAILED'
    }

return apiResult[apiResult.length -1];
    

}