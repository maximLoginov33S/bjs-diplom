const logout = new LogoutButton();
logout.action = () => {
    ApiConnector.logout(response => {
        if (response) {
            location.reload();
        } 
    });
};

ApiConnector.current(response => {
    if (response.success) {
        ProfileWidget.showProfile(response.data);
    }
});

const ratesBoard = new RatesBoard();
function ratesShow() {
    ApiConnector.getStocks(response => {
        if (response.success) {
            ratesBoard.clearTable();
            ratesBoard.fillTable(response.data);
        }
    });
}
ratesShow();
setInterval(ratesShow, 60000);

const moneyManager = new MoneyManager();
moneyManager.addMoneyCallback = response => {
    ApiConnector.addMoney(response, responseNew => {
        if (responseNew.success) {
            ProfileWidget.showProfile(responseNew.data);
            moneyManager.setMessage(responseNew.success, "Пополнение баланса прошло успешно");
        } else { 
            moneyManager.setMessage(responseNew.success, responseNew.error);
        }
    });  
};

moneyManager.conversionMoneyCallback = response => {
    ApiConnector.convertMoney(response, responseNew => {
        if (responseNew.success) {
            ProfileWidget.showProfile(responseNew.data);
            moneyManager.setMessage(responseNew.success, "Конвертирование валюты прошло успешно");
        } else {
            moneyManager.setMessage(responseNew.success, responseNew.error);
        }
    });
};

moneyManager.sendMoneyCallback = response => {
    ApiConnector.transferMoney(response, responseNew => {
        if (responseNew.success) {
            ProfileWidget.showProfile(responseNew.data);
            moneyManager.setMessage(responseNew.success, "Перевод средств прошел успешно");
        } else { 
            moneyManager.setMessage(responseNew.success, responseNew.error);
        }
    });
};

const favoritesWidget = new FavoritesWidget();
ApiConnector.getFavorites(response => {
    if (response.success) {
        favoritesWidget.clearTable();
        favoritesWidget.fillTable(response.data);
        moneyManager.updateUsersList(response.data);
    }
});

favoritesWidget.addUserCallback = response => {
    ApiConnector.addUserToFavorites(response, responseNew => {
        if (responseNew.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responseNew.data);
            moneyManager.updateUsersList(responseNew.data);
            favoritesWidget.setMessage(responseNew.success, "Добавление в избранное прошло успешно");
        } else {
            favoritesWidget.setMessage(responseNew.success, responseNew.error);
        }
    });
};

favoritesWidget.removeUserCallback = response => {
    ApiConnector.removeUserFromFavorites(response, responseNew => {
        if (responseNew.success) {
            favoritesWidget.clearTable();
            favoritesWidget.fillTable(responseNew.data);
            moneyManager.updateUsersList(responseNew.data);
            favoritesWidget.setMessage(responseNew.success, "Удаление из избранного прошло успешно");
        } else { 
            favoritesWidget.setMessage(responseNew.success, responseNew.error);
        }
    });
};