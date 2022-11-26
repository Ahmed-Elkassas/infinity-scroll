
// Unsplash API
const count = 30;   
const ACCESS_KEY = "nBUpEnnXky2qJJmP5on8bo3ciMYnOxF9cdBvd3A-GQo"
const apiURL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}` 

let photosArray = []

// Get photos from Unsplash API

async function fetchPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        console.log(photosArray)
    } catch (error) {
        alert(error)
    }
}

fetchPhotos()