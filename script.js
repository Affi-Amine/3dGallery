window.onload = function () {
    const gallery = document.querySelector('.gallery');
    const previewImage = document.querySelector(".preview-img img"); 

    document.addEventListener("mousemove", function (event) {
        const x = event.clientX;
        const y = event.clientY;

        const centerX = window.innerWidth / 2;
        const centerY = window.innerHeight / 2;

        const percentX = (x - centerX) / centerX;
        const percentY = (y - centerY) / centerY;

        const rotateX = 55 + percentY * 2;
        const rotateY = percentX * 2;

        gsap.to(gallery, {
            duration: 1,
            ease: "power2.out",
            rotateX: rotateX,
            rotateY: rotateY,
            overwrite: "auto",
        });
    });

    for (let i = 0; i < 150; i++) {
        const item = document.createElement("div");
        item.className = "item";
        const img = document.createElement("img");
        img.src = `./assets/i${i % 15 + 1}.jpg`; 
        item.appendChild(img);
        gallery.appendChild(item);
    }

    const items = document.querySelectorAll(".item");
    const numberOfItems = items.length;
    const angleIncrement = 360 / numberOfItems;

    items.forEach((item, index) => {
        gsap.set(item, {
            rotateY: 90,
            rotateZ: index * angleIncrement - 90,
            transformOrigin: "50% 400px",
        });

        item.addEventListener("mouseover", function () {
            const imgInsideItem = item.querySelector("img");
            if (imgInsideItem) {
                previewImage.src = imgInsideItem.src; 
            }

            gsap.to(item, {
                x: 10,
                y: 10,
                z: 50, 
                duration: 0.5,
                ease: "power2.out",
            });
        });

        item.addEventListener("mouseout", function () {
            previewImage.src = "./assets/i1.jpg"; 

            gsap.to(item, {
                x: 0,
                y: 0,
                z: 0,
                duration: 0.5,
                ease: "power2.out",
            });
        });
    });

    ScrollTrigger.create({
        trigger: "body",
        start: "top top",
        end: "bottom bottom",
        scrub: 2,
        onRefresh: setupRotation,
        onUpdate: (self) => {
            const rotationProgress = self.progress * 360;
            items.forEach((item, index) => {
                const currentAngle = index * angleIncrement - 90 + rotationProgress;
                gsap.to(item, {
                    rotationZ: currentAngle,
                    duration: 1,
                    ease: "power3.out",
                    overwrite: "auto",
                });
            });
        },
    });
};

function setupRotation() {
    const items = document.querySelectorAll(".item");
    const angleIncrement = 360 / items.length;
    items.forEach((item, index) => {
        const angle = index * angleIncrement - 90;
        gsap.set(item, {
            rotateY: 90,
            rotateZ: angle,
            transformOrigin: "50% 400px",
        });
    });
}