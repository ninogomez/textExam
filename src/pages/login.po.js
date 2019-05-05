const loginPage = {
	usernameTxt: $('#uid'),
	passwordTxt: $('[name="password"]'),
	submitBtn: $('#loginSubmit'),
	warnMessage: $('.warnmessage'),

	setUsername(username) {
		loginPage.usernameTxt.clear();
		loginPage.usernameTxt.sendKeys(username);
	},
  
	setPassword(password) {
		loginPage.passwordTxt.clear();
		loginPage.passwordTxt.sendKeys(password);
	},
  
	async getElementsDisplay() {
		const XMLHttpRequest = require('xmlhttprequest').XMLHttpRequest;
		const req = new XMLHttpRequest();
		req.open('get','http://18.182.46.19:8080/exam/img/login2.gif',false);
		req.send();

		return {
			usernameTxt: await loginPage.usernameTxt.isPresent(),
			passwordTxt: await loginPage.passwordTxt.isPresent(),
			submit: await loginPage.submitBtn.isPresent(),
			loginImg: req.status === 200 ? true : false
		};
	}

};

module.exports = loginPage;