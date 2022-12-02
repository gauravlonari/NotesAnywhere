export const capitalize=(word)=>{
    word=word.toLowerCase();
    return word.charAt(0).toUpperCase()+word.slice(1);
}
export const getPrintDate= date =>{
    const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"];
    try{
        if(!date)
        return "Date Not Found"
        const d=new Date(date);
        return d.getDate()+" "+months[d.getMonth()]+", "+d.getFullYear();
    }
    catch(e){
        return "Date Not Found"
    }
}