function loadTableData() {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const tbody = document.querySelector('#dataTable tbody');
    tbody.innerHTML = ''; 

    data.forEach((item, index) => {
        const row = document.createElement('tr');
        row.innerHTML = `
            <td>${item.name}</td>
            <td>${item.age}</td>
            <td>${item.address}</td>
            <td>${item.email}</td>
            <td>
                <button class="delete-btn" onclick="deleteData(${index})">Delete</button>
                <button class="edit-btn" onclick="editData(${index})">Edit</button>
            </td>
        `;
        tbody.appendChild(row);
    });
}

function addData() {
    const name = document.getElementById('name').value;
    const age = document.getElementById('age').value;
    const address = document.getElementById('address').value;
    const email = document.getElementById('email').value;

    if (name && age && address && email) {
        const data = JSON.parse(localStorage.getItem('data')) || [];
        data.push({ name, age, address, email });
        localStorage.setItem('data', JSON.stringify(data));
        loadTableData();
        document.getElementById('dataForm').reset(); 
    } else {
        alert('Please fill all fields');
    }
}


function deleteData(index) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    data.splice(index, 1);
    localStorage.setItem('data', JSON.stringify(data));
    loadTableData();
}


function editData(index) {
    const data = JSON.parse(localStorage.getItem('data')) || [];
    const item = data[index];

    
    document.getElementById('name').value = item.name;
    document.getElementById('age').value = item.age;
    document.getElementById('address').value = item.address;
    document.getElementById('email').value = item.email;

    
    const addButton = document.querySelector('button[onclick="addData()"]');
    addButton.textContent = 'Save';
    addButton.onclick = function () {
       
        data[index] = {
            name: document.getElementById('name').value,
            age: document.getElementById('age').value,
            address: document.getElementById('address').value,
            email: document.getElementById('email').value,
        };
        localStorage.setItem('data', JSON.stringify(data));
        loadTableData();

        
        document.getElementById('dataForm').reset();
        addButton.textContent = 'Add';
        addButton.onclick = addData;
    };
}


window.onload = loadTableData;