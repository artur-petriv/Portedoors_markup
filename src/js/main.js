const $ = require("jquery")
window.jQuery = $
require("owl.carousel")
require("@fancyapps/fancybox")

document.addEventListener("DOMContentLoaded", function () {
    takeDate()
    initMap()

    // Variables
    const mapBox = document.getElementById("map")
    const popup = document.querySelector(".popup")
    const body = document.querySelector(".body")
    const buttons = document.querySelectorAll(".btn")
    const closeBtn = document.querySelector(".popup__close-btn")
    const overlay = document.querySelector(".popup__overlay")

    // Add EventListener for all buttons
    buttons.forEach((btn) => {
        btn.addEventListener("click", openPopup)
    })

    // Add EventListener for close popup button and click out of popup
    closeBtn.addEventListener("click", closePopup)
    overlay.addEventListener("click", (e) => {
        e.target.closest(".popup__container") || closePopup()
    })

    // Open popup function
    function openPopup(e) {
        e.preventDefault()
        e.stopPropagation()

        popup.style.display = "block"
        body.classList.add("overflow-hidden")
        // Add setTimeout for animation will work
        setTimeout(function () {
            overlay.classList.add("is-visible")
            closeBtn.parentElement.classList.add("open")
        }, 50)
    }

    // Close popup function
    function closePopup() {
        body.classList.remove("overflow-hidden")
        closeBtn.parentElement.classList.add("close-animation")
        overlay.classList.remove("is-visible")
        // Add setTimeout for animation will work
        setTimeout(function () {
            popup.style.display = "none"
            closeBtn.parentElement.classList.remove("open")
            closeBtn.parentElement.classList.remove("close-animation")
        }, 150)
    }

    // Get current data function
    function takeDate() {
        const today = new Date()
        const endDate = new Date()

        endDate.setDate(today.getDate() + 22)

        const dd = endDate.getDate().toString()
        const mm = (endDate.getMonth() + 1).toString()
        const yyyy = endDate.getFullYear().toString()
        const newDate =
        (mm[1] ? mm : "0" + mm[0]) +
        "/" +
        (dd[1] ? dd : "0" + dd[0]) +
        "/" +
        yyyy

        document.querySelectorAll(".expire").forEach(function (item) {
            item.innerHTML = newDate
        })
    }

    // Add EventListener for click on map description
    mapBox.addEventListener("click", () => {
        document.querySelector(".map__info").classList.add("map__info-b")
    })

    function initMap() {
        const map = new google.maps.Map(document.getElementById("map"), {
            center: {
                lat: 45.557185,
                lng: -73.43078,
            },
            zoom: 13,
            disableDefaultUI: !0,
        })
        const marker = new google.maps.Marker({
            map,
            position: {
                lat: 45.557185,
                lng: -73.43078,
            },
            title: "Our office:",
            icon: {
                url: "img/map-marker.png",
                scaledSize: new google.maps.Size(45, 45),
            },
        })
        marker.addListener("click", function () {
            // info.open(map, marker)
        })
    }

    // Ajax post request email form
    $("#form-email").submit(function (e) {
        e.preventDefault()

        // Email validation length
        if (e.target.email.value.length < 11) {
            e.target.email.style.border = "1px solid #e80000"
            $(".form-tg__error").css({ display: "block" })

        } else {
            e.target.email.style.border = "none"
            $(".form-tg__error").css({ display: "none" })
        }

        const form = $(e.target)
        const serializedData = form.serialize()

        const request = $.ajax({
            url: "/order.php",
            type: "post",
            data: serializedData,
        })
        request.done(function (res) {
            window.location.href = res.redirect_url
        })
        request.fail(function (textStatus, errorThrown) {
            // eslint-disable-next-line no-console
            console.error("The following error occurred: " + textStatus, errorThrown)
        })
        request.always(function () {
            // Reenable the inputs
            // $inputs.prop("disabled", false);
        })
    })

    // Ajax post request popup form
    $("#popup-form").submit(function (e) {
        e.preventDefault()

        // Popup validation length
        if (e.target.phone.value.length <= 6 && e.target.name.value.length <= 2) {
            e.target.name.style.border = "1px solid #e80000"
            e.target.phone.style.border = "1px solid #e80000"
        } else if (e.target.name.value.length <= 2) {
            e.target.phone.style.border = "none"
        } else if (e.target.phone.value.length <= 6) {
            e.target.phone.style.border = "1px solid #e80000"
            e.target.name.style.border = "none"
        } else {
            e.target.name.style.border = "none"
            e.target.phone.style.border = "none"
        }


        const form = $(e.target)
        const serializedData = form.serialize()

        const request = $.ajax({
            url: "/order.php",
            type: "post",
            data: serializedData,
        })
        request.done(function (res) {
            window.location.href = res.redirect_url
        })
        request.fail(function (jqXHR, textStatus, errorThrown) {
            // eslint-disable-next-line no-console
            console.error("The following error occurred: " + textStatus, errorThrown)
        })
        request.always(function () {
            // Reenable the inputs
            // $inputs.prop("disabled", false);
        })
    })
})

