import {format, parseISO, isBefore} from 'date-fns';

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
        if(filter == 'Upcoming'){
            const today = new Date();
            const nextWeek = format(new Date(today.getFullYear(), today.getMonth(), today.getDate() + 7), 'yyyy-MM-dd');
            const upcomingTasks = taskList.filter(task => isBefore(parseISO(task.dueDate), parseISO(nextWeek)));
            return upcomingTasks;
        }

    }

    return {addTask, getTasks}
})();

export default tasks;