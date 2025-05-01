const nameInput = document.querySelector('#nameInput');
const emailInput = document.querySelector('#emailInput');
const fileInput = document.querySelector('#fileInput');
const searchInput = document.querySelector('#searchInput');
const saveBtn = document.querySelector('#saveBtn');
const tbody = document.querySelector('#tbody');
const counter = document.querySelector('#counter');
const originalPlaceholder = searchInput.placeholder;

let students = [];
let editIndex = -1;

function displayStudent(stu = students) {
    if (stu.length === 0) {
        tbody.innerHTML = `
                <tr><td colspan="6" class="text-center">No students found</td></tr>
        `;
    } else {
        tbody.innerHTML = '';
        stu.forEach((student, index) => {
            let tr = document.createElement('tr');
            tr.innerHTML += `
                <tr>
                    <td>${student.id}</td>
                    <td>${student.name}</td>
                    <td>${student.gen}</td>
                    <td>${student.email}</td>
                    <td><img style="width: 2.9rem; height: 2.9rem;" class="rounded-circle object-fit-cover" src="${student.image}" alt=""></td>
                    <td>
                        <span data-bs-toggle="modal" data-bs-target="#view" onclick="viewStudent(${index})" class="btn btn-primary align-middle"><svg xmlns="http://www.w3.org/2000/svg" 
                        width="19" height="19" fill="currentColor" class="bi bi-eye" viewBox="0 0 16 16">
                            <path d="M16 8s-3-5.5-8-5.5S0 8 0 8s3 5.5 8 5.5S16 8 16 8M1.173 8a13 13 0 0 1 1.66-2.043C4.12 4.668 5.88 3.5 
                            8 3.5s3.879 1.168 5.168 2.457A13 13 0 0 1 14.828 8q-.086.13-.195.288c-.335.48-.83 1.12-1.465 1.755C11.879 11.332
                             10.119 12.5 8 12.5s-3.879-1.168-5.168-2.457A13 13 0 0 1 1.172 8z"/>
                            <path d="M8 5.5a2.5 2.5 0 1 0 0 5 2.5 2.5 0 0 0 0-5M4.5 8a3.5 3.5 0 1 1 7 0 3.5 3.5 0 0 1-7 0"/>
                          </svg> View</span>
                        <span onclick="editStudent(${index})" class="btn btn-warning"><svg xmlns="http://www.w3.org/2000/svg" width="16" 
                        height="16" fill="currentColor" class="bi bi-pencil-square" viewBox="0 0 16 16">
                            <path d="M15.502 1.94a.5.5 0 0 1 0 .706L14.459 3.69l-2-2L13.502.646a.5.5 0 0 1 .707 0l1.293 1.293zm-1.75 
                            2.456-2-2L4.939 9.21a.5.5 0 0 0-.121.196l-.805 2.414a.25.25 0 0 0 .316.316l2.414-.805a.5.5 0 0 0 .196-.12l6.813-6.814z"/>
                            <path fill-rule="evenodd" d="M1 13.5A1.5 1.5 0 0 0 2.5 15h11a1.5 1.5 0 0 0 1.5-1.5v-6a.5.5 0 0 0-1 0v6a.5.5 0 0 
                            1-.5.5h-11a.5.5 0 0 1-.5-.5v-11a.5.5 0 0 1 .5-.5H9a.5.5 0 0 0 0-1H2.5A1.5 1.5 0 0 0 1 2.5z"/>
                          </svg> Edit</span>
                        <span onclick="deleteStudent(${index})" class="btn btn-danger"><svg xmlns="http://www.w3.org/2000/svg" width="16" 
                        height="16" fill="currentColor" class="bi bi-trash" viewBox="0 0 16 16">
                            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5m2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1
                             0V6a.5.5 0 0 1 .5-.5m3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0z"/>
                            <path d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 
                            1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4zM2.5 3h11V2h-11z"/>
                          </svg> Delete</span>
                    </td>
                </tr>
            `;
            tbody.appendChild(tr);
        })
    }
}
function updateCounter(stu = students) {
    counter.innerHTML = `
        <svg xmlns="http://www.w3.org/2000/svg" width="19" height="19" fill="currentColor" class="bi bi-people me-1" viewBox="0 0 16 16">
  <path d="M15 14s1 0 1-1-1-4-5-4-5 3-5 4 1 1 1 1zm-7.978-1L7 12.996c.001-.264.167-1.03.76-1.72C8.312 10.629 9.282 10 11 10c1.717 0 2.687.63 3.24 1.276.593.69.758 1.457.76 1.72l-.008.002-.014.002zM11 7a2 2 0 1 0 0-4 2 2 0 0 0 0 4m3-2a3 3 0 1 1-6 0 3 3 0 0 1 6 0M6.936 9.28a6 6 0 0 0-1.23-.247A7 7 0 0 0 5 9c-4 0-5 3-5 4q0 1 1 1h4.216A2.24 2.24 0 0 1 5 13c0-1.01.377-2.042 1.09-2.904.243-.294.526-.569.846-.816M4.92 10A5.5 5.5 0 0 0 4 13H1c0-.26.164-1.03.76-1.724.545-.636 1.492-1.256 3.16-1.275ZM1.5 5.5a3 3 0 1 1 6 0 3 3 0 0 1-6 0m3-2a2 2 0 1 0 0 4 2 2 0 0 0 0-4"/>
</svg> ${stu.length}
    `;
}
document.addEventListener('DOMContentLoaded', function () {
    updateCounter(students);
    displayStudent(students);
})
function animateClearPlaceholder() {
    searchInput.classList.add('placeholder-hidden');
    setTimeout(() => {
        searchInput.placeholder = '';
    }, 300);
}

