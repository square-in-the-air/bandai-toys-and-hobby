import EventsList from '@/components/blocks/events-list/EventsList';
import NewsList from '@/components/blocks/news-list/NewsList';
import Event from '@/components/templates/Event';
import NewsArticle from '@/components/templates/NewsArticle';
import Page from '@/components/templates/Page';
import { apiPlugin, storyblokInit } from '@storyblok/react/rsc';

// The preview token can read draft content, so it is only ever set on the
// server (local development and Vercel preview deployments). It is not in the
// env block in next.config.mjs, so it never reaches the browser.
// Where it is missing (production, CI) the public token reads published content.
const previewToken = process.env.STORYBLOK_PREVIEW_TOKEN;

export const storyblokVersion = previewToken ? 'draft' : 'published';

export const getStoryblokApi = storyblokInit({
	accessToken: previewToken || process.env.STORYBLOK_DELIVERY_API_TOKEN,
	use: [apiPlugin],
	components: {
		// Content types
		page: Page,
		news_article: NewsArticle,
		event: Event,
		// Blocks
		news_list: NewsList,
		events_list: EventsList,
	},
	apiOptions: {
		/** Set the correct region for your space. Learn more: https://www.storyblok.com/docs/packages/storyblok-js#example-region-parameter */
		region: process.env.STORYBLOK_REGION || 'eu',
		/** The following code is only required when creating a Storyblok space directly via the Blueprints feature. */
		endpoint: process.env.STORYBLOK_API_BASE_URL
			? `${new URL(process.env.STORYBLOK_API_BASE_URL).origin}/v2`
			: undefined,
	},
});
