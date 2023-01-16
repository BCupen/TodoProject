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

    return {projectColors, addProject, getProjects, getProject};


})();

export default projects;