const jsonargs = `${process.argv[2]}`

function getJsonArgs(jsonargs){
  
  let temp = JSON.parse(JSON.stringify(jsonargs))
  console.log(temp.buildId)
  
}
getJsonArgs(jsonargs)
