'use client';

import Link from 'next/link';
import { useEffect, useId, useRef, useState } from 'react';
import styles from './NavDropdown.module.scss';

/**
 * A header nav item that opens a list of links.
 *
 * Escape, a click elsewhere, tabbing away or choosing a link closes it.
 * "links" is a list of { id, label, href, target }.
 */
export default function NavDropdown({ label, links }) {
	const [open, setOpen] = useState(false);
	const rootRef = useRef(null);
	const buttonRef = useRef(null);
	const panelId = useId();

	useEffect(() => {
		if (!open) return;

		const handlePointerDown = (event) => {
			if (!rootRef.current?.contains(event.target)) setOpen(false);
		};

		const handleKeyDown = (event) => {
			if (event.key !== 'Escape') return;
			setOpen(false);
			buttonRef.current?.focus();
		};

		document.addEventListener('pointerdown', handlePointerDown);
		document.addEventListener('keydown', handleKeyDown);

		return () => {
			document.removeEventListener('pointerdown', handlePointerDown);
			document.removeEventListener('keydown', handleKeyDown);
		};
	}, [open]);

	// Tabbing out of the dropdown closes it
	const handleBlur = (event) => {
		const next = event.relatedTarget;
		if (next && !rootRef.current?.contains(next)) setOpen(false);
	};

	return (
		<div ref={rootRef} className={styles.dropdown} onBlur={handleBlur}>
			<button
				ref={buttonRef}
				type="button"
				className={styles.dropdown__button}
				aria-expanded={open}
				aria-controls={panelId}
				onClick={() => setOpen((isOpen) => !isOpen)}
			>
				{label}
				<span
					className={`${styles.dropdown__icon} ${open ? styles['dropdown__icon--open'] : ''}`}
					aria-hidden="true"
				/>
			</button>

			<ul id={panelId} className={styles.dropdown__panel} hidden={!open}>
				{links.map(
					({ id, label: linkLabel, href: linkHref, target: linkTarget }) => (
						<li key={id}>
							<Link
								href={linkHref}
								className={styles.dropdown__link}
								target={linkTarget}
								rel={
									linkTarget === '_blank' ? 'noopener noreferrer' : undefined
								}
								onClick={() => setOpen(false)}
							>
								{linkLabel}
							</Link>
						</li>
					),
				)}
			</ul>
		</div>
	);
}
