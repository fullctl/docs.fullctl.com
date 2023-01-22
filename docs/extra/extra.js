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