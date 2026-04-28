import type { CustomCell } from "@wallaform/glide-data-grid";

interface ArticleCellProps {
    readonly kind: "article-cell";
    readonly markdown: string;
}

export type ArticleCell = CustomCell<ArticleCellProps>;
