const showNote = document.querySelector(".note_content");

const addBox = document.querySelector(".note_add-box");
const popupBox = document.querySelector(".note_popup-box");
const closeIcon = document.querySelector(".note_nav span");
const updateTitle = document.querySelector(".note_nav h2");
const titleTag = document.querySelector(".note_input");
const descTag = document.querySelector(".note_text");
const addBtn = document.querySelector(".note_btn");
const form_data = document.querySelector("#note_form");
let isUpdate = false;

let updateIndex;
// let isUpdate = false, UpdateId;

// getting localStorage notes
let notes = JSON.parse(localStorage.getItem("notes")) || [];
let userInformation = JSON.parse(localStorage.getItem('userInformation'));

if(!userInformation){
  window.location.href = '/index.html';
  
}


console.log(userInformation)
showNotes(notes);
addBox.addEventListener("click", () => {
  titleTag.focus();
  popupBox.classList.add("show");
});
closeIcon.addEventListener("click", () => {
  titleTag.value = "";
  descTag.value = "";
  addBtn.innerText = "Add Note";
  updateTitle.innerText = "Add a new Note";
  popupBox.classList.remove("show");
});




// button-contantdeleteBtn 
function showNotes(n) {
  showNote.innerHTML = "";
  n.filter(fil => fil.userId === userInformation.userId).forEach((note) => {
    showNote.innerHTML += `  <div class="note_note">
        <div class="note_details">
        <h2>${note.title}</h2>
        <p>${note.description} </p>
        </div>
        <div class="note_button-contant">
          <span> ${note.date}</span>
          <div class="note_setting">
          
          <span id="note_updateBtn"class="material-symbols-outlined updateBtn" onclick="updateNote(${note.id}, '${note.title}','${note.description}')">contract_edit</span>
         
          
          
          <span id="note_deleteBtn" class="material-symbols-outlined deleteBtn" noteId="${note.id}">
          delete</span>
          </div>
        </div>
      </div> `;
  });
}

showNote.addEventListener("click", (e) => {
  if (e.target.classList.contains("deleteBtn")) {
    let id = e.target.getAttribute("noteId");
    console.log(id);
    deleteNote(id);
  }
});

function deleteNote(noted) {
  if (confirm("are you sure you want to delete this note?")) {
    // console.log(notes);
    const notesupdated = notes.filter((e) => e.id != noted); // removing seleted note from array tasks
    notes = notesupdated;
    console.log(notesupdated);
    console.log("notes ", notes);
    localStorage.setItem("notes", JSON.stringify(notesupdated));

    showNotes(notesupdated);

    // console.log("deleted"); // updating data in local storage
  } else {
    alert("lama daledin");
  }
}

function updateNote(noteId, title, desc) {
  isUpdate = true;
  updateIndex = notes.find((n) => n.id == noteId);

  addBox.click();
  titleTag.value = title;
  descTag.value = desc;
  addBtn.innerText = "Update Note";
  updateTitle.innerText = "Update a Note";
}

form_data.addEventListener("submit", (e) => {
  e.preventDefault();

  if (isUpdate) {
    updateIndex.description = descTag.value;
    updateIndex.title = titleTag.value;
    localStorage.setItem("notes", JSON.stringify(notes));
    isUpdate = false;
    titleTag.value = "";
    descTag.value = "";
    updateIndex = null;
    console.log("after update ", isUpdate);
    showNotes(notes);
    // return;
  } else {
    if (titleTag.value !== "" && descTag.value !== "") {
      // getting month, day, year from the current date
      let dateObj = new Date(),
        month = dateObj.getMonth() + 1,
        day = dateObj.getDate(),
        year = dateObj.getFullYear();

      let noteInfo = {
        id: Math.random() * 100000000000000,
        title: titleTag.value,
        description: descTag.value,
        date: `${month} ${day}, ${year}`,
        userId : userInformation.userId
      };

 

      notes.push(noteInfo); // adding new note to notes
      localStorage.setItem("notes", JSON.stringify(notes)); // saving data in local storage
      isUpdate = false;
      console.log("after insert ", isUpdate);
      titleTag.value = "";
      descTag.value = "";
      showNotes(notes);
      popupBox.classList.remove("show");
    } else {
      console.log("please fill it out");
    }
  }
});
