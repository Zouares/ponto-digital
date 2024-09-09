const diaSemana = document.getElementById("diasem");
const dataAtual = document.getElementById("dia");
const horaAtual = document.getElementById("hora");
const greetingElement = document.getElementById("greeting");
const botaoregistrar = document.getElementById("register-button");
const dialogPonto = document.getElementById("dialog-ponto");
const btnDialogFechar = document.getElementById("dialog-fechar");
const dialogData = document.getElementById("dialog-Data");
const dialogHora = document.getElementById("dialog-Hora");
const checkbox = document.getElementById("checkbox");
const history = document.querySelector(".history");
const historyList = document.getElementById("history-list");


const historyData = {};


let hasEnteredToday = false;


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
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}:${segundos}`;
}

function getCurrentTimehistory() {
    const date = new Date();
    const horas = String(date.getHours()).padStart(2, '0');
    const minutos = String(date.getMinutes()).padStart(2, '0');
    const segundos = String(date.getSeconds()).padStart(2, '0');
    return `${horas}:${minutos}`;
}


function getCurrentDate() {
    const date = new Date();
    let dia = String(date.getDate()).padStart(2, '0');
    let mes = String(date.getMonth() + 1).padStart(2, '0');
    let ano = date.getFullYear();
    return `${dia}/${mes}/${ano}`;
}


function getWeekDay() {
    const daysOfWeek = ["Domingo", "Segunda-feira", "Terça-feira", "Quarta-feira", "Quinta-feira", "Sexta-feira", "Sábado"];
    return daysOfWeek[new Date().getDay()];
}


function closeDialog() {
    dialogPonto.close();
}


function toggleHistory() {
    history.classList.toggle("show");
}


function addHistoryEntry(date, type, time) {
    if (!historyData[date]) {
        historyData[date] = [];
        
        const historyHeader = document.createElement("div");
        historyHeader.className = "history-header";
        historyHeader.textContent = `${getDayLabel(date)} ${date}`;
        historyList.appendChild(historyHeader);
    }
    
    historyData[date].push({ type, time });

    updateHistoryList();
}

//inutil por enquanto pq não tem como salvar ainda
function getDayLabel(date) {
    const today = getCurrentDate();
    if (date === today) {
        return "HOJE";
    }
    const yesterday = getYesterdayDate();
    if (date === yesterday) {
        return "ONTEM";
    }
    return date;
}

//inutil por enquanto pq não tem como salvar ainda
function getYesterdayDate() {
    const date = new Date();
    date.setDate(date.getDate() - 1);
    return getCurrentDate();
}


function updateHistoryList() {
    historyList.innerHTML = "";
    Object.keys(historyData).forEach(date => {
        const entries = historyData[date];
        
        const historyHeader = document.createElement("div");
        historyHeader.className = "history-header";
        historyHeader.textContent = `${getDayLabel(date)} ${date}`;
        historyList.appendChild(historyHeader);
        
        entries.forEach(entry => {
            addHistoryEntryToList(entry.type, entry.time);
        });
    });
}


function addHistoryEntryToList(type, time) {
    const historyItem = document.createElement("div");
    historyItem.className = "history-item";
    
    const statusDot = document.createElement("div");
    statusDot.className = "status-dot";
    statusDot.style.backgroundColor = type === "ENTRADA" ? "#28a745" : "#dc3545"; // Verde ou vermelho
    historyItem.appendChild(statusDot);
    
    const timeElement = document.createElement("div");
    timeElement.className = "time";
    timeElement.textContent = time;
    historyItem.appendChild(timeElement);
    
    const entryElement = document.createElement("div");
    entryElement.className = "entry";
    entryElement.textContent = type;
    historyItem.appendChild(entryElement);
    
    historyList.appendChild(historyItem);
}


function handleRegister(type) {
    const currentDate = getCurrentDate();
    const currentTime = getCurrentTimehistory();
    
    if (type === "SAÍDA" && !hasEnteredToday) {
        alert("Entre primeiro.");
        console.log('O usuário ainda não entrou');
        return;
    }

    
    if (type === "ENTRADA" && !hasEnteredToday) {
        hasEnteredToday = true;
        console.log(`Entrada registrada: Data - ${currentDate}, Hora - ${currentTime}`);
    } else if (type === "SAÍDA") {
        hasEnteredToday = true;
        console.log(`Saída registrada: Data - ${currentDate}, Hora - ${currentTime}`);
    }

    addHistoryEntry(currentDate, type, currentTime);
    
    closeDialog();
}



botaoregistrar.addEventListener("click", register);
btnDialogFechar.addEventListener("click", closeDialog);
checkbox.addEventListener("change", toggleHistory);

document.getElementById("dialog-Entrada").addEventListener("click", () => handleRegister("ENTRADA"));
document.getElementById("dialog-Saida").addEventListener("click", () => handleRegister("SAÍDA"));


setInterval(updateContentHour, 1000);
updateContentHour();


