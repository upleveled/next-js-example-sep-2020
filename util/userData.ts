import { User } from './types';

export function mergeUserDataWithFollowingData(
  users: User[],
  followingList: number[],
) {
  return users.map((user) => {
    // If the id of the user is in the
    // array, then set following to true
    // followingList = ['1', '2']

    return {
      ...user,
      following: followingList.includes(user.id),
    };
  });
}
