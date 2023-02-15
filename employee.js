$(document).ready(function () {
  showEmployeesData();
  forPagination()
  $("#file-input").change(function () {
    let file = $(this)[0].files[0];
    let reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onload = function () {
      $("#image-preview").attr("src", this.result);
    };
  });
  $("#add-skill-item").click(function (e) {
    e.preventDefault();
    var newItem = $("#skill").val();
    $("#skill-list ul").append("<li>" + newItem + " <button class='delete-button'>delete</button></li>");
    $("#skill").val("");
  });
  $("#skill-list").on("click", ".delete-button", function () {
    $(this).parent().remove();
  });
  $("#data-table").on("click", ".btn-edit", function () {
    const id = parseInt($(this).attr("id").split("_")[1]);

    const employee = getEmployeeById(id);
    $("#firstname").val(employee.firstname);
    $("#lastname").val(employee.lastname);
    $("#mail").val(employee.mail);
    $('input[name="gender"]:checked').val(employee.gender);
    $("#dob").val(employee.dob);
    $("#skill").val(employee.skill);
    $("#joiningdate").val(employee.joiningdate);
    $("#designation").val(employee.designation);
    $("#description").val(employee.description);
    $("#hidId").val(id);
    $("#save").text("Update");
    $("#exampleModal").modal("show");
  });
  $("#save").click(function () {
    if ($("#hidId").val() == '') {
      const employeesData = getEmployeeRecord();
      addEmployee(employeesData);
    }
    else {
      updateEmployeeDataFromForm();
    }
    clear_Form();
  });
  $(document).on("click", ".btn-delete", function () {
    const id = parseInt($(this).attr("id").split("_")[1]);
    openConfirmDialog("Delete Employee", "Are you sure you want to delete employee?", id, deleteEmployee);
  });
  $("#mysearch").on("keyup", function () {
    var value = $(this).val().toLowerCase();
    $("#tbl-employees tr").filter(function () {
      $(this).toggle($(this).text().toLowerCase().indexOf(value) > -1);
    });
  });
  $(".btn-expand").click(function () {
    $(this).closest("tr").next(".hidden").toggle();
  })
  function forPagination() {
    const employees = sortedData();
    $('#pagination').pagination({
      dataSource: employees,
      pageSize: 5,
      callback: function (data, pagination) {
        showEmployeesData(data)
      }
    })
  }
  function sortedData() {
    let data = getAllEmployees();
    data.sort((a, b) => (a.firstname.toLowerCase() > b.firstname.toLowerCase()) ? 1 : -1);
    return data;
  }
});
function clear_Form() {

  $("#firstname").val();
  $("#lastname").val();
  $("#mail").val();
  $("input[name='gender']:checked").val();
  $("#designation").val();
  $("#dob").val();
  $("#skill").val();
  $("#joiningdate").val();
  $("#description").val();
  $("#description").val();
};
function getEmployeeRecord() {
  const employeeData = {
    firstname: $("#firstname").val(),
    lastname: $("#lastname").val(),
    mail: $("#mail").val(),
    gender: $("input[name='gender']:checked").val(),
    designation: $("#designation").val(),
    dob: $("#dob").val(),
    skill: $("#skill").val(),
    joiningdate: $("#joiningdate").val(),
    description: $("#description").val(),
  };
  return employeeData;
}
function showEmployeesData(data = null) {
  const employees = data || getAllEmployees();
  $("#tbl-employees").empty();
  employees.forEach(element => {
    const html = create_Row(element);
    $("#tbl-employees").append(html);
  });
}
function create_Row(element) {
  let html = "";
  html += "<tr>";
  html += "<td>";
  html += `<a id="btnExpand` + `" class= 'btn btn-expand'><i class="fa-solid fa-square-plus"></i></a>`;
  html = html + "<td class= 'firstname' hidId=, 'lastname'>" + element.firstname + " " + element.lastname + "</td>";
  html += "<td>" + element.mail + "</td>";
  html += "<td>" + element.designation + "</td>";
  html += "<td>" + element.gender + "</td>";
  html += "<td>";
  html += `<a id="btnEdit_` + element.id + `" class= 'btn btn-edit' id= 'edit-icon'><i class="fas fa-edit" id="edit-icon"></i></a>`;
  html += `<a id="btnDelete_` + element.id + `" class= 'btn btn-delete' id='delete-icon'><i class="fas fa-trash-alt" ></i></a>`;
  html += "</td>";
  html += "</tr>";
  html += "<tr class='hidden' id='row1'>";
  html += "<td>" + "</td>";
  html += "<td <b> DOB: </b>" + element.dob + "</td>";
  html += "<td <b> Joining Date: </b>" + element.joiningdate + "</td>";
  html += "<td <b> Skills: </b>" + element.skill + "</td>";
  html += "</tr>";
  return html;
}
function editEmployeeById(id) {
  const record = getEmployeeById(id);
  $("#firstname").val(record.firstname);
  $("#lasttname").val(record.lastname);
  $("#mail").val(record.mail);
  $("input[name='gender']:checked").val(record.gender);
  $("#dob").val(record.dob);
  $("#joiningdate").val(record.joiningdate);
  $("#designation").val(record.designation);
  $("#skill").val(record.skill);
  $("#description").val(record.description);
  return record;
}
function deleteEmployee(id) {
  deleteEmployeeById(id);
  showEmployeesData();
  showSuccessMessage("Employee has been deleted successfully");
}
function updateEmployeeDataFromForm() {
  const employeesData = getAllEmployees();
  const oldEmploeesDetails = employeesData.find(x => x.id == $("#hidId").val());
  oldEmploeesDetails.firstname = $("#firstname").val();
  oldEmploeesDetails.lastname = $("#lastname").val();
  oldEmploeesDetails.mail = $("#mail").val();
  oldEmploeesDetails.gender = $("input[name='gender']:checked").val();
  oldEmploeesDetails.dob = $("#dob").val();
  oldEmploeesDetails.skill = $("#skill").val();
  oldEmploeesDetails.joiningdate = $("#joiningdate").val();
  oldEmploeesDetails.designation = $("#designation").val();
  oldEmploeesDetails.description = $("#description").val();
  add(employeesData);
}


