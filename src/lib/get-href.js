/**
 * Turns a Storyblok Link field into a real address.
 * The Link field can point at a page, a URL, an email address or a file.
 */
export function getHref(link) {
	if (!link) return '/';

	if (link.linktype === 'story') {
		const path = link.cached_url === 'home' ? '' : link.cached_url;
		return `/${path}${link.anchor ? `#${link.anchor}` : ''}`;
	}

	if (link.linktype === 'email') {
		return `mailto:${link.email}`;
	}

	return link.url || link.cached_url || '/';
}
