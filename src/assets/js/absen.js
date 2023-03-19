let api = "https://moonlgh-solid-memory-p9gvg96544qf7xj4-8080.preview.app.github.dev/"

function getNav() {
    let navbar = document.getElementById("navbar-cta");
    navbar.classList.toggle("hidden");
}

async function log() {
    let token = document.getElementById("token").value

    let res = await fetch(api + "api/checkAuthority", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ token }),
    });

    let json = await res.json()

    if (json.status === 200) {
        console.log("correct")
        localStorage.setItem("token", token)
        alert("Authorized, please click on continue")
        document.querySelector("#main").innerHTML += `
        <a href="./manageAbsen.html" class="btn btn-wide">Continue</a>
        `
    } else {
        console.log("not correct")
        alert("Error Unauthorized Access Token")
    }
}

function out() {
    localStorage.clear()
    alert("Access Token Cleared")
}

if (document.querySelector("#absen-table")) {
    console.log("Loading")
    loadData()
}
async function loadData() {
    console.log("Loading Data")
    let res = await fetch(api + "api/showabsen");
    let data = await res.json();
    if (data.status === 200) {
        let table = document.getElementById("absen-table");
        let rows = "";
        let json = data.message
        let latestAbsen = []
        for (let i = 0; i < json.length; i++) {
            let latest = json[i].absen[0]
            for (let j = 0; j < json[i].absen.length; j++) {
                if (latest < json[i].absen[j]) {
                    latest = json[i].absen[j]
                }
            }
            latestAbsen.push({
                nama: json[i].nama,
                kelas: json[i].kelas,
                time: latest
            })
        }
        // sort the array based on the latest time
        latestAbsen.sort((a, b) => {
            return b.time - a.time
        })

        console.log(latestAbsen)
        for (let i = 0; i < latestAbsen.length; i++) {
            rows += `
            <tbody>
        <tr class="bg-white">
            <td class="px-4 py-2">${latestAbsen[i].nama}</td>
            <td class="px-4 py-2">${latestAbsen[i].kelas}</td>
            <td class="px-4 py-2">${(new Date(latestAbsen[i].time)).toLocaleString()}</td>
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
    let res = await fetch(api + "api/deleteAbsen", {
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

if(document.getElementById("excel")){
    document.getElementById("excel").setAttribute("href",api+"api/export")
}