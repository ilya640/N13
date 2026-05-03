function ObjStorageFunc() {
    this.storage = {};
}

ObjStorageFunc.prototype.addValue = function(key, value) {
    this.storage[key] = value;
};

ObjStorageFunc.prototype.getValue = function(key) {
    return this.storage.hasOwnProperty(key) ? this.storage[key] : undefined;
};

ObjStorageFunc.prototype.deleteValue = function(key) {
    if (this.storage.hasOwnProperty(key)) {
        delete this.storage[key];
        return true;
    }
    return false;
};

ObjStorageFunc.prototype.getKeys = function() {
    return Object.keys(this.storage);
};

const drinkStorage = new ObjStorageFunc();

const infoDiv = document.getElementById("info");

document.getElementById("addDrinkBtn").addEventListener("click", () => {
    const name = prompt("Введите название напитка:");
    if (!name) return;

    const alcoholicInput = prompt("Алкогольный напиток? (да/нет):").toLowerCase();
    const alcoholic = alcoholicInput === "да";

    const recipe = prompt("Введите рецепт приготовления:");

    drinkStorage.addValue(name, { alcoholic, recipe });
    infoDiv.textContent = `Напиток "${name}" добавлен!`;
});

document.getElementById("getDrinkBtn").addEventListener("click", () => {
    const name = prompt("Введите название напитка:");
    const drink = drinkStorage.getValue(name);

    if (drink) {
        infoDiv.textContent = `Напиток ${name}
Алкогольный: ${drink.alcoholic ? "да" : "нет"}
Рецепт:
${drink.recipe}`;
    } else {
        infoDiv.textContent = `Напиток "${name}" отсутствует.`;
    }
});

document.getElementById("deleteDrinkBtn").addEventListener("click", () => {
    const name = prompt("Введите название напитка:");
    const deleted = drinkStorage.deleteValue(name);

    infoDiv.textContent = deleted ?
        `Напиток "${name}" удалён` :
        `Напиток "${name}" не найден`;
});

document.getElementById("listDrinksBtn").addEventListener("click", () => {
    const keys = drinkStorage.getKeys();

    infoDiv.textContent = keys.length ?
        "Список напитков:\n" + keys.join("\n") :
        "Хранилище пустое";
});
