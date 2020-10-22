var email_regex = /^[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9-]+(?:\.[a-zA-Z0-9-]+)*$/;
var lowercase_regex = /[a-z]/;
var uppercase_regex = /[A-Z]/;
var special_characters_regex = /[^A-Za-z0-9\s]/;
var number_regex = /[1-9]/;
var whitespace_regex = /\s+/;

var existing_usernames = ['Pranav5956', 'AbhinavBalaji'];
var existing_emails = ['pranavbalaji01@gmail.com', 'abhi07055']

// Utility function
$.fn.replaceClass = function(existing_classes, new_classes) {
    return $(this).removeClass(existing_classes).addClass(new_classes);
};

jQuery(function() {
    // Toggle Password visibility
    $("#togglePasswordVisibility").on("click", function() {
        if ($("#inputPassword").attr("type") == "text") {
            $("#inputPassword").attr("type", "password");
            $(this).children('span').replaceClass("fa-eye text-primary", "fa-eye-slash");
        } else {
            $("#inputPassword").attr("type", "text");
            $(this).children('span').replaceClass("fa-eye-slash", "fa-eye text-primary");
        }
    });

    // Toggle Confirm-Password visibility
    $("#toggleConfirmPasswordVisibility").on("click", function() {
        if ($("#inputConfirmPassword").attr("type") == "text") {
            $("#inputConfirmPassword").attr("type", "password");
            $(this).children('span').replaceClass("fa-eye text-primary", "fa-eye-slash");
        } else {
            $("#inputConfirmPassword").attr("type", "text");
            $(this).children('span').replaceClass("fa-eye-slash", "fa-eye text-primary");
        }
    });

    // Toggling the submit button
    $("#agree").on("click", function() {
        if ($(this).prop("checked") == true)
            $("[type='submit']").prop("disabled", false).removeClass("btn-secondary").addClass("btn-primary");
        else
            $("[type='submit']").prop("disabled", true).removeClass("btn-primary").addClass("btn-secondary");
    });

    // Password strength
    $("#inputPassword").on("keyup", function() {
        update_password_policy($("#passwordPolicyLowerCase"), lowercase_regex.test($(this).val()));
        update_password_policy($("#passwordPolicyUpperCase"), uppercase_regex.test($(this).val()));
        update_password_policy($("#passwordPolicySpecialCharacter"), special_characters_regex.test($(this).val()));
        update_password_policy($("#passwordPolicyNumber"), number_regex.test($(this).val()));
        update_password_policy($("#passwordPolicyLength"), $(this).val().length >= 6 && $(this).val().length <= 20);
    });

    // Username validation
    $("#inputUsername").on('change', function() {
        $('#usernameValidityInfo').replaceClass("text-success text-danger d-none", "text-primary")
        .children('span.validation-icon').replaceClass("fa fa-check fa-times", "spinner-border spinner-border-sm").next().text('Validating');
        setTimeout(function(username) {
            if (username == "") {
                $('#usernameValidityInfo').replaceClass("text-primary text-success text-danger", "d-none")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-check fa-times fa", "").next().text('');
            } else if (whitespace_regex.test(username) || special_characters_regex.test(username)) {
                $('#usernameValidityInfo').replaceClass("text-primary text-success d-none", "text-danger")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-check", "fa fa-times").next().text('Invalid Username');
            } else if (existing_usernames.includes(username)) {
                $('#usernameValidityInfo').replaceClass("text-primary text-success d-none", "text-danger")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-check", "fa fa-times").next().text('Username exists');
            } else {
                $('#usernameValidityInfo').replaceClass("text-primary text-danger d-none", "text-success")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-times", "fa fa-check").next().text('Valid Username');
            }
        }, ($(this).val() != "") * 800, $(this).val());
    });

    // Email validation
    $("#inputEmail").on('change', function() {
        $('#emailValidityInfo').replaceClass("text-success text-danger d-none", "text-primary")
        .children('span.validation-icon').replaceClass("fa fa-check fa-times", "spinner-border spinner-border-sm").next().text('Validating');
        setTimeout(function(email) {
            if (email == "") {
                $('#emailValidityInfo').replaceClass("text-primary text-success text-danger", "d-none")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-check fa-times fa", "").next().text('');
            } else if (!email_regex.test(email)) {
                $('#emailValidityInfo').replaceClass("text-primary text-success d-none", "text-danger")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-check", "fa fa-times").next().text('Invalid Email-ID');
            } else if (existing_emails.includes(email)) {
                $('#emailValidityInfo').replaceClass("text-primary text-success d-none", "text-danger")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-check", "fa fa-times").next().text('Email-ID exists');
            } else {
                $('#emailValidityInfo').replaceClass("text-primary text-danger d-none", "text-success")
                .children('span.validation-icon').replaceClass("spinner-border spinner-border-sm fa-times", "fa fa-check").next().text('Valid Email-ID');
            }
        }, ($(this).val() != "") * 800, $(this).val());
    });

    // Confirm Password validation
    $("#inputConfirmPassword").on("change", function() {
        if ($(this).val() != $("#inputPassword").val()) {
            $("#confirmPasswordMatching").removeClass("d-none");
        } else {
            $("#confirmPasswordMatching").addClass("d-none");
        }
    });
});

function update_password_policy(policy, result) {
    if (result) {
        policy.replaceClass("text-danger", "text-success");
        policy.children('span').replaceClass("fa-times", "fa-check");
    } else {
        policy.replaceClass("text-success", "text-danger");
        policy.children('span').replaceClass("fa-check", "fa-times");
    }
}