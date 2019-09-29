//const BASE_URL = "https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=";
var currency = document.getElementById("currency");
currency.addEventListener("change", function (e) {
    // console.log(e.target.value);
    //console.log(cdate.value);
    if (e.target.value == "") {
        return;
    }
    const XHR = new XMLHttpRequest();
    console.log(cdate.value);
    var curdate = cdate.value.split("-").join("");
    //console.log(curdate);
    var URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=${e.target.value}&date=${curdate}&json`;
    console.log(URI);
    //var URI = `https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=USD&date=20190929`;
    //console.log(URI);
    XHR.addEventListener("readystatechange", function(e) {
        if ((XHR.readyState === 4) && (XHR.status === 200)) {
            var result = JSON.parse(XHR.responseText);
            //data.innerHTML = `<h1>${result[0].rate.toFixed(2)}</h1>`;
            data.innerHTML = `<h1>${result[0].rate.toFixed(2)}</h1>`;
        }
    }, false);
    XHR.open("GET", URI);
    XHR.send();
    // https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?valcode=EUR&date=20190929&json
}, false);