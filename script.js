const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskCont = document.querySelector('#taskContainer');


function addTask(task){
    if(!task){
            return;
        }
        createTask(task);
        taskInput.value = ''
}


addBtn.addEventListener('click', ()=>{addTask(taskInput.value)
})
taskInput.addEventListener('keydown',(event)=>{
    
    if(event.key === 'Enter'){
        addTask(taskInput.value)
}
})

function createTask(taskText){
    const taskDiv = document.createElement('div');
    taskDiv.className ='task';
    const taskChkBox = document.createElement('input');
    taskChkBox.type = 'checkbox';
    taskChkBox.className = 'checkBox';
    const taskSpan = document.createElement('span')
    taskSpan.textContent = taskText;
    const delBtn = document.createElement('button');
    delBtn.className = 'deleteBtn';
    delBtn.textContent = 'Delete';
    taskDiv.appendChild(taskChkBox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(delBtn);
    taskCont.append(taskDiv);

    delBtn.addEventListener('click',()=>{
        taskDiv.remove();
    })
}
