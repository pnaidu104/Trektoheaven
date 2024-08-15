$(document).ready(function () {
    // Scroll and button logic
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
            $('.sliding-nav').addClass('show'); // Add show class when scrolling down
        } else {
            $('.scrollToTop').fadeOut();
            $('.sliding-nav').removeClass('show'); // Remove show class when scrolling up
        }
    });

    // Click event to scroll to the top
    $('.scrollToTop').click(function () {
        $('html, body').animate({
            scrollTop: 0
        }, 800);
        return false;
    });

    // Form submission handling
    $('#contactForm').submit(function (event) {
        event.preventDefault(); // Prevent the default form submission
        var isValid = true; // Flag to track form validity

        // Clear previous error messages
        $('.error').text('');

        // Validate each field
        if ($('#fname').val().trim() === '') {
            $('#fname-error').text('First name is required.');
            isValid = false;
        }
        if ($('#lname').val().trim() === '') {
            $('#lname-error').text('Last name is required.');
            isValid = false;
        }
        if ($('#email').val().trim() === '') {
            $('#email-error').text('Email is required.');
            isValid = false;
        }
        if ($('#country').val().trim() === '') {
            $('#country-error').text('Country is required.');
            isValid = false;
        }
        if ($('#continent').val() === '') {
            $('#continent-error').text('Continent selection is required.');
            isValid = false;
        }
        if ($('#subject').val().trim() === '') {
            $('#subject-error').text('Subject is required.');
            isValid = false;
        }

        // Validate contact number if provided
        var contactNumber = $('#contactNumber').val().trim();
        if (contactNumber !== '' && !/^\+?[0-9\s\-()]{7,15}$/.test(contactNumber)) {
            $('#contactNumber-error').text('Please enter a valid contact number.');
            isValid = false;
        }

        // If the form is valid, redirect to thank you page
        if (isValid) {
            window.location.href = "thankyou.html";
        }
    });
});
