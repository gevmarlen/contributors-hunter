export interface Organization {
  login: string;
  id: number;
}

export interface Repository {
  id?: number;
  name: string;
  full_name?: string;
  contributors_url?: string;
}

export interface Contributor {
  id?: number;
  login?: string;
  avatar_url?: string;
  contributions?: number;
}
