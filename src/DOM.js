const DOM = (() =>{
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    const addProjectButton = document.querySelector('.add-project');
    const modal = document.querySelector('.modal');
    const modalBox = document.querySelector('.modal-content');

    function _createNewProject(modal){
        const heading = document.createElement('h2');
        heading.classList.add('modal-heading');
        heading.textContent = `Create New Project`;

        const createProjectForm = document.createElement('form');
        createProjectForm.classList.add('create-project');

        const nameLabel = _createLabelInput('project-name', 'text', 'Project Name:  ', 'Project...');

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
        input.classList.add('form-input');

        label.append(input);

        return label;
    }

    function _clearModal(modal){
        while (!modal.firstChild.classList.contains('.button-div')) {
            modal.removeChild(modal.firstChild);
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