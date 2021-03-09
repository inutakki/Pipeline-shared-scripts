const jsonargs = `${process.argv[2]}`

function getJsonArgs(jsonargs){
  
  let temp = JSON.stringify(jsonargs)
  console.log(temp)
  
}
getJsonArgs(jsonargs)
