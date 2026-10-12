import Image from 'next/image';
import Link from 'next/link';
import { getHeader } from '@/lib/get-header';
import { getHref } from '@/lib/get-href';
import styles from './Header.module.scss';

export default async function Header() {
	const story = await getHeader();

	if (!story) return null;

	const { logo, links } = story.content;

	return (
		<header className={styles.header}>
			<Link href="/" className={styles.header__logo} aria-label="Bandai Namco Toys and Hobby, home">
				{logo?.filename && (
					<Image
						src={logo.filename}
						alt={logo.alt || 'Bandai Namco Toys and Hobby'}
						width={160}
						height={48}
						className={styles.header__image}
						priority
					/>
				)}
			</Link>

			<nav aria-label="Main">
				<ul className={styles.header__list}>
					{links?.map((item) => (
						<li key={item._uid}>
							<Link
								href={getHref(item.link)}
								className={styles.header__link}
								target={item.link?.target}
								rel={item.link?.target === '_blank' ? 'noopener noreferrer' : undefined}
							>
								{item.label}
							</Link>
						</li>
					))}
				</ul>
			</nav>
		</header>
	);
}
