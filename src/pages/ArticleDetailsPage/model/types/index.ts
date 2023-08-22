import {ArticleDetailsCommentsSchema, ArticleDetailsRecommendationSchema} from "@/pages/ArticleDetailsPage";

export interface ArticleDetailsPageSchema {
    comments: ArticleDetailsCommentsSchema,
    recommendations: ArticleDetailsRecommendationSchema
}