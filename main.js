var taskName = document.getElementById('taskInput');
var taskContent = document.getElementById('contentInput');
var btnAddTask = document.getElementById('addTaskBtn');
var btnUpdateTask = document.getElementById('updateTaskBtn');

var taskList = [];

if (localStorage.getItem('tasks') != null) {
    taskList = JSON.parse(localStorage.getItem('tasks'));
    taskdata()
}

function taskFunc() {
    var task = {
        name: taskName.value,
        content: taskContent.value,
    };

    taskList.push(task);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    taskdata();
    clearForm();

}


function taskdata() {
    bag = "";
    for (var i = 1; i < taskList.length; i++) {
        bag +=
            `
            <tr>
            <th scope="row">${i}</th>
            <td>${taskList[i].name}</td>
            <td>${taskList[i].content}</td>

            <td>
                <button onclick="preUpdateTask(${i})" type="button" class="btn btn-info text-white  ">Update</button>
                <button onclick="deleteTask(${i})" type="button" class="btn btn-danger">Delete</button>
            </td>
        </tr>
    
            `

    }

    document.getElementById('tbody').innerHTML = bag;
}

function clearForm() {
    taskName.value = ""
    taskContent.value = ""
}

// delete button
function deleteTask(taskIndex) {
    taskList.splice(taskIndex, 1);
    localStorage.setItem('tasks', JSON.stringify(taskList));
    taskdata()
}

// update button 
function preUpdateTask(index) {

    updateIndex = index;
    taskName.value = taskList[index].name;
    taskContent.value = taskList[index].content;
    btnAddTask.classList.add('d-none');
    btnUpdateTask.classList.remove('d-none');

}

function updateTask() {
    if (taskName.value == "" && taskContent.value == "") { Swal.fire("Enter task details"); }
    else {
        var uptask = {
            name: taskName.value,
            content: taskContent.value,
        };

        taskList.splice(updateIndex, 1, uptask);
        localStorage.setItem('tasks', JSON.stringify(taskList));
        taskdata();
        clearForm()
        btnAddTask.classList.remove('d-none');
        btnUpdateTask.classList.add('d-none');
    }

}


// search1 
function searchTask(value) {
    bag = "";
    for (var i = 1; i < taskList.length; i++) {

        if (taskList[i].name.toLowerCase().includes(value.toLowerCase())) {
            bag +=
                `
            <tr>
            <th scope="row">${i}</th>
            <td>${taskList[i].name}</td>
            <td>${taskList[i].content}</td>

            <td>
                <button type="button" class="btn btn-info text-white  ">Update</button>
                <button onclick="deleteTask(${i})" type="button" class="btn btn-danger">Delete</button>
            </td>
            </tr>

            `
        }
    }
    document.getElementById('tbody').innerHTML = bag;
}
// search2
function searchContent(value) {
    bag = "";
    for (var i = 1; i < taskList.length; i++) {
        if (taskList[i].content.toLowerCase().includes(value.toLowerCase())) {

            bag +=
                `
            <tr>
            <th scope="row">${i}</th>
            <td>${taskList[i].name}</td>
            <td>${taskList[i].content}</td>

            <td>
                <button type="button" class="btn btn-info text-white  ">Update</button>
                <button onclick="deleteTask(${i})" type="button" class="btn btn-danger">Delete</button>
            </td>
            </tr>
            `
        }
    }

    document.getElementById('tbody').innerHTML = bag
}

