/*global $, window, document */

$(document).ready(function () {
    'use strict';

    var contactNumber,
        enteredCountry,
        validCountrySelected = false,
        countriesList = []; // To store the list of valid countries

    // Scroll and button logic
    $(window).scroll(function () {
        if ($(this).scrollTop() > 100) {
            $('.scrollToTop').fadeIn();
            $('.sliding-nav').addClass('show');
        } else {
            $('.scrollToTop').fadeOut();
            $('.sliding-nav').removeClass('show');
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
        event.preventDefault(); // Prevent form submission

        var isValid = true;
        contactNumber = $('#contactNumber').val().trim();
        enteredCountry = $('#country').val().trim().toLowerCase(); // Convert to lowercase for comparison

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
        if ($('#subject').val().trim() === '') {
            $('#subject-error').text('Subject is required.');
            isValid = false;
        }

        // Validate contact number if provided
        if (contactNumber !== '' && !/^\+?[0-9\s\-()]{7,15}$/.test(contactNumber)) {
            $('#contactNumber-error').text('Please enter a valid contact number.');
            isValid = false;
        }

        // Check if entered country matches a valid country in the list
        if (!validCountrySelected || !countriesList.some(function (country) {
            return country.toLowerCase() === enteredCountry;
        })) {
            // Check for case-insensitive match with countriesList
            if (countriesList.some(function (country) {
                return country.toLowerCase() === enteredCountry;
            })) {
                validCountrySelected = true;
            } else {
                $('#country-error').text('Please select a valid country from the list.');
                isValid = false;
            }
        }

        // If form is valid, redirect to thank you page
        if (isValid) {
            window.location.href = "thankyou.html";
        }
    });

    // Fetch countries from the Restcountries API
    $.getJSON('https://restcountries.com/v3.1/all')
        .done(function (data) {
            var countries = data.map(function (country) {
                return {
                    label: country.name.common,
                    value: country.cca2.toLowerCase() // Use country code as value
                };
            });

            // Store country names in countriesList
            countriesList = countries.map(function (country) {
                return country.label;
            });

            // Initialize Autocomplete
            $('#country').autocomplete({
                source: function (request, response) {
                    var filteredCountries = $.ui.autocomplete.filter(countries, request.term);
                    response(filteredCountries);
                },
                select: function (event, ui) {
                    // Set the selected value in the input
                    $(this).val(ui.item.label);
                    validCountrySelected = true; // Mark valid country selected
                    $('#country-code').val(ui.item.value); // Set hidden field with country code
                    return false;
                }
            });

        })
        .fail(function () {
            $('#country').val('Unable to load country list');
        });

    // Reset validCountrySelected when user types in the country field
    $('#country').on('input', function () {
        validCountrySelected = false;
    });
});
