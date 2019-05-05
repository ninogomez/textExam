/* eslint-disable no-console */
// import { userData } from '../data/userData';
const user = require('../helpers/user');
const pages = require('../pages/pages');
const helper = require('../helpers/helper');
const userData = require('../data/userData');

const mainPage = pages.mainPage;
const loginPage = pages.loginPage;

const successMsg = 'ログイン完了';

describe('Login Test',  () => {
	beforeAll(() => {
		helper.goToLoginPage();
	});
	it('all elements should properly load', async ()=> {
		const elements = await loginPage.getElementsDisplay();
    
		for (const key in elements) {
			expect(elements[key]).toBeTruthy(`Element: ${key} is not present or displayed`);
		}
	});
	it('should be able to login using correct credentials', async () => {
		user.login();
    
		expect(await mainPage.successMsg.getText()).toContain(successMsg);
	});
	it('should NOT be able to login user Incorrect credentials', async ()=> {
		const warnMessage = 'ログインＩＤが存在しません';
		const userDataTemp = { username: userData.username + 'ThisShouldNotLogin',
			password : userData.password};
    
		mainPage.loginBtn.click();
		user.login({username: 'invalidUsername', password: 'aVeryMuchInvalidPassword1234'});
	
		expect(loginPage.warnMessage.getText()).toContain(warnMessage);
    
		user.login(userDataTemp);
		expect(mainPage.successMsg.isPresent()).not.toBeTruthy(`User : ${JSON.stringify(userDataTemp)} should not be able to log in`);
	});
	it('should be able to navigate out and back (session retained)',()=> {
		helper.goToLoginPage();
		user.login();
		browser.get('https://www.google.com/');
		helper.goToLoginPage();
    
		expect(mainPage.successMsg.getText()).toContain(successMsg, 'Session did not retain after user navigates out and back');
	});
});
