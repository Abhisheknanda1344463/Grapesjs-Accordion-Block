export default (dc, { linkModel, linkView, ...config }) => {
  const type = 'accordion';
  const attrKey = config.attrAccordion;
  const classKey = config.classAccordion;
  const selectorAccordion = config.selectorAccordion;

  dc.addType(type, {
    model: linkModel.extend({
      defaults: { ...linkModel.prototype.defaults,
        icon: `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24"><path d="M19 3H5c-1.11 0-2 .89-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5a2 2 0 0 0-2-2m0 2v14H5V5h14z"></path></svg>`,
        name: 'Accordion',
        draggable: `[${config.attrAccordionContainer}]`,
        droppable: false,
          copyable: false,
        ...config.accordionProps
      },

      init() {
        const attrs = this.getAttributes();
        attrs[attrKey] = 1;
        this.setAttributes(attrs);
        classKey && this.addClass(classKey);
      },

      clone() {
        const cloned = linkModel.prototype.clone.apply(this, arguments);
        cloned.addAttributes({ [selectorAccordion]: '' });
        return cloned;
      }
    }, {
      isComponent(el) {
        if (el.hasAttribute && el.hasAttribute(attrKey)) {
          return { type };
        }
      },
    }),
    view: linkView,
  });
}
