const capitalize=(word)=>{
    word=word.toLowerCase();
    return word.charAt(0).toUpperCase()+word.slice(1);
}
export {capitalize};