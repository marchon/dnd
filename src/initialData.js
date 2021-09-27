import uuid from 'uuid/v4';

const ids = [uuid(), uuid(), uuid(), uuid(), uuid(), uuid()];

const items = {
  [ids[0]]: {
    id: ids[0],
    type: 'page',
    status: 'published',
    name: 'Home',
    slug: '/',
    lastEditedBy: 'smuangcharoen',
    lastEditDate: '2018-12-07',
  },
  [ids[1]]: {
    id: ids[1],
    type: 'page',
    status: 'modified',
    name:
      'Palm Coast Personal Severe Injury Lawyer and Victims Rights Advocate',
    slug: '/personal-injury-lawyer-palm-coast',
    lastEditedBy: 'agassaway',
    lastEditDate: '2018-07-11',
  },
  [ids[2]]: {
    id: ids[2],
    type: 'group',
    status: null,
    name: 'Palm Coast',
    lastEditedBy: 'agassaway',
    lastEditDate: '2019-03-20',
  },
  [ids[3]]: {
    id: ids[3],
    type: 'page',
    status: 'syndicated',
    name: 'Auto Accident',
    slug: '/auto-accident',
    lastEditedBy: 'agassaway',
    lastEditDate: '2019-02-01',
  },
  [ids[4]]: {
    id: ids[4],
    type: 'page',
    status: 'draft',
    name: 'About Us',
    slug: '/about-us',
    lastEditedBy: 'smuangcharoen',
    lastEditDate: '2019-08-25',
  },
  [ids[5]]: {
    id: ids[5],
    type: 'link',
    status: null,
    name: 'Google',
    slug: 'https://www.google.com',
    lastEditedBy: 'smuangcharoen',
    lastEditDate: '2019-09-28',
  },
};

const columns = {
  left: {
    id: 'left',
    title: 'Nav',
    itemIds: [],
  },
  right: {
    id: 'right',
    title: 'Nav Items',
    itemIds: Object.keys(items).map((key) => items[key].id),
  },
  // remove: {
  //   id: 'remove',
  //   title: 'Remove Item',
  //   itemIds: [],
  // },
};

const columnOrder = Object.keys(columns).map((key) => columns[key].id);

const initialData = { items, columns, columnOrder };

export default initialData;
