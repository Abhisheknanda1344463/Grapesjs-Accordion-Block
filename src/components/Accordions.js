export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'accordions';
  const attrAccordions = config.attrAccordions;

  dc.addType(type, {

    model: defaultModel.extend({
      defaults: {
        ...defaultModel.prototype.defaults,
        icon: `<svg viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg"><path d="M19,7 L18,6 L20,6 L19,7 Z M4,6 L15,6 L15,7 L4,7 L4,6 Z M3,8 L21,8 L21,9 L3,9 L3,8 Z"></path><path d="M3,5 L3,18 L21,18 L21,5 L3,5 Z M3,4 L21,4 C21.5522847,4 22,4.44771525 22,5 L22,18 C22,18.5522847 21.5522847,19 21,19 L3,19 C2.44771525,19 2,18.5522847 2,18 L2,5 C2,4.44771525 2.44771525,4 3,4 Z"></path></svg>`,
        copyable: true,
        name: 'Accordions',
        'attr-accordions': config.attrAccordions,
        'attr-accordion': config.attrAccordion,
        'attr-accordion-content': config.attrAccordionContent,
        'class-accordion-active': config.classAccordionActive,
        'selector-accordion': config.selectorAccordion,
        script() {
          var i;
          var el = this;
          var attrAccordions = '[' + '{[ attr-accordions ]}' + ']';
          var attrAccordion = '[' + '{[ attr-accordion ]}' + ']';
          var attrAccordionContent = '[' + '{[ attr-accordion-content ]}' + ']';
          var classAccordionActive = '{[ class-accordion-active ]}';
          var selectorAccordion = '{[ selector-accordion ]}';
          var body = document.body;
          var matches = body.matchesSelector || body.webkitMatchesSelector
            || body.mozMatchesSelector || body.msMatchesSelector;

          var hideContents = function() {
            var accordionContents = el.querySelectorAll(attrAccordionContent) || [];
            for (i = 0; i < accordionContents.length; i++) {
                accordionContents[i].style.display = 'none';
            }
          }

          var activeAccordion = function(accordionEl) {
            var accordions = el.querySelectorAll(attrAccordion) || [];

            for (i = 0; i < accordions.length; i++) {
                var accordion = accordions[i];
                var newClass = accordion.className.replace(classAccordionActive, '').trim();
                accordion.className = newClass;
            }

            hideContents();
              accordionEl.className += ' ' + classAccordionActive;
            var accordionContSelector = accordionEl.getAttribute(selectorAccordion);
            var accordionContent = el.querySelector(accordionContSelector);
              accordionContent && (accordionContent.style.display = '');
          };

          var accordionToActive = el.querySelector('.' + classAccordionActive + attrAccordion);
            accordionToActive = accordionToActive || el.querySelector(attrAccordion);
            accordionToActive && activeAccordion(accordionToActive);

          el.addEventListener('click', function(e) {
            var target = e.target;
            if(el.querySelector(target.getAttribute(selectorAccordion)).style.display === "block") {
                el.querySelector(target.getAttribute(selectorAccordion)).style.display = "none";
            }
            else{ el.querySelector(target.getAttribute(selectorAccordion)).style.display = "block";}
          });
        },
        ...config.accordionsProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[config.attrAccordions] = 1;
        this.setAttributes(attrs);
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrAccordions)) {
          return false;
        }
      },
    }),

    view: defaultView.extend({
      init() {
        const comps = this.model.components();
        !comps.length && comps.add(config.template);
      },

      onRender() {
        const accordionContainer = this.model.find(`[${config.attrAccordionContainer}]`)[0];
          accordionContainer && accordionContainer.components().each(accordion => {
              accordionContainer.onAdd(accordion);
        });
      }
    })
  });
}
