// JSON data format: { names: [], pickedNames: [] }
let data = JSON.parse(localStorage.getItem('data')) || { 
  names:["Ahmet Alp Bilgili", "Ada Ozan", "Bera Kutlu", "Burak Utku Yetim", "Deniz Baran Eren", "Duru Kazanoğlu", "Ecrin Naz Akça", "Emir Haktan Kangal", "Hira Doğan", "İpek Akdemir", "İpek Gökşen", "İpek Salihoğlu", "İlker Pala", "Nil Zehra Şahin", "Okan Topal", "Yaman Aydoğdu", "Zeynep İpek Çelik", "Zeynep Kübra Kalınkara"],
  pickedNames: [] 
};

const chooseButton = document.getElementById("chooseButton");
const chosenNameDisplay = document.getElementById("chosenName");
const nameListDisplay = document.getElementById("nameList");

function updateNameList() {
  nameListDisplay.innerHTML = "";
  data.names.forEach((name, index) => {
    const li = document.createElement("li");

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `name-${index}`;
    
    checkbox.checked = !data.pickedNames.includes(name); 

    // When checkbox is toggled, update pickedNames
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

chooseButton.addEventListener("click", () => {
  const availableNames = data.names.filter(name => !data.pickedNames.includes(name));
  
  if (availableNames.length === 0) {
    alert("Tüm isimler seçildi, liste sıfırlandı!");
    data.pickedNames = []; 
    updateNameList(); 
    localStorage.setItem('data', JSON.stringify(data));
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const chosenName = availableNames[randomIndex];

  chosenNameDisplay.textContent = chosenName;
  data.pickedNames.push(chosenName);

  updateNameList();
  localStorage.setItem('data', JSON.stringify(data))
});

updateNameList();
