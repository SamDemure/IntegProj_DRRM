document.addEventListener("DOMContentLoaded", function () {
    var mapButtons = document.querySelectorAll('.mapbuttons');
    var resultContainers = document.querySelectorAll('.result-container');

    mapButtons.forEach(function (button) {
        button.addEventListener('click', function () {
            var barangay = button.textContent.trim().toLowerCase();
            hideAllResultContainers();
            showResultContainer(barangay);
        });
    });

    function hideAllResultContainers() {
        resultContainers.forEach(function (container) {
            container.classList.remove('slide-in');
            container.classList.add('slide-out');
        });
    }

    function showResultContainer(barangay) {
        var resultContainer = document.getElementById('result-' + barangay.replace(/\s+/g, ''));
        if (resultContainer) {
            resultContainer.classList.remove('slide-out');
            resultContainer.classList.add('slide-in');
        }
    }
    
    // Hide all result containers by default
    hideAllResultContainers();
});
