import { getStories } from '@/lib/get-stories';
import { hasTimeSet, parseStoryblokDate } from '@/lib/format-date';

const ONE_DAY = 24 * 60 * 60 * 1000;

// When an event is over. With no end date it ends when it starts, and a date
// with no time set runs to the end of that day.
function getEndTime({ start_date, end_date }) {
	const endValue = end_date || start_date;
	const end = parseStoryblokDate(endValue);
	if (!end) return null;
	return hasTimeSet(endValue) ? end.getTime() : end.getTime() + ONE_DAY;
}

/**
 * Fetches events. "when" is "upcoming" (soonest first), "past" (most recent
 * first) or "all" (by start date). Leave the limit out for all of them.
 *
 * Upcoming and past are worked out here rather than in the Storyblok query, so
 * an event that is still running counts as upcoming until it ends.
 */
export async function getEvents({ when = 'upcoming', limit } = {}) {
	const stories = await getStories({
		folder: 'events',
		contentType: 'event',
		sortBy: 'content.start_date:asc',
	});

	const now = Date.now();
	let events = stories;

	if (when === 'upcoming' || when === 'past') {
		events = stories.filter((story) => {
			const endTime = getEndTime(story.content);
			if (endTime === null) return false;
			return when === 'upcoming' ? endTime >= now : endTime < now;
		});
	}

	if (when === 'past') events = events.reverse();

	return limit ? events.slice(0, limit) : events;
}
