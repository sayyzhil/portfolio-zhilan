document.addEventListener("DOMContentLoaded", () => {
    const galleryGrid = document.getElementById("gallery-grid");
    const filterButtons = document.querySelectorAll(".folder-tab");
    
    // Elemen Modal
    const modal = document.getElementById("project-modal");
    const closeModalBtn = document.getElementById("close-modal");
    const modalSlider = document.getElementById("modal-slider");
    const scrollHint = document.getElementById("scroll-hint");
    const modalTitle = document.getElementById("modal-title");
    const modalCategory = document.getElementById("modal-category");
    const modalYear = document.getElementById("modal-year");
    const modalDesc = document.getElementById("modal-desc");

    // Render Gallery
    function renderGallery(items) {
        galleryGrid.innerHTML = "";
        
        if (items.length === 0) {
            galleryGrid.innerHTML = `<p class="mono-text" style="grid-column: 1/-1; padding: 40px 0;">NO WORKS FOUND IN THIS FOLDER.</p>`;
            return;
        }

        items.forEach(item => {
            // Ambil gambar pertama sebagai cover (Thumbnail)
            const coverImage = item.images[0]; 
            
            const cardHTML = `
                <div class="card cursor-pointer" data-id="${item.id}" style="cursor: pointer;">
                    <div class="card-img-wrapper">
                        <img src="${coverImage}" alt="${item.title}" loading="lazy" onerror="this.src='https://via.placeholder.com/800x600/e5e5e5/1a1a1a?text=Cover'">
                    </div>
                    <div class="card-info">
                        <h3 class="card-title">${item.title}</h3>
                        <div class="card-category mono-text">
                            <div>${item.year}</div>
                            <div style="color: #666;">${item.category}</div>
                        </div>
                    </div>
                </div>
            `;
            galleryGrid.insertAdjacentHTML("beforeend", cardHTML);
        });

        // Pasang Event Listener ke setiap Card setelah dirender
        document.querySelectorAll('.card').forEach(card => {
            card.addEventListener('click', (e) => {
                const id = parseInt(card.getAttribute('data-id'));
                openModal(id);
            });
        });
    }

    // Buka Modal & Masukkan Data
    function openModal(id) {
        const project = worksData.find(work => work.id === id);
        if (!project) return;

        // Isi Teks
        modalTitle.textContent = project.title;
        modalCategory.textContent = project.category.toUpperCase();
        modalYear.textContent = project.year;
        modalDesc.textContent = project.description;

        // Isi Slider Gambar
        modalSlider.innerHTML = "";
        project.images.forEach(imgUrl => {
            const slide = `<div class="slide-item"><img src="${imgUrl}" alt="${project.title}"></div>`;
            modalSlider.insertAdjacentHTML("beforeend", slide);
        });

        // Tampilkan teks "SWIPE" jika gambar lebih dari 1
        scrollHint.style.display = project.images.length > 1 ? "block" : "none";

        // Tampilkan Modal
        modal.classList.add("active");
        document.body.style.overflow = "hidden"; // Kunci scroll layar belakang
    }

    // Tutup Modal
    closeModalBtn.addEventListener("click", () => {
        modal.classList.remove("active");
        document.body.style.overflow = "auto"; // Buka kunci scroll
    });

    // Filter Logic
    filterButtons.forEach(btn => {
        btn.addEventListener("click", () => {
            filterButtons.forEach(b => b.classList.remove("active"));
            btn.classList.add("active");

            const selectedCategory = btn.getAttribute("data-category");
            if (selectedCategory === "all") {
                renderGallery(worksData);
            } else {
                const filtered = worksData.filter(work => work.category === selectedCategory);
                renderGallery(filtered);
            }
        });
    });

    // Inisiasi awal
    renderGallery(worksData);
});