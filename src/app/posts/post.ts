export interface MutipleArticle {
  articles: Article[];
}

export interface SingleArticle {
  article: Article;
}

export interface Article {
  slug: string;
  title: string;
  description: string;
  body: string;
  tagList: string[];
  createdAt: string;
  updatedAt: string;
  author: string;
}
