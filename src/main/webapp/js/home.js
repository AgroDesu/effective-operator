window.onload = function() {
    // Run login.js
    updateNavBar();
    // Applies focus to the username input when modal is shown
    $('#loginModal').on('shown.bs.modal', function () {
        $('#user').focus();
    });
    // Sets up Form Modal
    $('#formModal').on('shown.bs.modal', function (e) {
        // Extract form ID from button
        let eid = e.relatedTarget.id;
        id = eid.slice(3);
        $('#formModalLabel').html('Form #'+id);
        // Get the form requested from forms array
        let f = forms.find(element => element.id == id);
        successfulTable(f);
        let userFormButtons = `
        <button type="button" class="btn btn-secondary" id="gf_${id}" disabled>Submit Grade</button>
        <button type="button" class="btn btn-danger" id="xf_${id}">Cancel Request</button>`;
        let actionableFormButtons = `
        <button type="button" class="btn btn-success" id="af_${id}">Accept</button>
        <button type="button" class="btn btn-danger" id="rf_${id}">Reject</button>
        <button type="button" class="btn btn-primary" id="cf_${id}">Request Comment</button>`;
        // When form is made by user
        if (eid.startsWith('v')) {
            $('#form-modal-footer').html(userFormButtons);
            let approvalStatus = f.approvals[f.approvals.length - 1].status;
            // When grade is needed
            if (approvalStatus == "BenCo") {
                // Enable button and give it functionality
                $('#gf_'+id).removeAttr('disabled').removeClass('btn-secondary').addClass('btn-primary');
                $('#gf_'+id).click(function(){
                    // Switch modals
                    $('#formModal').modal('hide');
                    $('#miniFormModalLabel').html('Submit Your Grade');
                    let miniformbody = ``;
                    // Set body of modal based on Grading Format
                    switch(f.gradingformat.id) {
                        case 1: // Pass/fail
                            miniformbody = `
                            <form id="gradeform" class="form">
                                <select name="grade" id="grade" class="form-control" required>
                                    <option value="">Select one</option>
                                    <option value="PASS">Pass</option>
                                    <option value="FAIL">Fail</option>
                                </select>
                                <br>
                                <button type="submit" class="btn btn-warning btn-block" id="grade_${id}">Submit</button>
                            </form>
                            `;
                            break;
                        case 2: // Letter Grade
                            miniformbody = `
                            <form id="gradeform" class="form">
                                <select name="grade" id="grade" class="form-control" required>
                                    <option value="">Select a Letter Grade</option>
                                    <option value="A">A</option>
                                    <option value="B">B</option>
                                    <option value="C">C</option>
                                    <option value="D">D</option>
                                    <option value="F">F</option>
                                </select>
                                <br>
                                <button type="submit" class="btn btn-warning btn-block" id="grade_${id}">Submit</button>
                            </form>
                            `;
                            break;
                        case 3: // Presentation
                            miniformbody = `Just click the Submit button when you've given your presentation~
                            <form id="gradeform" class="form">
                                <input type="hidden" name="grade" id="grade" value="PRESENTATION"><br>
                                <button type="submit" class="btn btn-warning btn-block" id="grade_${id}">Submit</button>
                            </form>`;
                            break;
                        case 4: // Score
                            miniformbody = `
                            <form id="gradeform" class="form">
                                <input type="number" name="grade" id="grade" class="form-control" max="100" min="0" placeholder="Score between 0 and 100" required>
                                <br>
                                <button type="submit" class="btn btn-warning btn-block" id="grade_${id}">Submit</button>
                            </form>`;
                            break;
                        default:
                            miniformbody = `Sorry! There was a problem loading the form.`;
                            break;
                    }
                    $('#mini-form-modal-body').html(miniformbody);
                    $('#miniFormModal').modal('show');
                    // Give functionality to Grade Form
                    $('#gradeform').submit(function(event) {
                        event.preventDefault();
                        $('#miniFormModal').modal('hide');
                        $('#main-container').html(loadingTemplate);
                        let grade = $('#grade').val();
                        $.ajax({"url": "forms/"+id, "method":"PUT", "data": 'type=grade&grade='+grade})
                            .done(loadRequestManager)
                            .fail(function() { $('#main-container').html(errorTemplate); });
                    });
                });
            }
            console.log(approvalStatus);
            // Remove buttons when form is at rest
            if (approvalStatus != "Approved" && approvalStatus != "Rejected" && approvalStatus != "Cancelled") {
                // Add in Cancel button functionality
                $('#xf_'+id).click(function(){
                    $('#formModal').modal('hide');
                    $('#main-container').html(loadingTemplate);
                    $.ajax({"url": "forms/"+id, "method": "DELETE"})
                        .done(loadRequestManager)
                        .fail(function() { $('#main-container').html(errorTemplate); });
                });
            } else {
                if (approvalStatus == "Rejected") {
                    $('#tableForm').append(`<tr><th>Reason for Rejection</th><td colspan="3">${f.reason}</td></tr>`);
                }
                $('#form-modal-footer').html("");  
            }
        }
        // When form is actionable
        if (eid.startsWith('n')) {
            // Set up actionable buttons
            $('#form-modal-footer').html(actionableFormButtons);
            $('#cf_'+id).click(function(){
                $('#formModal').modal('hide');
                $('.partymode--container').show();
            });
            $('#af_'+id).click(function(){
                $('#formModal').modal('hide');
                $('#main-container').html(loadingTemplate);
                // AJAX PUT request for accepting
                $.ajax({"url": "forms/"+id, "method":"PUT", "data": 'type=accept'})
                    .done(loadRequestManager)
                    .fail(function() { $('#main-container').html(errorTemplate); });
            });
            $('#rf_'+id).click(function(){
                // Switch modals
                $('#formModal').modal('hide');
                // Set up modal
                $('#miniFormModalLabel').html('Submit Reason For Rejection');
                let miniformbody = `
                <form id="rejectform" class="form">
                    <input type="text" name="reason" id="reason" class="form-control" placeholder="Reason for rejection" required>
                    <br>
                    <button type="submit" class="btn btn-warning btn-block" id="reject_${id}">Submit</button>
                </form>`;
                $('#mini-form-modal-body').html(miniformbody);
                $('#miniFormModal').modal('show');
                // Give functionality to rejection form
                $('#rejectform').submit(function(event) {
                    event.preventDefault();
                    $('#miniFormModal').modal('hide');
                    $('#main-container').html(loadingTemplate);
                    let reason = $('#reason').val();
                    // AJAX DELETE request
                    $.ajax({"url": "forms/"+id, "method":"PUT", "data": 'type=reject&reason='+reason})
                        .done(loadRequestManager)
                        .fail(function() { $('#main-container').html(errorTemplate); });
                });
            });
        }
    });
};

