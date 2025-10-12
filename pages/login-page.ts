import type { Page, Locator } from '@playwright/test';

export class LoginPage {
    public usernameInput: Locator;
    public passwordInput: Locator;
    public loginButton: Locator;
    public errorMessage: Locator;
    public burgerMenuButton: Locator;
    public logoutSidebarLink: Locator;

    constructor(private page: Page) {
        this.usernameInput = page.getByPlaceholder('Username');
        this.passwordInput = page.getByPlaceholder('Password');
        this.loginButton = page.getByRole('button', { name: 'Login' });
        this.errorMessage = page.getByText(/Epic sadface:/);
        this.burgerMenuButton = page.locator('#react-burger-menu-btn');
        this.logoutSidebarLink = page.locator('#logout_sidebar_link');
    }
    
    async login(username: string, password: string) {
        await this.usernameInput.fill(username);
        await this.passwordInput.fill(password);
        await this.loginButton.click();
    }

    async logout() {
        await this.burgerMenuButton.click();
        await this.logoutSidebarLink.click();
    }
}