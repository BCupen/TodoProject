
const DOM = (() =>{
    const hamburgerMenu = document.querySelector('.hamburger-menu');
    const sidebar = document.querySelector('.sidebar');
    const main = document.querySelector('.main');
    
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
            
        })
    }

    return {loadHandlers};
})();

export default DOM;