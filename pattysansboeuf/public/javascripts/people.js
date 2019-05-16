//people is GLOBAL Map variable declared in main.js

function addPerson(name){
    //Ensure we dont get key clash
    if (!people.has(name)){
        //Do the actual adding
        people.set(name, {})
    }
    else
    {
        //TODO: ALERT USER THIS ALREADY EXISTS
        console.warn("person already exists");
    }
}

function removePerson(name){
    people.delete(name);
}