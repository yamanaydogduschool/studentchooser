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
const numberListDisplay = document.getElementById("numberList");

function updateNameList() {
  nameListDisplay.innerHTML = "";
  data.names.forEach((name, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `name-${index}`;
    checkbox.checked = !data.pickedNames.includes(name); 

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        data.pickedNames = data.pickedNames.filter(n => n !== name); 
      } else {
        data.pickedNames.push(name); 
      }
      localStorage.setItem('data', JSON.stringify(data));
    });

    li.appendChild(checkbox);
    const label = document.createElement("label");
    label.textContent = name;
    li.appendChild(label);
    nameListDisplay.appendChild(li);
  });
}

function updateNumberList(min, max) {
  numberListDisplay.innerHTML = "";
  for (let i = min; i <= max; i++) {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `number-${i}`;
    checkbox.checked = !data.pickedNumbers.includes(i);

    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        data.pickedNumbers = data.pickedNumbers.filter(n => n !== i);
      } else {
        if (!data.pickedNumbers.includes(i)) data.pickedNumbers.push(i);
      }
      localStorage.setItem('data', JSON.stringify(data));
    });

    li.appendChild(checkbox);
    const label = document.createElement("label");
    label.textContent = i;
    li.appendChild(label);
    numberListDisplay.appendChild(li);
  }
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
  const availableNumbers = allNumbers.filter(num => !data.pickedNumbers.includes(num));

  if (availableNumbers.length === 0) {
    alert("Tüm sayılar seçildi, liste sıfırlandı!");
    data.pickedNumbers = [];
    updateNumberList(min, max);
    localStorage.setItem('data', JSON.stringify(data));
    return;
  }

  const chosenNumber = availableNumbers[Math.floor(Math.random() * availableNumbers.length)];
  chosenNumberDisplay.textContent = chosenNumber;
  data.pickedNumbers.push(chosenNumber);

  updateNumberList(min, max);
  localStorage.setItem('data', JSON.stringify(data));
});

// Initial Load
updateNameList();
updateNumberList(parseInt(document.getElementById("min").value), parseInt(document.getElementById("max").value));
