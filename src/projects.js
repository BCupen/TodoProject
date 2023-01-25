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

    function addProject(name, color){
        const newProject = project(name, color);

        projectList.push(newProject);
        return projectList;
    }

    function editProject(projectIndex, projectName, color){
        projectList[projectIndex].name = projectName;
        projectList[projectIndex].color = color; 
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
        return projectList[projectIndex];
    }

    return {projectColors, addProject, editProject,getProjects, getProject, getProjectByIndex};


})();

export default projects;