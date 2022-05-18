const products = [
    {id: 1, title: 'Notebook', price: 2000,img:'../src/img/noutbuk.jpg'},
    {id: 2, title: 'Mouse', price: 20,img:'../src/img/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200,img:'../src/img/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50,img:'../src/img/gamepad.jpg'},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (product) => {
    return `<div class="product-item">
                <img src="${product.img}" width="150" height="150">
                <h3>${product.title}</h3>
                <p>${product.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);