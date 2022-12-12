import projects from './projects.js';

const DOM = (() =>{
    const colorCodes = projects.projectColors;

    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    const tasksDiv = document.querySelector('.tasks');
    const addProjectButton = document.querySelector('.add-project');
    const projectsDiv = document.querySelector('.projects');
    const modal = document.querySelector('.modal');
    const modalBox = document.querySelector('.modal-content');
    const modalConfirmButton = document.querySelector('.confirm-button');
    const modalCancelButton = document.querySelector('.cancel-button');

    function _createNewProject(modal){
        const heading = document.createElement('h2');
        heading.classList.add('modal-heading');
        heading.textContent = `Create New Project`;

        const createProjectForm = document.createElement('form');
        createProjectForm.classList.add('create-project');

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

        createProjectForm.append(nameLabel, div);

        modal.prepend(heading, createProjectForm);
        
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

    function _clearModal(modal){
        while (!modal.firstElementChild.classList.contains('button-div')) {
            modal.removeChild(modal.firstElementChild);
        }
    }

    function showTasks(filter, taskList=[]){
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
            _createNewProject(modalBox);
        });

        modalConfirmButton.addEventListener('click', (e)=>{
            const name = document.querySelector('#project-name');
            const color = document.querySelector(`input[type='radio']:checked`);
            if(name.value){
                const list = projects.addProject(name.value, color.value);
                document.querySelector('.create-project').reset();
                modal.style.display = 'none';
                showProjects(list);    
                _clearModal(modalBox); 
            }else{
                const errorMsg = document.querySelector('.error-msg');
                errorMsg.style.display = 'block';
                const input = document.querySelector('#project-name');
                input.style.border = '1px solid #f87171';
            }    
        })

        window.onclick = function(event) {
            if (event.target == modal) {
              modal.style.display = "none";
              _clearModal(modalBox);
            }
        }
    }

    return {loadHandlers};
})();

export default DOM;