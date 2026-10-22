import {
	storyblokEditable,
	StoryblokServerRichText,
} from '@storyblok/react/rsc';
import { formatDate, toDateTimeAttribute } from '@/lib/format-date';
import styles from './Legal.module.scss';

/**
 * Storyblok content type "legal": a legal page such as the privacy policy,
 * kept in the Legal folder (for example /legal/privacy-policy).
 */
const Legal = ({ blok }) => (
	<main {...storyblokEditable(blok)}>
		<article className="section">
			<div className="container container--narrow">
				<header className={styles.legal__header}>
					<h1 className={styles.legal__title}>{blok.title}</h1>

					{blok.last_updated && (
						<p className={styles.legal__updated}>
							Last updated{' '}
							<time dateTime={toDateTimeAttribute(blok.last_updated)}>
								{formatDate(blok.last_updated)}
							</time>
						</p>
					)}
				</header>

				<div className={styles.legal__body}>
					{blok.content && <StoryblokServerRichText document={blok.content} />}
				</div>
			</div>
		</article>
	</main>
);

export default Legal;
