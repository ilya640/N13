const ObjStorageFunc = () => {
    const storage = {};

    const addValue = (key, value) => {
        storage[key] = value;
    };

    const getValue = (key) => {
        return storage.hasOwnProperty(key) ? storage[key] : undefined;
    };

    const deleteValue = (key) => {
        if (storage.hasOwnProperty(key)) {
            delete storage[key];
            return true;
        }
        return false;
    };

    const getKeys = () => {
        return Object.keys(storage);
    };

    return {
        addValue,
        getValue,
        deleteValue,
        getKeys,
    };
};

const drinkStorage = ObjStorageFunc();

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