$(document).ready(function () {
    // Main
    $(".owl-main").owlCarousel({
        items: 1,
        autoHeight: true,
        lazyLoad: false,
        loop: true,
        nav: false,
        dots: true,
        autoplay: true,
        autoplayTimeout: 6000,
        smartSpeed: 600,
        responsive: {
            0: {
                autoplay: false,
            },
            950: {
                autoplay: true,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End Main

    // Advantage
    $(".owl-adv").owlCarousel({
        loop: true,
        nav: false,
        dots: true,
        lazyLoad: false,
        stagePadding: 15,
        margin: -1,
        navText: [
            "<div class='nav-btn prev-slide'><svg width='9' height='17' viewBox='0 0 9 17' fill='none' xmlns='http://www.w3.org/2000/svg'><g><path d='M8.23133 15.8041C8.33675 15.9055 8.46854 15.9562 8.6135 15.9562C8.75846 15.9562 8.89024 15.9055 8.99567 15.8041C9.20652 15.6014 9.20652 15.2719 8.99567 15.0692L2.27474 8.60676L8.99567 2.14432C9.20652 1.94158 9.20652 1.61212 8.99567 1.40938C8.78482 1.20664 8.44218 1.20664 8.23133 1.40938L1.12823 8.23929C0.917373 8.44203 0.917373 8.77149 1.12823 8.97423L8.23133 15.8041Z' fill='black'/></g></svg><div>",
            "<div class='nav-btn next-slide'><svg width='9px' height='17px' viewBox='0 0 7 13' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.705488 12.0855C0.624868 12.163 0.524092 12.2017 0.41324 12.2017C0.302387 12.2017 0.201611 12.163 0.120991 12.0855C-0.040249 11.9304 -0.040249 11.6785 0.120991 11.5234L5.26053 6.58158L0.120991 1.63972C-0.040249 1.48468 -0.040249 1.23274 0.120991 1.0777C0.282232 0.922666 0.544247 0.922666 0.705488 1.0777L6.13727 6.30057C6.29851 6.45561 6.29851 6.70755 6.13727 6.86259L0.705488 12.0855Z' fill='black'/></svg></div>",
        ],
        responsive: {
            0: {
                items: 1,
            },
            400: {
                items: 2,
            },
            600: {
                items: 3,
            },
            768: {
                items: 4,
            },
            1024: {
                items: 5,
                loop: false,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End Advantage

    // Best
    $(".owl-best").owlCarousel({
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        margin: 30,
        navText: [
            "<div class='nav-btn prev-slide'><svg width='9' height='17' viewBox='0 0 9 17' fill='none' xmlns='http://www.w3.org/2000/svg'><g><path d='M8.23133 15.8041C8.33675 15.9055 8.46854 15.9562 8.6135 15.9562C8.75846 15.9562 8.89024 15.9055 8.99567 15.8041C9.20652 15.6014 9.20652 15.2719 8.99567 15.0692L2.27474 8.60676L8.99567 2.14432C9.20652 1.94158 9.20652 1.61212 8.99567 1.40938C8.78482 1.20664 8.44218 1.20664 8.23133 1.40938L1.12823 8.23929C0.917373 8.44203 0.917373 8.77149 1.12823 8.97423L8.23133 15.8041Z' fill='black'/></g></svg><div>",
            "<div class='nav-btn next-slide'><svg width='9px' height='17px' viewBox='0 0 7 13' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.705488 12.0855C0.624868 12.163 0.524092 12.2017 0.41324 12.2017C0.302387 12.2017 0.201611 12.163 0.120991 12.0855C-0.040249 11.9304 -0.040249 11.6785 0.120991 11.5234L5.26053 6.58158L0.120991 1.63972C-0.040249 1.48468 -0.040249 1.23274 0.120991 1.0777C0.282232 0.922666 0.544247 0.922666 0.705488 1.0777L6.13727 6.30057C6.29851 6.45561 6.29851 6.70755 6.13727 6.86259L0.705488 12.0855Z' fill='black'/></svg></div>",
        ],
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 2,
            },
            900: {
                items: 3,
            },
            1100: {
                items: 4,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End Best

    // Hardware
    $(".owl-hardware").owlCarousel({
        lazyLoad: true,
        loop: false,
        nav: true,
        dots: false,
        margin: 30,
        navText: [
            "<div class='nav-btn prev-slide'><svg width='9' height='17' viewBox='0 0 9 17' fill='none' xmlns='http://www.w3.org/2000/svg'><g><path d='M8.23133 15.8041C8.33675 15.9055 8.46854 15.9562 8.6135 15.9562C8.75846 15.9562 8.89024 15.9055 8.99567 15.8041C9.20652 15.6014 9.20652 15.2719 8.99567 15.0692L2.27474 8.60676L8.99567 2.14432C9.20652 1.94158 9.20652 1.61212 8.99567 1.40938C8.78482 1.20664 8.44218 1.20664 8.23133 1.40938L1.12823 8.23929C0.917373 8.44203 0.917373 8.77149 1.12823 8.97423L8.23133 15.8041Z' fill='black'/></g></svg><div>",
            "<div class='nav-btn next-slide'><svg width='9px' height='17px' viewBox='0 0 7 13' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.705488 12.0855C0.624868 12.163 0.524092 12.2017 0.41324 12.2017C0.302387 12.2017 0.201611 12.163 0.120991 12.0855C-0.040249 11.9304 -0.040249 11.6785 0.120991 11.5234L5.26053 6.58158L0.120991 1.63972C-0.040249 1.48468 -0.040249 1.23274 0.120991 1.0777C0.282232 0.922666 0.544247 0.922666 0.705488 1.0777L6.13727 6.30057C6.29851 6.45561 6.29851 6.70755 6.13727 6.86259L0.705488 12.0855Z' fill='black'/></svg></div>",
        ],
        responsive: {
            0: {
                items: 1,
                margin: 0,
            },
            550: {
                items: 2,
            },
            750: {
                items: 3,
            },
            1024: {
                items: 4,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End Hardware

    // Frame
    $(".owl-frame").owlCarousel({
        items: 1,
        lazyLoad: true,
        loop: true,
        nav: false,
        dots: true,
        responsive: {
            0: {
                items: 1,
            },
            600: {
                items: 1,
            },
            1000: {
                items: 1,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End Frame

    // Achievement
    $(".owl-achi").owlCarousel({
        lazyLoad: true,
        loop: true,
        nav: true,
        dots: false,
        margin: 30,
        navText: [
            "<div class='nav-btn prev-slide'><svg width='9' height='17' viewBox='0 0 9 17' fill='none' xmlns='http://www.w3.org/2000/svg'><g><path d='M8.23133 15.8041C8.33675 15.9055 8.46854 15.9562 8.6135 15.9562C8.75846 15.9562 8.89024 15.9055 8.99567 15.8041C9.20652 15.6014 9.20652 15.2719 8.99567 15.0692L2.27474 8.60676L8.99567 2.14432C9.20652 1.94158 9.20652 1.61212 8.99567 1.40938C8.78482 1.20664 8.44218 1.20664 8.23133 1.40938L1.12823 8.23929C0.917373 8.44203 0.917373 8.77149 1.12823 8.97423L8.23133 15.8041Z' fill='black'/></g></svg><div>",
            "<div class='nav-btn next-slide'><svg width='9px' height='17px' viewBox='0 0 7 13' fill='none' xmlns='http://www.w3.org/2000/svg'><path d='M0.705488 12.0855C0.624868 12.163 0.524092 12.2017 0.41324 12.2017C0.302387 12.2017 0.201611 12.163 0.120991 12.0855C-0.040249 11.9304 -0.040249 11.6785 0.120991 11.5234L5.26053 6.58158L0.120991 1.63972C-0.040249 1.48468 -0.040249 1.23274 0.120991 1.0777C0.282232 0.922666 0.544247 0.922666 0.705488 1.0777L6.13727 6.30057C6.29851 6.45561 6.29851 6.70755 6.13727 6.86259L0.705488 12.0855Z' fill='black'/></svg></div>",
        ],
        responsive: {
            0: {
                items: 1,
                margin: 0,
            },
            500: {
                items: 2,
            },
            1024: {
                items: 3,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End Achievement

    // More
    $(".owl-more").owlCarousel({
        lazyLoad: false,
        loop: false,
        nav: false,
        dots: true,
        stagePadding: 15,
        margin: -1,
        responsive: {
            0: {
                items: 1,
                margin: 20,
                loop: true,
            },
            500: {
                items: 2,
                loop: true,
            },
            1024: {
                items: 3,
            },
        },
        responsiveBaseElement: "#container",
    })
    // End More
})
