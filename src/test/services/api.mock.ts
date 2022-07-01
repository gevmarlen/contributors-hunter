import { Contributor, Organization, Repository } from '../../app/core/models/github-api';

export const contributors: Contributor[] = [{
    id: 1,
    login: 'login',
    avatar_url: '',
  },
  {
    id: 2,
    login: 'login2',
    avatar_url: '',
  },
];

export const organizations: Organization[] = [{
  id: 1,
  login: 'test',
}]

export const repositories: Repository[] = [
  {
    id: 1,
    name: 'test',
  },
  {
    id: 2,
    name: 'test2',
  },
  {
    id: 3,
    name: 'test3',
  }
];
