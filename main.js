// select the input value
let theInput = document.getElementById("inputItem");

//---------------------------------------------Check local storage and Add new items-----------------------------------------------------------------

// This for check local storage and insert array in it then take tha data from it and show it to user

if (localStorage.getItem("New Items") === null) {
    localStorage.setItem("New Items", JSON.stringify([]));
}

// here i take the data form localstorage and put it in araay have objects

let arr = JSON.parse(localStorage.getItem("New Items"))


// Add new task
let AddTask = document.getElementById("Add-btn");
AddTask.addEventListener("click", AddItem)

function AddItem() {
    if (theInput.value !== "") {
        let obj = {
            id: Math.random().toString(),
            title: theInput.value,
            body: ""
        }
        // get data from user an pudh it in the array in local storage
        arr.push(obj);
        localStorage.setItem("New Items", JSON.stringify(arr));

        theInput.value = "";

        show();
    } else {
        alert("You must add the name of the task")
    }
}
function show() {
    var empty = "";  // this var for clear the old elements of araay when add new element
    for (let i = 0; i < arr.length; i++) {
        empty = empty + `<div class="row each-task mx-auto my-3" id="${arr[i].id}">
        <div class="col-5 title">
        <p>${arr[i].title}</p>
        <input type = "text" value = "${arr[i].title}" class="titleTask showInput editTask">
            <p>${arr[i].body}</p>
        </div>
        <div class="col-7 d-flex justify-content-center align-items-center">
            <div class="buttons">
                <span class="Complete-Item btn-secondary p-3 rounded-2">Complete</span>
                <span class="Update-Item btn-secondary p-3 rounded-2">Update</span>
                <span class="Delete-Item btn-secondary p-3 rounded-2">Delete</span>
            </div>
        </div>
    </div>`

    }


    // select the div that have the space to add the item with the style
    let theTask = document.getElementById("newTask");
    theTask.innerHTML = empty;
}

show();


//-------------------------------------------Delete Item In Active Tasks--------------------------------------------------------------------------------


// for delete default todo
let removeBtn = document.querySelectorAll(".Delete-Item")


removeBtn.forEach(btn => {
    btn.addEventListener("click", removTheRow);
})
function removTheRow(e) {

    let item = e.target.parentElement.parentElement.parentElement;//this line to select the element that i want to remove it

    let itemID = item.id;// this line to select the id of element to compare it with filter to get the object from araay
    item.remove();

    let newArr = arr.filter((el) => {
        return el.id != itemID;
        /* this function retuen true while loop is find the id of item until check id and don't find it return false
        so i get new array have items except the id i was select to remove */
    })
    localStorage.setItem("New Items", JSON.stringify(newArr))// put the new array to local storage

}


//------------------------------------------ Update Task ---------------------------------------------------------------------------


let editBtn = document.querySelectorAll(".Update-Item")
let inputEdit = document.querySelectorAll(".editTask");

editBtn.forEach(btn => {
    btn.addEventListener("click", edit)
})

function edit(el) {
    let eleID = el.target.parentElement.parentElement.parentElement.id;
    let ele = el.target.parentElement.parentElement.parentElement.firstElementChild.firstElementChild;
    ele.classList.toggle("showInput")
    let ele2 = el.target.parentElement.parentElement.parentElement.firstElementChild;
    let ele3 = ele2.getElementsByTagName("input")[0];
    ele3.classList.toggle("showInput")


    let search = arr.find((ell) => {
        return ell.id === eleID
    })

    if (search.id) {
        inputEdit.forEach(input => {
            input.addEventListener("keypress", x)
        })
        function x(ev) {
            if (ev.key === "Enter") {
                let objEdit = {
                    id: eleID,
                    title: ele3.value,
                    body: ""
                }
                ele.classList.toggle("showInput").search
                ele3.classList.toggle("showInput").search

            }

        }
    }





}

//------------------------------------------Completed Tasks ---------------------------------------------------------------------------------

// This for check local storage and insert array in it then take tha data from it and show it to user

if (localStorage.getItem("Complete Items") === null) {
    localStorage.setItem("Complete Items", JSON.stringify([]));
}

// here i take the data form localstorage and put it in araay have objects
let arrCompelet = JSON.parse(localStorage.getItem("Complete Items"));

let compeletBtn = document.querySelectorAll(".Complete-Item")

compeletBtn.forEach(btn => {
    btn.addEventListener("click", compelte);
})

function compelte(el) {
    let item = el.target.parentElement.parentElement.parentElement;//this line to select the element that i want to get it

    let itemID = item.id;// this line to select the id of element to compare it to filter or find to get the object from array

    let findItem = arr.find((el) => {
        return el.id === itemID;
    })
    arrCompelet.push(findItem);
    localStorage.setItem("Complete Items", JSON.stringify(arrCompelet));
    showCompelet(); // this function to add the item for the web and show it to user

    // next select the item and put it to the new array i removed it from the old array
    item.remove();
    let newArr = arr.filter((el) => {
        return el.id != itemID;
    })
    localStorage.setItem("New Items", JSON.stringify(newArr))
}

function showCompelet() {
    var empty = "";  // this var for clear the old elements of araay when add new element
    for (let i = 0; i < arrCompelet.length; i++) {
        empty = empty + `<div class="row each-task mx-auto my-3" id="${arrCompelet[i].id}">
        <div class="col-5">
            <p>${arrCompelet[i].title}</p>
            <p>${arrCompelet[i].body}</p>
        </div>
        <div class="col-7 d-flex justify-content-center align-items-center">
        <div class="buttons">
        <span class="NotComplete-Item btn-secondary p-3 rounded-2">Not Complete</span>
        <span class="NotCompDelete-Item btn-secondary p-3 rounded-2">Delete</span>
    </div>
        </div>
    </div>`

    }
    // select the div that have the space to add the item with the style
    let compTask = document.getElementById("compeletTask");
    compTask.innerHTML = empty;
}
showCompelet();


//------------------------------------------- Buttons in Compeleted tasks--------------------------------------------------------


// ----------- Not Completed Button--------
let NotcompeletBtn = document.querySelectorAll(".NotComplete-Item");


NotcompeletBtn.forEach(btn => {
    btn.addEventListener("click", NotCompelet)
})

function NotCompelet(el) {
    let selectItem = el.target.parentElement.parentElement.parentElement;
    let selectItemID = selectItem.id;

    let FindNotCompeletIteam = arrCompelet.find((ev) => {
        return ev.id === selectItemID;
    })
    arr.push(FindNotCompeletIteam)
    localStorage.setItem("New Items", JSON.stringify(arr));
    show();


    selectItem.remove();

    let deletItem = arrCompelet.filter((el) => {
        return el.id !== selectItemID;
    })
    localStorage.setItem("Compelet Items", JSON.stringify(deletItem))

}




//--------------Delete Item From Compelet task----------------------------

let deletNotCompItem = document.querySelectorAll(".NotCompDelete-Item")

deletNotCompItem.forEach(btn => {
    btn.addEventListener("click", DeleteNotCompeletItem)
})

function DeleteNotCompeletItem(el) {
    let DeleteComp = el.target.parentElement.parentElement.parentElement
    let DeleteCompID = DeleteComp.id
    DeleteComp.remove()
    let deleteCompItem = arrCompelet.filter((el) => {
        return el.id !== DeleteCompID;
    })
    localStorage.setItem("Complete Items", JSON.stringify(deleteCompItem))
}





