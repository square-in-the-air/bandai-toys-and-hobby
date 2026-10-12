import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStoryblokApi } from '@/lib/storyblok';

export default async function Page({ params }) {
	const { slug } = await params;

	// Stories in the Global Settings folder (header, footer) are not public pages
	if (slug?.[0] === 'global-settings') notFound();

	let fullSlug = slug ? slug.join('/') : 'home';

	let sbParams = {
		version: 'draft',
	};

	const storyblokApi = getStoryblokApi();
	let { data } = await storyblokApi.get(`cdn/stories/${fullSlug}`, sbParams);

	return <StoryblokStory story={data.story} />;
}
