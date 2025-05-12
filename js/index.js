let data = JSON.parse(localStorage.getItem('data')) || {
  names: ["Ahmet Alp Bilgili", "Ada Ozan", "Bera Kutlu", "Burak Utku Yetim", "Deniz Baran Eren", "Duru Kazanoğlu", "Ecrin Naz Akça", "Emir Haktan Kangal", "Hira Doğan", "İpek Akdemir", "İpek Gökşen", "İpek Salihoğlu", "İlker Pala", "Nil Zehra Şahin", "Okan Topal", "Yaman Aydoğdu", "Zeynep İpek Çelik", "Zeynep Kübra Kalınkara"],
  pickedNames: [],
  pickedNumbers: []
};

const chooseButton = document.getElementById("chooseButton");
const chosenNameDisplay = document.getElementById("chosenName");
const nameListDisplay = document.getElementById("nameList");

const chooseNumberButton = document.getElementById("chooseNumberButton");
const chosenNumberDisplay = document.getElementById("chosenNumber");

function updateNameList() {
  nameListDisplay.innerHTML = "";
  data.names.forEach((name, index) => {
    const li = document.createElement("li");
    li.style.display = "flex";
    li.style.alignItems = "center";
    li.style.gap = "10px";
    li.style.padding = "4px 0";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `name-${index}`;
    checkbox.checked = !data.pickedNames.includes(name);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        data.pickedNames = data.pickedNames.filter(n => n !== name);
      } else {
        if (!data.pickedNames.includes(name)) {
          data.pickedNames.push(name);
        }
      }

      localStorage.setItem('data', JSON.stringify(data));
    });
    

    const label = document.createElement("label");
    label.textContent = name;
    label.setAttribute("for", checkbox.id);

    li.appendChild(checkbox);
    li.appendChild(label);
    nameListDisplay.appendChild(li);
  });
}

chooseButton.addEventListener("click", () => {
  const availableNames = data.names.filter(name => !data.pickedNames.includes(name));

  if (availableNames.length === 0) {
    alert("Tüm isimler seçildi, liste sıfırlandı!");
    data.pickedNames = [];
    updateNameList();
    localStorage.setItem('data', JSON.stringify(data));
    return;
  }

  const chosenName = availableNames[Math.floor(Math.random() * availableNames.length)];
  chosenNameDisplay.textContent = chosenName;
  data.pickedNames.push(chosenName);

  updateNameList();
  localStorage.setItem('data', JSON.stringify(data));
});

chooseNumberButton.addEventListener("click", () => {
  const min = parseInt(document.getElementById("min").value, 10);
  const max = parseInt(document.getElementById("max").value, 10);

  if (isNaN(min) || isNaN(max) || min >= max) {
    alert("Geçerli bir min ve max girin.");
    return;
  }

  const allNumbers = Array.from({ length: max - min + 1 }, (_, i) => i + min);
  const chosenNumber = allNumbers[Math.floor(Math.random() * allNumbers.length)];

  chosenNumberDisplay.textContent = chosenNumber;

  data.pickedNumbers.push(chosenNumber);
  localStorage.setItem('data', JSON.stringify(data));
});

updateNameList();
