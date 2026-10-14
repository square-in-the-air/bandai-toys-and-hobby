import ContentList from '@/components/ui/content-list/ContentList';
import { formatDate, toDateTimeAttribute } from '@/lib/format-date';
import { getNews } from '@/lib/get-news';

/**
 * Storyblok block "news_list": the latest news articles as a grid of cards.
 * Use it on the News page (no limit) or as a short strip on other pages.
 */
export default async function NewsList({ blok }) {
	const articles = await getNews({ limit: Number(blok.limit) || undefined });

	const items = articles.map((story) => {
		const { title, summary, image, date } = story.content;

		return {
			id: story.uuid,
			href: `/${story.full_slug}`,
			title: title || story.name,
			summary,
			image,
			meta: date && (
				<time dateTime={toDateTimeAttribute(date)}>{formatDate(date)}</time>
			),
		};
	});

	return (
		<ContentList
			blok={blok}
			items={items}
			emptyMessage="There is no news to show at the moment."
			viewAll={
				blok.show_view_all ? { href: '/news', label: 'View all news' } : null
			}
		/>
	);
}
