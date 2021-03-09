const jsonargs = `${process.argv[2]}`

function getJsonArgs(jsonargs){
  
  let temp = JSON.parse(jsonargs)
  console.log(temp)
  console.log(typeof(temp))
  
}
getJsonArgs(jsonargs)
