export type UserRole = 'master_admin' | 'legend_client' | 'guest';

export interface AuthUser {
  username: string;
  name: string;
  role: UserRole;
  avatar?: string;
  accessibleSites: string[]; // 'all' or specific site IDs
}

export const MASTER_CREDENTIALS = {
  username: 'qwacy',
  password: 'B&Ib}rjeE=j~_M8mh19%W&r0+bdu,))ekd^w;_X.Vn.,oJVlxI',
  name: 'Qwacy (Ana Yönetici)',
  role: 'master_admin' as UserRole,
};

export const LEGEND_CREDENTIALS = {
  username: 'ggLegendGamer3339',
  password: 'ggLegendGamer3339itemsatıs',
  name: 'Legend Gamer Müşteri Portalı',
  role: 'legend_client' as UserRole,
};
