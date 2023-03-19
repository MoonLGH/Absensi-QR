let api = "https://absensi-api-qr.vercel.app/"

function getNav() {
    let navbar = document.getElementById("navbar-cta");
    navbar.classList.toggle("hidden");
}

let clicked = false
async function absen(nama,kelas,id) {
    if (!clicked) {
        clicked = true
        let res = await fetch(api + "api/absen", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ nama,kelas,id }),
        });
        let data = await res.json()
        if (data.status === 200) {
            alert("Absen Berhasil "+ data.message)
        } else {
            alert("Absen Gagal "+ data.message)
        }

    } else {
        alert("Sabar mas")
    }
}