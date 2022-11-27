const imageContainer = document.querySelector('.img--container')
const loader = document.querySelector('.loader')

// Unsplash API
let count = 5;   
const ACCESS_KEY = "nBUpEnnXky2qJJmP5on8bo3ciMYnOxF9cdBvd3A-GQo"
let apiURL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}&orientation=landscape` 

function putAttributes(element, attributes) {
    for(const key in attributes) {
        element.setAttribute(key, attributes[key])
    }
}

let ready = false;
let loadedImages = 0;
let totalImages = 0;
let photosArray = []

function onLoadImage() {
    loadedImages++
    if(loadedImages === totalImages) {
        loader.hidden = true;
        ready = true;
        count = 30;
        apiURL = `https://api.unsplash.com/photos/random?client_id=${ACCESS_KEY}&count=${count}&orientation=landscape` 
    }
}

function displayImages() {
    loadedImages = 0
    totalImages = photosArray.length;
    photosArray.forEach((photo) => {
        const item = document.createElement('a');
        putAttributes(item, {
            href: photo.links.html, 
            target: "_blank"
        })  
        // img 
        const image = document.createElement('img');
        putAttributes(image, {
            src: photo.urls.regular,
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
        image.addEventListener('load', onLoadImage)
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

window.addEventListener("scroll", () => {
    if(window.innerHeight + window.scrollY >= document.body.offsetHeight - 1000 && ready) {
        ready = false
        fetchPhotos();
    }
})

fetchPhotos()