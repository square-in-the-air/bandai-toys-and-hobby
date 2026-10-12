import { getStoryblokApi } from '@/lib/storyblok';

/**
 * Fetches the Header story from the Global Settings folder in Storyblok.
 * Returns null if it can't be loaded, so a missing or unpublished header
 * never takes the whole site down.
 */
export async function getHeader() {
	try {
		const storyblokApi = getStoryblokApi();
		const { data } = await storyblokApi.get('cdn/stories/global-settings/header', {
			version: 'draft',
		});
		return data.story;
	} catch (error) {
		console.error('Could not load the header story from Storyblok', error);
		return null;
	}
}
