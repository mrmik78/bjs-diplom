'use strict';

const userForm = new UserForm();

userForm.loginFormCallback = ({ login, password }) => {
    const cb = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setLoginErrorMessage(response.error);
        }
    }
    ApiConnector.login({ login, password }, cb);
}

userForm.registerFormCallback = ({ login, password }) => {
    const cb = (response) => {
        if (response.success) {
            location.reload();
        } else {
            userForm.setRegisterErrorMessage(response.error);
        }
    }
    ApiConnector.register({ login, password }, cb);
}