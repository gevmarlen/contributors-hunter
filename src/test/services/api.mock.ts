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
    name: 'test',
  },
  {
    name: 'test2',
  },
  {
    name: 'test3',
  }
];
