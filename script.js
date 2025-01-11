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

        console.log("Formularul a fost trimis!"); // Mesaj pentru a verifica trimiterea formularului

        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/; // Validare email
        const passwordRegex = /^(?=.*[A-Z])(?=.*\d).{8,}$/; // Parola: 1 literă mare, 1 cifră, minim 8 caractere

        // Validare email
        if (!emailRegex.test(emailInput.value)) {
            console.log("Email invalid:", emailInput.value); // Afișează emailul invalid
            message.textContent = "Email invalid!";
            return;
        }

        // Validare parolă
        if (!passwordRegex.test(passwordInput.value)) {
            console.log("Parolă invalidă:", passwordInput.value); // Afișează parola invalidă
            message.textContent = "Parola trebuie să conțină minim 8 caractere, o literă mare și o cifră!";
            return;
        }

        // Verificare utilizator în localStorage
        const users = JSON.parse(localStorage.getItem("users")) || [];
        console.log("Utilizatori salvați în localStorage:", users); // Afișează lista de utilizatori

        const user = users.find(
            (user) => user.email === emailInput.value && user.password === passwordInput.value
        );

        if (!user) {
            console.log("Utilizatorul nu a fost găsit:", emailInput.value); // Mesaj pentru utilizator inexistent
            message.textContent = "Email sau parolă incorectă!";
            return;
        }

        console.log("Utilizator validat cu succes:", user); // Mesaj pentru utilizator valid

        // Mesaj de succes
        message.style.color = "green";
        message.textContent = "Datele au fost validate cu succes!";

        // Resetăm formularul
        form.reset();

        // Afișăm secțiunea protejată
        protectedSection.classList.remove("hidden");
        console.log("Display style al secțiunii protejate:", window.getComputedStyle(protectedSection).display);

        console.log("Secțiunea protejată a fost afișată."); // Confirmare pentru afișarea secțiunii
    });
});
