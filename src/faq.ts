import './global';

import { initFaqs } from 'src/components/faqs';

window.Webflow ||= [];
window.Webflow.push(() => {
  initFaqs();
});
