import { selectors, test as setup } from '@playwright/test';

setup('create new database', async ({}) => {
    console.log('Global setup: create new database');
     selectors.setTestIdAttribute("data-test");
    // code to create a new database
    // e.g., await exec('createdb my_test_db');
});

setup.afterAll(async () => {
    console.log('Global teardown: drop the test database');
    // code to drop the test database
    // e.g., await exec('dropdb my_test_db');
});