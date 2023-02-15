$(document).ready(function () {
    $("#save").click(function () {
        var firstname = $("#firstname").val();
        if (firstname === "") {
            alert("firstname is required");
            return false;
        } else if (!/^[a-zA-Z]+$/.test(firstname)) {
            alert("firstname can only contain alphabets");
            return false;
        }
        var mail = $("#mail").val();
        if (mail === "") {
            alert("Email is required");
            return false;
        } else if (!/^[a-zA-Z0-9._%+-]+@gmail\.com$/.test(mail)) {
            alert("Email should be in the format of a Gmail address (e.g., example@gmail.com)");
            return false;
        }
        var gender = $("input[name='gender']:checked").val();
        if (!gender) {
            alert("Gender is required");
            return false;
        }
        var dob = $("#dob").val();
        if (dob === "") {
            alert("DOB is required");
            return false;
        }
        else {
            var today = new Date();
            var birthDate = new Date(dob);
            var age = today.getFullYear() - birthDate.getFullYear();
            if (age < 18 || age > 65) {
                alert("Employee age should be between 18 todemo video.webm 65 years old");
                return false;
            }
        }
        var joiningdate = $("#joiningdate").val();
        if (joiningdate === "") {
            alert("Date of Joining is required");
            return false;
        }
        var designation = $("#designation").val();
        if (designation === "inputdes") {
            alert("Select your current working role");
            return false;
        }
    });
});


















































