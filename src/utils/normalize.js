export function normalizeText(txt){
    if(typeof txt !== "string") return null
    return txt.charAt(0).toUpperCase() + txt.slice(1);
}