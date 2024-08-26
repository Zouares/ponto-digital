const diaSemana = document.getElementById("diasem");
const dataAtual = document.getElementById("dia");
const horaAtual = document.getElementById("hora");
const botaoregistrar = document.getElementById("register-button")

botaoregistrar.addEventListener("click", register);

function register() {

    alert("Bater ponto");

}


function updateContentHour() {

    dataAtual.textContent = getCurrentDate();
    horaAtual.textContent = getCurrentTime();
    diaSemana.textContent = getWeekDay();
    

}



function getCurrentTime() {

    const date = new Date();

    let hora = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutos = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let segundos = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();

    return hora + ":" + minutos + ":" + segundos;
     
}

function getCurrentDate() {
    
    const date = new Date();
    
    let mes = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let data = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let ano = date.getFullYear();

    return data + "/" + mes  + "/" + ano;
    
}

function getWeekDay() {

    const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sabado"];
    const d = new Date();
    return days[d.getDay()];

}
updateContentHour();
setInterval(updateContentHour, 1000);

console.log(getCurrentTime());

console.log(getCurrentDate());

console.log(getWeekDay());

