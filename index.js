const taskContainer = document.querySelector(".task-list-container");
const defaultImageURL = "https://media.istockphoto.com/photos/door-in-forest-picture-id545817618?b=1&k=20&m=545817618&s=170667a&w=0&h=hGwcNlFfpHU5GzwzzPx0IaglEGVmkw5f9caitNHU26k=";
const defaultFlair = "Routine";
const defaultTitle = "Chores";
const defaultFlairType = "btn-outline-info";
const defaultTaskDescription = "Here I have written the chores I have to do in my house.";

let globalStore = [];

const updateLocalStorage = () => {
  localStorage.setItem("taskList", JSON.stringify({
    tasklists: globalStore
  }));
};

const createListCard = ({
  id, 
  imageURL,
  taskListTitle,
  taskListFlair,
  taskListFlairType,
  taskListDescription
}) => {
  if(!id) id = Date.now();

  if (!imageURL) imageURL = defaultImageURL;

  if (!taskListTitle) taskListTitle = defaultTitle;

  if (!taskListFlair) taskListFlair = defaultFlair;

  if (!taskListFlairType) taskListFlairType = defaultFlairType;

  if (!taskListDescription) taskListDescription = defaultTaskDescription;

    return `<div id="${id}" class="col-lg-3 col-md-4">
        <div class="card mx-3 my-3" style="width: 18rem">
          <a href="${imageURL}">
            <img src="${imageURL}" class="card-img-top" alt="${id}" />
          </a>
          <div class="card-body">
            <h5>${taskListTitle}</h5>
            <p class="card-text">${taskListDescription}</p>

            <button type="button" class="btn ${taskListFlairType} rounded-pill" onclick="filteredFlairSearch(this, arguments)">
              ${taskListFlair}
            </button>
          </div>

          <div class="card-footer">
            <div class="footer-buttons d-flex justify-content-around mt-3">
            <a href="Pages/Tasks/Tasks.html?id=${id}">
              <button
                button
                type="button"
                class="btn btn-outline-success"
                id="${id}"
                onclick="openTaskModal(this, arguments)"
                data-bs-target="#taskModal"
                data-bs-toggle="modal"
              >
                <em
                  class="far fa-folder-open"
                  onclick="openTaskModal(this, arguments)"
                  data-bs-target="#taskModal"
                  data-bs-toggle="modal"
                  id="${id}"
                >
                </em>
              </button>
              </a>
              <button
                button
                type="button"
                class="btn btn-outline-primary"
                data-bs-toggle="modal"
                id="${id}"
                onclick="updateCardModal(this, arguments)"
                data-bs-target="#updateModal"
              >
                <em
                  class="far fa-edit"
                  onclick="updateCardModal(this, arguments)"
                  id="${id}"
                ></em>
              </button>
              <button
                button
                type="button"
                id="${id}"
                class="btn btn-outline-danger"
                onclick="deleteCard.apply(this, arguments)"
              >
                <em
                  class="fas fa-trash-alt"
                  onclick="deleteCard.apply(this, arguments)"
                  id="${id}"
                ></em>
              </button>
            </div>
          </div>
        </div>
      </div>`;
};

const addTaskList = () =>{
  let additionModal = document.querySelector("#addNewModal");

  let taskData = {
    id: `${Date.now()}`, // unique id of card
    imageURL: additionModal.querySelector("#taskListImageURL").value,
    taskListTitle: additionModal.querySelector("#taskListTitle").value,
    taskListFlair:additionModal.querySelector("#taskListFlair").value,
    taskListFlairType: additionModal.querySelector("#taskListFlairType").value,
    taskListDescription: additionModal.querySelector("#taskListDescription").value,
  };

  let newCard = createListCard(taskData);
  taskContainer.insertAdjacentHTML("beforeend", newCard);
  globalStore.push(taskData);
  updateLocalStorage();

  // clear modal
  document.getElementById("taskListImageURL").value = "";
  document.getElementById("taskListTitle").value = "";
  document.getElementById("taskListFlair").value = "";
  document.getElementById("taskListDescription").value = "";
};

const loadPage = () =>{
  let initialData = localStorage.taskList;

  if(! initialData) return; // end executon if data is not present

  let lists = JSON.parse(initialData).tasklists;

  lists.forEach((listData) => {
    let newCard = createListCard(listData);
    taskContainer.insertAdjacentHTML("beforeend", newCard);
    globalStore.push(listData);
  });
};

const deleteCard = (event) => {
  event = window.event;
  let targetID = event.target.id;
  
  globalStore = globalStore.filter((data) => data.id !== targetID);
  updateLocalStorage();
  location.reload();
};

const updateCardModal = (event) => {
  updationModel = document.querySelector("#updateModal");
  event = window.event;
  let targetID = event.target.id;

  globalStore.forEach((listData) => {
    if(listData.id == targetID){
      updationModel.querySelector("#taskListImageURL").value = listData.imageURL;
      updationModel.querySelector("#taskListTitle").value = listData.taskListTitle;
      updationModel.querySelector("#taskListFlair").value = listData.taskListFlair;
      updationModel.querySelector("#taskListFlairType").value = listData.taskListFlairType;
      updationModel.querySelector("#taskListDescription").value = listData.taskListDescription;
      updationModel.querySelector("#taskListID").innerHTML = listData.id;

      return;
    }
  });
};

const updateTaskList = () => {
  let updationModal = document.querySelector("#updateModal");

  let taskData = {
    id: updationModal.querySelector("#taskListID").innerHTML,
    imageURL: updationModal.querySelector("#taskListImageURL").value,
    taskListTitle: updationModal.querySelector("#taskListTitle").value,
    taskListFlair: updationModal.querySelector("#taskListFlair").value,
    taskListFlairType: updationModal.querySelector("#taskListFlairType").value,
    taskListDescription: updationModal.querySelector("#taskListDescription").value
  };


  globalStore.forEach((card) => {
    if(card.id == taskData.id){
      card.imageURL = taskData.imageURL;
      card.taskListTitle = taskData.taskListTitle;
      card.taskListFlair = taskData.taskListFlair;
      card.taskListFlairType = taskData.taskListFlairType;
      card.taskListDescription = taskData.taskListDescription;
    }
  });

  updateLocalStorage();

  // clear modal
  updationModal.querySelector("#taskListImageURL").value = "";
  updationModal.querySelector("#taskListTitle").value = "";
  updationModal.querySelector("#taskListFlair").value = "";
  updationModal.querySelector("#taskListFlairType").value = "";
  updationModal.querySelector("#taskListDescription").value = "";
  updationModal.querySelector("#taskListID").innerHTML = "";

  location.reload();
};

const filteredFlairSearch = (event) => {
  event = window.event;
  let filter = event.target.innerHTML.trim();

  let filteredResults = globalStore.filter((card) => {
    if (card.taskListFlair === "") card.taskListFlair = defaultFlair;
    return card.taskListFlair === filter;
  });

  // remove data currently in the page
  taskContainer.innerHTML = "";

  // insert the results in page
  filteredResults.forEach((results) => {
    let newCard = createListCard(results);
    taskContainer.insertAdjacentHTML("beforeend", newCard);
  });
};