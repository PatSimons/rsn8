import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);
//export { gsap };
//import { initFaqs } from 'src/components/faqs';
//import { initSliders } from 'src/components/sliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  Page Transition
  // Constant for delay time (in milliseconds)
  const delayTime = 1000; // 1 second

  // Function to handle page transitions
  function handlePageTransition(event: Event) {
    // Prevent default link behavior
    event.preventDefault();

    // Get the URL of the clicked link
    //const url = (event.target as HTMLAnchorElement).href;
    const url = (event.currentTarget as HTMLAnchorElement).href;
    console.log(url);

    // Add a delay before navigating to the new URL
    setTimeout(() => {
      window.location.href = url;
    }, delayTime);
  }

  // Add event listeners to all links
  document.querySelectorAll('a').forEach((link) => {
    link.addEventListener('click', handlePageTransition);
  });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  Scrolltriggers
  // Get all parent elements with the attribute 'parent'
  const parents = document.querySelectorAll('[cs-el="stParent"]');

  // Loop through each parent element
  parents.forEach((parent) => {
    // Get all child elements within the current parent
    const children = Array.from(parent.querySelectorAll('[cs-el="stChild"]'));

    // Create a ScrollTrigger for each child element within the current parent
    children.forEach((child) => {
      ScrollTrigger.create({
        trigger: child,
        start: 'bottom bottom', // Trigger animation when the bottom of the child enters the bottom of the viewport
        onToggle: (self) => {
          if (self.isActive) {
            // Fade in the child element
            gsap.to(child, { opacity: 1, y: '-1rem', duration: 1.5 });
          } else {
            // Optional: Fade out the child element when it exits the viewport
            gsap.to(child, { opacity: 0, y: '0rem', duration: 1.5 });
          }
        },
      });
    });
  });
  ////

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  Nav Toggle Visibility
  const navComponent = document.querySelector('[cs-el="navComponent"]');
  const navTrigger = document.querySelector('[cs-el="navTrigger"]');
  //gsap.set(navComponent, { opacity: 0 });

  // - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - - -  Split Types
  const splitTypes = gsap.utils.toArray<HTMLElement>('[cs-el="splitText-w"]');
  if (splitTypes.length > 0) {
    gsap.from(splitTypes, {
      autoAlpha: 0,
      y: '1rem',
      duration: 2,
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
          stagger: 0.2,
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
            yPercent: -30,
            //stagger: 0.05,
            ease: 'power2.in',
            scrollTrigger: {
              trigger: el,
              start: 'top 20%',
              end: 'top -20%',
              scrub: 1,
              markers: false,
            },
          }
        );
      }); // END: forEach
    } // END: if
  }
  //----- END: Split Types -----------------------------------------------------------------//

  const color1 = '#abe8ff'; // Blue-ish
  const color2 = '#7ecba9'; // Green-ish
  const color3 = '#b99da0'; // Pink-ish

  //initSliders();
  //initFaqs();

  // const gradientBg = document.querySelector('[cs-el="gradientBg"]');
  // const gradientBgTrigger = document.querySelector('[cs-el="gradientTrigger"]');

  // const timeline = gsap.timeline({
  //   scrollTrigger: {
  //     trigger: gradientBgTrigger,
  //     start: 'top top',
  //     end: 'bottom bottom',
  //     scrub: 1,
  //   },
  // });

  // timeline.fromTo(
  //   gradientBg,
  //   {
  //     background:
  //       'radial-gradient(circle farthest-corner at 50% 50%,' +
  //       //'radial-gradient(circle farthest-corner at 0% 0%,' +
  //       color1 +
  //       ', ' +
  //       color2 +
  //       ', ' +
  //       color3 +
  //       ')',
  //   }
  // );
}); // End: Webflow Push
