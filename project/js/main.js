const products = [
    {id: 1, title: 'Notebook', price: 2000,img:'../src/img/noutbuk.jpg'},
    {id: 2, title: 'Mouse', price: 20,img:'../src/img/mouse.jpg'},
    {id: 3, title: 'Keyboard', price: 200,img:'../src/img/keyboard.jpg'},
    {id: 4, title: 'Gamepad', price: 50,img:'../src/img/gamepad.jpg'},
    {id: 5, title: 'Без рисунка', price: 50},
    {id: 6, title: 'Без рисунка и цены',},
    {id:7},
];
//Функция для формирования верстки каждого товара
//Добавить в выводе изображение
const renderProduct = (title='Товар',price=0,img='../src/img/nothing.jpg') => {
    return `<div class="product-item">
                <img src="${img}" width="150" height="150">
                <h3>${title}</h3>
                <p>${price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
};
const renderPage = list => {
    const productsList = list.map(item => renderProduct(item.title,item.price,item.img));
    console.log(productsList);
    document.querySelector('.products').innerHTML = productsList;
};

renderPage(products);