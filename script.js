const API_URL = 'http://localhost:5250/api/todo';

const taskInput = document.querySelector('#taskInput');
const addBtn = document.querySelector('#addBtn');
const taskCont = document.querySelector('#taskContainer');

// 1. Загрузка всех задач при запуске страницы
async function loadTasks() {
    try {
        const response = await fetch(API_URL);
        if (!response.ok) {
            throw new Error(`Ошибка сервера: ${response.status}`);
        }
        const tasks = await response.json();

        taskCont.innerHTML = ''; // Очищаем контейнер перед отрисовкой
        tasks.forEach(task => createTask(task));
    } catch (error) {
        console.error('Ошибка при загрузке задач из БД:', error);
    }
}

// 2. Добавление новой задачи в базу через POST
async function addTask(taskText) {
    if (!taskText.trim()) return;

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ text: taskText, isDone: false })
        });

        if (response.ok) {
            const newTask = await response.json();
            createTask(newTask); // Рисуем элемент с id из базы
            taskInput.value = '';
        } else {
            const errorText = await response.text();
            alert(`Ошибка сервера (${response.status})! Проверь консоль браузера (F12)`);
            console.error('Детали ошибки сервера:', errorText);
        }
    } catch (error) {
        alert('Не удалось подключиться к бэкенду. Проверь, запущен ли dotnet run!');
        console.error('Ошибка сети:', error);
    }
}

// Обработчики кнопки ADD и клавиши Enter
addBtn.addEventListener('click', () => addTask(taskInput.value));

taskInput.addEventListener('keydown', (event) => {
    if (event.key === 'Enter') {
        addTask(taskInput.value);
    }
});

// 3. Отрисовка DOM-элемента задачи
function createTask(task) {
    const taskDiv = document.createElement('div');
    taskDiv.className = 'task';

    const taskChkBox = document.createElement('input');
    taskChkBox.type = 'checkbox';
    taskChkBox.className = 'checkBox';
    taskChkBox.checked = task.isDone;

    const taskSpan = document.createElement('span');
    taskSpan.textContent = task.text;
    if (task.isDone) {
        taskSpan.style.textDecoration = 'line-through';
    }

    const delBtn = document.createElement('button');
    delBtn.className = 'deleteBtn';
    delBtn.textContent = 'Delete';

    taskDiv.appendChild(taskChkBox);
    taskDiv.appendChild(taskSpan);
    taskDiv.appendChild(delBtn);
    taskCont.append(taskDiv);

    // Изменение статуса чекбокса (PATCH)
    taskChkBox.addEventListener('change', async () => {
        const newStatus = !task.isDone;
        try {
            const response = await fetch(`${API_URL}/${task.id}`, {
                method: 'PATCH',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ isDone: newStatus })
            });
            if (response.ok) {
                task.isDone = newStatus;
                taskSpan.style.textDecoration = task.isDone ? 'line-through' : 'none';
            } else {
                alert('Не удалось обновить статус задачи');
                taskChkBox.checked = !taskChkBox.checked;
            }
        } catch (error) {
            console.error('Ошибка при переключении статуса:', error);
            taskChkBox.checked = !taskChkBox.checked;
        }
    });

    // Удаление задачи (DELETE)
    delBtn.addEventListener('click', async () => {
        try {
            const response = await fetch(`${API_URL}/${task.id}`, { method: 'DELETE' });
            if (response.ok) {
                taskDiv.remove();
            } else {
                alert('Не удалось удалить задачу из базы');
            }
        } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
        }
    });
}

// Первичная загрузка списка при открытии страницы
loadTasks();