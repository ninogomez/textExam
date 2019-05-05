const helper = {
	goToLoginPage() {
		browser.waitForAngularEnabled(false);
		browser.get('http://18.182.46.19:8080/exam/login');
	}
};

module.exports = helper;