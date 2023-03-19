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
        console.log(json)
        for (let i = 0; i < json.length; i++) {
            rows += `
            <tbody>
        <tr class="bg-white">
            <td class="px-4 py-2">${json[i].nama}</td>
            <td class="px-4 py-2">${json[i].kelas}${json[i].kelasStr.toUpperCase().replace("X","").replace("-","").replace(" ","")}</td>
            <td class="px-4 py-2">${json[i].status}</td>
            <td class="px-4 py-2">${json[i].alasan}</td>
            <td class="px-4 py-2">${(new Date(json[i].time)).toLocaleString()}</td>
            <td class="px-4 py-2">
            <button onclick="deleteId(this)" class="btn btn-primary" data-id="${json[i]._id}">Delete</button>
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