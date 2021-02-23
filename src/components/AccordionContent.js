export default (dc, { defaultModel, defaultView, ...config }) => {
  const type = 'accordion-content';
  const attrKey = config.attrAccordionContent;
  const classKey = config.classAccordionContent;

  dc.addType(type, {
    model: defaultModel.extend({
      defaults: { ...defaultModel.prototype.defaults,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14z"></path></svg>`,
        name: 'Accordion Content',
        draggable: true,
        copyable: false,
        removable: true,
        ...config.accordionContentProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
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