// Month name array for formatting
m_names = new Array("Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec");
// Holds all loaded forms
forms = [];

// Templates to hotswap between "pages"
let loadingTemplate = `
<h1>Loading...</h1>
<h6><img src="img/loading.gif"></h6>
`;
let errorTemplate = `
<h1>Something went wrong!</h1>
<p>There was an error loading the requested information. Please try again or 
inform the administrator about this issue.</p>
`;
let employeeProfileBody = `
<thead></thead>
<tbody>
    <tr>
        <td rowspan="6" id="epPhoto"></td>
        <th>Name</th>
        <td id="epName"></td>
    </tr>
    <tr>
        <th>Title</th>
        <td id="epTitle"></td>
    </tr>
    <tr>
        <th>Department</th>
        <td id="epDepartment"></td>
    </tr>
    <tr>
        <th>Date of Birth</th>
        <td id="epDOB"></td>
    </tr>
    <tr>
        <th>Supervisor</th>
        <td id="epSupervisor"></td>
    </tr>
    <tr>
        <th>Allowance</th>
        <td id="epBalance"></td>
    </tr>
</tbody>
`;
let tableFormBody = `
<thead></thead>
<tbody>
    <tr>
        <th width="25%">Event Type</th>
        <td width="25%" id="tableEventType"></td>
        <th width="25%">Event Date</th>
        <td width="25%" id="tableEventDate"></td>
    </tr>
    <tr>
        <th>Grading Format</th>
        <td id="tableGradingFormat"></td>
        <th>Request Date</th>
        <td id="tableSubmissionDate"></td>
    </tr>
    <tr>
        <th colspan="2">Grade Submitted</th>
        <td colspan="2" id="tableGrade" class="text-center"></td>
    </tr>
    <tr>
        <th>Location</th>
        <td colspan="3" id="tableLocation"></td>
    </tr>
    <tr>
        <th colspan="4">Description</th>
    </tr>
    <tr>
        <td colspan="4" id="tableDesc"></td>
    </tr>
    <tr>
        <th>Event Cost</th>
        <td id="tableCost"></td>
        <th>Reimbursement</th>
        <td id="tableReimbursement"></td>
    </tr>
</tbody>
`;
let reimbursementFormTemplate = `
<h1>Reimbursement Form</h1>
<form action="" method="post" id="reimbursementform">
    <div class="form-group">
        <label for="eventdate">Start Date: </label>
        <input type="date" name="eventdate" id="eventdate" class="form-control" data-provide="datepicker" required>
    </div>
    <div class="form-row">
        <div class="form-group col-md-6">
            <label for="eventtype">Event: </label>
            <select name="eventtype" id="eventtype" class="form-control" required>
                <option value="">Choose Event Type</option>
            </select>
        </div>
        <div class="form-group col-md-6">
            <label for="eventtype">Grading Format: </label>
            <select name="gradingformat" id="gradingformat" class="form-control" required>
                <option value="">Choose Grading Format</option>
            </select>
        </div>
    </div>
    <div class="form-group">
        <label for="location">Location: </label>
        <input type="text" name="location" id="location" class="form-control" required>
    </div>
    <div class="form-group">
        <label for="description">Description: </label>
        <textarea name="description" id="description" class="form-control" required></textarea>
    </div>
    <div class="form-group">
        <label for="eventcost">Event Cost: </label>
        <input type="number" max="999999" min="1" name="eventcost" id="eventcost" class="form-control" required>
        <big id="eventcostHelpBlock" class="form-text">
            Projected Reimbursement: n/a
        </big>
    </div>
    <button id="submitform" type="submit" class="btn btn-warning btn-block">Submit Request</button>
</form>
`;
let requestManagerTemplate = `
<h1>Reimbursement Request Manager</h1>
<h3>Your Reimbursement Requests</h3>
<div class="table-responsive">
<table id="managerTable" class="table table-sm table-striped table-light text-center">
    <thead class="thead-light">
        <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr id="loadingRow">
            <td colspan="6" class="text-center"><img src="img/loading.gif"></td>
        </tr>
    </tbody>
</table>
</div>
<h3>Actionable Requests</h3>
<div class="table-responsive">
<table id="managerActionableTable" class="table table-sm table-striped table-light text-center">
    <thead class="thead-light">
        <tr>
            <th>Type</th>
            <th>Amount</th>
            <th>Location</th>
            <th>Date</th>
            <th>Status</th>
            <th></th>
        </tr>
    </thead>
    <tbody>
        <tr id="loadingActionableRow">
            <td colspan="6" class="text-center"><img src="img/loading.gif"></td>
        </tr>
    </tbody>
</table>
</div>
`;

