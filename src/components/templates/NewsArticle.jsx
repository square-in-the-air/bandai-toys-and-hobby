import {
	storyblokEditable,
	StoryblokServerRichText,
} from '@storyblok/react/rsc';
import Article from '@/components/ui/article/Article';
import { formatDate, toDateTimeAttribute } from '@/lib/format-date';

/**
 * Storyblok content type "news_article": a single news story at /news/[slug].
 */
const NewsArticle = ({ blok }) => (
	<main {...storyblokEditable(blok)}>
		<Article
			backHref="/news"
			backLabel="All news"
			meta={
				blok.date && (
					<time dateTime={toDateTimeAttribute(blok.date)}>
						{formatDate(blok.date)}
					</time>
				)
			}
			title={blok.title}
			summary={blok.summary}
			image={blok.image}
		>
			{blok.content && <StoryblokServerRichText document={blok.content} />}
		</Article>
	</main>
);

export default NewsArticle;
