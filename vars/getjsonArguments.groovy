import groovy.json.JsonOutput
import groovy.json.JsonBuilder

def call(){
   def buildProps = [:]
  buildProps.put("buildNumber","${env.BUILD_NUMBER}")
  def jsonProps = JsonOutput.toJson(["json_Props": [buildProps]])
  println("class in groovy"+ jsonProps.getClass())
  println("jsonProps: " + jsonProps)
   def test = libraryResource 'sample.json'
   writeFile file: "sample.js", text: test
  def jsOutput =  sh(returnStdout: true, script: "node sample.js ${jsonProps}").split("\r?\n") 
  println(jsOutput)
  
  
  
}
