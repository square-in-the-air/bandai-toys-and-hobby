import { storyblokEditable } from '@storyblok/react/rsc';
import Link from 'next/link';
import ContentCard from '@/components/ui/content-card/ContentCard';
import styles from './ContentList.module.scss';

/**
 * The shared layout for the news and events list blocks: a heading, a grid of
 * cards, an empty message and an optional "view all" link.
 */
export default function ContentList({ blok, items, emptyMessage, viewAll }) {
	return (
		<section {...storyblokEditable(blok)} className="section">
			<div className="container">
				{blok.heading && (
					<h2 className={styles.list__heading}>{blok.heading}</h2>
				)}

				{items.length > 0 ? (
					<ul className={styles.list__grid}>
						{items.map(({ id, ...card }) => (
							<li key={id}>
								<ContentCard {...card} />
							</li>
						))}
					</ul>
				) : (
					<p className={styles.list__empty}>{emptyMessage}</p>
				)}

				{viewAll && (
					<p className={styles.list__footer}>
						<Link href={viewAll.href} className={styles.list__link}>
							{viewAll.label}
						</Link>
					</p>
				)}
			</div>
		</section>
	);
}
