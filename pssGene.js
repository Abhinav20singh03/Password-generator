const slider=document.querySelector("#range");
const lengthdisplay=document.querySelector("#range-number");
const passwordisplay=document.querySelector("#pass");
const copybutton=document.querySelector("#copy-icon");
const uppercase=document.querySelector("#option1");
const lowercase=document.querySelector("#option2");
const number=document.querySelector("#option3");
const symbol=document.querySelector("#option4");
const colordisplay=document.querySelector("#color");
const generatebutton=document.querySelector("#genbutton");
//default password will be generated on the basis of these values
let password="password";
let passwordlength=10;
let checkcount=0;
let symbols =["@","#","$","%","^","&","*","(",")","-","_"];
handleSlider();
setIndicator();
//set passlen
function handleSlider(){
    slider.value=passwordlength;
    lengthdisplay.innerText=passwordlength;
}
function setIndicator(){
    let checkcount=0;
    if(uppercase.checked)checkcount++;
    if(lowercase.checked)checkcount++;
    if(symbol.checked)checkcount++;
    if(number.checked)checkcount++;
    if(checkcount==1)
        colordisplay.style.background="red";
    else if(checkcount==2||checkcount==3)
        colordisplay.style.background="yellow";
    else if(checkcount==4)
       colordisplay.style.background="green";
}
function getRandomInteger(max,min){
    return Math.floor(Math.random() * (max - min + 1)) + min;
}
function getRandomNumber(){
    return getRandomInteger(9,0);
}
function getRandomUppercase(){
    const randomInt = getRandomInteger(65, 90);
    return String.fromCharCode(randomInt);
}
function getRandomLowercase(){
    const randomInt = getRandomInteger(97, 122);
    return String.fromCharCode(randomInt);
}
function getRandomSymbol(symbol){
    let index= getRandomInteger(0,symbols.length)
    return symbols[index];
}
function setpassword(){
    passwordisplay.textContent(password);
}
function copy(){
    navigator.clipboard.writeText(password);
    alert("Password Copied");
}
function shuffleWord (word){
    var shuffledWord = '';
    word = word.split('');
    while (word.length > 0) {
      shuffledWord +=  word.splice(word.length * Math.random() << 0, 1);
    }
    return shuffledWord;
}
copybutton.addEventListener('click',copy);
slider.addEventListener('input',function(val){
passwordlength=val.target.value;
handleSlider();
})
function getpassword(passwordlength){
    let up=false,lo=false,num=false,sym=false;
    let checkcount=0;
    let finalpass ="";
    if(uppercase.checked){
        checkcount++;
        up=true;
    }
    if(lowercase.checked){
        checkcount++;
        lo=true;
    }
    if(symbol.checked){
        checkcount++;
        sym=true;
    }
    if(number.checked){
        checkcount++;
        num=true;
    }
    if(checkcount==0){
     alert("please mark atleast 1 checkbox");
     return "";   
    }
    else{
        while(finalpass.length<passwordlength){
            if(up)
            finalpass+=getRandomUppercase();
            if(lo)
            finalpass+=getRandomLowercase();
            if(num)
            finalpass+=getRandomNumber().toString();
            if(sym)
            finalpass+=getRandomSymbol();
        }
    }
    return shuffleWord(finalpass);
    

}
generatebutton.addEventListener("click",()=>{
    let pass=getpassword(passwordlength);
    password=pass;
    passwordisplay.innerText=pass;
    setIndicator();
});
