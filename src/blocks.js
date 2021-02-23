export default (editor, config = {}) => {
  const bm = editor.BlockManager;
  const accordionsBlock = config.accordionsBlock;
  const style = config.style;
  const type = 'accordions';
  const content = `<div data-gjs-type="${type}"></div>
    ${style ? `<style>${style}</style>` : ''}`;

  accordionsBlock && bm.add(type, {
    label: `
    <svg viewBox="0 0 24 24">
        <path d="M19,7 L18,6 L20,6 L19,7 Z M4,6 L15,6 L15,7 L4,7 L4,6 Z M3,8 L21,8 L21,9 L3,9 L3,8 Z"></path>
        <path d="M3,5 L3,18 L21,18 L21,5 L3,5 Z M3,4 L21,4 C21.5522847,4 22,4.44771525 22,5 L22,18 C22,18.5522847 21.5522847,19 21,19 L3,19 C2.44771525,19 2,18.5522847 2,18 L2,5 C2,4.44771525 2.44771525,4 3,4 Z"></path>
    </svg>
    <div class="gjs-block-label">Accordion</div>
      `,
    content,
    ...accordionsBlock
  });
}
