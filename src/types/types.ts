export type TGiphy = {
  id: number;
  title: string;
  embed_url: string;
  bitly_url: string;
  is_sticker: number;
  rating: string;
  slug: string;
  type: string;
  url: string;
  username: string;
  images: {
    fixed_width_small: { url: string };
  };
};
