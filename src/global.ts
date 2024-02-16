import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import SplitType from 'split-type';

gsap.registerPlugin(ScrollTrigger);
//export { gsap };
//import { initFaqs } from 'src/components/faqs';
//import { initSliders } from 'src/components/sliders';

window.Webflow ||= [];
window.Webflow.push(() => {
  //// Page Transition
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

  //// END: Page Transition ////////////////////////////////////////////////////////////////////////////

  //// Scrolltriggers
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

  //// Nav Toggle Visibility ////////////////////////////////////////////////////////////////////////////
  const navComponent = document.querySelector('[cs-el="navComponent"]');
  const navTrigger = document.querySelector('[cs-el="navTrigger"]');
  gsap.set(navComponent, { opacity: 0 });

  //// END: Nav Toggle Visibility ////////////////////////////////////////////////////////////////////////////

  //// Split Types ////////////////////////////////////////////////////////////////////////////
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
          duration: 3,
          scale: 1.1,
          ease: 'back.out',
          stagger: 0.25,
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
  //// END: Split Types ////////////////////////////////////////////////////////////////////////////

  //// Set SVG Waves ////////////////////////////////////////////////////////////////////////////

  interface WaveOptions {
    numPoints: number;
    minHeight: number;
    maxHeight: number;
    minDuration: number;
    maxDuration: number;
    tl?: gsap.core.Timeline;
    points?: { x: number; y: number }[];
  }

  // Set SVG Waves
  let aniWave = true;
  const waves = document.querySelectorAll<HTMLElement>('[cs-el="waveWrap"]');
  const haveIt: HTMLElement[] = [];

  waves.forEach((wave) => {
    if (wave.classList.contains('static')) {
      aniWave = false;
    } else {
      aniWave = true;
    }

    const waveOptions: WaveOptions = {
      numPoints: random(3, 4),
      minHeight: 25,
      maxHeight: 300,
      minDuration: 6,
      maxDuration: 7,
    };

    const waveObject = createWave(wave, waveOptions);

    if (aniWave && waveObject.tl) {
      gsap.to(waveObject.tl, { duration: 0.3, timeScale: 1, onStart: () => waveObject.tl?.play() });
    }

    function createWave(el: HTMLElement, options: WaveOptions): WaveOptions {
      const points: { x: number; y: number }[] = [];
      const path = el.querySelector<SVGPathElement>('.p');

      if (aniWave) {
        options.tl = gsap.timeline({ onUpdate: update, paused: true });
      }

      points.push({ x: 1440, y: 320 });
      points.push({ x: 0, y: 320 });

      for (let i = 0; i < options.numPoints; i++) {
        const slice = 1440 / options.numPoints;
        const duration = random(options.minDuration, options.maxDuration);
        const point = { x: slice * i, y: random(options.minHeight, options.maxHeight) };

        if (aniWave && options.tl) {
          const tween = gsap.to(point, {
            duration,
            x: slice * i,
            y: random(options.minHeight, options.maxHeight),
            repeat: -1,
            yoyo: true,
            ease: 'sine.inOut',
          });

          options.tl.add(tween, -random(duration));
        }

        points.push(point);
      }

      options.points = points;

      if (!aniWave) {
        update();
      }

      function update() {
        if (path && options.points) {
          path.setAttribute('d', cardinal(options.points, true, 1.3));
        }
      }

      return options;
    }
  });

  function random(min: number, max: number): number {
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }

  function cardinal(data: { x: number; y: number }[], closed: boolean, tension: number): string {
    if (data.length < 1) return 'M0 0';
    if (tension == null) tension = 1;
    else tension = +tension;

    const size = data.length - (closed ? 0 : 1);
    let path = 'M' + data[0].x + ' ' + data[0].y + ' C';

    for (let i = 0; i < size; i++) {
      let p0, p1, p2, p3;

      if (closed) {
        p0 = data[(i - 1 + size) % size];
        p1 = data[i];
        p2 = data[(i + 1) % size];
        p3 = data[(i + 2) % size];
      } else {
        p0 = i === 0 ? data[0] : data[i - 1]; // If first point, copy next point
        p1 = data[i];
        p2 = data[i + 1] || p1; // If last point, copy previous point
        p3 = data[i + 2] || p2; // If last point, copy previous point
      }

      const x1 = p1.x + ((p2.x - p0.x) / 6) * tension;
      const y1 = p1.y + ((p2.y - p0.y) / 6) * tension;

      const x2 = p2.x - ((p3.x - p1.x) / 6) * tension;
      const y2 = p2.y - ((p3.y - p1.y) / 6) * tension;

      path += ' ' + x1 + ' ' + y1 + ' ' + x2 + ' ' + y2 + ' ' + p2.x + ' ' + p2.y;
    }

    return closed ? path + 'z' : path;
  }

  //// END: Set SVG Waves ////////////////////////////////////////////////////////////////////////////

  const color1 = '#abe8ff'; // Blue-ish
  const color2 = '#7ecba9'; // Green-ish
  const color3 = '#b99da0'; // Pink-ish

  //initSliders();
  //initFaqs();
  console.log('local');

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
  //   },
  //   {
  //     background:
  //       'radial-gradient(circle farthest-corner at 50% 50%,' +
  //       //'radial-gradient(circle farthest-corner at 0% 100%,' +
  //       color2 +
  //       ', ' +
  //       color3 +
  //       ', ' +
  //       color1 +
  //       ')',
  //   }
  // );

  // // Review Template - Set Nav
  // const postList = document.querySelector<HTMLElement>('[cs-el="postList"]');
  // if (postList) {
  //   const current = postList?.querySelector('.w--current');
  //   const nextElement = current?.parentElement?.nextElementSibling;
  //   const previousElement = current?.parentElement?.previousElementSibling;
  //   // Get the 'href' attribute of the <a> element from the next sibling
  //   const nextSrc = nextElement?.querySelector('a')?.getAttribute('href');
  //   // Get the 'href' attribute of the <a> element from the previous sibling
  //   const previousSrc = previousElement?.querySelector('a')?.getAttribute('href');
  //   // Select the next and previous buttons
  //   const nextButton = document.querySelector<HTMLAnchorElement>('[cs-el="nextPost"]');
  //   const previousButton = document.querySelector<HTMLAnchorElement>('[cs-el="previousPost"]');
  //   // Set the 'href' attribute of the next and previous buttons accordingly
  //   if (nextButton && nextSrc) {
  //     nextButton.href = nextSrc;
  //   } else {
  //     nextButton?.classList.add('is-muted');
  //   }
  //   if (previousButton && previousSrc) {
  //     previousButton.href = previousSrc;
  //   } else {
  //     previousButton?.classList.add('is-muted');
  //   }
  // }
  // // Reviews - Set Stars
  // const reviewStars = document.querySelectorAll<HTMLElement>('[cs-el="reviewStars"]');
  // if (reviewStars.length > 0) {
  //   reviewStars.forEach((el) => {
  //     const maxRating = 5;
  //     const rating = el?.getAttribute('rating');
  //     if (rating !== null) {
  //       for (let i = 0; i < maxRating; i++) {
  //         const childElement = el.children[i] as HTMLElement;
  //         const ratingValue = parseInt(rating, 10);
  //         if (i < ratingValue) {
  //           childElement.classList.add('is-active');
  //         } else {
  //           childElement.classList.remove('is-active');
  //         }
  //       }
  //     }
  //   });
  // }
}); // End: Webflow Push
