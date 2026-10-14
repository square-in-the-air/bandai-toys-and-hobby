import {
	storyblokEditable,
	StoryblokServerRichText,
} from '@storyblok/react/rsc';
import Article from '@/components/ui/article/Article';
import { formatDateRange, formatTimeRange } from '@/lib/format-date';
import { getHref } from '@/lib/get-href';

// An empty Link field still arrives as an object, so check it points somewhere
const hasLink = (link) => Boolean(link?.cached_url || link?.url || link?.email);

/**
 * Storyblok content type "event": a single event at /events/[slug].
 */
const Event = ({ blok }) => {
	const facts = [
		{ label: 'Time', value: formatTimeRange(blok.start_date, blok.end_date) },
		{ label: 'Where', value: blok.location },
	].filter((fact) => fact.value);

	// The "cta" field holds one Link block (label and link), the same block the
	// header uses. The button only shows when the link points somewhere.
	const [button] = blok.cta ?? [];
	const cta = hasLink(button?.link)
		? {
				href: getHref(button.link),
				label: button.label || 'More information',
				target: button.link.target,
			}
		: null;

	return (
		<main {...storyblokEditable(blok)}>
			<Article
				backHref="/events"
				backLabel="All events"
				meta={formatDateRange(blok.start_date, blok.end_date)}
				title={blok.title}
				summary={blok.summary}
				image={blok.image}
				facts={facts}
				cta={cta}
			>
				{blok.content && <StoryblokServerRichText document={blok.content} />}
			</Article>
		</main>
	);
};

export default Event;
