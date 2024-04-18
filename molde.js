const videos = document.querySelectorAll('.video__player');
const videoSources = [
     "https://c1.coomer.su/data/d1/26/d126953eef6870f8f461d74354b0b56c58795bcc45472997b5b1a5597bf9b69c.m4v?f=ad680407-6dbc-4fac-aff2-8c912e1a6c07.m4v",
    "https://thisvid.com/get_file/4/23276b5ae8e86298f00e3fb5d63313b2e3efaf6fd1/2020000/2020047/2020047.mp4/?rnd=17133767287", 
   " https://thisvid.com/get_file/4/eb5475471592494dec10b49b41594224e2a45eab96/1673000/1673475/1673475.mp4/?rnd=1713377223006", 
    "https://www.ebony8.com/get_file/3/0615ec39fc3e456a389a0f04b11b9d369089eed0f7/56000/56065/56065.mp4/?br=918&rnd=1713377674124", 
     "https://m.mylust.com/get_file/1/152878c2bf9d2b59639b8e9b40cf5a529f025ea86d/965000/965389/965389.mp4/?br=319", 
       "https://m.mylust.com/get_file/1/d3340b254b49d3e67091c93282e8f1f4a8f9fd555d/966000/966419/966419.mp4/?br=513", 
        "https://m.mylust.com/get_file/1/34ac4d3ddf81ed8544446c823864664a40e53c2dff/966000/966497/966497.mp4/?br=394", 
     "https://thisvid.com/get_file/4/6a5f853daef1f1fc998005cb01a64aa2346fc3f00f/10893000/10893117/10893117.mp4/?rnd=1713444801723", 
     "https://thisvid.com/get_file/4/33a8da665e1e787d54c6295968169062df33923b40/10893000/10893095/10893095.mp4/?rnd=1713445091230", 
     " https://thisvid.com/get_file/4/2dcd164b2732b12d52b0b260985bf6fcd898bd7ec2/10853000/10853117/10853117.mp4/?rnd=1713445418342", 
     " https://thisvid.com/get_file/4/e480ee56a6889337df841409b1b9e7c8c93dbb8dbc/10853000/10853131/10853131.mp4/?rnd=1713445484511", 
     " https://thisvid.com/get_file/4/0f0125ee6a508aca647f20dc2cedc33c7596ce3f93/10599000/10599449/10599449.mp4/?rnd=1713445745583", 
     " https://thisvid.com/get_file/4/1c43b53ac8daa423ab8c2d347432fa930114511184/7729000/7729989/7729989.mp4/?rnd=1713445879341", 
     "https://thisvid.com/get_file/4/ae7a96c74727e8f3e5971918093b2dd3a9f6b6286a/10852000/10852937/10852937.mp4/?rnd=1713446488245", 
     "https://thisvid.com/get_file/4/ce7bb77b8759fb0463333dc45b60f605fc244a2aff/10852000/10852921/10852921.mp4/?rnd=1713446569333", 
     "https://thisvid.com/get_file/4/4859621f6577403f5947a7cc96c57b8e80e657e8cd/10852000/10852909/10852909.mp4/?rnd=1713446638364", 
     // Agrega aquí más URLs de videos según sea necesario
];

