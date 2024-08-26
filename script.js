const diaSemana = document.getElementById("diasem");
const dataAtual = document.getElementById("dia");
const horaAtual = document.getElementById("hora");

dataAtual.textContent = getCurrentDate();
horaAtual.textContent = getCurrentTime();

function getCurrentTime() {

    const date = new Date();

    let hora = date.getHours();
    let minutos = date.getMinutes();
    let segundos = date.getSeconds();

    return hora + ":" + minutos + ":" + segundos;

}

function getCurrentDate() {
    
    const date = new Date();
    
    let mes = date.getMonth() + 1;
    let data = date.getDate();
    let ano = date.getFullYear();

    return data + "/" + mes  + "/" + ano;
    
}

function getWeekDay() {

    return ""

}


console.log(getCurrentTime());

console.log(getCurrentDate());