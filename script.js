document.getElementById("generateBtn").addEventListener("click", async function () {
    const imageInput = document.getElementById("imageInput").files[0];

    if (!imageInput) {
        alert("Lütfen bir fotoğraf yükleyin!");
        return;
    }

    // Fotoğrafı base64 formatına çevir
    const reader = new FileReader();
    reader.readAsDataURL(imageInput);
    
    reader.onload = async function () {
        const imageBase64 = reader.result;

        try {
            const response = await fetch("http://localhost:3000/generate", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ image: imageBase64 }),
            });

            const data = await response.json();
            const caption = data.caption || "Başlık oluşturulamadı!";

            // Resmi ekrana çiz ve başlığı ekle
            drawImageWithCaption(imageBase64, caption);
        } catch (error) {
            console.error("Hata:", error);
            alert("Başlık üretirken hata oluştu!");
        }
    };
});

// Resmi ekrana çizip başlığı ekleme fonksiyonu
function drawImageWithCaption(imageBase64, caption) {
    const canvas = document.getElementById("imageCanvas");
    const ctx = canvas.getContext("2d");
    const img = new Image();

    img.onload = function () {
        canvas.width = img.width / 2; // Küçük ekranlar için optimize
        canvas.height = img.height / 2;
        ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

        // Başlık ekleme
        ctx.font = "20px Arial";
        ctx.fillStyle = "white";
        ctx.fillText(caption, 20, canvas.height - 30);
    };

    img.src = imageBase64;
}
