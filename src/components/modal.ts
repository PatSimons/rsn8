/* COMPONENTS > MODAL
/* April 2024

//// DATA ATTRIBUTES:
[cs-el="modal"]
[cs-el="modalPanel"]
[cs-el="modalTrigger"]
*/

import { gsap } from 'gsap';

// Export Initialise Modal
export function initModal() {
  //_______________________________________________________________________________________________________ Login Modal
  const loginModal = gsap.utils.toArray('[cs-el="modal"]');
  if (loginModal.length > 0) {
    gsap.set(loginModal, { autoAlpha: 0 });
    let isOpen = false;
    const body = document.querySelector('body');
    const modalPanel = document.querySelector('[cs-el="modalPanel"]');
    const modalTriggers = gsap.utils.toArray('[cs-el="modalTrigger"]');

    const openModal = gsap.timeline({ paused: true });
    openModal.to(loginModal, { autoAlpha: 1, duration: 1 });
    openModal.from(modalPanel, { opacity: 0, xPercent: 5, ease: 'back.out' }, '<.25');
    modalTriggers.forEach((trigger: any) => {
      trigger.addEventListener('click', () => {
        if (isOpen) {
          openModal.timeScale(2).reverse();
          body?.classList.toggle('overflow-hidden');
          isOpen = false;
        } else {
          openModal.timeScale(1).play();
          body?.classList.toggle('overflow-hidden');
          isOpen = true;
        }
      });
    });
  }
} // End: Initialize Modal

///////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
