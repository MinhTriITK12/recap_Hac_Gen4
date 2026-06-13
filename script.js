document.addEventListener("DOMContentLoaded", function() {
    // --- AUDIO ---
    const audioBtn = document.getElementById('audio-btn');
    const bgMusic = document.getElementById('bg-music');
    const audioIconPath = document.getElementById('audio-icon-path');
    const loaderWrapper = document.getElementById('loader-wrapper');

    const introStartBtn = document.getElementById('intro-start-btn');

    // Khóa cuộn khi đang load
    document.body.classList.add('no-scroll');

    // SVG Paths cho icon loa
    const volumeUpPath = "M3 9v6h4l5 5V4L7 9H3zm13.5 3c0-1.77-1.02-3.29-2.5-4.03v8.05c1.48-.73 2.5-2.25 2.5-4.02zM14 3.23v2.06c2.89.86 5 3.54 5 6.71s-2.11 5.85-5 6.71v2.06c4.01-.91 7-4.49 7-8.77s-2.99-7.86-7-8.77z";
    const volumeMutePath = "M16.5 12c0-1.77-1.02-3.29-2.5-4.03v2.21l2.45 2.45c.03-.2.05-.41.05-.63zm2.5 0c0 .94-.2 1.82-.54 2.64l1.51 1.51C20.63 14.91 21 13.5 21 12c0-4.28-2.99-7.86-7-8.77v2.06c2.89.86 5 3.54 5 6.71zM4.27 3L3 4.27 7.73 9H3v6h4l5 5v-6.73l4.25 4.25c-.67.52-1.42.93-2.25 1.18v2.06c1.38-.31 2.63-.95 3.69-1.81L19.73 21 21 19.73l-9-9L4.27 3zM12 4L9.91 6.09 12 8.18V4z";

    // Mặc định ban đầu chưa phát nhạc cho đến khi bấm nút
    let isPlaying = false;

    // Xử lý nút "Bắt Đầu" trên màn hình Intro
    if (introStartBtn && loaderWrapper) {
        introStartBtn.addEventListener('click', function() {
            // Ẩn Intro
            loaderWrapper.style.opacity = '0';
            setTimeout(() => {
                loaderWrapper.style.visibility = 'hidden';
                document.body.classList.remove('no-scroll');
            }, 800);

            // Chắc chắn bật được nhạc vì đây là click từ người dùng
            if (bgMusic) {
                bgMusic.play().then(() => {
                    isPlaying = true;
                    audioIconPath.setAttribute('d', volumeUpPath);
                }).catch(e => console.log("Lỗi bật nhạc:", e));
            }
        });
    }

    // Xử lý nút bật/tắt nhạc góc trái màn hình
    if (audioBtn && bgMusic) {
        audioBtn.addEventListener('click', function(e) {
            e.stopPropagation();
            if (!bgMusic.paused) { // Nhạc đang thực sự phát
                bgMusic.pause();
                audioIconPath.setAttribute('d', volumeMutePath);
                isPlaying = false;
            } else { // Nhạc đang dừng (bị chặn hoặc đã tắt)
                bgMusic.play().catch(e => console.log(e));
                audioIconPath.setAttribute('d', volumeUpPath);
                isPlaying = true;
            }
        });
    }

    // --- FADE UP ANIMATION (HIỆU ỨNG CUỘN) ---
    const fadeElements = document.querySelectorAll('.fade-up');
    
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target); 
            }
        });
    }, { 
        threshold: 0.1,
        rootMargin: "0px 0px 0px 0px"
    });

    fadeElements.forEach(el => observer.observe(el));

    // --- XỬ LÝ LIGHTBOX ---
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    const closeBtn = document.querySelector('.lightbox-close');

    if (lightbox && lightboxImg) {
        const images = document.querySelectorAll('.photo-wrapper img');
        images.forEach(img => {
            img.addEventListener('click', function() {
                lightbox.style.display = 'block';
                lightboxImg.src = this.src;
            });
        });

        if (closeBtn) {
            closeBtn.addEventListener('click', function() {
                lightbox.style.display = 'none';
            });
        }

        lightbox.addEventListener('click', function(e) {
            if (e.target !== lightboxImg) {
                lightbox.style.display = 'none';
            }
        });
    }
});
