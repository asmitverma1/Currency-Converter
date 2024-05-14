const baseurl="https://cdn.jsdelivr.net/npm/@fawazahmed0/currency-api@latest/v1/currencies"
const dropdowns=document.querySelectorAll(".dropdown select"); ///// specific tag
const btn=document.querySelector("form button");
const fromcurr=document.querySelector(".from select");
const tocurr=document.querySelector(".to select");
const message=document.querySelector(".message");


for(let select of dropdowns){
    for(currcode in countryList){
        let newOption=document.createElement("option"); /////////////////////
        newOption.innerText=currcode;
        newOption.value=currcode;
        if(select.name==="from" && currcode==="USD"){
            newOption.selected="selected";              /////////////////////////
        }
        else if(select.name==="to" && currcode==="INR"){
            newOption.selected="selected";
        }
        select.append(newOption);
    }
    select.addEventListener("change",(evt)=>{
        uflag(evt.target);                              ///////////////////////
    });
}

const uflag=(element)=>{
    let currcode=element.value;
    let countrycode=countryList[currcode];
    let newSrc=`https://flagsapi.com/${countrycode}/flat/64.png`;
    let img=element.parentElement.querySelector("img");   /////////////////////////
    img.src=newSrc;
}

btn.addEventListener("click",async (evt)=>{
    evt.preventDefault();                               ///////////////////////////
    let amount=document.querySelector(".amount input");
    let amnval=amount.value;
    if(amnval==="" || amnval<1){
        amnval=1;
        amount.value="1";
    }
    const URL = `${baseurl}/${fromcurr.value.toLowerCase()}.json`;
    let response= await fetch(URL);
    let data=await response.json();
    let rate=data[fromcurr.value.toLowerCase()][tocurr.value.toLowerCase()];
    let finalamt=amnval * rate;
    message.innerText=`${amnval} ${fromcurr.value}=${finalamt} ${tocurr.value}`;
});
