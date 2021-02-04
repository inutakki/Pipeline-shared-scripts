def call(){
    def validatorFile = libraryResource 'openApiSChema/validatorTest.js'
        writeFile file: "validatorTest.js", text: validatorFile

    sh(returnStdout: true, script: "node validatorTest.js").trim();
}