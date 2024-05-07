import './global';

//import { gsap } from './global';
//import { ScrollTrigger } from './global';

// Wait for Webflow to load
window.Webflow = window.Webflow || [];
window.Webflow.push(() => {
  // Global code that applies to all devices
  // This code will execute once Webflow is loaded

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
      // Callback function
      const { isDesktop, isMobile } = context.conditions;

      // Example: Change background color based on device type
      if (isDesktop) {
        console.log('is Desktop');
      } else if (isMobile) {
        console.log('is Mobile');
      }
      return () => {
        // optionally return a cleanup function that will be called when none of the conditions match anymore (after having matched)
        // it'll automatically call context.revert() - do NOT do that here . Only put custom cleanup code here.
      };
    }
  );

  // Additional global code that applies to all devices
  // This code will also execute once Webflow is loaded
});
