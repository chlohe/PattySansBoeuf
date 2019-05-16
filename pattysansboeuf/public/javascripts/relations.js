//relations is GLOBAL Map variable declared in main.js

function addRelation(name, x, y){
    //Ensure we dont get key clash
    var key = x+name+y;
    if (!relations.has(key)){
        //Do the actual adding
        relations.set(key, {
            name: name,
            x: x,
            y: y
        })
    }
    else
    {
        //TODO: ALERT USER THIS ALREADY EXISTS
        console.warn("relation already exists");
    }
}

function removeRelation(key){
    relations.delete(key);
}

function solveRelations(){
    var relArray = Array.from(relations).map(x => x[1]);
    var payload = JSON.stringify(relArray);
    //Clear the table
    $('#iTable').html('');
    //Send the problem 
    $.post( "/solve", payload, function( data ) {
        displayResults(JSON.parse(data));    
    });
}

function displayResults(data){
    var results = new Map();
    //Parse the results a wee bit
    Object.keys(data).forEach(function(key) {
        results.set(key, data[key] ? "Invite" : "Nah");
    });
    //Populate table
    $('#iTable').html( `
        <tr> 
            ${Array.from(results).sort().map(r => `<tr id='invitation-${r[0]}'><td> ${r[0]} </td> <td> ${r[1]} </td> </tr>`)}
        </tr>
    `);
}