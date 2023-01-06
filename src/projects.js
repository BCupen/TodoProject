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

    return {projectColors, addProject, getProjects};


})();

export default projects;