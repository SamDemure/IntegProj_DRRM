// map - java
var tomtomApiKey = "JQ0sZtj1g1aTrCaICb2nbprLZgPMRP99";
var evacuationCenterName = "DRRM";

function initializeMap() {
    console.log('Initializing map...');
    // Initialize the map with your API key
    map = tt.map({
        key: tomtomApiKey,
        container: 'map',
        style: 'tomtom://vector/1/basic-main',
        center: [13.5616, 123.1406], // Default center coordinates
        zoom: 10
    });
}

async function fetchDataFromBackend(barangays, userLocation) {
    try {
        const response = await fetch(`/api/routing-service?barangays=${barangays.join(',')}&userLocation=${userLocation}`);
        if (!response.ok) {
            throw new Error(`Error: ${response.status} - ${response.statusText}`);
        }
        return response.json();
    } catch (error) {
        console.error('Error fetching data from the backend API:', error.message);
        throw error; // Re-throw the error for higher-level handling
    }
}

function updateMapWithEvacuationCenters(data) {
    // Implement your logic to update the map with evacuation centers
    // For example, you can add markers to the map based on the data
    // ...

    // For demonstration purposes, I'll add a simple log
    console.log('Updating map with evacuation centers:', data);

    // Add your logic here to update the map based on the data
}

function formatPopupContent(barangay, estimatedTime) {
    return `
        <div>
            <h3>${barangay} Evacuation Center</h3>
            <p>Estimated time to get there: ${estimatedTime} minutes</p>
            <button onclick="initiateNavigation('${barangay}')">Initiate Navigation</button>
            <p>Contact MDRRMO</p>
        </div>
    `;
}

function initiateNavigation(barangay) {
    // Implement navigation logic here
    console.log(`Initiating navigation to ${barangay}`);
    // You may use TomTom's navigation API or other methods to initiate navigation
}

async function showEvacuationCenters(barangays, userLocation) {
    try {
        const data = await fetchDataFromBackend(barangays, userLocation);
        updateMapWithEvacuationCenters(data);
    } catch (error) {
        console.error('Error in showEvacuationCenters:', error.message);
    }
}

function attachButtonClickEvent() {
    const barangayButtons = document.querySelectorAll('.mapbuttons');
    barangayButtons.forEach(button => {
        button.addEventListener('click', async () => {
            const barangay = button.dataset.barangay;

            // Use Geolocation API to get the user's location dynamically
            navigator.geolocation.getCurrentPosition(position => {
                const userLocation = [position.coords.longitude, position.coords.latitude];

                // Fetch dynamic data including the estimated time
                fetchDataFromBackend([barangay], userLocation)
                    .then(data => {
                        const evacuationCenter = data[0];
                        const { coordinates, estimatedTime } = evacuationCenter;
                        const popupContent = formatPopupContent(barangay, estimatedTime);

                        // Add a marker for the evacuation center with an updated popup
                        const popup = new tt.Popup({ offset: 35 }).setHTML(popupContent);
                        new tt.Marker({
                            position: coordinates,
                            draggable: false
                        }).setPopup(popup)
                            .addTo(map);

                        // Update the map with evacuation centers based on the received data
                        updateMapWithEvacuationCenters(data);
                    })
                    .catch(error => {
                        console.error('Error fetching data from the backend API:', error.message);
                    });
            });
        });
    });
}

// Add an event listener for when the window is loaded
window.addEventListener('load', () => {
    // Initialize map
    initializeMap();
    // Attach click event listeners to barangay buttons
    attachButtonClickEvent();

    // Show evacuation centers for default barangays (optional)
    showEvacuationCenters(['Bonifacio', 'Lupi'], '');
});
