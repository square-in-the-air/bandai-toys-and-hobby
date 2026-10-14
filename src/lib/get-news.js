import { getStories, MAX_STORIES } from '@/lib/get-stories';

/**
 * Fetches news articles, newest first. Leave the limit out for all of them.
 */
export function getNews({ limit } = {}) {
	return getStories({
		folder: 'news',
		contentType: 'news_article',
		sortBy: 'content.date:desc',
		perPage: Math.min(limit || MAX_STORIES, MAX_STORIES),
	});
}
