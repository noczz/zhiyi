/**
* Site Name: 智衣科技
* Site URL: http://zhiyi.iipcloud.com
* Updated: July 22 2024
* Author: 智衣团队
* License: None
*/

(function() {
  "use strict";

  /**
   * Apply .scrolled class to the body as the page is scrolled down
   */
  function toggleScrolled() {
    const selectBody = document.querySelector('body');
    const selectHeader = document.querySelector('#header');
    if (!selectHeader.classList.contains('scroll-up-sticky') && !selectHeader.classList.contains('sticky-top') && !selectHeader.classList.contains('fixed-top')) return;
    window.scrollY > 100 ? selectBody.classList.add('scrolled') : selectBody.classList.remove('scrolled');
  }

  document.addEventListener('scroll', toggleScrolled);
  window.addEventListener('load', toggleScrolled);

  /**
   * Mobile nav toggle
   */
  const mobileNavToggleBtn = document.querySelector('.mobile-nav-toggle');

  function mobileNavToogle() {
    document.querySelector('body').classList.toggle('mobile-nav-active');
    mobileNavToggleBtn.classList.toggle('bi-list');
    mobileNavToggleBtn.classList.toggle('bi-x');
  }
  mobileNavToggleBtn.addEventListener('click', mobileNavToogle);

  /**
   * Hide mobile nav on same-page/hash links
   */
  document.querySelectorAll('#navmenu a').forEach(navmenu => {
    navmenu.addEventListener('click', () => {
      if (document.querySelector('.mobile-nav-active')) {
        mobileNavToogle();
        console.log("navmenu toggle")
      }
      console.log("navmenu clicked");
    });

  });

  /**
   * Toggle mobile nav dropdowns
   */
  document.querySelectorAll('.navmenu .toggle-dropdown').forEach(navmenu => {
    navmenu.addEventListener('click', function(e) {
      if (document.querySelector('.mobile-nav-active')) {
        e.preventDefault();
        this.parentNode.classList.toggle('active');
        this.parentNode.nextElementSibling.classList.toggle('dropdown-active');
        e.stopImmediatePropagation();
      }
    });
  });

  /**
   * Float block
   */

  // btn-wechat
  var btnWechat = document.getElementById('btn-wechat');
  var popWechat = document.getElementById('pop-wechat');

  btnWechat.addEventListener('mouseover', function() {
    popWechat.classList.add('active');
  });

  btnWechat.addEventListener('mouseout', function() {
    popWechat.classList.remove('active');
  });

  // btn-phone
  var btnPhone = document.getElementById('btn-phone');
  var popPhone = document.getElementById('pop-phone');

  btnPhone.addEventListener('mouseover', function() {
    popPhone.classList.add('active');
  });

  btnPhone.addEventListener('mouseout', function() {
    popPhone.classList.remove('active');
  });

  /**
   * Preloader
   * Animation on scroll function and init
   */
  function aosInit() {
    AOS.init({
      duration: 600,
      easing: 'ease-in-out',
      once: true,
      mirror: false
    });
  }
 
  document.addEventListener('DOMContentLoaded', function() {
    const preloader = document.querySelector('#preloader');
    var heroSection = document.getElementById('hero');
    var heroImgs = heroSection.getElementsByTagName('img');
    var loadedCount = 0;
    var totalImgs = heroImgs.length;

    function checkAllImagesLoaded() {
        if (++loadedCount >= totalImgs) {
            preloader.remove();
            setTimeout(() => {
              aosInit();
              // AOS.refresh();
            }, 100);
        }
    }


    for (var i = 0; i < heroImgs.length; i++) {
      heroImgs[i].addEventListener('load', checkAllImagesLoaded);
      if (heroImgs[i].complete && heroImgs[i].naturalWidth !== 0) {
          checkAllImagesLoaded();
        }
      // console.log('loadedCount: ' + loadedCount);
    }
  }); // })
 


  /**
   * Frequently Asked Questions Toggle
   */
  document.querySelectorAll('.faq-item h3, .faq-item .faq-toggle').forEach((faqItem) => {
    faqItem.addEventListener('click', () => {
      faqItem.parentNode.classList.toggle('faq-active');
    });
  });

  /**
   * Init swiper sliders
   */
  function initSwiper() {
    document.querySelectorAll('.swiper').forEach(function(swiper) {
      let config = JSON.parse(swiper.querySelector('.swiper-config').innerHTML.trim());
      new Swiper(swiper, config);
    });
  }
  window.addEventListener('load', initSwiper);

  /**
   * Correct scrolling position upon page load for URLs containing hash links.
   */
  window.addEventListener('load', function(e) {
    if (window.location.hash) {
      if (document.querySelector(window.location.hash)) {
        setTimeout(() => {
          let section = document.querySelector(window.location.hash);
          let scrollMarginTop = getComputedStyle(section).scrollMarginTop;
          window.scrollTo({
            top: section.offsetTop - parseInt(scrollMarginTop),
            behavior: 'smooth'
          });
        }, 100);
      }
    }
  });

  /**
   * Navmenu Scrollspy
   */
  let navmenulinks = document.querySelectorAll('.navmenu a');

  function navmenuScrollspy() {
    navmenulinks.forEach(navmenulink => {
      if (!navmenulink.hash) return;
      let section = document.querySelector(navmenulink.hash);
      if (!section) return;
      let position = window.scrollY + 200;
      if (position >= section.offsetTop && position <= (section.offsetTop + section.offsetHeight)) {
        document.querySelectorAll('.navmenu a.active').forEach(link => link.classList.remove('active'));
        navmenulink.classList.add('active');
      } else {
        navmenulink.classList.remove('active');
      }
    })
  }
  window.addEventListener('load', navmenuScrollspy);
  document.addEventListener('scroll', navmenuScrollspy);

})();
