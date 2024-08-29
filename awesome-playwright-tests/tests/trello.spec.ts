import { test, expect } from '@playwright/test';



//call API endpoint to drop DB before every test run
test.beforeAll(async ({ request }) => {
  // Clear the database
  await request.post('http://localhost:3000/api/reset');
});

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

  // Add cards to the list
  // 1st click on "Add another card" is important, it makes the "Enter a title for this card..." input appearing
  await page.getByText('Add another card').click();
  await page.getByPlaceholder('Enter a title for this card...').fill('groceries');
  await page.getByRole('button', { name: 'Add card' }).click();

  await page.getByPlaceholder('Enter a title for this card...').fill('lawn');
  await page.getByRole('button', { name: 'Add card' }).click();
  await page.getByPlaceholder('Enter a title for this card...').fill('dog');
  await page.getByRole('button', { name: 'Add card' }).click();
  // Assertions to verify three created cards 
  await expect(page.locator('[data-cy="card-text"]')).toHaveText(
    ['groceries', 'lawn', 'dog']);
  // Navigate to the home page
  await page.getByRole('navigation').getByRole('button').click();
  // assertion home page
  await expect(page.getByText('My Boards')).toBeVisible();
  await expect(page.getByText('Chores')).toBeVisible();
});