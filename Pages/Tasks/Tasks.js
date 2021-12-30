let titleName;
let id;

const modifyNavbar = () => {
    id = parent.document.URL.substring(parent.document.URL.indexOf('?') + 4, parent.document.URL.length);

    // document.querySelector("#navbarListName").innerHTML = id;

    let lists = JSON.parse(localStorage.taskList).tasklists;

    lists.forEach((list) => {
        if(list.id == id){
            titleName = list.taskListTitle;
            document.querySelector("#navbarListName").innerHTML = list.taskListTitle;
            return;
        }
    });
};

const showTaskLists = () => {
    document.querySelector("#taskListModal").querySelector("#taskListModalLabel").innerHTML = titleName;
    
    let lists = JSON.parse(localStorage.taskList).tasklists;

    lists.forEach((list) => {
        if (list.id == id) {
            let image = `<img src = "${list.imageURL}"
            class = "card-img-top"
            alt = "parent image"/>

            <p>${list.taskListDescription}</p>
            `;

            document.querySelector("#parentTaskListImage").innerHTML = image;
            return;
        }
    });
};