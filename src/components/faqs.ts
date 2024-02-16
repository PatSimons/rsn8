/* COMPONENTS > FAQS

//// DATA ATTRIBUTES:
[cs-el="faq"]

[cs-el="faq-question"]
[cs-el="faq-answer"]
[cs-el="faq-icon"]
*/

import { gsap } from 'gsap';

import { gsapDuration, gsapEaseType } from '$utils/globalvars';

// Export Initialize FAQs
export function initFaqs() {
  const faqs = document.querySelectorAll<HTMLElement>('[cs-el="faq"]');
  if (faqs) {
    faqs.forEach((faq) => {
      const faqAnswer = faq.querySelector<HTMLElement>('[cs-el="faq-answer"]');
      const faqIcon = faq.querySelector<HTMLElement>('[cs-el="faq-icon"]');
      const hover = gsap.timeline({ paused: true });
      const answerHeight = faqAnswer?.clientHeight ?? 0;
      gsap.set(faqAnswer, { height: 0, opacity: 0 });
      hover.to(faqIcon, { rotate: '45' });

      hover.to(
        faqAnswer,
        {
          height: answerHeight,
          marginBottom: '1rem',
          duration: gsapDuration,
        },
        '<'
      );
      hover.to(
        faqAnswer,
        {
          opacity: 1,
          duration: 0.2,
        },
        '<0.25'
      );

      let isOpen = false;

      faq.addEventListener('click', (event) => {
        const activeFaq = event.currentTarget as HTMLElement;

        // const openFaq = document.querySelector('.is-open');
        // const openFaqAnswer = openFaq?.querySelector<HTMLElement>('[cs-el="faq-answer"]');
        // const openFaqQuestion = openFaq?.querySelector<HTMLElement>('[cs-el="faq-question"]');

        // if (openFaqAnswer && !activeFaq.classList.contains('is-open')) {
        //   openFaq?.classList.remove('is-open');
        //   openFaqQuestion?.classList.remove('is-active');

        //   gsap.to(openFaqAnswer, {
        //     opacity: 0,
        //     height: 0,
        //     ease: gsapEaseType,
        //     duration: gsapDuration,
        //   });
        // }

        const question = activeFaq.querySelector('[cs-el="faq-question"]');
        if (isOpen) {
          isOpen = false;
          hover.timeScale(1.5).reverse();
          question?.classList.remove('is-active');
          activeFaq?.classList.remove('is-open');
        } else {
          isOpen = true;
          hover.timeScale(1).play();
          question?.classList.add('is-active');
          activeFaq?.classList.add('is-open');
        }

        console.log('Is open: ' + isOpen);
      });
    });
  }
} // End: Initialize all FAQs

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
