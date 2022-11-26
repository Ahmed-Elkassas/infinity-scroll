const imageContainer = document.querySelector('.img--container')

// Unsplash API
const count = 30;   
const ACCESS_KEY = "nBUpEnnXky2qJJmP5on8bo3ciMYnOxF9cdBvd3A-GQo"
const apiURL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}` 

let photosArray = []

function displayImages() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        item.setAttribute('href', photo.links.html);
        item.setAttribute('target', '_blank')
        
        // img 
        const image = document.createElement('img');
        image.setAttribute("src", photo.urls.regular);
        if(!photo.description) {
            image.setAttribute('alt' , "Please go to the website");
            image.setAttribute('title' , "Please go to the website")
        } else {
            image.setAttribute('alt' , photo.description);
            image.setAttribute('title' , photo.description)
        }
        
        // Add to UI
        item.appendChild(image);
        imageContainer.appendChild(item)
    })
}

// Get photos from Unsplash API
async function fetchPhotos() {
    try {
        const response = await fetch(apiURL);
        photosArray = await response.json();
        displayImages() 
    } catch (error) {
        alert(error)
    }
}

fetchPhotos()