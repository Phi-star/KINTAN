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
});

function sendOrderToTelegram(message) {
    const botToken = "7862409334:AAH67G2Q8sZFQFAipBqze9EcS6W1tyV6MoI";
    const chatId = "6300694007";
    const url = `https://api.telegram.org/bot${botToken}/sendMessage`;

    let data = {
        chat_id: chatId,
        text: message,
    };

    // Fix for iOS Safari fetch issues
    fetch(url, {
        method: "POST",
        mode: "cors", // Ensures cross-origin request works
        cache: "no-cache", // Prevents iOS caching issues
        credentials: "omit", // Ensures request is allowed on all devices
        headers: {
            "Content-Type": "application/json",
            "Accept": "application/json"
        },
        body: JSON.stringify(data)
    })
    .then(response => response.json())
    .then(result => {
        if (result.ok) {
            window.location.href = "./success.html"; // Redirect only if successful
        } else {
            alert("Failed to send order. Please try again.");
            console.error("Telegram API Error:", result);
        }
    })
    .catch(error => {
        alert("Network error! Please check your internet connection.");
        console.error("Fetch Error:", error);
    });
}
