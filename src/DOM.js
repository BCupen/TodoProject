import {format} from 'date-fns';
import projects from './projects.js';
import tasks from './tasks.js';
import High from './assets/high.svg';
import Medium from './assets/medium.svg';
import Low from './assets/low.svg';

const DOM = (() =>{
    const prioritySVG = {
        high: High,
        medium: Medium,
        low: Low
    }
    const colorCodes = projects.projectColors;
    const taskBGColors = {
        '(none)': '#e0f2fe',
        black: '#d4d4d4',
        red:'#fecaca',
        yellow: '#fde68a',
        green: '#d9f99d',
        blue: '#a5f3fc',
        pink: '#fce7f3',
    };
    let currFilter = 'All';

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    const tasksDiv = document.querySelector('.tasks');
    const filterHeading = document.querySelector('.filter-heading');
    const tasksHeading = document.querySelector('div.main-heading');
    const addProjectButton = document.querySelector('.add-project');
    const projectsDiv = document.querySelector('.projects');
    const modal = document.querySelector('.modal');
    const modalBox = document.querySelector('.modal-content');
    const modalConfirmButton = document.querySelector('.confirm-button');
    const modalCancelButton = document.querySelector('.cancel-button');
    let addTaskButton = document.querySelector('.add-task');
    const form = document.querySelector('form');
    const filterTabs= document.querySelectorAll('.task-tab');

    function _setColorChoice(color) {
        let black = false;
        let red = false;
        let yellow = false;
        let green = false;
        let blue = false;
        let pink = false;
        switch(color){
            case 'black':
                black = true;
                break;
            case 'red':
                red = true;
                break;
            case 'yellow':
                yellow = true;
                break;
            case 'green':
                green = true;
                break;
            case 'blue':
                blue = true;
                break;
            case 'pink':
                pink = true;
                break;
            default:
                return 'Invalid color choice';
        }
        return {black, red, yellow, green, blue, pink};
    }

    function _createNewProject(form){
        const heading = document.querySelector('.modal-heading');
        heading.textContent = `Create New Project`;

        const nameLabel = _createLabelInput('project-name', 'text', 'Project Name:  ', 'Project...');
        const errorMsg = document.createElement('span');
        errorMsg.classList.add('error-msg');
        errorMsg.textContent = `This is a required field`; 

        nameLabel.append(errorMsg);

        const div = document.createElement('div');
        div.classList.add('project-color');

        const colorHeading = document.createElement('span');
        colorHeading.textContent = 'Project Color';
        colorHeading.classList.add('color-heading');

        const colorDiv = document.createElement('div');
        colorDiv.classList.add('project-color-picker');

        const blackLabel = _createLabelRadio('black', true);
        const redLabel = _createLabelRadio('red');
        const yellowLabel = _createLabelRadio('yellow');
        const greenLabel = _createLabelRadio('green');
        const blueLabel = _createLabelRadio('blue');
        const pinkLabel = _createLabelRadio('pink');

        colorDiv.append(blackLabel, redLabel, yellowLabel, greenLabel, blueLabel, pinkLabel);

        div.append(colorHeading, colorDiv);

        form.append(nameLabel, div);        
    }

    function _editProject(form, projectIndex){
        const project = projects.getProjectByIndex(projectIndex);
        const heading = document.querySelector('.modal-heading');
        heading.textContent = `Edit Project`;

        const nameLabel = document.createElement('label');
        nameLabel.textContent = `Project Name: `;
        nameLabel.htmlFor = `project-name`
        const input = document.createElement('input');
        input.type = 'text';
        input.value = project.name;
        input.name = `project-name`;
        input.id = `project-name`;
        input.dataset.pIndex = projectIndex;
        input.maxLength = 15;
        input.classList.add('form-input');

        nameLabel.append(input);
        const errorMsg = document.createElement('span');
        errorMsg.classList.add('error-msg');
        errorMsg.textContent = `This is a required field`; 

        nameLabel.append(errorMsg);

        const div = document.createElement('div');
        div.classList.add('project-color');

        const colorHeading = document.createElement('span');
        colorHeading.textContent = 'Project Color';
        colorHeading.classList.add('color-heading');

        const colorDiv = document.createElement('div');
        colorDiv.classList.add('project-color-picker');

        const colorSettings = _setColorChoice(project.color);

        const blackLabel = _createLabelRadio('black', colorSettings.black);
        const redLabel = _createLabelRadio('red', colorSettings.red);
        const yellowLabel = _createLabelRadio('yellow', colorSettings.yellow);
        const greenLabel = _createLabelRadio('green', colorSettings.green);
        const blueLabel = _createLabelRadio('blue', colorSettings.blue);
        const pinkLabel = _createLabelRadio('pink', colorSettings.pink);

        colorDiv.append(blackLabel, redLabel, yellowLabel, greenLabel, blueLabel, pinkLabel);

        div.append(colorHeading, colorDiv);

        form.append(nameLabel, div);
    }

    function _createNewTask(form){
        const heading = document.querySelector('.modal-heading');
        heading.textContent =  `Create New Task`;

        const titleLabel = document.createElement('label');
        titleLabel.textContent = `Title: `;
        titleLabel.htmlFor = 'task-title';
        const titleInput = document.createElement('input');
        titleInput.type = 'text';
        titleInput.id = 'task-title';
        titleInput.name = 'task-title';
        titleInput.maxLength = 25;
        titleInput.classList.add('form-input');
        const errorMsg = document.createElement('span');
        errorMsg.classList.add('error-msg');
        errorMsg.textContent = `This is a required field`;
        titleLabel.append(titleInput, errorMsg);

        const descLabel  = document.createElement('label');
        descLabel.textContent = `Description: `;
        descLabel.htmlFor = `task-description`;
        const descTextArea = document.createElement('textarea');
        descTextArea.name = `task-description`;
        descTextArea.id = `task-description`;
        descTextArea.maxLength = 100;
        descTextArea.classList.add('form-input');
        descLabel.append(descTextArea);

        const dateLabel = document.createElement('label');
        dateLabel.textContent = `Due Date: `;
        dateLabel.htmlFor = `task-due-date`;
        const dueDateInput = document.createElement('input');
        dueDateInput.type = 'date';
        dueDateInput.id = `task-due-date`;
        dueDateInput.name = `task-due-date`;
        dueDateInput.min = format(new Date(), 'yyyy-MM-dd');
        dueDateInput.classList.add('form-input');
        const dateErrorMsg = document.createElement('span');
        dateErrorMsg.classList.add('error-msg');
        dateErrorMsg.textContent = `This is a required field`
        dateLabel.append(dueDateInput, dateErrorMsg);

        const priorityDiv = document.createElement('div');
        priorityDiv.classList.add('priority-div');
        const priorityHeading = document.createElement('span');
        priorityHeading.textContent = `Task Priority: `;
        priorityHeading.classList.add('priority-heading');

        const highPriorityLabel = document.createElement('label');
        highPriorityLabel.htmlFor = `high-priority`;
        highPriorityLabel.classList.add('high-priority');
        const highPriorityRadio = document.createElement('input');
        highPriorityRadio.type = `radio`;
        highPriorityRadio.name = `priority`;
        highPriorityRadio.id = `high-priority`;
        highPriorityRadio.value = `high`;
        const highSpan = document.createElement('span');
        highSpan.classList.add('priority-button');
        const highIcon = new Image();
        highIcon.src = High;
        highSpan.append(highIcon);
        highPriorityLabel.append(highPriorityRadio, highSpan);

        const mediumPriorityLabel = document.createElement('label');
        mediumPriorityLabel.htmlFor = `medium-priority`;
        mediumPriorityLabel.classList.add('medium-priority');
        const mediumPriorityRadio = document.createElement('input');
        mediumPriorityRadio.type = `radio`;
        mediumPriorityRadio.name = `priority`;
        mediumPriorityRadio.id = `medium-priority`;
        mediumPriorityRadio.value = `medium`;
        const mediumSpan = document.createElement('span');
        mediumSpan.classList.add('priority-button');
        const mediumIcon = new Image();
        mediumIcon.src = Medium;
        mediumSpan.append(mediumIcon);
        mediumPriorityLabel.append(mediumPriorityRadio, mediumSpan);

        const lowPriorityLabel = document.createElement('label');
        lowPriorityLabel.htmlFor = `low-priority`;
        lowPriorityLabel.classList.add('low-priority');
        const lowPriorityRadio = document.createElement('input');
        lowPriorityRadio.type = `radio`;
        lowPriorityRadio.name = `priority`;
        lowPriorityRadio.id = `low-priority`;
        lowPriorityRadio.value = `low`;
        lowPriorityRadio.checked = true;
        const lowSpan = document.createElement('span');
        lowSpan.classList.add('priority-button');
        const lowIcon = new Image();
        lowIcon.src = Low;
        lowSpan.append(lowIcon);
        lowPriorityLabel.append(lowPriorityRadio, lowSpan);

        const priorities = document.createElement('div');
        priorities.classList.add('priorities');
        priorities.append(highPriorityLabel, mediumPriorityLabel, lowPriorityLabel);
        
        priorityDiv.append(priorityHeading, priorities);

        const projectLabel = document.createElement('label');
        projectLabel.htmlFor= 'select-project';
        projectLabel.textContent = `Project: `;
        const projectSelect = document.createElement('select');
        projectSelect.name = `select-project`;
        projectSelect.id = `select-project`;
        projectSelect.classList.add('form-input');
        const noneOption = document.createElement('option');
        noneOption.value = -1;
        noneOption.textContent = `(none)`;
        noneOption.selected = true;
        projectSelect.append(noneOption);

        const currProjects = projects.getProjects();
        for(let [i, project] of currProjects.entries()){
            const option = document.createElement('option');
            option.value = i;
            option.textContent = project.name;
            projectSelect.append(option);
        }

        projectLabel.append(projectSelect);

        form.append(titleLabel, descLabel, dateLabel, priorityDiv, projectLabel);
    }

    function _deleteProject(form, projectIndex){
        const heading = document.querySelector('.modal-heading');
        heading.textContent =  `Are you sure?`;

        const project = projects.getProjectByIndex(projectIndex);

        const messageSpan = document.createElement('span');
        messageSpan.classList.add('delete-message');
        messageSpan.textContent = `Are you sure you want to delete the following project: ${project.name}?`;
        messageSpan.dataset.pIndex = projectIndex;

        form.append(messageSpan);
    }

    function _createTaskDiv(task, index){
        const div = document.createElement('div');
        div.classList.add('task');
        div.dataset.index = index;

        const headingDiv = document.createElement('div');
        headingDiv.classList.add('task-heading');
        const label = document.createElement('label');
        label.htmlFor = `task-checkbox`;
        const checkbox = document.createElement('input');
        checkbox.type = `checkbox`;
        checkbox.id = `task-checkbox`;
        label.append(checkbox);
        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = task.title;
        const prioritySpan = document.createElement('span');
        prioritySpan.classList.add('task-prioritySpan');
        const priorityIcon = new Image();
        priorityIcon.src = prioritySVG[task.priority];
        prioritySpan.append(priorityIcon);

        checkbox.addEventListener('change', (e)=>{
            if(checkbox.checked){
                div.classList.add('completed');
            }else{
                div.classList.remove('completed');
            }
            
        })

        const dueDateSpan = document.createElement('span');
        dueDateSpan.classList.add('task-dueDateSpan');
        dueDateSpan.textContent = `Due Date: ${task.dueDate}`;

        headingDiv.append(label, title, prioritySpan);

        const footerDiv = document.createElement('div');
        footerDiv.classList.add('task-footer');
        const buttonSpan = document.createElement('span');
        buttonSpan.classList.add('task-edit-delete');
        buttonSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-pen-fill task-edit" viewBox="0 0 16 16">
                    <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
                    </svg>
                    <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-trash task-delete" viewBox="0 0 16 16">
                    <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
                    <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
                    </svg>`;

        footerDiv.append(buttonSpan);
        
        const taskProject = projects.getProjectByIndex(task.projectIndex);
        if(taskProject != null)
            div.style.backgroundColor = taskBGColors[taskProject.color];
        else div.style.backgroundColor = taskBGColors['(none)'];

        div.append(headingDiv, dueDateSpan, footerDiv);
        return div;
    }

    function _createLabelRadio(value, checked=false){
        const label = document.createElement('label');
        label.htmlFor = value;
        label.classList.add(value)

        const input = document.createElement('input');
        input.type = 'radio';
        input.name = 'color';
        input.id = value
        input.value = value;
        input.checked = checked;

        const div = document.createElement('div');
        div.classList.add('button');

        label.append(input, div);
        return label;
        

    }

    function _createLabelInput(name, type, textContent, placeholder){
        const label = document.createElement('label');
        label.htmlFor = name;
        label.textContent = textContent;

        const input = document.createElement('input');
        input.type = type;
        input.placeholder = placeholder;
        input.name = name;
        input.id = name;
        input.maxLength = 15;
        input.classList.add('form-input');

        label.append(input);

        return label;
    }

    function _clearModalForm(form){
        const header = document.querySelector('.modal-heading');
        header.innerHTML = 'Heading';
        form.innerHTML = '';
    }

    function showTasks(filter, project=''){
        filterHeading.textContent = filter;
        const taskList = tasks.getTasks(filter, project);
        if(taskList.length > 0){
            tasksDiv.innerHTML = '';
            if(tasksDiv.classList.contains('none')){
                tasksDiv.classList.remove('none');
                tasksHeading.insertAdjacentHTML('beforeend' ,`
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" class="bi bi-plus-square add-task" viewBox="0 0 16 16">
                    <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                    <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>`);
                addTaskButton = document.querySelector('.add-task');
                addTaskButton.addEventListener('click', (e)=>{
                    modal.style.display = 'block';
                    _createNewTask(form);
                })
            }
            for(let [i,task] of taskList.entries()){
               tasksDiv.append( _createTaskDiv(task, i));
            }
        }else{
            if(!tasksDiv.classList.contains('none')){
                tasksDiv.classList.add('none');
                tasksHeading.removeChild(tasksHeading.lastChild);
                tasksDiv.innerHTML = `<span class="no-tasks-msg">You have no tasks. Why not create one now?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" class="bi bi-plus-square add-task" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>`;
                addTaskButton = document.querySelector('.add-task');
                addTaskButton.addEventListener('click', (e)=>{
                    modal.style.display = 'block';
                    _createNewTask(form);
                })
            }            
        }
    }

    function showProjects(projectList=[]){
        //clear the projects
        projectsDiv.innerHTML = ``;

        for(let [i, project] of projectList.entries()){
            const div = document.createElement('div');
            div.classList.add('project');
            div.dataset.index = i;
            const colorSpan = document.createElement('span');
            colorSpan.classList.add('project-color');
            colorSpan.style.backgroundColor = colorCodes[project.color];

            const projectName = document.createElement('h3');
            projectName.classList.add('name');
            projectName.textContent = project.name;

            const buttonSpan = document.createElement('span');
            buttonSpan.classList.add('edit-delete-span');
            buttonSpan.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-pen-fill edit" viewBox="0 0 16 16">
            <path d="m13.498.795.149-.149a1.207 1.207 0 1 1 1.707 1.708l-.149.148a1.5 1.5 0 0 1-.059 2.059L4.854 14.854a.5.5 0 0 1-.233.131l-4 1a.5.5 0 0 1-.606-.606l1-4a.5.5 0 0 1 .131-.232l9.642-9.642a.5.5 0 0 0-.642.056L6.854 4.854a.5.5 0 1 1-.708-.708L9.44.854A1.5 1.5 0 0 1 11.5.796a1.5 1.5 0 0 1 1.998-.001z"/>
            </svg>
            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" class="bi bi-trash delete" viewBox="0 0 16 16">
            <path d="M5.5 5.5A.5.5 0 0 1 6 6v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm2.5 0a.5.5 0 0 1 .5.5v6a.5.5 0 0 1-1 0V6a.5.5 0 0 1 .5-.5zm3 .5a.5.5 0 0 0-1 0v6a.5.5 0 0 0 1 0V6z"/>
            <path fill-rule="evenodd" d="M14.5 3a1 1 0 0 1-1 1H13v9a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V4h-.5a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1H6a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1h3.5a1 1 0 0 1 1 1v1zM4.118 4 4 4.059V13a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4.059L11.882 4H4.118zM2.5 3V2h11v1h-11z"/>
            </svg>`;

            div.append(colorSpan, projectName, buttonSpan);
            projectsDiv.append(div);
        }
        const editButtons = document.querySelectorAll('.edit');
        const deleteButtons = document.querySelectorAll('.delete');
        editButtons.forEach((button) => button.addEventListener('click', (e)=>{
            const div = button.parentElement.parentElement;
            modal.style.display = 'block';
            _editProject(form, div.dataset.index);
        }))
        deleteButtons.forEach((button) => button.addEventListener('click', (e)=>{
            const div = button.parentElement.parentElement;
            modal.style.display = 'block';
            _deleteProject(form, div.dataset.index);
        }))
    }
    
    function loadHandlers(){
        let menuActive = false;
        hamburgerMenu.addEventListener('click', (e)=>{
            if(!menuActive){
                sidebar.style.width = "15rem";
                main.style.marginLeft = "15rem"; 
                menuActive = true;
            }else{
                sidebar.style.width = "0";
                main.style.marginLeft = "0";
                menuActive = false;
            } 
        });

        addProjectButton.addEventListener('click', (e)=>{
            modal.style.display = 'block';
            _createNewProject(form);
        });

        modalConfirmButton.addEventListener('click', (e)=>{
            //need to check modal header
            const modalHeading = document.querySelector('.modal-heading');
            if(modalHeading.textContent == 'Create New Project' || modalHeading.textContent == `Edit Project`){
                const name = document.querySelector('#project-name');
                const color = document.querySelector(`input[type='radio']:checked`);
                if(name.value){
                    const list = (modalHeading.textContent == `Create New Project`) ? 
                                    projects.addProject(name.value, color.value) :
                                    projects.editProject(name.dataset.pIndex, name.value, color.value);
                    document.querySelector('.create-project').reset();
                    modal.style.display = 'none';
                    showProjects(list);
                    showTasks(currFilter);    
                    _clearModalForm(form); 
                }else{
                    const errorMsg = document.querySelector('.error-msg');
                    errorMsg.style.display = 'block';
                    const input = document.querySelector('#project-name');
                    input.style.border = '1px solid #f87171';
                } 
            }else if(modalHeading.textContent == `Create New Task`){
                const taskTitle = document.querySelector('#task-title');
                const taskDue = document.querySelector('#task-due-date');
                if(taskTitle.value && taskDue.value){
                    const taskDesc = document.querySelector('#task-description');
                    const taskPriority = document.querySelector(`input[type='radio']:checked`);
                    const taskProject = document.querySelector(`#select-project`);
                    tasks.addTask(taskTitle.value, taskDue.value, taskDesc.value, taskPriority.value, parseInt(taskProject.value));
                    document.querySelector('.create-project').reset();
                    modal.style.display = 'none';
                    showTasks(currFilter);    
                    _clearModalForm(form);
                }else{
                    if(!taskTitle.value){
                        const errorMsg = taskTitle.nextElementSibling;
                        errorMsg.style.display = 'block';
                        taskTitle.style.border = '1px solid #f87171';  
                    }
                    if(!taskDue.value){
                        const errorMsg = taskDue.nextElementSibling;
                        errorMsg.style.display = 'block';
                        taskDue.style.border = '1px solid #f87171';  
                    }
                }
            }else if(modalHeading.textContent == `Are you sure?`){
                const messageSpan = document.querySelector('.delete-message');
                const list = projects.deleteProjectByIndex(messageSpan.dataset.pIndex);
                modal.style.display = 'none';
                showProjects(list);
                _clearModalForm(form);
            }
                
        })

        modalCancelButton.addEventListener('click', (e)=>{
            modal.style.display = "none";
            _clearModalForm(form);
        })

        addTaskButton.addEventListener('click', (e)=>{
            modal.style.display = 'block';
            _createNewTask(form);
        })

        filterTabs.forEach(filter => filter.addEventListener('click', (e)=>{
            filterTabs.forEach(filter => filter.classList.remove('selected'));
            filter.classList.add('selected');
            const tabHeading = filter.getElementsByTagName('h3')[0];
            currFilter = tabHeading.textContent;
            showTasks(currFilter);
        }))
    }

    return {loadHandlers};
})();

export default DOM;