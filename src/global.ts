import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);

export { gsap };
export { ScrollTrigger };
//import { initModal } from 'src/components/modal';

//import { initFaqs } from 'src/components/faqs';
import { initSliders } from 'src/components/sliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  //_______________________________________________________________________________________________________ GSAP Match Media

  // Define breakpoint and initialize matchMedia
  const mm = gsap.matchMedia(),
    breakPoint = 800;

  // Add conditions and associated actions
  mm.add(
    {
      isDesktop: `(min-width: ${breakPoint}px)`,
      isMobile: `(max-width: ${breakPoint - 1}px)`,
    },
    (context) => {
      //_______________________________________________________________________________________________________ Nav
      const navOpen = document.querySelector('[cs-el="navOpen"]');
      const navMenu = document.querySelector('[cs-el="navMenu"]');
      const navItems = document.querySelectorAll('[cs-el="navItem"]');
      if (navMenu && navOpen) {
        navOpen.addEventListener('click', () => {
          if (!navMenu.classList.contains('is-open')) {
            navMenu.classList.add('is-open');
          } else {
            navMenu.classList.remove('is-open');
          }
        });
      }
      // Callback function
      const { isDesktop, isMobile } = context.conditions;
      //_______________________________________________________________________________________________________ Mouse Trail
      const mouseTrail = document.querySelector<HTMLElement>('[cs-el="mouseTrail"]');
      if (mouseTrail) {
        gsap.to(mouseTrail, {
          rotation: 360, // Rotate the element by 360 degrees
          duration: 4, // Duration of the rotation animation
          ease: 'none', // Linear ease for a constant speed rotation
          repeat: -1, // Repeat the animation infinitely
        });
        gsap.to(mouseTrail, {
          scale: 0.4, // Rotate the element by 360 degrees
          duration: 5, // Duration of the rotation animation
          ease: 'none', // Linear ease for a constant speed rotation
          repeat: -1, // Repeat the animation infinitely
          yoyo: true,
        });
      }
      if (mouseTrail && isDesktop) {
        gsap.to(mouseTrail, { autoAlpha: 0.8, duration: 2, delay: 0 });
        function initMouseTrail() {
          window.addEventListener('mousemove', (e) => {
            gsap.to(mouseTrail, {
              duration: 4,
              x: e.clientX - mouseTrail.clientWidth / 2,
              y: e.clientY - mouseTrail.clientHeight / 2,
              ease: 'back.out',
            });
          });
        }
        initMouseTrail();
      } else if (mouseTrail && isMobile) {
        gsap.to(mouseTrail, { autoAlpha: 0.9, duration: 2, delay: 0 });

        // function moveRandomly() {
        //   gsap.to(mouseTrail, {
        //     x: () => gsap.utils.random(0, window.innerWidth - mouseTrail.offsetWidth),
        //     y: () => gsap.utils.random(0, window.innerHeight - mouseTrail.offsetHeight),
        //     duration: 3, // Duration of the animation
        //     ease: 'power2.inOut',
        //     onComplete: moveRandomly, // Repeat the animation when completed
        //   });
        // }
        //moveRandomly();
      }

      //_______________________________________________________________________________________________________ Init Modal
      //initModal();

      //_______________________________________________________________________________________________________ Init Sliders
      initSliders();

      //_______________________________________________________________________________________________________ Page Transition
      // Constant for delay time (in milliseconds)
      const delayTime = 500; // .5 second
      const mainWrapper = document.querySelector('.main-wrapper');

      // Fade In main-wrapper on page load
      gsap.to(mainWrapper, { autoAlpha: 1, delay: 0.25, duration: 2 });

      // Function to handle page transitions
      function handlePageTransition(event: MouseEvent) {
        // Prevent default link behavior
        event.preventDefault();

        // Fade Out main-wrapper
        gsap.to(mainWrapper, { opacity: 0, duration: 0.5 });
        gsap.to(mouseTrail, { opacity: 0, duration: 0.5 });

        // Get the URL of the clicked link
        const url = (event.currentTarget as HTMLAnchorElement).href;

        // Add a delay before navigating to the new URL
        setTimeout(() => {
          window.location.href = url;
        }, delayTime);
      }

      // Add event listeners to all links
      document.querySelectorAll('a').forEach((link) => {
        // Check if the href attribute does not start with '#'
        if (!link.getAttribute('href')?.startsWith('#')) {
          link.addEventListener('click', handlePageTransition);
        }
      });

      //_______________________________________________________________________________________________________ Scrolltriggers

      const heroFooter = document.querySelector('[cs-el="heroFooter"]');
      if (heroFooter) {
        gsap.to(heroFooter, { autoAlpha: 1, delay: 2 });
        gsap.to(heroFooter, {
          opacity: 0,
          scrollTrigger: {
            trigger: heroFooter,
            start: 'top 85%',
            end: 'top 75%',
            scrub: 1,
            markers: false,
          },
        });
      }
      const fadeIns = document.querySelectorAll('[cs-tr="fadeIn"]');
      if (fadeIns.length > 0) {
        fadeIns.forEach((fadeIn) => {
          gsap.from(fadeIn, { opacity: 0 });
        });
      }
      // // Get all parent elements with the attribute 'parent'
      // const parents = document.querySelectorAll('[cs-st="parent"]');

      // // Loop through each parent element
      // parents.forEach((parent) => {
      //   // Get all child elements within the current parent
      //   const children = Array.from(parent.querySelectorAll('[cs-st="child"]'));

      //   // Create a ScrollTrigger for each child element within the current parent
      //   children.forEach((child) => {
      //     ScrollTrigger.create({
      //       trigger: child,
      //       start: 'bottom bottom', // Trigger animation when the bottom of the child enters the bottom of the viewport
      //       onToggle: (self) => {
      //         if (self.isActive) {
      //           // Fade in the child element
      //           gsap.to(child, { opacity: 1, y: '-1rem', duration: 1.5 });
      //         } else {
      //           // Optional: Fade out the child element when it exits the viewport
      //           gsap.to(child, { opacity: 0, y: '0rem', duration: 1.5 });
      //         }
      //       },
      //     });
      //   });
      // });

      //_______________________________________________________________________________________________________   Split Types
      const splitTypes = gsap.utils.toArray<HTMLElement>('[cs-el="splitText-w"]');
      if (splitTypes.length > 0) {
        gsap.from(splitTypes, {
          autoAlpha: 0,
          y: '1rem',
          duration: 1,
          ease: 'power1.out',
        });

        if (splitTypes.length > 0) {
          splitTypes.forEach((el) => {
            const splitType = new SplitType(el, { types: 'words' });

            gsap.from(splitType.words, {
              opacity: 0,
              y: '-1rem',
              duration: 4,
              scale: 1.1,
              ease: 'back.out',
              stagger: 0.4,
            });

            gsap.fromTo(
              el,
              {
                opacity: 1,
                yPercent: 0,
                scale: 1,
              },
              {
                opacity: 0,
                scale: 1.1,
                yPercent: -10,
                //stagger: 0.05,
                ease: 'linear',
                scrollTrigger: {
                  trigger: el,
                  start: 'top 40%',
                  end: 'top -30%',
                  scrub: 1,
                  markers: false,
                },
              }
            );
          }); // END: forEach
        } // END: if
      }

      //_______________________________________________________________________________________________________ Session Cards
      const sessionCards = gsap.utils.toArray<HTMLElement>('[cs-el="sessionCard"]');
      if (sessionCards.length > 0) {
        sessionCards.forEach((card) => {
          const sessionBG = card.querySelector('[cs-el="sessionBg"]');
          const sessionInfo = card.querySelector('[cs-el="sessionSummary"]');
          const tl_cardHover = gsap.timeline({ paused: true });
          tl_cardHover.to(card, {
            scale: 1.04,
            duration: 1,
            ease: 'sin.out',
            //backgroundColor: '#ffffff',
          });
          tl_cardHover.to(sessionBG, { opacity: 1, duration: 1, ease: 'sin.out' }, '<');
          tl_cardHover.to(sessionInfo, { opacity: 1, duration: 1, ease: 'sin.out' }, '<');
          card.addEventListener('mouseenter', () => {
            tl_cardHover.timeScale(1).play();
          });
          card.addEventListener('mouseleave', () => {
            tl_cardHover.timeScale(2).reverse();
          });
        });
      }
      //_______________________________________________________________________________________________________ Background Gradient
      const mint = '#bae5d0';
      const pink = '#e3ccce';
      const blue = '#acd5ea';
      const colorArray: string[] = [mint, pink, blue];

      const animatedGradientBackgroundElms = gsap.utils.toArray('[cs-el="resonateGradient"]');
      if (animatedGradientBackgroundElms.length > 0) {
        animatedGradientBackgroundElms.forEach((el: any) => {
          let currentColorIndex = 0;

          function changeGradientColor() {
            currentColorIndex = (currentColorIndex + 1) % colorArray.length;

            const color1 = colorArray[currentColorIndex];
            const color2 = colorArray[(currentColorIndex + 1) % colorArray.length];
            const color3 = colorArray[(currentColorIndex + 2) % colorArray.length];

            gsap.to(el, {
              duration: 2, // Adjust the duration as needed
              background: `linear-gradient(45deg, ${color1}, ${color2}, ${color3})`,
              onComplete: changeGradientColor,
            });
          }
          //changeGradientColor();
        });
      }

      // Example: Change background color based on device type
      if (isDesktop) {
        gsap.to('.box', { backgroundColor: 'blue' });
      } else if (isMobile) {
        gsap.to('.box', { backgroundColor: 'red' });
      }
      return () => {
        // Custom cleanup code here (optional)
      };
    } // Close (context)
  ); // Close mm.add
}); // End: Webflow Push
