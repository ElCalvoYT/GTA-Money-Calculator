const sellCheckBox = document.getElementById("sell-status");
const moneyQuantity = document.getElementById("money-quantity");
const gtaObjQuantity = document.getElementById("gta-object-quantity");
const sellStatus = document.getElementById("sell-status");
const gtaObject = document.getElementById("gta-objects");
let selectedGtaObj
  
fetchJson(
jsonData => {
    jsonData.forEach(data => {
        const option = document.createElement("option");
        option.value = data.name
        option.innerText = data.name
        option.setAttribute("price", data.price);
        option.setAttribute("sellPrice", data.sellPrice);
        gtaObject.appendChild(option);
    });
},
errorMessage => {
    console.error(`Error fetching JSON: ${errorMessage}`);
}
);

sellStatus.addEventListener("change", () => {
    gtaObjQuantity.value = ""
    moneyQuantity.value = ""
    if (sellStatus.checked === true) {
        Array.from(gtaObject.options).forEach(option => {
            if (option.getAttribute('sellPrice') === 'null') {
                gtaObject.remove(option.index);
            }
        });
    } else{
        Array.from(gtaObject.options).forEach(option => {
            gtaObject.remove(option.index);
        });
        fetchJson(
            jsonData => {
                jsonData.forEach(data => {
                    const option = document.createElement("option");
                    option.value = data.name
                    option.innerText = data.name
                    option.setAttribute("price", data.price);
                    option.setAttribute("sellPrice", data.sellPrice);
                    gtaObject.appendChild(option);
                });
            },
            errorMessage => {
                console.error(`Error fetching JSON: ${errorMessage}`);
            }
        );
    }
});

moneyQuantity.addEventListener("input", () => {
    selectedGtaObj = gtaObject.options[gtaObject.selectedIndex];
    let calculation
    if (sellStatus.checked === true){
        calculation = moneyQuantity.value / selectedGtaObj.attributes.sellPrice.value
    } else{
        calculation = moneyQuantity.value / selectedGtaObj.attributes.price.value
    }
    console.log(calculation);
    gtaObjQuantity.value = calculation
});

gtaObjQuantity.addEventListener("input", () => {
    selectedGtaObj = gtaObject.options[gtaObject.selectedIndex];
    let calculation
    if (sellStatus.checked === true){
        calculation = gtaObjQuantity.value * selectedGtaObj.attributes.sellPrice.value
    } else{
        calculation = gtaObjQuantity.value * selectedGtaObj.attributes.price.value
    }
    console.log(calculation);
    moneyQuantity.value = calculation
});

function fetchJson(onSuccess, onError) {
    const url = 'assets/js/data.json';
    fetch(url)
      .then(response => {
        if (!response.ok) {
          throw new Error(`Failed to fetch JSON: ${response.statusText}`);
        }
        return response.json();
      })
      .then(jsonData => {
        onSuccess(jsonData);
      })
      .catch(error => {
        onError(error.message);
      });
}