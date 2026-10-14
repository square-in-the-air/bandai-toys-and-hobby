import { test, expect } from '@playwright/test';

// Baseline smoke tests: the home page loads and renders its core structure.
test.describe('Home page', () => {
	test('responds and has a page title', async ({ page }) => {
		const response = await page.goto('/');

		expect(response?.ok()).toBeTruthy();
		await expect(page).toHaveTitle(/.+/);
	});

	test('shows the header navigation', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('navigation', { name: 'Main' })).toBeVisible();
	});

	test('shows the main content area', async ({ page }) => {
		await page.goto('/');

		await expect(page.getByRole('main')).toBeAttached();
	});

	test('has no uncaught errors in the browser', async ({ page }) => {
		const errors = [];
		page.on('pageerror', (error) => errors.push(error.message));

		await page.goto('/');
		await page.waitForLoadState('networkidle');

		expect(errors).toEqual([]);
	});
});
