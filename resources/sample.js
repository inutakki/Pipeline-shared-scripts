const jsonargs = `${process.argv[2]}`

function getJsonArgs(jsonargs){
  
  let temp = json.stringfy(json.parse(jsonargs))
  console.log(temp.buildId)
  
}
getJsonArgs(jsonargs)
