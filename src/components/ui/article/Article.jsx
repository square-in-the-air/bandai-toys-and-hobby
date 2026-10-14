import Image from 'next/image';
import Link from 'next/link';
import styles from './Article.module.scss';

/**
 * The shared layout for a single news article or event page.
 * "facts" is a short list of label and value pairs (time, location).
 * "cta" is an optional call to action link shown after the body.
 */
export default function Article({
	backHref,
	backLabel,
	meta,
	title,
	summary,
	image,
	facts = [],
	cta,
	children,
}) {
	return (
		<article className="section">
			<div className="container container--narrow">
				<Link href={backHref} className={styles.article__back}>
					{backLabel}
				</Link>

				<header className={styles.article__header}>
					{meta && <p className={styles.article__meta}>{meta}</p>}
					<h1 className={styles.article__title}>{title}</h1>
					{summary && <p className={styles.article__summary}>{summary}</p>}
				</header>

				{image?.filename && (
					<div className={styles.article__media}>
						<Image
							src={image.filename}
							alt={image.alt || ''}
							fill
							priority
							sizes="(min-width: 1024px) 50rem, 100vw"
							className={styles.article__image}
						/>
					</div>
				)}

				{facts.length > 0 && (
					<dl className={styles.article__facts}>
						{facts.map(({ label, value }) => (
							<div key={label} className={styles.article__fact}>
								<dt className={styles.article__label}>{label}</dt>
								<dd className={styles.article__value}>{value}</dd>
							</div>
						))}
					</dl>
				)}

				<div className={styles.article__body}>{children}</div>

				{cta && (
					<p className={styles.article__footer}>
						<Link
							href={cta.href}
							className={styles.article__cta}
							target={cta.target}
							rel={cta.target === '_blank' ? 'noopener noreferrer' : undefined}
						>
							{cta.label}
						</Link>
					</p>
				)}
			</div>
		</article>
	);
}
