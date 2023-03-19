let api = "https://moonlgh-solid-memory-p9gvg96544qf7xj4-8080.preview.app.github.dev/"
async function absen(){
    let nama = document.getElementById("namaAbsen").value;
    let kelas = document.getElementById("kelas").value;
    let id = document.getElementById("id").value;
    let token = localStorage.getItem("token");
    let res = await fetch(api + "api/addabsen", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ nama,kelas,id,token }),
    });

    let data = await res.json()
    if (data.status === 200) {
        alert("User Berhasil Dibuat "+ data.message)
    } else {
        alert("User Gagal Dibuat "+ data.message)
    }
}

LoadAbsen()

async function LoadAbsen() {
    let res = await fetch(api + "api/showabsen");
    let data = await res.json();

    // loop data.message to
    if (data.status === 200) {
        let table = document.getElementById("absen-table");
        let rows = "";
        let json = data.message
        console.log(json)
        for (let i = 0; i < json.length; i++) {
            rows += `
            <tbody>
        <tr class="bg-white">
            <td class="px-4 py-2">${json[i].nama}</td>
            <td class="px-4 py-2">${json[i].kelas}</td>
            <td class="px-4 py-2">${json[i].absenId}</td>
            <td class="px-4 py-2">
            <button onclick="viewQR(this)" class="btn btn-primary" data-id="${json[i].absenId}">Info</button>
            </td>
            <td class="px-4 py-2">
            <button onclick="deleteId(this)" class="btn btn-primary" data-id="${json[i].absenId}">Delete</button>
            </td>
        </tr>
        </tbody>
        `;
        }
        console.log(rows)
        table.innerHTML += rows;
        table.classList.add("table-auto")
    }
}

async function deleteId(e){
    let confirmation = confirm("Yakin kah ?")
    if(!confirmation) return
    let id = e.getAttribute("data-id")

    let token = localStorage.getItem("token")
    let res = await fetch(api + "api/remuser", {
        method: "DELETE",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token,id }),
    });

    let data = await res.json()
    if(data.status === 200) {
        alert(data.message)
        document.location.reload()
    } else {
        alert(data.message)
    }

}

function viewQR(id){
    let idAbsen = id.getAttribute("data-id")
    document.location.href = "./info.html?id="+idAbsen
}