const ul = document.getElementById("ul");
const btn = document.getElementById("btn");
const saveBtn = document.getElementById("save");
const nameInput = document.getElementById("name-input");
const numberInput = document.getElementById("number-input");








function chizish(malumot) {
    ul.innerHTML = "";
    malumot.map((odam) => {
        const li = document.createElement("li");
        li.innerHTML = `
            <div class="left">
                <img 
                    src="https://cdn-icons-png.flaticon.com/512/6915/6915987.png" 
                    alt="asd"
                >
                <div>
                    <h2>${odam.name}</h2>
                    <p>${odam.phoneNumber}/${odam.name}</p>
                </div>
            </div>
            <div class="right">
                <button class="edit-btn" onclick='editUser(${JSON.stringify(odam)})'>
                    <i class="fa-solid fa-pen-to-square"></i>
                </button>
                <button class="delete-btn" onclick='deleteUser(${odam.id})'>
                    <i class="fa-solid fa-trash-can"></i>
                </button>
            </div>
        `;
        ul.appendChild(li);
    });
}

async function getData() {
    const res = await fetch(url);
    const data = await res.json();
    chizish(data);
}


async function addUser(ism, nomer) {
    const res = await fetch(url = "https://6874dbbbdd06792b9c9592f0.mockapi.io/user", {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            name: ism,
            phoneNumber: nomer,
        }),
    });
    const data = await res.json();
    alert("Ma'lumotlar saqlandi!!!");
    nameInput.value = "";
    numberInput.value = "";
    getData();
}

btn.addEventListener("click", () => {
    if (
        numberInput.value.trim().length < 1 ||
        nameInput.value.trim().length < 1
    ) {
        alert("Ma'lumotlarni to'ldiring!!");
    } else {
        addUser(nameInput.value, numberInput.value);
    }
});

async function deleteUser(id) {
    console.log(id);
    const res = await fetch(url + `/${id}`, { method: "DELETE" });
    const data = await res.json();
    alert("Ma'lumot o'chirildi!!!");
    getData();
}

async function editUser(odam) {
    nameInput.value = odam.name;
    numberInput.value = odam.phoneNumber;
    btn.style.display = "none";
    saveBtn.style.display = "inline";

    saveBtn.addEventListener("click", async () => {
        const res = await fetch(url + `/${odam.id}`, {
            method: "PUT",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify({
                name: nameInput.value,
                phoneNumber: numberInput.value,
            }),
        });
        const data = await res.json();
        alert("Ma'lumot o'zgartirildi!!");
        nameInput.value = "";
        numberInput.value = "";
        getData();
        btn.style.display = "inline";
        saveBtn.style.display = "none";
    });
}
