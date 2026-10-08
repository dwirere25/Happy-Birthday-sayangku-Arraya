/* =========================================
   PASTEL GARDEN - ARRAYA TRICKY PRABATIWI
========================================= */

const opening = document.getElementById("opening");
const openButton = document.getElementById("openButton");
const flowerRain = document.getElementById("flowerRain");

const world = document.getElementById("world");
const scenes = document.querySelectorAll(".scene");

const prevButton = document.getElementById("prevButton");
const nextButton = document.getElementById("nextButton");
const pageIndicator = document.getElementById("pageIndicator");

const music = document.getElementById("music");

const restartButton = document.getElementById("restart");

let currentScene = 0;
let isOpening = false;

const totalScenes = scenes.length;


/* =========================================
   OPEN GARDEN
========================================= */

openButton.addEventListener("click", () => {

    if (isOpening) return;

    isOpening = true;

    // Musik mulai setelah klik
    music.volume = 0;

    music.play()
        .then(() => {
            fadeMusicIn();
        })
        .catch(() => {
            console.log("Music belum bisa diputar.");
        });

    // Tirai membuka
    opening.classList.add("open");

    // Hujan bunga
    createFlowerRain(45);

    // Sparkle
    setTimeout(() => {
        createSparkles(20);
    }, 700);

    // Hilangkan opening
    setTimeout(() => {
        opening.style.display = "none";
        restartButton.style.display = "block";
    }, 2200);
});


/* =========================================
   MUSIC
========================================= */

function fadeMusicIn() {

    let volume = 0;

    const fade = setInterval(() => {

        volume += 0.02;

        if (volume >= 0.65) {
            volume = 0.65;
            clearInterval(fade);
        }

        music.volume = volume;

    }, 100);
}


/* =========================================
   FLOWER RAIN
========================================= */

function createFlowerRain(amount = 30) {

    const flowers = ["🌸", "🌷", "🌼", "🌺", "🌻", "🌹"];

    for (let i = 0; i < amount; i++) {

        const flower = document.createElement("div");

        flower.className = "falling-flower";

        flower.innerText =
            flowers[Math.floor(Math.random() * flowers.length)];

        flower.style.left = Math.random() * 100 + "%";

        flower.style.fontSize =
            (15 + Math.random() * 25) + "px";

        flower.style.animationDuration =
            (3 + Math.random() * 5) + "s";

        flower.style.animationDelay =
            Math.random() * 2 + "s";

        flowerRain.appendChild(flower);

        setTimeout(() => {
            flower.remove();
        }, 9000);
    }
}


/* =========================================
   NAVIGATION
========================================= */

function updateScene() {

    currentScene = Math.max(
        0,
        Math.min(currentScene, totalScenes - 1)
    );

    world.style.transform =
        `translateX(-${currentScene * 100}vw)`;

    pageIndicator.innerText =
        `${currentScene + 1} / ${totalScenes}`;

    prevButton.disabled = currentScene === 0;
    nextButton.disabled = currentScene === totalScenes - 1;

    if (currentScene === totalScenes - 1) {
        restartButton.style.display = "block";
    }
}


function nextScene() {

    if (currentScene < totalScenes - 1) {

        currentScene++;

        updateScene();

        createSparkles(8);
    }
}


function previousScene() {

    if (currentScene > 0) {

        currentScene--;

        updateScene();

        createSparkles(5);
    }
}


nextButton.addEventListener("click", nextScene);
prevButton.addEventListener("click", previousScene);


/* =========================================
   KEYBOARD
========================================= */

document.addEventListener("keydown", (event) => {

    if (event.key === "ArrowRight") {
        nextScene();
    }

    if (event.key === "ArrowLeft") {
        previousScene();
    }
});


/* =========================================
   MOUSE WHEEL
========================================= */

let wheelLocked = false;

window.addEventListener(
    "wheel",
    (event) => {

        if (opening.style.display !== "none") return;

        if (wheelLocked) return;

        wheelLocked = true;

        if (event.deltaY > 0) {
            nextScene();
        } else {
            previousScene();
        }

        setTimeout(() => {
            wheelLocked = false;
        }, 900);

    },
    { passive: true }
);


/* =========================================
   MOBILE SWIPE
========================================= */

let touchStartX = 0;
let touchStartY = 0;

window.addEventListener(
    "touchstart",
    (event) => {

        touchStartX = event.touches[0].clientX;
        touchStartY = event.touches[0].clientY;

    },
    { passive: true }
);


window.addEventListener(
    "touchend",
    (event) => {

        const touchEndX = event.changedTouches[0].clientX;
        const touchEndY = event.changedTouches[0].clientY;

        const differenceX =
            touchEndX - touchStartX;

        const differenceY =
            touchEndY - touchStartY;

        // Harus lebih dominan horizontal
        if (
            Math.abs(differenceX) > 60 &&
            Math.abs(differenceX) > Math.abs(differenceY)
        ) {

            if (differenceX < 0) {
                nextScene();
            } else {
                previousScene();
            }

        }

    },
    { passive: true }
);


