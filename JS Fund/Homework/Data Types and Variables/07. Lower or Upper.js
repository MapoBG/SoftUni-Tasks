function lowerOrUpperCase(param){
    let charCode = param.charCodeAt();
    if(charCode <91){
        console.log("upper-case");
    }else{
        console.log("lower-case");
    }
}
lowerOrUpperCase("f")