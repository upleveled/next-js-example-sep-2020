import { User } from '../types';
import { mergeUserDataWithFollowingData } from '../userData';

const users = [
  {
    id: '1',
    firstName: 'Karl',
    lastName: 'Horky',
    city: 'Vienna',
    following: false,
  },
  {
    id: '2',
    firstName: 'Sabine',
    lastName: 'Ballata',
    city: 'Vienna',
    following: false,
  },
];

test('adds following information to single test user', () => {
  const user1Id = '1';

  const followingList = [user1Id];
  const usersWithFollowingData = mergeUserDataWithFollowingData(
    users,
    followingList,
  );

  const user1 = usersWithFollowingData.find(
    (user) => user.id === user1Id,
  ) as User;
  const user2 = usersWithFollowingData.find((user) => user.id === '2') as User;

  expect(user1.following).toBe(true);
  expect(user2.following).toBe(false);
});

test('adds following information to single test user', () => {
  const user1Id = '1';
  const user2Id = '2';

  const followingList = [user1Id, user2Id];
  const usersWithFollowingData = mergeUserDataWithFollowingData(
    users,
    followingList,
  );

  const user1 = usersWithFollowingData.find(
    (user) => user.id === user1Id,
  ) as User;
  const user2 = usersWithFollowingData.find(
    (user) => user.id === user2Id,
  ) as User;

  expect(user1.following).toBe(true);
  expect(user2.following).toBe(true);
});

test('adds following information to single test user', () => {
  const followingList = ['3'];
  const usersWithFollowingData = mergeUserDataWithFollowingData(
    users,
    followingList,
  );

  const user1 = usersWithFollowingData.find((user) => user.id === '1') as User;
  const user2 = usersWithFollowingData.find((user) => user.id === '2') as User;

  expect(user1.following).toBe(false);
  expect(user2.following).toBe(false);

  expect(usersWithFollowingData.length).toBe(2);
});
