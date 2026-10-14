import ContentList from '@/components/ui/content-list/ContentList';
import {
	formatDate,
	formatDateRange,
	toDateTimeAttribute,
} from '@/lib/format-date';
import { getEvents } from '@/lib/get-events';

const EMPTY_MESSAGES = {
	upcoming: 'There are no upcoming events at the moment.',
	past: 'There are no past events to show.',
	all: 'There are no events to show at the moment.',
};

/**
 * Storyblok block "events_list": events as a grid of cards.
 * "when" picks upcoming (the default), past or all events, so the Events page
 * can use one block for what is coming up and another for what has happened.
 */
export default async function EventsList({ blok }) {
	const when = blok.when || 'upcoming';
	const events = await getEvents({
		when,
		limit: Number(blok.limit) || undefined,
	});

	const items = events.map((story) => {
		const { title, summary, image, start_date, end_date, location } =
			story.content;

		return {
			id: story.uuid,
			href: `/${story.full_slug}`,
			title: title || story.name,
			summary,
			image,
			meta: start_date && (
				<>
					<time dateTime={toDateTimeAttribute(start_date)}>
						{end_date
							? formatDateRange(start_date, end_date)
							: formatDate(start_date)}
					</time>
					{location && `, ${location}`}
				</>
			),
		};
	});

	return (
		<ContentList
			blok={blok}
			items={items}
			emptyMessage={EMPTY_MESSAGES[when] || EMPTY_MESSAGES.all}
			viewAll={
				blok.show_view_all
					? { href: '/events', label: 'View all events' }
					: null
			}
		/>
	);
}
