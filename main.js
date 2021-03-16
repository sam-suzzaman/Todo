// it will display all the tasks
showTask()

// grab the input field
let input = document.querySelector('input')

// grab the add item button
let addItemBtn = document.querySelector('.submit')

// adding eventListener to the addItemBtn
addItemBtn.addEventListener('click', function () {
    // storing the value that give into input field
    let inputValue = input.value

    // to prevent of creating empty task
    if (inputValue.trim() != 0) {
        // grab the saved data that are stored in localstorage(browser)
        let localStorageValue = localStorage.getItem("task")

        // when its value become null it will create an empty array
        if (localStorageValue == null) {
            toDoStore = []
        } else {
            // else localStorageValue will be parse into JSON object and stored into the array
            toDoStore = JSON.parse(localStorageValue)
        }
        // now push/insert the input value into this localStorage array
        toDoStore.push(inputValue)

        // save the value to localStorage
        localStorage.setItem("task", JSON.stringify(toDoStore))
        // to remove the previous input text value after adding them form input field
        input.value = ''
    }

    showTask()
})

// creating the showTask function
function showTask() {

    // grab the saved data that are stored in localstorage(browser)
    let localStorageValue = localStorage.getItem("task")

    // when its value become null it will create an empty array
    if (localStorageValue == null) {
        toDoStore = []
    } else {
        // else localStorageValue will be parse into JSON object and stored into the array
        toDoStore = JSON.parse(localStorageValue)
    }

    // creating an empty string
    let myTask = ''
    let itemWrapper = document.querySelector('.item-wrapper')

    // traversing the toDo array
    toDoStore.forEach((taskName, index) => {
        myTask += `<div class="item">
                        <h4 class="left-text"><span class="nmbr">${index+1}.</span> ${taskName}</h4>
                        <div class="right-icon-wrapper">
                            <a href="#" class="complete item-icon" onclick="complete(${index})" data-tooltip='complete'>
                                <i class="fa fa-check" aria-hidden="true"></i>
                            </a>
                            <a href="#" class="edit item-icon" onclick="edit(${index})" data-tooltip='edit'>
                                <i class="fa fa-pencil-square-o" aria-hidden="true"></i>
                            </a>
                            <a href="#" class="delete item-icon" onclick="deleteFun(${index})" data-tooltip='delete'>
                                <i class="fa fa-times-circle-o" aria-hidden="true"></i>
                            </a>
                        </div>
                    </div>`
    });

    // insert myTask into item-wrapper
    itemWrapper.innerHTML = myTask

}

// complete function
function complete(index) {
    let leftText = document.querySelectorAll('h4')
    console.log(leftText)
    leftText[index].classList.toggle('cmplt')
}

// edit function
function edit(index) {
    // controll which button will show on click edit option
    let add = document.querySelector('.add')
    add.style.display = 'none'
    let save = document.querySelector('.save')
    save.style.display = 'block'

    // grab the localstorage data
    let localStrgData = localStorage.getItem("task")
    // convert the localStorage object value into string
    let toDoStore = JSON.parse(localStrgData)
    // assigning the todo value into input field  again
    input.value = toDoStore[index]


    // grab the hidden input and pass the index value on it
    let IndexValue = document.querySelector('.transferindex')
    IndexValue.value = index
}

// access the save button
let saveBtn = document.querySelector('.save')
saveBtn.addEventListener('click', saveFun)

// creating saveFun
function saveFun() {

    // grab the hidden input and access the value
    let clkBtnIndex = document.querySelector('.transferindex').value

    // grab the saved data that are stored in localstorage(browser) after edit
    let localStorageValue = localStorage.getItem("task")
    // localStorageValue will be parse into JSON object and stored into the array
    toDoStore = JSON.parse(localStorageValue)

    // now assign the new edited value into the array
    toDoStore[clkBtnIndex] = input.value

    // now to set the modified array into localstorage
    localStorage.setItem("task", JSON.stringify(toDoStore))

    // after save just toggle the button again
    let add = document.querySelector('.add')
    add.style.display = 'block'
    let save = document.querySelector('.save')
    save.style.display = 'none'

    // need to set the hidden input value to empty
    clkBtnIndex.value = ''
    // to add the edit item in the list just call the showTask function
    showTask()
    input.value = ''

}

// creating delete function
function deleteFun(index) {

    // grab the saved data that are stored in localstorage(browser) after edit
    let localStorageValue = localStorage.getItem("task")
    // localStorageValue will be parse into JSON object and stored into the array
    toDoStore = JSON.parse(localStorageValue)

    // remove the task
    toDoStore.splice(index, 1)

    // now to set the modified array into localstorage
    localStorage.setItem("task", JSON.stringify(toDoStore))

    showTask()
}

// creating detlete all items
let clrAll = document.querySelector('.clear-btn')
clrAll.addEventListener('click', deleteAll)

function deleteAll() {
    // grab the saved data that are stored in localstorage(browser) after edit
    let localStorageValue = localStorage.getItem("task")
    // localStorageValue will be parse into JSON object and stored into the array
    toDoStore = JSON.parse(localStorageValue)

    // it just remove all the items and convert into empty array
    toDoStore = []

    // now to set the modified array into localstorage
    localStorage.setItem("task", JSON.stringify(toDoStore))

    // after clicking the clear all button save button will not display
    let add = document.querySelector('.add')
    add.style.display = 'block'
    let save = document.querySelector('.save')
    save.style.display = 'none'

    showTask()
}