export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'accordion-container';
  const attrAccordions = config.attrAccordions;
  const attrKey = config.attrAccordionContainer;
  const classKey = config.classAccordionContainer;
  const selectorAccordion = config.selectorAccordion;

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14z"></path></svg>`,  
        name: 'Accordion Container',
        draggable: `[${attrAccordions}]`,
        droppable: `[${config.attrAccordionContent}]`,
        copyable: false,
        removable: false,
        ...config.accordionContainerProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
        const accordions = this.components();
        this.listenTo(accordions, 'add', this.onAdd);
        this.listenTo(accordions, 'remove', this.onRemove);
      },

      onRemove(model, value, opts = {}) {
        const accordionContent = model.accordionContent;

        // I'll remove the accordionContent only if I'm sure that accordion is
        // removed from the collection
          accordionContent && setTimeout(() => {
          const coll = model.collection;
          const accordionColl = accordionContent.collection;
          !coll && accordionColl && accordionColl.remove(accordionContent);
        }, 0);
      },

      onAdd(model, value, opts = {}) {
        const comps = this.components();
        const attrs = model.getAttributes();

        if (!model.accordionContent && !opts.avoidStore) {
          const selCont = attrs[selectorAccordion];
          const modelAccordions = this.closest(`[${attrAccordions}]`);
          const modelAccordionsV = modelAccordions.view;
          const accordionContEl = selCont && modelAccordions.view.$el.find(selCont);


          // If the accordion content was found I'll attach it to the accordion model
          // otherwise I'll create e new one
          if (accordionContEl.length) {
            model.accordionContent = accordionContEl.data('model');
          } else {
            const accordionContent = modelAccordions.components().add({
              type: 'accordion-content',
              components: config.templateAccordionContent,
            });
            const id = accordionContent.getId();
            accordionContent.addAttributes({ id });
            model.addAttributes({ [selectorAccordion]: `#${id}` });
            model.accordionContent = accordionContent;
            accordionContent.getEl().style.display = 'none';
          }
        }
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrKey)) {
          return { type };
        }
      },
    }),

    view: defaultView,
  });
}
