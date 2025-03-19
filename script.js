document.getElementById("generateBtn").addEventListener("click", async function () {
    const description = document.getElementById("description").value.trim();
    
    if (description === "") {
        alert("Lütfen bir açıklama girin!");
        return;
    }

    // Butonu devre dışı bırak (Çift tıklamaları önlemek için)
    this.disabled = true;
    this.innerText = "Oluşturuluyor...";

    try {
        const response = await fetch("http://localhost:3000/generate", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({ description }),
        });

        const data = await response.json();
        document.getElementById("generatedCaption").innerText = data.caption || "Başlık oluşturulamadı!";
    } catch (error) {
        console.error("Hata:", error);
        document.getElementById("generatedCaption").innerText = "Bir hata oluştu, tekrar deneyin.";
    }

    // Butonu tekrar aktif et
    this.disabled = false;
    this.innerText = "Başlık Oluştur";
});
