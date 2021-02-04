def call(){

    def a1 = sh(returnStdout: true, script: "echo test").trim();
    return a1;
}