/* =========================================
   FLOWER MESSAGE
========================================= */

const flowers = document.querySelectorAll(".flower");

const flowerMessages = [

    "Semoga hari-harimu selalu dipenuhi hal-hal kecil yang membuatmu tersenyum 🌷",

    "Semoga semua impian baik yang kamu simpan perlahan menemukan jalannya 🌸",

    "Tetap jadi versi dirimu sendiri yang hangat, ceria, dan penuh cerita 🌼",

    "Semoga tahun ini membawa lebih banyak pengalaman indah untukmu 🌺"

];


flowers.forEach((flower, index) => {

    flower.addEventListener("click", () => {

        showPopup(
            "A Little Flower 🌷",
            flowerMessages[index] ||
            "Semoga harimu selalu indah."
        );

    });

});


/* =========================================
   MEMORY PHOTOS
========================================= */

const polaroids = document.querySelectorAll(".polaroid");

polaroids.forEach((photo) => {

    photo.addEventListener("click", () => {

        createSparkles(12);

    });

});


/* =========================================
   BUTTERFLY
========================================= */

const butterfly = document.querySelector(".butterfly");

if (butterfly) {

    butterfly.addEventListener("click", () => {

        createSparkles(18);

        setTimeout(() => {
            nextScene();
        }, 700);

    });

}


/* =========================================
   LETTER
========================================= */

const envelope = document.querySelector(".envelope");

if (envelope) {

    envelope.addEventListener("click", () => {

        showPopup(
            "A Little Letter 💌",
            `
            Untuk Arraya Tricky Prabatiwi,<br><br>
            Semoga bertambahnya usia membawa
            lebih banyak cerita baik, tawa,
            pengalaman baru, dan orang-orang
            yang selalu mendukungmu.<br><br>
            Jangan lupa menikmati setiap prosesnya.
            Karena perjalanan kecil hari ini
            bisa menjadi cerita indah di kemudian hari. 🌷
            `
        );

    });

}


/* =========================================
   MUSIC GAZEBO
========================================= */

const gazebo = document.querySelector(".gazebo");

if (gazebo) {

    gazebo.addEventListener("click", () => {

        showPopup(
            "A Little Song 🎵",
            "Biarkan musik menemani hari spesialmu hari ini. Semoga selalu ada lagu yang cocok untuk setiap cerita dalam hidupmu. 🎶"
        );

    });

}


/* =========================================
   CAKE
========================================= */

const cake = document.querySelector(".cake");

if (cake) {

    cake.addEventListener("click", () => {

        createFlowerRain(35);
        createSparkles(30);

        showPopup(
            "MAKE A WISH 🎂",
            "Pejamkan mata sebentar, buat satu harapan terbaikmu, lalu percaya bahwa hal-hal baik sedang menemukan jalannya. ✨"
        );

    });

}


/* =========================================
   GIFT
========================================= */

const gift = document.querySelector(".gift");

if (gift) {

    gift.addEventListener("click", () => {

        createSparkles(35);
        createFlowerRain(25);

        setTimeout(() => {
            nextScene();
        }, 900);

    });

}


/* =========================================
   POPUP SYSTEM
========================================= */

function showPopup(title, message) {

    const popup = document.getElementById("popup");

    const popupTitle =
        document.getElementById("popupTitle");

    const popupMessage =
        document.getElementById("popupMessage");

    popupTitle.innerText = title;

    popupMessage.innerHTML = message;

    popup.classList.add("active");
}


function closePopup() {

    const popup =
        document.getElementById("popup");

    popup.classList.remove("active");
}


document
    .getElementById("closePopup")
    .addEventListener("click", closePopup);


document
    .getElementById("popup")
    .addEventListener("click", (event) => {

        if (event.target.id === "popup") {
            closePopup();
        }

    });


/* =========================================
   SPARKLES
========================================= */

function createSparkles(amount = 10) {

    const symbols = ["✨", "✦", "🌸", "💫"];

    for (let i = 0; i < amount; i++) {

        const sparkle =
            document.createElement("div");

        sparkle.className = "sparkle";

        sparkle.innerText =
            symbols[
                Math.floor(Math.random() * symbols.length)
            ];

        sparkle.style.left =
            Math.random() * 100 + "vw";

        sparkle.style.top =
            Math.random() * 100 + "vh";

        sparkle.style.animationDelay =
            Math.random() * .5 + "s";

        document.body.appendChild(sparkle);

        setTimeout(() => {
            sparkle.remove();
        }, 1500);

    }

}


/* =========================================
   RESTART
========================================= */

restartButton.addEventListener("click", () => {

    currentScene = 0;

    updateScene();

    opening.style.display = "block";

    opening.classList.remove("open");

    restartButton.style.display = "none";

    // Reset musik
    music.pause();
    music.currentTime = 0;
    music.volume = 0;

    isOpening = false;

});


/* =========================================
   INITIALIZE
========================================= */

updateScene();
