export function getUserToggledLocalStorage(id) {
  // If the window object is undefined,
  // this code is running on the server and we
  // cannot access localStorage
  if (typeof window === 'undefined') {
    return false;
  }

  return JSON.parse(localStorage.getItem(`following-user-${id}`)) || false;
}

export function toggleFollowUserLocalStorage(id) {
  // If the window object is undefined,
  // this code is running on the server and we
  // cannot access localStorage
  if (typeof window === 'undefined') {
    return false;
  }

  const isToggled = getUserToggledLocalStorage(id);
  localStorage.setItem(`following-user-${id}`, !isToggled);
}
