// Selectors 

// Nav + Header 
const header = document.querySelector('header');
const nav = document.querySelector('nav');
const links = document.querySelectorAll('header nav a')
const sections = document.querySelectorAll('section');

// Features
const middleBoxes = document.querySelectorAll(".middle .box");

// Portfolio
const filters = document.querySelectorAll(".portfolio .filter li");
const portfolioBoxes = document.querySelectorAll('.portfolio .gallery .box');

// FAQ
const faqItems = document.querySelectorAll(".faq-item");

// Go Up
const backToTopBtn = document.querySelector('.backToTopBtn');

// Responsive 
const menuBtn = document.querySelector('.mobile-nav-toggle');
const dropDownLinks = document.querySelectorAll('.navbar .dropdown > a');
const scrollToElements = document.querySelectorAll('.scrollto');


// Nav + Header Activated On Scroll
document.onscroll = () => {
    // Header
    if (window.scrollY > 0) {
        header.classList.add("header-scrolled")
    } else {
        header.classList.remove("header-scrolled")
    }

    // Sections Offset + Active Link In Navbar
    sections.forEach(section => {
        let top = window.scrollY,
            sectionOffSet = section.offsetTop - 90,
            sectionHeight = section.offsetHeight,
            sectionId = section.getAttribute('id');

        if (top >= sectionOffSet && top < sectionOffSet + sectionHeight) {
            links.forEach(link => {
                link.classList.remove('active');
                document.querySelector('nav a[href*=' + sectionId + ']').classList.add('active');
            })
        }
    })
}

// Handling Icon From Bars To X
menuBtn.onclick = (eve) => {
    nav.classList.toggle('navbar-mobile');
    menuBtn.classList.toggle('bi-list');
    menuBtn.classList.toggle('bi-x');
}


// Drop Down Changed To Clicked Rather Than Of Hover
dropDownLinks.onclick = (eve) => {
    if (nav.classList.contains('navbar-mobile')) {
        eve.preventDefthault();
        dropDownLinks.nextElementSibling.classList.toggle('dropdown-active');

    }
}

// Scroll To Function 
const scrollto = (section) => {
    let offset = header.offsetHeight;
    let SectionPos = document.querySelector(section).offsetTop
    window.scrollTo({
        top: SectionPos - offset,
        behavior: 'smooth'
    })
}


// Closing Responsive Navbar & Scrolled To Section
scrollToElements.onclick = (eve) => {
    if (this.hash) {
        eve.preventDefault();
        if (nav.classList.contains('navbar-mobile')) {
            nav.classList.remove('navbar-mobile');
            menuBtn.classList.toggle('bi-list');
            menuBtn.classList.toggle('bi-x');
        }
        scrollto(this.hash);
    }
}

// Go Up Btn Function
if (backToTopBtn) {
    const goUp = () => {
        if (window.scrollY > 100) {
            backToTopBtn.classList.add('active')
        } else {
            backToTopBtn.classList.remove('active')
        }
    }
    window.addEventListener('load', goUp);
    document.addEventListener("click", goUp())
}

// Activating Features Box 
middleBoxes.forEach((box) => {
    box.onclick = () => {
        middleBoxes.forEach((otherBoxes) => {
            otherBoxes.classList.remove('active-box');
        })
        box.classList.add('active-box');

    }
})



// Handling Activated Filter & Apply Filter On Images
filters.forEach((filter) => {
    // Filter Activation
    filter.onclick = () => {
        filters.forEach((otherFilters) => {
            otherFilters.classList.remove('active-filter');
        })
        filter.classList.add('active-filter');
    }

    // Apply Filter 
    filter.addEventListener('click', function () {
        portfolioBoxes.forEach((box) => {
            box.classList.remove('removed');
            box.classList.add('stays');

            const filterCategory = filter.dataset.filter;
            const boxCategory = box.dataset.category;
            if (filterCategory == 'all') {
                box.classList.add('stays');
            } else if (boxCategory !== filterCategory) {
                box.classList.remove('stays');
                box.classList.add('removed');
            }
        })
    })
})



// Toggling Faq Items & Open Class - Styling
function toggleItems(i) {
    const faqContent = i.querySelector(".faq-content");

    if (i.classList.contains('faq-open')) {

        faqContent.removeAttribute('style');

        i.classList.remove("faq-open");

    } else {

        faqContent.style.height = faqContent.scrollHeight + 'px';

        i.classList.add("faq-open");

    }
}

// Showing & Disappearing FAQ Desc
faqItems.forEach((item) => {
    const faqHeader = item.querySelector(".faq-header");
    faqHeader.onclick = () => {
        const openItem = document.querySelector(".faq-open");
        toggleItems(item);

        if (openItem && openItem !== item) {
            toggleItems(openItem);
        }
    }
})











// Swiper Init 
var swiper = new Swiper('.testimonials-swiper', {
    speed: 600,
    loop: true,
    autoplay: {
        delay: 5000,
        disableOnInteraction: false
    },
    slidesPerView: 'auto',
    pagination: {
        el: '.swiper-pagination',
        type: 'bullets',
        clickable: true
    },
    breakpoints: {
        320: {
            slidesPerView: 1,
            spaceBetween: 20
        },

        1200: {
            slidesPerView: 3,
            spaceBetween: 20
        }
    }
});

//  Animation On Scroll Iint 
window.addEventListener('load', () => {
    AOS.init({
        duration: 1000,
        easing: 'ease-in-out',
        once: true,
        mirror: false
    })
});
