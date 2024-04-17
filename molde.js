const videos = document.querySelectorAll('.video__player');
const videoSources = [

    "https://c1.coomer.su/data/d1/26/d126953eef6870f8f461d74354b0b56c58795bcc45472997b5b1a5597bf9b69c.m4v?f=ad680407-6dbc-4fac-aff2-8c912e1a6c07.m4v",
    "https://thisvid.com/get_file/4/23276b5ae8e86298f00e3fb5d63313b2e3efaf6fd1/2020000/2020047/2020047.mp4/?rnd=1713376728777"
    
   " https://thisvid.com/get_file/4/eb5475471592494dec10b49b41594224e2a45eab96/1673000/1673475/1673475.mp4/?rnd=1713377223006" 
"https://www.ebony8.com/get_file/3/0615ec39fc3e456a389a0f04b11b9d369089eed0f7/56000/56065/56065.mp4/?br=918&rnd=1713377674124" 
"https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e977d13f8854293a375871_08(1).mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e977cccafd905222beda00_07(1).mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e977c28868839e3e4054d6_06.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e977b57d1533733ddb5046_05.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e96dfa450c282ca832efa4_video_2024-03-05_16-01-32.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e96dedbeb291f8e2e1c12c_IMG_5034.MP4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e96df36ce317053df1d9d6_video_2024-03-04_21-22-03.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e970719626aa0169341c50_0307.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e9779fe034c0252f6aa84f_01.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e977a31e405a60c1417f11_02(1).mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65e977a9bb7e199b53c30dfa_04.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65cdad8fbb76f74aaf513e29_hea.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65cda5d108add4c3077c80ed_14890030-720p.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65c46678eb060b2652d58a40_e1369d63-4d07-4002-8e20-dba716380d5d_full-video_1080p_normal.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65cdad742f8a25117bd64cc4_miser.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65ed4fae370b0f7f3aecd1a3_10.mp4",
    "https://s3.amazonaws.com/webflow-prod-assets/64597a8e3c345998aa7cd3c4/65ed4fe2c836e1218aad72cc_11.mp4"
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


