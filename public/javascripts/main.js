//Use a map in case we want to attach metadata to these things later on
const relations = new Map();
const people = new Map();
const relationTypes = new Map();

$(document).ready(() => {
    //Populate relationTypes
    relationTypes.set('hates', 'hates');
    relationTypes.set('dates', 'is dating');
    relationTypes.set('ex', 'used to date');

    $('#rField').html(`
        ${Array.from(relationTypes).map(r => `<option value='${r[0]}'> ${r[1]} </option>`)}
    `);

    //Adding people button   
    $('#btnAddPerson').click(e => {
        e.preventDefault();
        const nameField =  $('#nameField');
        const personName = nameField.val();
        //Check if empty
        if(personName == ""){
            return;
        }
        //Append to our map
        addPerson(personName);
        //Reset the field
        nameField.val("");
        //Populate table
        $('#pTable').html( `
            <tr> 
                ${Array.from(people).sort().map(p => `<tr id='person-${p[0]}'><td> ${p[0]} </td></tr>`)}
            </tr>
        `);
        //Populate combobox options
        $('#xField').html(`
            ${Array.from(people).sort().map(p => `<option value=${p[0]}> ${p[0]} </option>`)}
        `)
        $('#xField').val('');
    });
    
    //Adding relations button
    $('#btnAddRelation').click(e => {
        e.preventDefault();
        //Fetch the necessary vals
        const x = $('#xField').val();
        const y = $('#yField').val();
        const name = $('#rField').val();
        //Check for empty values
        if(x == null || y == null || name == null){
            return;
        }
        //Append to our map
        addRelation(name, x, y);
        //Populate table
        $('#rTable').html( `
            <tr> 
                ${Array.from(relations).sort().map(r => `<tr id='relation-${r[0]}'><td> ${r[1].x} </td> <td> ${relationTypes.get(r[1].name)} </td> <td> ${r[1].y} </td></tr>`)}
            </tr>
        `);
    });

    //On Change X
    $('#xField').on('change', function (e) {
        const optionSelected = $("option:selected", this);
        const valueSelected = this.value;
        //Populate other field with everything BUT our option
        $('#yField').html(`
            ${Array.from(people).filter(p => p[0] != valueSelected).sort().map(p => `<option value=${p[0]}> ${p[0]} </option>`)}
        `)
    });

    //Solve button
    $('#btnSolve').click(e => {
        e.preventDefault();
        solveRelations();
    })

})