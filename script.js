const diaSemana = document.getElementById("diasem");
const dataAtual = document.getElementById("dia");
const horaAtual = document.getElementById("hora");



function updateContentHour() {

    dataAtual.textContent = getCurrentDate();
    horaAtual.textContent = getCurrentTime();
    diaSemana.textContent = getWeekDay();
    

}



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

    const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"];
    const d = new Date();
    return days[d.getDay()];

}

setInterval(updateContentHour, 1000);

console.log(getCurrentTime());

console.log(getCurrentDate());

console.log(getWeekDay());

