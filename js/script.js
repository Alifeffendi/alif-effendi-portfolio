/* =========================================
   ALIF EFFENDI - CINEMATIC ANIMATION
========================================= */

// Pastikan GSAP berhasil dimuat
if (
    typeof gsap !== "undefined" &&
    document.querySelector(".hero")
) {

    // Menghentikan animasi jika pengguna memilih reduced motion
    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (prefersReducedMotion) {
        gsap.set(
            ".navbar, .hero-label, .hero-title, .hero-subtitle, .hero-buttons, .scroll-indicator",
            { clearProps: "all" }
        );

    } else {

        // MASTER ANIMATION TIMELINE
        const heroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        // NAVBAR ANIMATION
        heroTimeline.from(".navbar", {
            y: -80,
            opacity: 0,
            duration: 1
        });

        // WELCOME TEXT
        heroTimeline.from(".hero-label", {
            y: 30,
            opacity: 0,
            duration: 0.8
        }, "-=0.5");

        // MAIN NAME ANIMATION
        heroTimeline.from(".hero-title", {
            y: 100,
            opacity: 0,
            scale: 0.95,
            duration: 1.3,
            ease: "power4.out"
        }, "-=0.3");

        // SUBTITLE ANIMATION
        heroTimeline.from(".hero-subtitle", {
            y: 30,
            opacity: 0,
            duration: 0.9
        }, "-=0.6");

        // BUTTON ANIMATION
        heroTimeline.from(".hero-buttons a", {
            y: 25,
            opacity: 0,
            stagger: 0.2,
            duration: 0.8
        }, "-=0.4");

        // SCROLL INDICATOR
        heroTimeline.from(".scroll-indicator", {
            y: 20,
            opacity: 0,
            duration: 0.8
        }, "-=0.3");

    }

} else if (typeof gsap === "undefined") {
    console.warn("GSAP belum berhasil dimuat.");
}

/* =================================
   GOLD SPARKLE CURSOR
================================= */

