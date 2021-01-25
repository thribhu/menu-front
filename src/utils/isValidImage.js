export default isValid = (url) => {
    var first_4 = url.substring(0, 3);
    if (first_4 !== ("http" || "data")){
        return false
    }
    else return url
}