function animateRestorePlaceholder() {
    searchInput.placeholder = originalPlaceholder;
    setTimeout(() => {
        searchInput.classList.remove('placeholder-hidden');
    }, 10);
}
function saveStudent() {
    let gender = document.querySelector('input[name="gender"]:checked')?.value;
    let file = fileInput.files[0];
    let name = nameInput.value.trim();
    let email = emailInput.value.trim();
    let id = students.length;

    let student = {
        id: id+1,
        name: name,
        gen: gender,
        email: email
    }
    if (file) {
        const reader = new FileReader();
        reader.onload = function (e) {
            student.image = e.target.result;
            finalSave(student,id);
        }
        reader.readAsDataURL(file);
    }
}
function finalSave(student,id) {
    if (editIndex === -1) {
        students.push(student);
    } else {
        student.id = id;
        students[editIndex] = student;
        editIndex = -1;
        saveBtn.textContent = "Save Changes";
    }
    document.querySelector('form').reset();
    document.querySelector('#exampleModal').querySelector('.btn-close').click();
    displayStudent(students);
    updateCounter(students);
}
saveBtn.addEventListener('click', saveStudent);
function viewStudent(index) {
    let stu = students[index];
    let myTb = document.querySelector('#tb');
    myTb.innerHTML = `
        <tr>
            <td class="text-start"><h6>Name </h6></td>
            <td><h6>: ${stu.name}</h6></td>
        </tr>
        <tr>
            <td class="text-start"><h6>ID </h6></td>
            <td><h6>: ${stu.id}</h6></td>
        </tr>
        <tr>
            <td class="text-start"><h6>Gender </h6></td>
            <td><h6>: ${stu.gen}</h6></td>
        </tr>
        <tr>
            <td class="text-start"><h6>Email </h6></td>
            <td><h6>: ${stu.email}</h6></td>
        </tr>
    `;
    let con = document.querySelector('#img');
    con.innerHTML = `<img style="width: 8rem; height: 8rem; padding: 1px;" class="object-fit-cover border border-dark-subtle card-img-top rounded-circle" src="${stu.image}" alt="">`;
}
function editStudent(index){
    editIndex = index;
    let stu = students[editIndex];
    nameInput.value = stu.name;
    emailInput.value = stu.email;
    if(stu.gen === 'Male'){
        document.querySelector('#male').checked = true;
    }else if(stu.gen === 'Female'){
        document.querySelector('#female').checked = true;
    }else{
        document.querySelector('#other').checked = true;
    }
    saveBtn.textContent = 'Update';
    document.querySelector('#addBtn').click();
}
function deleteStudent(index){
    if(confirm("Are u sure to delete ? ")){
        students.splice(index,1);
        updateCounter(students);
        displayStudent(students);
    }
}


searchInput.addEventListener('input', function(){
    let searchText = searchInput.value.toLowerCase().trim();
    if(searchInput===''){
        displayStudent(students);
        return;
    }
    let newArr = students.filter(stu =>
        stu.name.toLowerCase().includes(searchText) || 
        stu.gen.toLowerCase().includes(searchText)
    );
    displayStudent(newArr);
    
});
