const diaSemana = document.getElementById("diasem");
const dataAtual = document.getElementById("dia");
const horaAtual = document.getElementById("hora");
const greetingElement = document.getElementById("greeting");
const botaoregistrar = document.getElementById("register-button");
const dialogPonto = document.getElementById("dialog-ponto");
const btnDialogFechar = document.getElementById("dialog-fechar");
const dialogData = document.getElementById("dialog-Data");
const dialogHora = document.getElementById("dialog-Hora");

function register() {
    
    dialogData.textContent = `Data: ${getCurrentDate()}`;
    dialogHora.textContent = `Hora: ${getCurrentTime()}`;
    dialogPonto.showModal();
}

function updateContentHour() {
    horaAtual.textContent = getCurrentTime();
    dataAtual.textContent = getCurrentDate();
    diaSemana.textContent = getWeekDay();
    greetingElement.textContent = getGreeting("Fulano de Tal");
}

function getGreeting(name) {
    const hours = new Date().getHours();
    if (hours < 12) {
        return `Bom dia, ${name}`;
    } else if (hours < 18) {
        return `Boa tarde, ${name}`;
    } else {
        return `Boa noite, ${name}`;
    }
}

function getCurrentTime() {
    const date = new Date();
    let hora = (date.getHours() < 10 ? '0' : '') + date.getHours();
    let minutos = (date.getMinutes() < 10 ? '0' : '') + date.getMinutes();
    let segundos = (date.getSeconds() < 10 ? '0' : '') + date.getSeconds();
    return `${hora}:${minutos}:${segundos}`;
}

function getCurrentDate() {
    const date = new Date();
    let mes = ((date.getMonth() + 1) < 10 ? '0' : '') + (date.getMonth() + 1);
    let data = (date.getDate() < 10 ? '0' : '') + date.getDate();
    let ano = date.getFullYear();
    return `${data}/${mes}/${ano}`;
}

function getWeekDay() {
    const days = ["Domingo", "Segunda-Feira", "Terça-Feira", "Quarta-Feira", "Quinta-Feira", "Sexta-Feira", "Sábado"];
    const d = new Date();
    return days[d.getDay()];
}

botaoregistrar.addEventListener("click", register);
btnDialogFechar.addEventListener("click", () => {
    dialogPonto.close();
});

updateContentHour();
setInterval(updateContentHour, 1000);
