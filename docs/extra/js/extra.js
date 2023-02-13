const sidebar = document.querySelector('.md-sidebar__scrollwrap')
const sidebar_footer = document.querySelector('.sidebar_footer')
const fixSidebarHeight = new ResizeObserver(() => {
  // if height not set from this observer
  if(sidebar.getAttribute("data-new-height") != sidebar.clientHeight) {
    sidebar.style.height = `${sidebar.clientHeight - sidebar_footer.clientHeight}px`;
    sidebar.setAttribute("data-new-height", sidebar.clientHeight);
  }
});

sidebar.setAttribute("data-new-height", sidebar.clientHeight);
fixSidebarHeight.observe(sidebar);

let list_with_imgs = document.querySelectorAll("ol > li > img");
const appliedOls = new Set();
const appliedLis = new Set();
list_with_imgs.forEach((e) => {
  let liElement = e.parentElement;
  let olElement = liElement.parentElement;

  if (!appliedOls.has(olElement)) {
    olElement.classList.add("text-img-ol");
    appliedOls.add(olElement);
  }

  if (!appliedLis.has(liElement)) {
    liElement.classList.add("text-img-li");
    const rangeBefore = document.createRange()
    rangeBefore.setStart(liElement, 0);
    rangeBefore.setEndBefore(e);

    const newParent = document.createElement('div');
    newParent.classList.add('text');

    rangeBefore.surroundContents(newParent);

    const container = document.createElement('div');
    container.classList.add('left-container');

    rangeBefore.surroundContents(container);

    rangeBefore.setStartBefore(e);
    rangeBefore.setEndAfter(e);

    const right = document.createElement('div');
    right.classList.add('right-container');
    rangeBefore.surroundContents(right);

    appliedLis.add(liElement);
  }
});