/**
 * Dates from Storyblok arrive as plain text, such as "2026-10-14 09:00".
 * Storyblok stores them in UTC, so they are read as UTC and shown in UK time.
 */
const TIME_ZONE = 'Europe/London';

const dateFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: TIME_ZONE,
	day: 'numeric',
	month: 'long',
	year: 'numeric',
});

const timeFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: TIME_ZONE,
	hour: 'numeric',
	minute: '2-digit',
	hour12: true,
});

const clockFormatter = new Intl.DateTimeFormat('en-GB', {
	timeZone: TIME_ZONE,
	hour: '2-digit',
	minute: '2-digit',
	hourCycle: 'h23',
});

export function parseStoryblokDate(value) {
	if (!value || typeof value !== 'string') return null;

	const text = value.length === 10 ? `${value}T00:00` : value.replace(' ', 'T');
	const hasZone = /(Z|[+-]\d{2}:?\d{2})$/.test(text);
	const date = new Date(hasZone ? text : `${text}Z`);

	return Number.isNaN(date.getTime()) ? null : date;
}

// A date picked without a time comes back as midnight, so there is no time to show
function hasTime(date) {
	const isUtcMidnight = date.getUTCHours() === 0 && date.getUTCMinutes() === 0;
	const isUkMidnight = clockFormatter.format(date) === '00:00';
	return !isUtcMidnight && !isUkMidnight;
}

export function hasTimeSet(value) {
	const date = parseStoryblokDate(value);
	return date ? hasTime(date) : false;
}

export function formatDate(value) {
	const date = parseStoryblokDate(value);
	return date ? dateFormatter.format(date) : '';
}

export function formatTime(value) {
	const date = parseStoryblokDate(value);
	if (!date || !hasTime(date)) return '';
	return timeFormatter.format(date).replace(/\s/g, ' ');
}

// "14 October 2026", or "14 October 2026 to 16 October 2026" for a run of days
export function formatDateRange(start, end) {
	const from = formatDate(start);
	const to = formatDate(end);
	if (!to || to === from) return from;
	return `${from} to ${to}`;
}

// "9:00 am", or "9:00 am to 5:00 pm" when the event ends the same day
export function formatTimeRange(start, end) {
	const from = formatTime(start);
	if (!from) return '';
	const to = formatDate(end) === formatDate(start) ? formatTime(end) : '';
	return to && to !== from ? `${from} to ${to}` : from;
}

// For the dateTime attribute on a <time> element
export function toDateTimeAttribute(value) {
	const date = parseStoryblokDate(value);
	return date ? date.toISOString() : undefined;
}
