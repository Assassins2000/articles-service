select
    "articles"."id" as "id",
    "articles"."title" as "title",
    "articles"."content" as "content",
    "articles"."is_private" as "isPrivate",
    to_json(array_agg(tags)) as "tags"
from
    "articles"
    left join "articles_tags" on "articles_tags"."article_id" = "articles_tags"."tag_id"
    left join "tags" on "articles_tags"."tag_id" = "tags"."id"
where
    (
        'articles.id' IN (
            SELECT
                'article_id'
            from
                articles_tags
            WHERE
                tag_id IN (23)
        )
    )
group by
    "articles"."id"