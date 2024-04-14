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
  //_______________________________________________________________________________________________________ Mouse Trail
  const mouseTrail = document.querySelector<HTMLElement>('[cs-el="mouseTrail"]');
  if (mouseTrail) {
    gsap.set(mouseTrail, { width: '150rem' });
    gsap.to(mouseTrail, { width: '50rem', autoAlpha: 1, duration: 2, delay: 0 });
    window.onpointermove = (event) => {
      const { clientX, clientY } = event;

      mouseTrail.animate(
        {
          left: `${clientX}px`,
          top: `${clientY}px`,
        },
        { duration: 3000, fill: 'forwards' }
      );

      // // Define the random position wiggle animation
      // gsap.to(mouseTrail, {
      //   x: () => Math.random() * 2 - 1, // Random x-axis movement within a range of -5 to 5
      //   y: () => Math.random() * 2 - 1, // Random y-axis movement within a range of -5 to 5
      //   duration: 0.5, // Adjust the duration of each cycle
      //   repeat: -1, // Repeat the animation indefinitely
      //   yoyo: true, // Yoyo back and forth for a smooth effect
      //   ease: 'power1.inOut', // Adjust the easing for different motion effects
      // });
    };
  }
  //_______________________________________________________________________________________________________ Init Modal
  //initModal();

  //_______________________________________________________________________________________________________ Init Sliders
  initSliders();

  //_______________________________________________________________________________________________________ Page Transition
  // Constant for delay time (in milliseconds)
  const delayTime = 500; // .5 second
  const mainWrapper = document.querySelector('.main-wrapper');

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

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  Nav Toggle Visibility
  //const navComponent = document.querySelector('[cs-el="navComponent"]');
  //const navTrigger = document.querySelector('[cs-el="navTrigger"]');
  //gsap.set(navComponent, { opacity: 0 });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  Split Types
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
  //----- END: Split Types -----------------------------------------------------------------//

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
  // const gradientElement = document.querySelector<HTMLElement>('[cs-el="resonateGradient"]');
  // //const pageWrapper = document.querySelector<HTMLElement>('[cs-el="pageWrapper"]');
  // const pageWrapper = document.querySelector<HTMLElement>('.main-wrapper');
  // // Check if the elements exist
  // if (gradientElement && pageWrapper) {
  //   // Initialize ScrollTrigger for the gradient animation
  //   const trigger = ScrollTrigger.create({
  //     trigger: pageWrapper, // Use pageWrapper as the trigger element
  //     start: 'top top', // Start the animation at the top of the pageWrapper
  //     end: 'bottom bottom', // End the animation at the bottom of the pageWrapper
  //     onUpdate: (self) => {
  //       // Get the progress of the scroll from 0 to 1
  //       const { progress } = self;
  //       // Calculate the g1_xPercent value based on the scroll progress
  //       //const g1_xPercent = progress * 100;
  //       //const g1_yPercent = progress * 100;
  //       //const transParentValue = 'hsla(0, 0.00%, 0.00%, 0.00)';
  //       const g1_xPercent = 100 - progress * 50; // Start at 100% and animate to 50%
  //       const g1_yPercent = 100 - progress * 80; // Start at 100% and animate to 20%
  //       const g2_yPercent = 100;
  //       const g2_xPercent = progress * 100;
  //       const g3_xPercent = 50 - progress * 50; // Start at 50% and animate to 0%
  //       const g3_yPercent = 25 + progress * 75; // Start at 25% and animate to 100%
  //       // Update the backgroundValue with the new g1_xPercent value
  //       const backgroundValue = `
  //         radial-gradient(circle farthest-corner at ${g1_xPercent}% ${g1_yPercent}%, var(--brand--blue-light), hsla(0, 0.00%, 0.00%, 0.00) 50%),
  //         radial-gradient(circle farthest-corner at ${g2_xPercent}% ${g2_yPercent}%, var(--brand--pink-light), hsla(0, 0.00%, 0.00%, 0.00) 50%),
  //         radial-gradient(circle farthest-corner at ${g3_xPercent}% ${g3_yPercent}%, var(--brand--mint-light), transparent 75%)`;
  //       // Apply the updated backgroundValue to the gradient element's style
  //       gradientElement.style.background = backgroundValue;
  //       //console.log(progress);
  //     },
  //   });
  // }

  // const gradientElement = document.querySelector<HTMLElement>('[cs-el="resonateGradient"]');
  // const pageWrapper = document.querySelector<HTMLElement>('.main-wrapper');

  // if (gradientElement && pageWrapper) {
  //   // Get the initial scroll position
  //   const initialScrollPosition = window.pageYOffset;

  //   // Calculate the initial progress based on the initial scroll position
  //   const initialProgress = initialScrollPosition / (pageWrapper.scrollHeight - window.innerHeight);

  //   // Calculate the initial values based on the initial progress
  //   const initial_g1_xPercent = 100 - initialProgress * 50;
  //   const initial_g1_yPercent = 100 - initialProgress * 80;
  //   const initial_g2_yPercent = 100;
  //   const initial_g2_xPercent = initialProgress * 100;
  //   const initial_g3_xPercent = 50 - initialProgress * 50;
  //   const initial_g3_yPercent = 25 + initialProgress * 75;

  //   const gradientSize = 60;
  //   // Apply the initial background value
  //   const initialBackgroundValue = `
  //       radial-gradient(circle farthest-corner at ${initial_g1_xPercent}% ${initial_g1_yPercent}%, var(--brand--blue-light), hsla(0, 0.00%, 0.00%, 0.00) ${gradientSize}%),
  //       radial-gradient(circle farthest-corner at ${initial_g2_xPercent}% ${initial_g2_yPercent}%, var(--brand--pink-light), hsla(0, 0.00%, 0.00%, 0.00) ${gradientSize}%),
  //       radial-gradient(circle farthest-corner at ${initial_g3_xPercent}% ${initial_g3_yPercent}%, var(--brand--mint-light), transparent ${gradientSize}%)`;

  //   gradientElement.style.backgroundImage = initialBackgroundValue;

  //   // Initialize ScrollTrigger for the gradient animation
  //   ScrollTrigger.create({
  //     trigger: pageWrapper, // Use pageWrapper as the trigger element
  //     start: 'top top', // Start the animation at the top of the pageWrapper
  //     end: 'bottom bottom', // End the animation at the bottom of the pageWrapper
  //     onUpdate: (self) => {
  //       // Get the progress of the scroll from 0 to 1
  //       const { progress } = self;

  //       // Calculate the updated values based on the scroll progress
  //       const g1_xPercent = 100 - progress * 50;
  //       const g1_yPercent = 100 - progress * 80;
  //       const g2_yPercent = 100;
  //       const g2_xPercent = progress * 100;
  //       const g3_xPercent = 50 - progress * 50;
  //       const g3_yPercent = 25 + progress * 75;

  //       // Update the backgroundValue with the new values
  //       const backgroundValue = `
  //               radial-gradient(circle farthest-corner at ${g1_xPercent}% ${g1_yPercent}%, var(--brand--blue-light), hsla(0, 0.00%, 0.00%, 0.00) ${gradientSize}%),
  //               radial-gradient(circle farthest-corner at ${g2_xPercent}% ${g2_yPercent}%, var(--brand--pink-light), hsla(0, 0.00%, 0.00%, 0.00) ${gradientSize}%),
  //               radial-gradient(circle farthest-corner at ${g3_xPercent}% ${g3_yPercent}%, var(--brand--mint-light), transparent ${gradientSize}%)`;

  //       // Apply the updated backgroundValue to the gradient element's style
  //       gradientElement.style.background = backgroundValue;
  //     },
  //   });
  // }
}); // End: Webflow Push
