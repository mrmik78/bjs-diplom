//Выход из личного кабинета
const logoutBtn = new LogoutButton();

logoutBtn.action = () => {
    const cb = (response) => {
        if (response.success) {
            location.reload();
        }
    }
    ApiConnector.logout(cb);
}
//Получение информации о пользователе

ApiConnector.current((response) => {
    if (response.success) {
        ProfileWidget.showProfile(response.data)
    }
})
//Получение текущих курсов валюты

const ratesBoard = new RatesBoard();

const updateRatesBoard = () => {
    ApiConnector.getStocks((response) => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    })
}
updateRatesBoard();
setInterval(() => {
    updateRatesBoard();
}, 60000)
//Операции с деньгами, пополнение баланса:

const moneyManager = new MoneyManager();

moneyManager.addMoneyCallback = (data) => {
    ApiConnector.addMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
        moneyManager.setMessage(response.success, response.error || "Баланс пополнен");
    })
}
//Операции с деньгами, конвертирование валюты:

moneyManager.conversionMoneyCallback = (data) => {
    ApiConnector.convertMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
        moneyManager.setMessage(response.success, response.error || "Конвертация выполнена");
    })
}
//Операции с деньгами, реализуйте перевод валюты:

moneyManager.sendMoneyCallback = (data) => {
    ApiConnector.transferMoney(data, (response) => {
        if (response.success) {
            ProfileWidget.showProfile(response.data);
        }
        moneyManager.setMessage(response.success, response.error || "Перевод валюты выполнен");
    })
}
//Работа с избранным, начальный список избранного:

const favoritesWidget = new FavoritesWidget();

ApiConnector.getFavorites((response) => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
})

//Работа с избранным, добавление пользователя в список избранных:

favoritesWidget.addUserCallback = (data) => {
    ApiConnector.addUserToFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        favoritesWidget.setMessage(response.success, response.error || "Пользователь добавлен");
    })
}
//Работа с избранным, удаление пользователя из избранного:

favoritesWidget.removeUserCallback = (data) => {
    ApiConnector.removeUserFromFavorites(data, (response) => {
        if (response.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(response.data);
            moneyManager.updateUsersList(response.data);
        }
        favoritesWidget.setMessage(response.success, response.error || "Пользователь удален");
    })
}