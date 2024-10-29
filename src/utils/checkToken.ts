export  const checkToken = async() =>{
    const token = localStorage.getItem('user-token')
if (token) {
    return true
}else{
    return false
}
}