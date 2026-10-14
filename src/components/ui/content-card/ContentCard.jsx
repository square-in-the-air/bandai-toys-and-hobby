import Image from 'next/image';
import Link from 'next/link';
import styles from './ContentCard.module.scss';

/**
 * A card for one news article or event in a list.
 * The title link covers the whole card, so the entire card is clickable.
 */
export default function ContentCard({ href, title, summary, image, meta }) {
	return (
		<article className={styles.card}>
			{image?.filename && (
				<div className={styles.card__media}>
					<Image
						src={image.filename}
						alt=""
						fill
						sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
						className={styles.card__image}
					/>
				</div>
			)}

			<div className={styles.card__body}>
				{meta && <p className={styles.card__meta}>{meta}</p>}
				<h3 className={styles.card__title}>
					<Link href={href} className={styles.card__link}>
						{title}
					</Link>
				</h3>
				{summary && <p className={styles.card__summary}>{summary}</p>}
			</div>
		</article>
	);
}
