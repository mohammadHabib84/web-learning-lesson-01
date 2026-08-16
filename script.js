const button = document.getElementById("demoButton"); 
const message = document.getElementById("message"); 
button.addEventListener("click", function () { 
    message.textContent = "Excellent! JavaScript is working successfully."; 
});