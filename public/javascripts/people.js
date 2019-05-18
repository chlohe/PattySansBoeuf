//people is GLOBAL Map variable declared in main.js

function addPerson(name){
    //Escape spaces and dodgy shit
    name = encodeURIComponent(name);
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
    name = encodeURIComponent(name);
    people.delete(name);
}

function refreshPeopleTable(){
    $('#pTable').html( `
        <tr> 
            ${Array.from(people).sort().map(p => 
                `<tr id='person-${p[0]}'><td> ${decodeURIComponent(p[0])} </td>
                <td class='table-options'> <a id='remove-${p[0]}' class='rmp-button'> [remove] </a> </td></tr>`
            )};
        </tr>
    `);
    $('.rmp-button').click(e => {
        removePerson(e.target.id.substring(7));
        refreshPeopleTable();
    });
}