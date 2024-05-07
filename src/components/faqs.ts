/* COMPONENTS > FAQS

//// DATA ATTRIBUTES:
[cs-el="faq"]

[cs-el="faq-question"]
[cs-el="faq-answer"]
[cs-el="faq-icon"]
*/

import { gsap } from 'gsap';
import { ScrollToPlugin } from 'gsap/ScrollToPlugin';
gsap.registerPlugin(ScrollToPlugin);

// Export Initialize FAQs
export function initFaqs() {
  const faqs = gsap.utils.toArray<HTMLElement>('[cs-el="faq"]');
  let currentItem: number | null = null;
  if (faqs.length > 0) {
    faqs.forEach((faq, i) => {
      const faqAnswer = faq.querySelector<HTMLElement>('[cs-el="faqAnswer"]');
      const openButton = faq.querySelector<HTMLElement>('[cs-el="faqQuestion"]');
      const faqIcon = faq.querySelector<HTMLElement>('[cs-el="faqIcon"]');

      if (!faqAnswer) return;
      gsap.set(faqAnswer, { height: 0, opacity: 0 });
      const tl_openFaq = gsap.timeline({ paused: true });
      tl_openFaq.to(faqAnswer, {
        height: 'auto',
        opacity: 1,
        duration: 0.75,
      });
      tl_openFaq.to(faq, { paddingTop: '1rem' }, '<');
      tl_openFaq.to(faqAnswer, { marginBottom: '2rem' }, '<');
      tl_openFaq.to(faqIcon, { rotate: '45' }, '<');

      (faq as any)._accordionAnimation = tl_openFaq;

      faq?.addEventListener('click', (el) => {
        // Check if there is a currently active item
        if (currentItem !== null) {
          // Toggle the 'active' class of the currently active FAQ item
          faqs[currentItem].classList.toggle('active');

          // Check if the clicked FAQ item is the same as the currently active one
          if (currentItem === i) {
            // If yes, reset the currentItem and reverse the timeline animation
            currentItem = null;
            return tl_openFaq.timeScale(1).reverse();
          }

          // If not, reverse the animation of the currently active FAQ item
          (faqs[currentItem] as any)._accordionAnimation.reverse();
        }
        // ScrollTo
        // gsap.to(window, { duration: 1, scrollTo: { y: el.target, offsetY: 256, autoKill: false } });

        // Toggle the 'active' class of the clicked FAQ item
        faq.classList.toggle('active');

        // Play the timeline animation to open the FAQ
        tl_openFaq.timeScale(1).play();

        // Set the clicked FAQ item as the currently active one
        currentItem = i;
      });

      // const faqAnswer = faq.querySelector<HTMLElement>('[cs-el="faq-answer"]');
      // const faqIcon = faq.querySelector<HTMLElement>('[cs-el="faq-icon"]');
      // const hover = gsap.timeline({ paused: true });
      // const answerHeight = faqAnswer?.clientHeight ?? 0;
      // gsap.set(faqAnswer, { height: 0, opacity: 0 });
      // hover.to(faqIcon, { rotate: '45' });

      // hover.to(
      //   faqAnswer,
      //   {
      //     height: answerHeight,
      //     marginBottom: '1rem',
      //     duration: gsapDuration,
      //   },
      //   '<'
      // );
      // hover.to(
      //   faqAnswer,
      //   {
      //     opacity: 1,
      //     duration: 0.2,
      //   },
      //   '<0.25'
      // );

      // let isOpen = false;

      // faq.addEventListener('click', (event) => {
      //   const activeFaq = event.currentTarget as HTMLElement;

      //   const question = activeFaq.querySelector('[cs-el="faq-question"]');
      //   if (isOpen) {
      //     isOpen = false;
      //     hover.timeScale(1.5).reverse();
      //     question?.classList.remove('is-active');
      //     activeFaq?.classList.remove('is-open');
      //   } else {
      //     isOpen = true;
      //     hover.timeScale(1).play();
      //     question?.classList.add('is-active');
      //     activeFaq?.classList.add('is-open');
      //   }

      //   console.log('Is open: ' + isOpen);
      // });
    });
  }
} // End: Initialize all FAQs

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
