const userData = require('../data/userData');
const loginPage = require('../pages/pages').loginPage;

const user = {
	login(credentials) {
		const username = credentials ? credentials.username : userData.username;
		const password = credentials ? credentials.password : userData.password;
    
		loginPage.setUsername(username);
		loginPage.setPassword(password);
		loginPage.submitBtn.click();
		browser.sleep(1500);
	}
};

module.exports = user;