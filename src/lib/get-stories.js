import { getStoryblokApi, storyblokVersion } from '@/lib/storyblok';

// Storyblok returns at most 100 stories per request
export const MAX_STORIES = 100;

/**
 * Fetches every story in a folder, leaving out the folder's own root story.
 * Returns an empty list if it can't be loaded, so a failed request shows
 * the empty state rather than taking the whole page down.
 */
export async function getStories({
	folder,
	contentType,
	sortBy,
	perPage = MAX_STORIES,
}) {
	try {
		const { data } = await getStoryblokApi().get('cdn/stories', {
			version: storyblokVersion,
			starts_with: `${folder}/`,
			is_startpage: false,
			content_type: contentType,
			sort_by: sortBy,
			per_page: perPage,
		});
		return data.stories;
	} catch (error) {
		console.error(`Could not load the stories in "${folder}"`, error);
		return [];
	}
}
