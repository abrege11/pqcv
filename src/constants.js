export const SPRITE_ORDER = [
  { name: 'H.png', gateId: 'a928dfa9-75b0-4152-8ee1-22f1dfe680b5' },
  { name: 'S.png', gateId: '06ebe310-bc30-4d57-ac2a-f272ddb26ab1' },
  { name: 'X.png', gateId: 'd43a8020-2058-4889-89c3-a7711b4b5681' },
  { name: 'Y.png', gateId: 'c4359cfd-4428-4072-b341-aba781068ab8' },
  { name: 'Z.png', gateId: '087ba4ff-1c16-43ed-ac96-cf0229f63345' },
].map((item) => ({
  ...item,
  src: `/assets/${item.name}`,
  type: 'image',
}));

export const ItemTypes = {
  SPRITE: 'sprite',
};

export const FOOTER_LINKS = [
  { title: 'My GitHub', link: 'https://github.com/abrege11' },
  { title: 'PQCV Repo', link: 'https://github.com/abrege11/pqcv' },
  { title: 'Contact', link: 'mailto:bregeabe@gmail.com' },
];