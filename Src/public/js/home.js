const socket = io();
const text = document.getElementById("tetx");
const logs = document.getElementsById("logs");

socket.on("logs", data => {
    console.log(data.id);
    let messageLogs = "";
    data.forEach(log => {
        messagesLogs += `${log.title} dice: ${log.description}`;
    });
    logs.innerHTML = messagesLogs;
})