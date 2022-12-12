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

    const project = (name, color, tasks)=>{
        return {name, color, tasks};
    };

    function addProject(name, color, tasks=[]){
        const newProject = project(name, color, tasks);

        projectList.push(newProject);
        return projectList;
    }

    return {projectColors, addProject};


})();

export default projects;