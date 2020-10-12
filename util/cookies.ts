import cookie from 'js-cookie';

export function getFollowingFromCookies() {
  // Use "|| []" in order to use a default
  // value, in case this is undefined
  const following = cookie.getJSON('following') || [];
  return following;
}

export function toggleFollowUserInCookie(id: string) {
  // ['1', '3']
  const following = getFollowingFromCookies();

  let newFollowing;

  if (following.includes(id)) {
    // If the user id is already in the following
    // array, then remove it from the array
    newFollowing = following.filter((followed: string) => followed !== id);
  } else {
    // If the user id is not in the array,
    // add it to the array
    newFollowing = [...following, id];
    // Alternative version:
    // newFollowing = following.concat(id);
  }

  cookie.set('following', newFollowing);

  return newFollowing;
}
