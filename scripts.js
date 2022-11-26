const imageContainer = document.querySelector('.img--container')

// Unsplash API
const count = 30;   
const ACCESS_KEY = "nBUpEnnXky2qJJmP5on8bo3ciMYnOxF9cdBvd3A-GQo"
const apiURL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}` 

function putAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

let photosArray = []

function displayImages() {
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        putAttributes(item, {
            href: photo.links.html, 
            target: "_blank"
        })  
        // img 
        const image = document.createElement('img');
        putAttributes(image, {
            src: photo.urls.regular
        })
        if(!photo.description) {
            putAttributes(image, {
                alt: "Please go to the website",
                title: "Please click on Image"
            })
        } else {
            putAttributes(image, {
                alt: photo.description, 
                title: photo.description
            })
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