import {format, parseISO} from 'date-fns';

const tasks = (()=>{
    let taskList = [];

    const task = (title, description, dueDate, priority, project)=>{
        return {title, description, dueDate, priority, project};
    };

    function addTask(title, dueDate, description, priority, project){
        if(description == '')
            description = `(no description)`;
        const newTask = task(title, description, format(parseISO(dueDate), 'yyyy-MM-dd'), priority, project);
        taskList.unshift(newTask);
    }

    function getTasks(filter, project=''){
        if(filter == 'All')
            return taskList;
        if(filter == 'Today'){
            const today = format(new Date(), 'yyyy-MM-dd');
            const todaysTasks = taskList.filter(task => task.dueDate == today);
            return todaysTasks;
        }

    }

    return {addTask, getTasks}
})();

export default tasks;