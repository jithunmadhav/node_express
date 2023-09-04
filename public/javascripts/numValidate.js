function validate(){
    let numtxt=document.getElementById('phonenum').value
    let numexp=/^\d{10}$/
    if(numtxt.match(numexp)){
        return true
    }else{
        alert("Invalid number")
        return false
    }
}