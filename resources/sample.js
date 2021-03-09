const fs = require('fs');
const jsonargs = `${process.argv[2]}`

function getJsonArgs(jsonargs){
  
  fs.readFile("./sampletest.json", 'utf8', (err, result) => {
      if (err) {
        console.log(err);
      }
    let jsonargs = JSON.parse(result)
    console.log(jsonargs)
    console.log(typeof(jsonargs))
      
    })
  let temp = JSON.parse(jsonargs)
 
  console.log(temp)
  console.log(typeof(temp))
  console.log(temp.buildNumber)
  
  
}
getJsonArgs(jsonargs)
