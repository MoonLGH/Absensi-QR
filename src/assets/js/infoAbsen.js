let api = "https://absensi-api-qr.vercel.app/"

const canvas = document.getElementById("qr-canvas");
let qrcode 
async function loadData(){
    let id = new URLSearchParams(window.location.search).get("id")
    console.log(id)
    let res = await fetch(api + "api/getUser?id="+id);
    let data = await res.json();
    let final = {
        nama: data.message.nama,
        kelas: data.message.kelas,
        id: data.message.absenId
    }
    document.querySelector("#nama").innerHTML = "Nama : "+final.nama
    document.querySelector("#kelas").innerHTML = "Kelas : " +final.kelas
    document.querySelector("#id").innerHTML = "ID: "+final.id

    qrcode = new QRCode(canvas, {
        text: JSON.stringify(final),
        width: 256,
        height: 256,
        colorDark : "#000000",
        colorLight : "#ffffff",
        correctLevel : QRCode.CorrectLevel.H,
        dotScale: 1,
        margin: 4,
        radius: 4,
        border: 4,
        borderColor: "#000000"
    });
    setTimeout(loadNext, 1000)
}

function loadNext(){
    document.querySelector("#placehold-QR").src = qrcode._oDrawing._elImage.src
}

loadData()