import groovy.json.JsonOutput
import groovy.json.JsonBuilder

def call(){
   def buildProps = [:]
   def buildPropsarray = []
   buildProps.put("\"buildNumber\"","\"${env.BUILD_NUMBER}\"")
   buildProps.put("\"displayName\"", "\"${env.JOB_NAME}\"")
  def jsonProps = JsonOutput.toJson(["json_Props": [buildProps]])
  // def jsonProps = JsonOutput.toJson(buildProps)
   //jsonProps = JsonOutput.prettyPrint(jsonProps).toString()
  // def jsonProps = new JsonBuilder(buildProps).
  println("class in groovy"+ jsonProps.getClass())
   println("jsonProps: ${jsonProps}")
   def test = libraryResource 'sample.js'
   writeFile file: "sample.js", text: test
  def jsOutput =  sh(returnStdout: true, script: "node sample.js ${jsonProps}").split("\r?\n") 
   println("jsoutput: ${jsOutput}")
  
  
  
}
