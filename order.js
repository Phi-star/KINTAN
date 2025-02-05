document.getElementById("orderForm").addEventListener("submit", function(event) {
    event.preventDefault();

    let name = document.getElementById("name").value.trim();
    let number = document.getElementById("number").value.trim();
    let altNumber = document.getElementById("altNumber").value.trim();
    let address = document.getElementById("address").value.trim();
    let packs = document.getElementById("packs").value;

    if (!name || !number || !address || !packs) {
        alert("Please fill all required fields before placing an order.");
        return;
    }

    let orderDetails = `New Order Received!\n\n`
                     + `📌 Name: ${name}\n`
                     + `📞 Phone: ${number}\n`
                     + (altNumber ? `📞 Alt Phone: ${altNumber}\n` : "")
                     + `📍 Address: ${address}\n`
                     + `📦 Pack: ${packs}\n\n`
                     + `🚀 Order is ready for processing.`;

    sendOrderToTelegram(orderDetails);

    window.location.href = "./success.html";
});

function sendOrderToTelegram(message) {
    const botToken = "7862409334:AAH67G2Q8sZFQFAipBqze9EcS6W1tyV6MoI";
    const chatId = "6300694007";

    fetch(`https://api.telegram.org/bot${botToken}/sendMessage`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ chat_id: chatId, text: message })
    }).catch(error => console.error("Error sending message to Telegram:", error));
}
