let but = document.querySelector("button");
let reverse = document.querySelector(" #rev");
let selects = document.querySelectorAll(" #func select");
let images = document.querySelectorAll('.country');
let result=document.querySelector(".result");
let currencyApi = "https://api.exchangerate-api.com/v4/latest/USD";


but.addEventListener("click", async (event) => {
    event.preventDefault();
    let Amount = document.querySelector(".amt input");
    let money = Number(Amount.value);
    // console.log(money)
    let check=money+"check";
    // console.log(check)

    if (money ==0 || money < 1 || check=="NaNcheck") {
        money = 1;
        Amount.value = '1';
    };

    let response = await fetch(currencyApi);
    let Data = await response.json();
    
   console.log(Data['rates'][`${selects[0].value}`]);
   console.log(Data['rates'][`${selects[1].value}`]);

    let from_Value=Data['rates'][`${selects[0].value}`];    
    let to_Value=Data['rates'][`${selects[1].value}`];

    let ResultFinal=(to_Value/from_Value)*money;
   
 result.innerText=`${money} ${selects[0].value} = ${ResultFinal} ${selects[1].value}`;

});


for (let select of selects) {
    for (ctry in country) {
        let newoption = document.createElement("option");
        newoption.innerText = ctry;
        newoption.value = ctry;
        select.append(newoption);

        if (select.name == "fromcount" && ctry == "USD") {
            newoption.selected = "selected";
        }
        else if (select.name == "tocount" && ctry == "INR") {
            newoption.selected = "selected";

        }
    }

    select.addEventListener("click", (e) => {
        let address = e.target;
        imageChanger(address);
    });
}


function imageChanger(location) {
    countrycode = country[location.value];
    let url = `https://flagsapi.com/${countrycode}/flat/64.png`;
    let pathimg = location.parentElement.querySelector("img");
    pathimg.src = url;

}

let count = 1;
reverse.addEventListener("click", (evt) => {
    reverse.style.transform = `rotate(${180 * count}deg)`;
    reverse.style.transition = '0.7s ';
    let temp = selects[0].value;
    selects[0].value = selects[1].value;
    selects[1].value = temp;


    for (let index = 0; index < 2; index++) {
        let url = `https://flagsapi.com/${country[selects[index].value]}/flat/64.png`;
        let pathimg = selects[index].parentElement.querySelector("img");
        pathimg.src = url;

    }
    count++;

});
