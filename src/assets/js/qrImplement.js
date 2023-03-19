function scanQRCode() {
    const codeReader = new ZXingBrowser.BrowserQRCodeReader();
    const button = document.getElementById("scan-button");
    codeReader.decodeFromImageElement(document.getElementById("qr-image"))
        .then(result => {
            console.log(result.text)
            let hasil = JSON.parse(result.text)
            if(!hasil.nama && !hasil.kelas && !hasil.id){
                return alert("QR Code Salah")
            }
            document.querySelectorAll("#qr-btn .btn.scan").forEach(e => e.remove())
            absen(hasil.nama,hasil.kelas,hasil.id)
        }).catch(error => {
            console.error(error);
            alert("Failed to scan QR code.");
        });
}

function chooseImageSource() {
    const imageInput = document.createElement("input");
    imageInput.type = "file";
    imageInput.accept = "image/*";
    imageInput.addEventListener("change", event => {
        const file = event.target.files[0];
        if (file) {
            const reader = new FileReader();
            reader.addEventListener("load", () => {
                const image = document.getElementById("qr-image");
                image.src = reader.result;
                image.classList.add("hidden")
                scanQRCode();
            });
            reader.readAsDataURL(file);
        }
    });
    const buttons = [
        {
            label: "Take Picture",
            handler: () => alert("Camera not supported.")
        },
        {
            label: "Choose from Gallery",
            handler: () => imageInput.click()
        }
    ];
    showOptionsDialog("Choose Image Source", buttons);
}



function showOptionsDialog(title, buttons) {
    const dialog = document.createElement("div");
    dialog.classList.add("dialog");
    const header = document.createElement("h1");
    header.innerText = title;
    dialog.appendChild(header);
    const buttonContainer = document.createElement("div");
    buttonContainer.classList.add("button-container");
    buttons.forEach(buttonInfo => {
        const button = document.createElement("button");
        button.innerText = buttonInfo.label;
        button.classList.add("btn","btn-primary","scan")
        button.addEventListener("click", buttonInfo.handler);
        buttonContainer.appendChild(button);
    });
    dialog.appendChild(buttonContainer);
    document.querySelector("#qr-btn").appendChild(dialog);
}