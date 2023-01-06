import {format} from 'date-fns';
import projects from './projects.js';
import tasks from './tasks.js';
import High from './assets/high.svg';
import Medium from './assets/medium.svg';
import Low from './assets/low.svg';

const DOM = (() =>{
    const colorCodes = projects.projectColors;
    let currFilter = 'All';

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    const tasksDiv = document.querySelector('.tasks');
    const filterHeading = document.querySelector('.filter-heading');
    const addProjectButton = document.querySelector('.add-project');
    const projectsDiv = document.querySelector('.projects');
    const modal = document.querySelector('.modal');
    const modalBox = document.querySelector('.modal-content');
    const modalConfirmButton = document.querySelector('.confirm-button');
    const modalCancelButton = document.querySelector('.cancel-button');
    const addTaskButton = document.querySelector('.add-task');
    const form = document.querySelector('form');
    const filterTabs= document.querySelectorAll('.task-tab');

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
        errorMsg.textContent = `This is a required field`
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
        dateLabel.append(dueDateInput);

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
        noneOption.value = `(none)`;
        noneOption.textContent = `(none)`;
        noneOption.selected = true;
        projectSelect.append(noneOption);

        const currProjects = projects.getProjects();
        for(let project of currProjects){
            const option = document.createElement('option');
            option.value = project.name;
            option.textContent = project.name;
            projectSelect.append(option);
        }

        projectLabel.append(projectSelect);

        form.append(titleLabel, descLabel, dateLabel, priorityDiv, projectLabel);
    }

    function _createTaskDiv(task){
        const div = document.createElement('div');
        div.classList.add('task');
        const title = document.createElement('h3');
        title.classList.add('title');
        title.textContent = task.title;

        div.append(title);
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
            }
            for(let task of taskList){
               tasksDiv.append( _createTaskDiv(task));
            }

        }else{
            if(!tasksDiv.classList.contains('none')){
                tasksDiv.classList.add('none');
                tasksDiv.innerHTML = `<span class="no-tasks-msg">You have no tasks. Why not create one now?</span>
                    <svg xmlns="http://www.w3.org/2000/svg" width="60" height="60" class="bi bi-plus-square add-task" viewBox="0 0 16 16">
                        <path d="M14 1a1 1 0 0 1 1 1v12a1 1 0 0 1-1 1H2a1 1 0 0 1-1-1V2a1 1 0 0 1 1-1h12zM2 0a2 2 0 0 0-2 2v12a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V2a2 2 0 0 0-2-2H2z"/>
                        <path d="M8 4a.5.5 0 0 1 .5.5v3h3a.5.5 0 0 1 0 1h-3v3a.5.5 0 0 1-1 0v-3h-3a.5.5 0 0 1 0-1h3v-3A.5.5 0 0 1 8 4z"/>
                    </svg>`;
                const addTask = document.querySelector('.add-task');
                addTask.addEventListener('click', (e)=>{
                    modal.style.display = 'block';
                    _createNewTask(form);
                })
            }            
        }
    }

    function showProjects(projectList=[]){
        //clear the projects
        projectsDiv.innerHTML = ``;

        for(let project of projectList){
            const div = document.createElement('div');
            div.classList.add('project');

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
            if(modalHeading.textContent == 'Create New Project'){
                const name = document.querySelector('#project-name');
                const color = document.querySelector(`input[type='radio']:checked`);
                if(name.value){
                    const list = projects.addProject(name.value, color.value);
                    document.querySelector('.create-project').reset();
                    modal.style.display = 'none';
                    showProjects(list);    
                    _clearModalForm(form); 
                }else{
                    const errorMsg = document.querySelector('.error-msg');
                    errorMsg.style.display = 'block';
                    const input = document.querySelector('#project-name');
                    input.style.border = '1px solid #f87171';
                } 
            }else if(modalHeading.textContent == `Create New Task`){
                const taskTitle = document.querySelector('#task-title');
                if(taskTitle.value){
                    const taskDesc = document.querySelector('#task-description');
                    const taskDue = document.querySelector('#task-due-date');
                    const taskPriority = document.querySelector(`input[type='radio']:checked`);
                    const taskProject = document.querySelector(`#select-project`);
                    tasks.addTask(taskTitle.value, taskDue.value, taskDesc.value, taskPriority.value, taskProject.value);
                    document.querySelector('.create-project').reset();
                    modal.style.display = 'none';
                    showTasks(currFilter);    
                    _clearModalForm(form);
                }else{
                    const errorMsg = document.querySelector('.error-msg');
                    errorMsg.style.display = 'block';
                    const input = document.querySelector('#project-name');
                    input.style.border = '1px solid #f87171';
                }
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