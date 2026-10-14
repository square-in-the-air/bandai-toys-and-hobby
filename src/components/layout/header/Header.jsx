import Image from 'next/image';
import Link from 'next/link';
import { getHeader } from '@/lib/get-header';
import { getHref } from '@/lib/get-href';
import NavDropdown from './NavDropdown';
import styles from './Header.module.scss';

// A nav item is a dropdown when it holds a list of links, otherwise it is a link
const isDropdown = (item) => Array.isArray(item.links);

// Plain data for the dropdown, which is a client component
const toNavLink = (item) => ({
	id: item._uid,
	label: item.label,
	href: getHref(item.link),
	target: item.link?.target,
});

export default async function Header() {
	const story = await getHeader();

	if (!story) return null;

	const { logo, links } = story.content;

	return (
		<header className={styles.header}>
			<Link
				href="/"
				className={styles.header__logo}
				aria-label="Bandai Namco Toys and Hobby, home"
			>
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
					{links?.map((item) => {
						if (isDropdown(item)) {
							const dropdownLinks = item.links
								.map(toNavLink)
								.filter((link) => link.label);

							if (!item.label || dropdownLinks.length === 0) return null;

							return (
								<li key={item._uid}>
									<NavDropdown label={item.label} links={dropdownLinks} />
								</li>
							);
						}

						return (
							<li key={item._uid}>
								<Link
									href={getHref(item.link)}
									className={styles.header__link}
									target={item.link?.target}
									rel={
										item.link?.target === '_blank'
											? 'noopener noreferrer'
											: undefined
									}
								>
									{item.label}
								</Link>
							</li>
						);
					})}
				</ul>
			</nav>
		</header>
	);
}
