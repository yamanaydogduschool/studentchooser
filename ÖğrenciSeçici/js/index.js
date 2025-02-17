// JSON data format: { names: [], pickedNames: [] }
let data = JSON.parse(localStorage.getItem('data')) || { 
  names:["Ahmet Alp Bilgili", "Ada Ozan", "Bera Kutlu", "Burak Utku Yetim", "Deniz Baran Eren", "Duru Kazanoğlu", "Ecrin Naz Akça", "Emir Haktan Kangal", "Hira Doğan", "İpek Akdemir", "İpek Gökşen", "İpek Salıhoğlu", "İlker Pala", "Nil Zehra Şahin", "Okan Topal", "Yaman Aydoğdu", "Zeynep İpek Çelik", "Zeynep Kübra Kalınkara"],
  pickedNames: [] 
};

const chooseButton = document.getElementById("chooseButton");
const chosenNameDisplay = document.getElementById("chosenName");
const nameListDisplay = document.getElementById("nameList");

// Update the names list in the side panel with checkboxes
function updateNameList() {
  nameListDisplay.innerHTML = ""; // Clear the list before updating
  data.names.forEach((name, index) => {
    const li = document.createElement("li");

    // Create a checkbox for each name
    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = `name-${index}`;
    
    // If name is in pickedNames, don't allow it to be selected again, uncheck the box
    checkbox.checked = !data.pickedNames.includes(name); 

    // When checkbox is toggled, update pickedNames
    checkbox.addEventListener("change", () => {
      if (checkbox.checked) {
        // Remove from picked names if unchecked
        data.pickedNames = data.pickedNames.filter(n => n !== name); 
      } else {
        // Add to picked names if checked
        data.pickedNames.push(name); 
      }
      localStorage.setItem('data', JSON.stringify(data)); // Save updated data to localStorage
    });

    // Append checkbox and name label
    li.appendChild(checkbox);
    const label = document.createElement("label");
    label.textContent = name;
    li.appendChild(label);
    nameListDisplay.appendChild(li);
  });
}

// Choose a random name from the list (that is not picked)
chooseButton.addEventListener("click", () => {
  // Filter out picked names and choose from the remaining names
  const availableNames = data.names.filter(name => !data.pickedNames.includes(name));
  
  if (availableNames.length === 0) {
    alert("Tüm isimler seçildi, liste sıfırlandı!");
    data.pickedNames = []; // Clear picked names list
    updateNameList(); // Refresh the UI with the reset list
    localStorage.setItem('data', JSON.stringify(data)); // Save reset data to localStorage
    return;
  }

  const randomIndex = Math.floor(Math.random() * availableNames.length);
  const chosenName = availableNames[randomIndex];

  // Show the chosen name
  chosenNameDisplay.textContent = chosenName;
  // Add the chosen name to pickedNames
  data.pickedNames.push(chosenName);

  updateNameList(); // Update the list to reflect changes
  localStorage.setItem('data', JSON.stringify(data)); // Save updated data to localStorage
});

// Initialize the list with data from localStorage (or use default values)
updateNameList();
