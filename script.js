document.addEventListener("DOMContentLoaded", () => {
    const loadingScreen = document.getElementById("loading-screen");
    const mainContent = document.getElementById("main-content");
    const currentLocation = document.getElementById("current-location");
    const arrowDown = document.getElementById("arrow-down");
    const locationPopup = document.getElementById("location-popup");
    const closePopupBtn = document.getElementById("close-popup-btn");
    const saveLocationBtn = document.getElementById("save-location-btn");
    const locationInput = document.getElementById("location-input");

    const sliderWrapper = document.querySelector(".slider-wrapper");
    const indicators = document.querySelectorAll(".slider-indicator");

    const GOOGLE_API_KEY = "AIzaSyC_GvKA4NfGVIKSYhLLQ11e3FjC6HvIDp4"; // Reemplaza con tu clave de API

    // Simulate a loading time (2.5 seconds)
    setTimeout(() => {
        loadingScreen.style.display = "none";
        mainContent.style.display = "block";
    }, 2500);

    // Get current location using Geolocation API
    if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
            async (position) => {
                const { latitude, longitude } = position.coords;
                console.log("Coordenadas obtenidas:", { latitude, longitude }); // Verifica las coordenadas
                const address = await getAddressFromCoordinates(latitude, longitude);
                if (address) {
                    currentLocation.textContent = address;
                } else {
                    currentLocation.textContent = "No se pudo obtener la dirección.";
                }
            },
            (error) => {
                console.error("Error al obtener la ubicación:", error.message);
                currentLocation.textContent = "Permiso de ubicación denegado.";
            }
        );
    } else {
        currentLocation.textContent = "Geolocalización no soportada.";
    }

    // Function to get address from coordinates using Google Maps API
    async function getAddressFromCoordinates(lat, lng) {
        const url = `https://maps.googleapis.com/maps/api/geocode/json?latlng=${lat},${lng}&key=${GOOGLE_API_KEY}`;
        console.log("URL de la API:", url); // Verifica la URL generada
        try {
            const response = await fetch(url);
            const data = await response.json();
            console.log("Respuesta de la API:", data); // Verifica la respuesta de la API
            if (data.status === "OK") {
                return data.results[0].formatted_address; // Dirección obtenida
            } else {
                console.error("Error de Geocoding API:", data.status);
                return null;
            }
        } catch (error) {
            console.error("Error al llamar a la API de Geocoding:", error);
            return null;
        }
    }

    // Show popup for manual location change
    arrowDown.addEventListener("click", () => {
        locationPopup.style.display = "flex"; // Show the popup
    });

    // Close the popup
    closePopupBtn.addEventListener("click", () => {
        locationPopup.style.display = "none"; // Hide the popup
    });

    // Save the new location
    saveLocationBtn.addEventListener("click", () => {
        const newLocation = locationInput.value.trim();
        if (newLocation) {
            currentLocation.textContent = newLocation;
            locationPopup.style.display = "none"; // Hide the popup
        } else {
            alert("Por favor ingresa una ubicación.");
        }
    });


    let currentIndex = 0;
    const totalSlides = indicators.length;

    function updateSliderPosition() {
        sliderWrapper.style.transform = `translateX(-${currentIndex * 100}%)`;
        indicators.forEach((indicator, index) => {
            indicator.classList.toggle("active", index === currentIndex);
        });
    }

    function startSlider() {
        setInterval(() => {
            currentIndex = (currentIndex + 1) % totalSlides;
            updateSliderPosition();
        }, 7000); // Cambia cada 3 segundos
    }

    startSlider();

    const smallImageItems = document.querySelectorAll(".small-image-item");
    const categoryPopup = document.getElementById("category-popup");
    const popupTitle = document.getElementById("popup-title");
    const popupBody = document.getElementById("popup-body");
    const closeCategoryPopupBtn = document.getElementById("close-category-popup-btn");

    // Diccionario con el contenido de cada categoría
    const contentMap = {
        "alimentos-y-bebidas": {
            title: "Alimentos y Bebidas",
            body: `
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Cardamomo</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Harina de almendra</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Té pu-erh chino</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Cacao al 100%</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Queso gouda añejo</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">cervezas importadas</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Mangostán</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
            `
        },
        "tecnologia-y-electronica": {
            title: "Tecnología y Electrónica",
            body: `
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Sensores para proyectos de robótica</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Fundas para dispositivos menos populares</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">cables de consolas retro</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Cartuchos de impresoras descontinuadas</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
            `
        },
        "hogar-y-decoracion": {
            title: "Hogar y Decoración",
            body: `
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Mesas hechas de madera reciclada</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Lámparas retro</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">lino importado</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
            `
        },
        "moda-y-accesorios": {
            title: "Moda y Accesorios",
            body: `
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Zapatos o ropa de diseño único</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">cinturones con diseños exclusivos</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">piedras preciosas únicas</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
            `
        },
        "salud-y-belleza": {
            title: "Salud y Belleza",
            body: `
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Productos dermatológicos especializados</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Maquillaje libre de crueldad animal</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Suplementos alimenticios especializados</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
            `
        },
        "mascotas": {
            title: "Mascotas",
            body: `
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">Comidas premium o de prescripción veterinaria</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
                <div class="card">
                    <img src="https://via.placeholder.com/80" alt="Producto" class="card-image">
                    <div class="card-content">
                        <h3 class="card-title">juguetes interactivos importados</h3>
                    </div>
                    <button class="card-button">Buscar</button>
                </div>
            `
        }
    };

    // Mostrar el popup con el contenido dinámico
    smallImageItems.forEach((item) => {
        item.addEventListener("click", (event) => {
            event.preventDefault(); // Prevenir cualquier comportamiento por defecto
            const categoryUrl = item.getAttribute("data-url");
            const content = contentMap[categoryUrl];
            if (content) {
                popupTitle.textContent = content.title;
                popupBody.innerHTML = content.body;
                categoryPopup.style.display = "flex"; // Mostrar el popup
            }
        });
    });

    // Cerrar el popup
    closeCategoryPopupBtn.addEventListener("click", () => {
        categoryPopup.style.display = "none"; // Ocultar el popup
    });
});
