import { cache } from 'react';
import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

/**
 * Fetches one story by its full slug, for example "news/some-article".
 * Wrapped in React's cache so the page and its metadata can both ask for it
 * without a second request. Returns null when the story does not exist, so the
 * route can show a 404 instead of an error.
 */
export const getStory = cache(async (fullSlug) => {
	try {
		const { data } = await getStoryblokApi().get(`cdn/stories/${fullSlug}`, {
			version: storyblokVersion,
		});
		return data.story;
	} catch (error) {
		if (error?.status === 404) return null;
		throw error;
	}
});
