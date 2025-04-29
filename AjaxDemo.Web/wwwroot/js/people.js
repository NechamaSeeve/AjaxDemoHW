$(() => {

    const addModal = new bootstrap.Modal($('#add-modal')[0]);
    const editModal = new bootstrap.Modal($('#edit-modal')[0]);

    const refreshPeople = (cb) => {
        $("tbody tr:gt(0)").remove();
        $("#spinner-row").show();
        $.get('/home/getpeople', function (people) {
            $("#spinner-row").hide();
            people.forEach(person => {
                $("tbody").append(`<tr>
                <input type='hidden' id='id' name='id' value='${person.id}' />
                <td>${person.firstName}</td>
                <td>${person.lastName}</td>
                <td>${person.age}</td>
                <td> <button class="btn btn-primary" id="edit-person">Edit</button></td>
                <td> <button class="btn btn-warning" id="delete-person">Delete</button></td>
                </tr>`);
            })
            if (cb) {
                cb();
            }
        });

    }

    $("#show-add").on('click', function () {
        $("#firstName").val('');
        $("#lastName").val('');
        $("#age").val('');
        addModal.show();
    })
    $(".table").on('click','#edit-person', function () {
        const editButton = $(this);
        const tr = editButton.closest('tr');
        const id = tr.find("#id").val();
        $("#id").val(id);
 
        const firstName = tr.find('td:eq(0)').text();
        const lastName = tr.find('td:eq(1)').text();
        const age = tr.find('td:eq(2)').text();
        $('#EFirstName').val(firstName);
        $("#ELastName").val(lastName);
        $("#EAge").val(age);
       
        editModal.show();

    });
    
    $("#update-person").on('click', function () {
        const id = $("#id").val();
        const firstName = $("#EFirstName").val();
        const lastName = $("#ELastName").val();
        const age = $("#EAge").val();
        $.post('/home/updateperson', {
            id,
            firstName,
            lastName,
            age
        }, function () {
            refreshPeople();
            editModal.hide();

        });
    })
    $(".table").on('click', '#delete-person', function () {
        const deleteButton = $(this);
        const tr = deleteButton.closest('tr');
        const id = tr.find('#id').val();
        console.log(id);
        $.post('/home/delete', {
           id
        }, function () {
            refreshPeople();
        });
    });

    $("#save-person").on('click', function () {
        const firstName = $("#firstName").val();
        const lastName = $("#lastName").val();
        const age = $("#age").val();

        $.post('/home/addperson', {
            firstName,
            lastName,
            age
        }, function () {
            refreshPeople();
            addModal.hide();

        });

    })
    


        refreshPeople();
    })