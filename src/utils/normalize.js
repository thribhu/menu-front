export function normalizeText(txt){
    if(typeof txt !== "string") return null
    return string.charAt(0).toUpperCase() + string.slice(1);
}