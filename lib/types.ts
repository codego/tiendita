export type Collection = {
  id: string;
  number: string;
  title: string;
  subtitle: string;
  lede: string;
  coverCta: string;
  coverImage: string;
  onTapa: boolean;
};

export type Sku = {
  id: string;
  collection_id: string;
  brand: string;
  name: string;
  price_ars: number;
  talle: string;
  tela: string;
  corte: string;
  category: string;
  categoryLabel: string;
  description: string;
  disclaimer: string;
  store_url: string;
  image: string;
};

export type Catalog = {
  collections: Collection[];
  skus: Sku[];
};
