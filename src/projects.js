const projects = (()=>{
    let projectList = [];

    const projectColors = {
        black: '#000000',
        red: '#dc2626',
        yellow: '#fbbf24',
        green: '#84cc16',
        blue: '#0e7490',
        pink: '#f43f5e'
    }

    const project = (name, color)=>{
        return {name, color};
    };

    function sendToLocalStorage(){
        const projectsObect = {projectList};
        localStorage.setItem('projects', JSON.stringify(projectsObect));
    }

    function initializeProjectList(){
        const projectsObject = JSON.parse(localStorage.getItem('projects'));
        if(projectsObject != null)
            projectList = projectsObject.projectList;
    }

    function addProject(name, color){
        const newProject = project(name, color);

        projectList.push(newProject);
        sendToLocalStorage();
        return projectList;
    }

    function editProject(projectIndex, projectName, color){
        projectList[projectIndex].name = projectName;
        projectList[projectIndex].color = color; 
        sendToLocalStorage();
        return projectList;
    }

    function getProjects(){
        return projectList;
    }

    function getProject(projectName){
        for(let project of projectList){
            // console.log(project);
            if(project.name == projectName)
                return project;
        }
        return null; 
    }

    function getProjectByIndex(projectIndex){
        if(projectIndex >= 0)
            return projectList[projectIndex];
        return null;
    }

    function deleteProjectByIndex(projectIndex){
        projectList.splice(projectIndex, 1);
        sendToLocalStorage();
        return projectList;
    }

    return {projectColors, addProject, editProject,getProjects, getProject, getProjectByIndex, deleteProjectByIndex, initializeProjectList};


})();

export default projects;