function loadRequestManager() {
    // Change navlink button
    $('#navlinks').html(requestButtonTemplate);
    $('#requestbtn').click(loadReimbursementForm);
    $('#main-container').html(requestManagerTemplate);
    forms = [];
    // jQuery AJAX GET request for forms
    $.getJSON(baseURL+"forms")
        .done(displayRequestTable)
        .fail(function(){
            $('#loadingRow td').html("It looks like you haven't submit any forms yet!<br>" +
            "Click the [New Request] button in the navbar to make one.")
        });
    // jQuery AJAX GET request for actionable forms
    $.getJSON(baseURL+"forms/actionable")
        .done(displayActionableRequestTable)
        .fail(function(){
            $('#loadingActionableRow td').html("There's nothing you need to approve at the moment!")
        });

    function displayRequestTable(data) {
        $('#loadingRow').remove();
        let table = $('#managerTable');
        addRowsToTable(data, table);
    }

    function displayActionableRequestTable(data) {
        $('#loadingActionableRow').remove();
        let table = $('#managerActionableTable');
        addRowsToTable(data, table);
    }

    function addRowsToTable(data, table) {
        // Add data to main forms array
        forms = forms.concat(data);
        // Loop through forms to extract data for tables
        for(let form of data) {
            let tr = document.createElement('tr');
            let td = document.createElement('td');
            // Type
            td.innerHTML = form.eventtype.name;
            tr.appendChild(td);
            // Amount
            td = document.createElement('td');
            td.innerHTML = Math.round(Number(form.eventcost) * Number(form.eventtype.percentage) / 100) + ` <img src="img/lmd.png" title="Credits" alt="credits" class="credits">`;
            tr.appendChild(td);
            // Location
            td = document.createElement('td');
            td.innerHTML = form.eventlocation;
            tr.appendChild(td);
            // Date
            td = document.createElement('td');
            let date = new Date(form.eventdate);
            td.innerHTML = m_names[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear();
            tr.appendChild(td);
            // Status
            td = document.createElement('td');
            let status = form.approvals[form.approvals.length - 1].status;
            switch (status) {
                case "Submitted":
                    status = "Submitted (Awaiting Supervisor Approval)";
                    break;
                case "Supervisor":
                    status = "Submitted (Awaiting Department Head Approval)";
                    break;
                case "Department Head":
                    status = "Submitted (Awaiting BenCo Approval)";
                    break;
                case "BenCo":
                    status = "Approved (Needs Grade)";
                    break;
                case "Graded":
                    status = "Grade Submitted (Awaiting Final Approval)"
                    break;

            }
            td.innerHTML = status;
            tr.appendChild(td);
            // Options
            td = document.createElement('td');
            // Different button id formats for user and actionable forms
            if (table[0].id == "managerActionableTable")
                td.innerHTML = `<button type="button" data-toggle="modal" data-target="#formModal" class="btn btn-primary btn-sm" id="nf_${form.id}">View</button>`;
            if (table[0].id == "managerTable")
                td.innerHTML = `<button type="button" data-toggle="modal" data-target="#formModal" class="btn btn-primary btn-sm" id="vf_${form.id}">View</button>`;
            tr.appendChild(td);

            table.append(tr);
        }
    }
}

function loadReimbursementForm() {
    // Change navlink button
    $('#navlinks').html(managerButtonTemplate);
    $('#managerbtn').click(loadRequestManager);
    // Show loading template
    $('#main-container').html(loadingTemplate);
    // JS AJAX GET request for event types dropdown
    let xhttp = new XMLHttpRequest();
    xhttp.onreadystatechange = addEventTypes;
    xhttp.open('GET', baseURL + 'eventtypes');
    xhttp.send();
    
    function addEventTypes() {
        if (xhttp.readyState === 4 && xhttp.status === 200) {
            // Event types needed were found; show form
            $('#main-container').html(reimbursementFormTemplate);

            let eventtypes = JSON.parse(xhttp.responseText);
            for (let eventtype of eventtypes) {
                // Create option, set text and value, then append to dropdown
                let option = document.createElement('option');
                option.text = eventtype.name;
                option.value = eventtype.id;
                option.setAttribute('data-percentage', eventtype.percentage);
                // let eventSelect = document.getElementById('eventtype');
                // eventSelect.appendChild(option);
                $('#eventtype').append(option);
            }

            $('#eventcost').keyup(updateProjected);
            $('#eventtype').change(updateProjected);

            // JS AJAX GET request for grading format dropdown
            let xhttp2 = new XMLHttpRequest();
            xhttp2.onreadystatechange = addGradingFormats;
            xhttp2.open('GET', baseURL + 'gradingformats');
            xhttp2.send();

            function addGradingFormats() {
                if (xhttp2.readyState === 4 && xhttp2.status === 200) {
                    let gradingformats = JSON.parse(xhttp2.responseText);
                    for (let gradingformat of gradingformats) {
                        // Create option, set text and value, then append to dropdown
                        let option = document.createElement('option');
                        option.text = gradingformat.name;
                        option.value = gradingformat.id;
                        option.setAttribute('data-percentage', eventtype.percentage);
                        $('#gradingformat').append(option);
                    }

                    $('#reimbursementform').submit(function(event) {
                        event.preventDefault();
                        $.post(baseURL+'forms', $(this).serialize())
                        .done(loadRequestManager)
                        .fail(function(){
                            // Form submission failed
                            $('#main-container').html(errorTemplate);
                        });
                    });
                } else if (xhttp2.readyState === 4) {
                    $('#main-container').html(errorTemplate);
                }
            }
        } else if (xhttp.readyState === 4) {
            $('#main-container').html(errorTemplate);
        }
    }
}

function successfulTable(data) {
    // Update Profile Table
    $('#employeeprofile').html(employeeProfileBody);
    let photoTemplate = `<img src="img/photo/${data.employee.username}.png" alt="${data.employee.fullname}">`;
    $('#epPhoto').html(photoTemplate);
    $('#epName').html(data.employee.fullname);
    $('#epTitle').html(data.employee.title);
    $('#epBalance').html(data.employee.balance + ` <img src="img/lmd.png" title="Credits" alt="credits" class="credits">`);
    $('#epDepartment').html(data.employee.department.name);
    // Format the DOB date
    let date = new Date(data.employee.dob);
    $('#epDOB').html(m_names[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
    // Show Supervisor name if one exists
    if(data.employee.supervisor != null)
        $('#epSupervisor').html(data.employee.supervisor.fullname);
    else 
        $('#epSupervisor').html("");
    // Update Form Table
    $('#tableForm').html(tableFormBody);
    date = new Date(data.submissiondate);
    $('#tableSubmissionDate').html(m_names[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
    date = new Date(data.eventdate);
    $('#tableEventDate').html(m_names[date.getMonth()] + " " + date.getDate() + ", " + date.getFullYear());
    $('#tableEventType').html(data.eventtype.name);
    $('#tableGradingFormat').html(data.gradingformat.name);
    $('#tableGrade').html(data.grade);
    $('#tableLocation').html(data.eventlocation);
    $('#tableDesc').html(data.eventdesc);
    $('#tableCost').html(data.eventcost + ` <img src="img/lmd.png" title="Credits" alt="credits" class="credits">`);
    $('#tableReimbursement').html(Math.round(Number(data.eventcost) * Number(data.eventtype.percentage) / 100) + ` <img src="img/lmd.png" title="Credits" alt="credits" class="credits">`);
}

function updateProjected () {
    // Update projected reimbursement on cost and event type change
    let cost = $('#eventcost').val();
    let percentage = $("#eventtype option:selected")[0].getAttribute('data-percentage');
    let projected = 0;
    let helptext = "Projected Reimbursement: ";
    // Check if neccessary info to generate projected reimbursement is set
    if (cost > 0 && percentage) {
        projected = Math.round(cost * percentage / 100);
        helptext += "" + projected + `<img src="img/lmd.png" title="Credits" alt="credits" class="credits">`;
    } else {
        helptext += "n/a";
    }
    $('#eventcostHelpBlock').html(helptext);
}