if (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {

    // Membuat kursor panah gold
    const cursor = document.createElement("div");

    cursor.className = "gold-cursor";

    cursor.innerHTML =
    '<svg viewBox="0 0 24 30">' +
        '<path d="M2 1 L2 24 L8 18 L13 28 L17 26 L12 16 L21 16 Z" ' +
        'fill="#c9a96e" ' +
        'stroke="#080d18" ' +
        'stroke-width="1.4" ' +
        'stroke-linejoin="round" />' +
    '</svg>';

    // Memasukkan kursor ke halaman
    document.body.appendChild(cursor);

    // Menyembunyikan kursor bawaan
    document.body.classList.add("custom-cursor");

    let lastSparkle = 0;

    // Mengikuti gerakan mouse
    window.addEventListener("mousemove", (e) => {

        // Menggerakkan kursor gold
        gsap.set(cursor, {
            x: e.clientX,
            y: e.clientY
        });

        // Mengatur jarak kemunculan sparkle
        const now = Date.now();

        if (now - lastSparkle < 85) return;

        lastSparkle = now;

        createSparkle(e.clientX, e.clientY);

    });

    // Fungsi membuat bintang
    function createSparkle(x, y) {

        const sparkle = document.createElement("span");

        sparkle.className = "sparkle";
        sparkle.textContent = "✦";

        const offsetX = (Math.random() - 0.5) * 18;
        const offsetY = (Math.random() - 0.5) * 18;

        sparkle.style.left = `${x + offsetX}px`;
        sparkle.style.top = `${y + offsetY}px`;

        sparkle.style.fontSize =
            `${7 + Math.random() * 6}px`;

        // Memasukkan bintang ke halaman
        document.body.appendChild(sparkle);

        // Menghapus bintang setelah animasi selesai
        setTimeout(() => {
            sparkle.remove();
        }, 550);

    }

}
/* =================================
   MAGNETIC BUTTON INTERACTION
================================= */

if (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches &&
    typeof gsap !== "undefined"
) {

    const magneticButtons = document.querySelectorAll(
        ".hero-buttons a"
    );

    magneticButtons.forEach((button) => {

        button.addEventListener("mousemove", (e) => {

            const rect = button.getBoundingClientRect();

            const x = e.clientX - rect.left - rect.width / 2;
            const y = e.clientY - rect.top - rect.height / 2;

            gsap.to(button, {
                x: x * 0.18,
                y: y * 0.25,
                duration: 0.4,
                ease: "power3.out"
            });

        });

        button.addEventListener("mouseleave", () => {

            gsap.to(button, {
                x: 0,
                y: 0,
                duration: 0.7,
                ease: "elastic.out(1, 0.4)"
            });

        });

    });

}
/* =================================
   INTERACTIVE MOUSE SPOTLIGHT
================================= */

if (
    window.matchMedia("(hover: hover) and (pointer: fine)").matches
) {

    const hero = document.querySelector(".hero");

    if (hero) {

        let spotlightFrame;

        hero.addEventListener("mousemove", (e) => {

            const rect = hero.getBoundingClientRect();

            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;

            cancelAnimationFrame(spotlightFrame);

            spotlightFrame = requestAnimationFrame(() => {

                hero.style.setProperty("--mouse-x", `${x}px`);
                hero.style.setProperty("--mouse-y", `${y}px`);

            });

            hero.classList.add("mouse-active");

        });

        hero.addEventListener("mouseleave", () => {

            hero.classList.remove("mouse-active");

        });

    }

}
/* =================================
   ABOUT SECTION SCROLL ANIMATION
================================= */

if (
    typeof gsap !== "undefined" &&
    document.querySelector(".about-section")
) {

    // DAFTARKAN PLUGIN SCROLLTRIGGER
    gsap.registerPlugin(ScrollTrigger);
    
    if (
        !window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches
    ) {

        const aboutTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".about-section",
                start: "top 75%",
                toggleActions: "play none none none"
            }
        });

        // PROFILE IMAGE
        aboutTimeline.from(".about-visual", {
            x: -80,
            opacity: 0,
            duration: 1.1,
            ease: "power3.out"
        });

        // SECTION LABEL
        aboutTimeline.from(".section-label", {
            y: 25,
            opacity: 0,
            duration: 0.6
        }, "-=0.7");

        // TITLE
        aboutTimeline.from(".about-title", {
            y: 45,
            opacity: 0,
            duration: 0.8
        }, "-=0.3");

        // DESCRIPTION
        aboutTimeline.from(
            ".about-intro, .about-description",
            {
                y: 25,
                opacity: 0,
                stagger: 0.15,
                duration: 0.7
            },
            "-=0.3"
        );

        // EDUCATION DETAILS
        aboutTimeline.from(".detail-item", {
            x: 30,
            opacity: 0,
            stagger: 0.15,
            duration: 0.6
        });

        // BUTTON
        aboutTimeline.from(".about-link", {
            y: 20,
            opacity: 0,
            duration: 0.6
        }, "-=0.2");

    }

}
/* =========================================
   SKILLS SECTION - CINEMATIC REVEAL
========================================= */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {

    gsap.registerPlugin(ScrollTrigger);

    const skillsSection = document.querySelector(".skills-section");
    console.log("SKILLS SECTION:", skillsSection);
console.log(
    "REDUCED MOTION:",
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
);

    if (skillsSection) {

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {

            gsap.set(
                ".skills-header, .skill-card, .skills-footer",
                { clearProps: "all" }
            );

        } else {

            const skillsTimeline = gsap.timeline({

                scrollTrigger: {
                    trigger: ".skills-section",
                    start: "top 75%",
                    once: true
                }

            });
            console.log("SKILLS TIMELINE BERHASIL DIBUAT");

            // HEADER ANIMATION
            skillsTimeline.from(".skills-header > *", {
                y: 35,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            // SKILL CARDS ANIMATION
            skillsTimeline.from(".skill-card", {
                y: 55,
                opacity: 0,
                duration: 0.9,
                stagger: 0.2,
                ease: "power3.out",

                onComplete: () => {
                    gsap.set(".skill-card", {
                        clearProps: "transform"
                    });
                }

            }, "-=0.3");

            // FOOTER ANIMATION
            skillsTimeline.from(".skills-footer", {
                y: 20,
                opacity: 0,
                duration: 0.8,
                ease: "power2.out"
            }, "-=0.3");

        }

    }

}
/* =========================================
   PROJECTS SECTION - CINEMATIC REVEAL
========================================= */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {

    gsap.registerPlugin(ScrollTrigger);

    const projectsSection = document.querySelector(".projects-section");

    if (projectsSection) {

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches;

        if (prefersReducedMotion) {

            gsap.set(
                ".projects-header, .project-card",
                { clearProps: "all" }
            );

        } else {

            const projectsTimeline = gsap.timeline({
                scrollTrigger: {
                    trigger: ".projects-section",
                    start: "top 75%",
                    once: true
                }
            });

            projectsTimeline.from(".projects-header > *", {
                y: 35,
                opacity: 0,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            });

            projectsTimeline.from(".project-card", {
                y: 60,
                opacity: 0,
                duration: 0.9,
                stagger: 0.2,
                ease: "power3.out"
            }, "-=0.3");

        }
    }
}

/* =========================================
   PROJECT DETAIL - HERO ANIMATION
========================================= */

if (
    typeof gsap !== "undefined" &&
    document.querySelector(".project-detail-page")
) {

    const projectHero = document.querySelector(
        ".project-detail-hero"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (projectHero && !prefersReducedMotion) {

        gsap.set(
            [
                ".back-link",
                ".project-detail-heading .section-label",
                ".project-detail-heading h1",
                ".project-detail-heading > p",
                ".detail-status",
                ".project-detail-image"
            ],
            {
                opacity: 0
            }
        );

        const projectHeroTimeline = gsap.timeline({
            defaults: {
                ease: "power3.out"
            }
        });

        projectHeroTimeline.fromTo(
            ".back-link",
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7
            }
        );

        projectHeroTimeline.fromTo(
            ".project-detail-heading .section-label",
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7
            },
            "-=0.3"
        );

        projectHeroTimeline.fromTo(
            ".project-detail-heading h1",
            {
                y: 45,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1
            },
            "-=0.3"
        );

        projectHeroTimeline.fromTo(
            ".project-detail-heading > p",
            {
                y: 25,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8
            },
            "-=0.5"
        );

        projectHeroTimeline.fromTo(
            ".detail-status",
            {
                y: 15,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7
            },
            "-=0.4"
        );

        projectHeroTimeline.fromTo(
            ".project-detail-image",
            {
                y: 45,
                opacity: 0,
                scale: 0.97
            },
            {
                y: 0,
                opacity: 1,
                scale: 1,
                duration: 1.2,
                ease: "power3.out"
            },
            "-=0.2"
        );
    }
}

/* =========================================
   PROJECT DETAIL - SCROLL ANIMATIONS
========================================= */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined" &&
    document.querySelector(".project-detail-page")
) {

    gsap.registerPlugin(ScrollTrigger);

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (!prefersReducedMotion) {

        // ABOUT THE PROJECT
        gsap.fromTo(
            ".project-info-main",
            {
                y: 50,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 1,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".project-information",
                    start: "top 75%",
                    once: true
                }
            }
        );

        // PROJECT INFORMATION SIDEBAR
        gsap.fromTo(
            ".project-info-sidebar .info-item",
            {
                x: 35,
                opacity: 0
            },
            {
                x: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".project-info-sidebar",
                    start: "top 80%",
                    once: true
                }
            }
        );

        // TECHNOLOGIES SECTION
        const technologyTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".project-technologies",
                start: "top 80%",
                once: true
            }
        });

        technologyTimeline.fromTo(
            ".project-technologies .section-label",
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6
            }
        );

        technologyTimeline.fromTo(
            ".project-technologies h2",
            {
                y: 35,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8
            },
            "-=0.2"
        );

        technologyTimeline.fromTo(
            ".technology-list span",
            {
                y: 25,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.6,
                stagger: 0.12
            },
            "-=0.3"
        );

        // PROJECT FOOTER
        gsap.fromTo(
            ".project-detail-footer > *",
            {
                y: 25,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.2,
                ease: "power3.out",
                scrollTrigger: {
                    trigger: ".project-detail-footer",
                    start: "top 85%",
                    once: true
                }
            }
        );

    }
}
/* =========================================
   CONTACT SECTION - CINEMATIC REVEAL
========================================= */

if (
    typeof gsap !== "undefined" &&
    typeof ScrollTrigger !== "undefined"
) {

    gsap.registerPlugin(ScrollTrigger);

    const contactSection = document.querySelector(
        ".contact-section"
    );

    const prefersReducedMotion = window.matchMedia(
        "(prefers-reduced-motion: reduce)"
    ).matches;

    if (contactSection && !prefersReducedMotion) {

        const contactTimeline = gsap.timeline({
            scrollTrigger: {
                trigger: ".contact-section",
                start: "top 75%",
                once: true
            }
        });

        contactTimeline.fromTo(
            ".contact-header > *",
            {
                y: 35,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.8,
                stagger: 0.15,
                ease: "power3.out"
            }
        );

        contactTimeline.fromTo(
            ".contact-card",
            {
                y: 45,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.9,
                stagger: 0.2,
                ease: "power3.out"
            },
            "-=0.3"
        );

        contactTimeline.fromTo(
            ".contact-closing",
            {
                y: 20,
                opacity: 0
            },
            {
                y: 0,
                opacity: 1,
                duration: 0.7
            },
            "-=0.2"
        );

    }
}