let btn = document.getElementById("btn");
let myTitle = document.getElementById("title");
let myDescription = document.getElementById("input");
let displayNotesArea = document.getElementById("displayNotesArea");
let deleteBtn = document.getElementById("deleteBtn");
let TotalNotesCount = document.getElementById("totalNotes");

DisplayNotes();
CountNotes();

function AddNotes() {
  let NewTitle = myTitle.value;
  let NewDescrip = myDescription.value;
  if (NewTitle.length > 0 && NewDescrip.length > 0) {
    let res = localStorage.getItem("notes");
    let Arrobj = JSON.parse(res);
    Arrobj.push({
      Title: NewTitle,
      Description: NewDescrip,
    });
    let strNotes = JSON.stringify(Arrobj);
    localStorage.setItem("notes", strNotes);
  } else {
    alert("Fill in the Title and Description Box");
  }
  CountNotes();
  DisplayNotes();
  myDescription.value = "";
  myTitle.value = "";
}

btn.addEventListener("click", AddNotes)

function CountNotes() {
    let res = localStorage.getItem("notes");
    let Arrobj = JSON.parse(res);
    let totalNotes = Arrobj.length;
    TotalNotesCount.innerText = totalNotes;
}

function DisplayNotes() {
  newNote = [];
  localSt = localStorage.getItem("notes");
  if (localSt === null) {
    localStorage.setItem("notes", JSON.stringify(newNote));
  } else {
    let res = localStorage.getItem("notes");
    let Arrobj = JSON.parse(res);
    localStorage.setItem("notes", JSON.stringify(Arrobj));
    let Notes = "";
    for (let i = 0; i < Arrobj.length; i++) {
      Notes += `
        <div class="NewNote">
        <p>${Arrobj[i].Title}</p>
        <p>${Arrobj[i].Description}</p>

        <button id="deleteBtn" onclick="DeleteNotes(${i})">
          <ion-icon name="trash"></ion-icon>
        </button>
      </div>`;
    }
    displayNotesArea.innerHTML = Notes;
  }
}

function DeleteNotes(index) {
    let res = localStorage.getItem("notes");
    let Arrobj = JSON.parse(res);

    Arrobj.splice(index,1)

    localStorage.setItem("notes", JSON.stringify(Arrobj))

    DisplayNotes();
    CountNotes();
}

function clearAllNotes() {
    let res = localStorage.getItem("notes");
    let Arrobj = JSON.parse(res);

    localStorage.setItem("notes", JSON.stringify([]))
    DisplayNotes();
    CountNotes();
}
