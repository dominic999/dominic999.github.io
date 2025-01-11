document.addEventListener("DOMContentLoaded", () => {
    const dropdownButton = document.getElementById("toggle-dropdown");
    const dropdownMenu = document.getElementById("dropdown-menu");
    const menuItems = document.getElementById("menu-items");
    const addItemButton = document.getElementById("add-item");
    const newItemInput = document.getElementById("new-item");

    dropdownButton.addEventListener("click", () => {
        dropdownMenu.style.display = dropdownMenu.style.display === "block" ? "none" : "block";
    });

    addItemButton.addEventListener("click", () => {
        const newItemText = newItemInput.value.trim();
        if (newItemText === "") {
            alert("Introdu un text valid!");
            return;
        }

        const listItem = document.createElement("li");
        listItem.textContent = newItemText;

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Șterge";
        deleteButton.addEventListener("click", () => {
            listItem.remove();
        });

        listItem.appendChild(deleteButton);
        menuItems.appendChild(listItem);
        newItemInput.value = "";
    });
});

document.addEventListener("DOMContentLoaded", () => {
    if (window.location.pathname.includes("muzica.html")) {
        const toggleButton = document.getElementById("toggle-banner");
        const banner = document.getElementById("banner");

        toggleButton.addEventListener("click", () => {
            if (banner.style.display === "none" || banner.style.display === "") {
                banner.style.display = "block";
            } else {
                banner.style.display = "none"; 
            }
        });

        const randomizeBanner = () => {
            const randomTop = Math.floor(Math.random() * (window.innerHeight - 100));
            const randomLeft = Math.floor(Math.random() * (window.innerWidth - 200));
            const randomColor = `#${Math.floor(Math.random() * 16777215).toString(16)}`;

            banner.style.position = "absolute";
            banner.style.top = `${randomTop}px`;
            banner.style.left = `${randomLeft}px`;
            banner.style.backgroundColor = randomColor;

            localStorage.setItem("bannerTop", randomTop);
            localStorage.setItem("bannerLeft", randomLeft);
            localStorage.setItem("bannerColor", randomColor);
        };

        const savedTop = localStorage.getItem("bannerTop");
        const savedLeft = localStorage.getItem("bannerLeft");
        const savedColor = localStorage.getItem("bannerColor");

        if (savedTop && savedLeft && savedColor) {
            banner.style.position = "absolute";
            banner.style.top = `${savedTop}px`;
            banner.style.left = `${savedLeft}px`;
            banner.style.backgroundColor = savedColor;
        }

        setInterval(() => {
            if (banner.style.display === "block") {
                randomizeBanner();
            }
        }, 2000);
    }
});

document.addEventListener("DOMContentLoaded", () => {
    const form = document.getElementById("contact-form");
    const emailInput = document.getElementById("email");
    const passwordInput = document.getElementById("password");
    const message = document.getElementById("form-message");
    const protectedSection = document.getElementById("protected-section");

    form.addEventListener("submit", (e) => {
        e.preventDefault();

        console.log("Formularul a fost trimis!"); 

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; 
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; 

        if (!emailRegex.test(emailInput.value)) {
            console.log("Email invalid:", emailInput.value); 
            message.textContent = "Email invalid!";
            return;
        }

        if (!passwordRegex.test(passwordInput.value)) {
            console.log("Parolă invalidă:", passwordInput.value); 
            message.textContent = "Parola trebuie să conțină minim 8 caractere, o literă mare și o cifră!";
            return;
        }
        const users = JSON.parse(localStorage.getItem("users")) || [];


        console.log("Utilizatori salvați în localStorage:", users); 

        const user = users.find(
            (user) => user.email === emailInput.value && user.password === passwordInput.value
        );

        if (!user) {
            console.log("Utilizatorul nu a fost găsit:", emailInput.value); 
            message.textContent = "Email sau parolă incorectă!";
            return;
        }

        console.log("Utilizator validat cu succes:", user); 

        message.style.color = "green";
        message.textContent = "Datele au fost validate cu succes!";
        setTimeout(() => {
            message.textContent = ""; 
        }, 3000);


        form.reset();

        protectedSection.classList.remove("hidden");
        console.log("Display style al secțiunii protejate:", window.getComputedStyle(protectedSection).display);

        console.log("Secțiunea protejată a fost afișată."); 
    });
});

document.addEventListener("DOMContentLoaded", () => {
    const showStylesButton = document.getElementById("show-styles");
    const stylesOutput = document.getElementById("styles-output");
    const title = document.querySelector("h1");
    console.log(title);

    showStylesButton.addEventListener("click", () => {
        const computedStyles = window.getComputedStyle(title);
        stylesOutput.textContent = `Culoare: ${computedStyles.color}, Font: ${computedStyles.fontFamily}, Dimensiune font: ${computedStyles.fontSize}`;
        console.log("Stilurile titlului:", computedStyles);
    });
});
    