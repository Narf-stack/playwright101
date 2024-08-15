import { test, expect } from '@playwright/test';

test('Create a new board with a list and cards', async ({ page }) => {
  // Load the app
  await page.goto('http://localhost:3000/');
  
  // Create a new board
  await page.getByPlaceholder('Name of your first board').fill('Chores');
  await page.getByPlaceholder('Name of your first board').press('Enter');
  // assertion expected new board
  await expect(page.locator('[name="board-title"]')).toHaveValue('Chores');
  await expect(page.getByPlaceholder('Enter list title...')).toBeVisible();
  await expect(page.locator('[data-cy="list"]')).not.toBeVisible();
  
  // Create a new list
  await page.getByPlaceholder('Enter list title...').fill('Todo');
  await page.getByPlaceholder('Enter list title...').press('Enter');
  // assertion expected new list
  await expect(page.locator('[data-cy="list-name"]')).toHaveValue('Todo');



  await page.getByText('Add another card').click();
  await page.getByPlaceholder('Enter a title for this card...').fill('groceries');
  await page.getByPlaceholder('Enter a title for this card...').click();
  await page.getByPlaceholder('Enter a title for this card...').fill('lawn');
  await page.getByPlaceholder('Enter a title for this card...').click();
  await page.getByPlaceholder('Enter a title for this card...').fill('dog');
  await page.getByRole('button', { name: 'Add card' }).click();
  await page.getByRole('navigation').getByRole('button').click();
});