const nombresAleatorios = [
    "🇵🇹 Lorena Caterina 🇵🇹 ",
    "🇫🇮 Ana Maria 🇫🇮",
    "🇨🇦 Carolina Garcia 🇨🇦",
    "🇦🇺 NAKARY MILLER 🇦🇺",
    "🇺🇸 GRACIELA CATERINA 🇺🇸",
    "🇻🇪 Valentina Ribeiro 🇻🇪",
    "🇻🇪 G R A C I E L A 💘 🇻🇪",
    "🇵🇪 Mariana López 🇵🇪",
    "🇷🇴 Andrei Popescu 🇷🇴",
    "🇧🇪 Emma Dubois 🇧🇪",
    "🇬🇷 Ioanna Papadopoulos 🇬🇷",
    "🇨🇱 Matías Silva 🇨🇱",
    "🇭🇺 Levente Kovács 🇭🇺",
    "🇸🇦 Fatima Al-Mansoori 🇸🇦",
    "🇲🇽 Alejandro Hernández 🇲🇽",
    "🇵🇦 Camila González 🇵🇦",
    "🇨🇮 Aminata Diop 🇨🇮",
    "🇨🇴 Isabela Ríos 🇨🇴",
    "🇮🇹 Sofia Santoro 🇮🇹",
    "🇳🇴 Emilie Andersen 🇳🇴",
    "🇦🇹 Lara Hofmann 🇦🇹",
    "🇳🇿 Harper Wilson 🇳🇿",
    "🇨🇿 Klára Nováková 🇨🇿",
    "🇮🇪 Aoife Murphy 🇮🇪",
    "🇨🇭 Alessia Rossi 🇨🇭",
    "🇮🇳 Aarav Patel 🇮🇳",
    "🇦🇪 Layla Khan 🇦🇪",
    "🇸🇪 Malin Lindström 🇸🇪",
    "🇿🇦 Thabo Molefe 🇿🇦",
    "🇳🇱 Daan van der Berg 🇳🇱",
    "🇧🇷 Maria da Silva 🇧🇷",
    "🇫🇷 Léa Dubois 🇫🇷",
    "🇰🇷 Min-jun Kim 🇰🇷",
    "🇯🇵 Yui Tanaka 🇯🇵",
    "🇩🇪 Lena Müller 🇩🇪",
    "🇬🇧 Oliver Hughes 🇬🇧",
    "🇪🇸 Marta García 🇪🇸",
    // Agrega más nombres según sea necesario
];

const textosAleatorios = [
    "Watch Me Masturbate Live ❤️",
    "📞🔥 Phone Calls, 💥 Custom Videos, 😋 Live Broadcasts, Your Name on My 🍒TITS!",
    "Made in Czech 🇨🇿🍺 Big smile and big...heart🍒 Cum join me in my adventures as I show off just for you baby ❤️",
    "❣ Exclusive VIP Content 🔞|Seduction and Sensuality Unleashed 🦊| Monthly Nude Delights📸",
    "😻 Model, ❤️ student 🔥I make exclusive videos, 📞calls! Sexsting LIVE -broadcasts!!🍑🍒 #fuck",
    "Model, 20 y.o 🇪🇸 Wanna chat with me? Check all my links 😍",
    "Hi I’m Molly! ❤️ Just a sweet girl who loves to be naughty 🤫😈💋CHECK ALL MY LINKS via IG! ✨",
    "🔥 Hot and ready for you! 😈 Let's play together and make your fantasies come true 💦",
    "🍑 Curvy and fun! 💋 Join me for exclusive content and live shows 📸",
    "🌟 Your favorite cam girl! 🎥 Live shows, custom videos, and more 🔞",
    "💖 Sensual and seductive! 😘 Exclusive content just for you 💌",
    "🔥 Naughty but nice! 💋 Cum play with me and let's have some fun 🍒",
    "🌺 Sweet and sexy! 💫 Join me for a private show and let's get wild together 🚀",
    "👅 Ready to please! 💦 Let's explore your wildest desires together 🔥",
    "🔞 Explicit content and live shows! 💋 Cum chat with me and let's have some fun 😘",
    "🌈 Fun and flirty! 💖 Exclusive content and private shows just for you 🌟",
    "💥 Wild and willing! 🔞 Let's get naughty together and have an unforgettable time 😈",
    // Agrega más textos según sea necesario
];

// Función para cambiar aleatoriamente el video
function changeRandomVideo() {
    videos.forEach(video => {
        const randomSourceIndex = Math.floor(Math.random() * videoSources.length);
        const newSource = videoSources[randomSourceIndex];

        video.src = newSource;
        video.load();
        video.play();
    });
}

// Función para cambiar aleatoriamente el nombre
function changeRandomName() {
    const nameElement = document.getElementById('randomName');
    const randomIndex = Math.floor(Math.random() * nombresAleatorios.length);
    const newName = nombresAleatorios[randomIndex];

    nameElement.textContent = newName;
}

// Función para cambiar aleatoriamente el texto
function changeRandomText() {
    const textElement = document.getElementById('randomText');
    const randomIndex = Math.floor(Math.random() * textosAleatorios.length);
    const newText = textosAleatorios[randomIndex];

    textElement.textContent = newText;
}

// Ejecutar las funciones al cargar la página
window.onload = function () {
    changeRandomVideo();
    changeRandomName();
    changeRandomText();
};

function recargarPagina() {
    // Recargar la página
    location.reload();
}


