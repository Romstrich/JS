
let text = document.getElementById("text_replace");
document.getElementById("replace").addEventListener('click',()=>{
    //text.textContent=text.textContent.replace(/'/g,'"')
    text.textContent=text.textContent.replace(/\B'|'\B/g,'"')
})