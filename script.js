document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("uploadForm");
    const fileInput = document.getElementById("fileInput");
    const titleOutput = document.getElementById("titleOutput");

    form.addEventListener("submit", async (event) => {
        event.preventDefault();

        if (fileInput.files.length === 0) {
            titleOutput.innerText = "Lütfen bir görsel yükleyin!";
            return;
        }

        const formData = new FormData();
        formData.append("image", fileInput.files[0]);

        try {
            const response = await fetch("/generate-title", {
                method: "POST",
                body: formData
            });

            const data = await response.json();

            if (response.ok) {
                titleOutput.innerText = data.title;
            } else {
                titleOutput.innerText = `Hata: ${data.error || "Başlık üretilemedi"}`;
            }
        } catch (error) {
            titleOutput.innerText = "Sunucu hatası, lütfen tekrar deneyin!";
            console.error("Hata:", error);
        }
    });
});
