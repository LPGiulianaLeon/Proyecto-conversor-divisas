
const apiKey = "c7302902c42064e469fa7424";
const apiURL = "https://v6.exchangerate-api.com/v6/c7302902c42064e469fa7424/latest/";

// Función para obtener los tipos de cambio, de acuerdo a una moneda base
async function getExchangeRates (baseCurrency = "USD") {
    try {
       
        const response = await fetch(`${apiURL}${baseCurrency}`); //Utilizo fetch para llamar a la API y la respuesta la guardo como response
        const data = await response.json(); // Como la respuesta está en formato json, utilizo este método para parsearlo y convertirlo en un objeto
        return data.conversion_rates;

    } catch (error) {
        console.error("Error al obtener tasas de cambio", error)

    } finally {
        console.log("Obtener tasas de cambio. Completo.");
    }
}

//Función que llena los selectores de html <select></select> con las opciones de cambio de divisa
async function populateCurrencySelectors() {
    const rates = await getExchangeRates();
    const currencySelectors = [document.getElementById("fromCurrency"), document.getElementById("toCurrency")];

    for (const currency in rates) {
        currencySelectors.forEach((selector)=>{
            const option = document.createElement("option");
            option.value = currency;
            option.textContent = currency;
            selector.appendChild(option);
        })
    }
}


//Función que realiza la conversión de divisas al apretar botón Convertir
async function convertCurrency() {
    const amount = document.getElementById("amount").value;
    const fromCurrency = document.getElementById("fromCurrency").value;
    const toCurrency = document.getElementById("toCurrency").value;

    try {
        const response = await fetch(`https://v6.exchangerate-api.com/v6/${apiKey}/pair/${fromCurrency}/${toCurrency}/${amount}`);
        const data = await response.json();
        const result = data.conversion_result;
        document.getElementById("result").textContent = `${amount} ${fromCurrency} = ${result.toFixed(2)} ${toCurrency}`;
    } catch (error) {
        console.error("Error en la conversión:", error);
        document.getElementById("result").textContent = "Hubo un error en la conversión. Inténtalo de nuevo.";
    } finally {
        console.log("Convertir monto de dinero. Completo.")
    }
}

populateCurrencySelectors();
document.getElementById("convert").addEventListener("click", convertCurrency);


