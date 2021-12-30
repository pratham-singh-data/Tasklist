let parent;

const modifyNavbar = () => {
    let id = document.URL.substring(document.URL.indexOf('?') + 4, document.URL.length);

    let lists = JSON.parse(localStorage.taskList).tasklists;

    lists.forEach((list) => {
        if(list.id == id){
            parent = list;
            titleName = list.taskListTitle;
            document.querySelector("#navbarListName").innerHTML = list.taskListTitle;
            return;
        }
    });
};

const showTaskLists = () => {
    document.querySelector("#taskListModal").querySelector("#taskListModalLabel").innerHTML = parent.taskListTitle;
    
    let content = `<img src = "${parent.imageURL}"
            class = "card-img-top"
            alt = "parent image"/>

            <p>${parent.taskListDescription}</p>
            `;

    document.querySelector("#parentTaskListImage").innerHTML = content;
};