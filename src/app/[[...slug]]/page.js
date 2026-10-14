import { StoryblokStory } from '@storyblok/react/rsc';
import { notFound } from 'next/navigation';
import { getStory } from '@/lib/get-story';

// Stories in the Global Settings folder (header, footer) are not public pages
const isHidden = (slug) => slug?.[0] === 'global-settings';

const toFullSlug = (slug) => (slug ? slug.join('/') : 'home');

export async function generateMetadata({ params }) {
	const { slug } = await params;
	if (isHidden(slug)) return {};

	const story = await getStory(toFullSlug(slug));
	if (!story) return {};

	// News articles and events have a title, summary and image. Pages do not,
	// so they keep the default metadata from the layout.
	const { title, summary, image } = story.content;

	return {
		...(title && { title }),
		...(summary && { description: summary }),
		...(image?.filename && { openGraph: { images: [image.filename] } }),
	};
}

export default async function Page({ params }) {
	const { slug } = await params;

	if (isHidden(slug)) notFound();

	const story = await getStory(toFullSlug(slug));

	if (!story) notFound();

	return <StoryblokStory story={story} />;
}
