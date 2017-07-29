// Toggle navbar dropdown menu
export function dropdownToggle(e) {
  const dropdownMenu = document.getElementById('navbar-dropdown-menu');
  const isOpen = dropdownMenu.classList.contains('open');
  if(isOpen) {
    dropdownMenu.classList.remove('open');
  } else {
    dropdownMenu.classList.add('open');
  }
} 

// Toggle navbar collapse menu on small devices
export function collapseToggle(e) {
  const collapseMenu = document.getElementById('navbar-collapse-menu');
  let isCollapsed = collapseMenu.classList.contains('in');
  if(isCollapsed) {
    collapseMenu.classList.remove('in');
  } else {
    collapseMenu.classList.add('in');
  }
}

// Close the navbar dropdown menu, when clicking anywhere, if the navbar dropdown menu is open
export function closeDropdown(e) {
  const dropdownMenu = document.getElementById('navbar-dropdown-menu');
  const isOpen = dropdownMenu.classList.contains('open');
  let outside = 
    !e.target.classList.contains('dropdown-toggle')
    && !e.target.classList.contains('caret')
    && !e.target.classList.contains('fa-user-circle');
  if(outside && isOpen) {
    dropdownMenu.classList.remove('open');
  }
}