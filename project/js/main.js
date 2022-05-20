//Список товаров

class ProductList{
    constructor(container='.products'){
        this.container=container;//куда запихаем товары
        this.products=[]//список покупок
        this._getProducts();//создадим функцию извлечения продуктов
        this.render();//как покажем
    }
    _getProducts(){//достанем полку
        this.products = [
                {id: 1, title: 'Notebook', price: 2000,img:'../src/img/noutbuk.jpg'},
                {id: 2, title: 'Mouse', price: 20,img:'../src/img/mouse.jpg'},
                {id: 3, title: 'Keyboard', price: 200,img:'../src/img/keyboard.jpg'},
                {id: 4, title: 'Gamepad', price: 50,img:'../src/img/gamepad.jpg'},
                {id: 5, title: 'Без рисунка', price: 50},
                // {id: 6, title: 'Без рисунка и цены',},
                // {id:7},
            ];
    }
    render(){//к показу!
        const block = document.querySelector(this.container);//Найдём где показать
        for(let product of this.products){
            const item = new ProductItem(product);//Заделали продукт
            block.innerHTML += item.render();//Подкинем к показу к выбранному контейнеру
        }
    }
}

//Наши товары
class ProductItem{
    constructor(product,img='../src/img/nothing.jpg'){
        this.id=product.id;
        this.title=product.title;
        this.price=product.price;
        if (product.img){//если  идёт картинка
            this.img=product.img;//ставим картинку
        }else{//если картинки ссобой нет
            this.img=img;//берём какая есть всегда
        }
    }
    render(){
        return `<div class="product-item">
                <img src="${this.img}" width="150" height="150">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

let list= new ProductList();







// const products = [
//     {id: 1, title: 'Notebook', price: 2000,img:'../src/img/noutbuk.jpg'},
//     {id: 2, title: 'Mouse', price: 20,img:'../src/img/mouse.jpg'},
//     {id: 3, title: 'Keyboard', price: 200,img:'../src/img/keyboard.jpg'},
//     {id: 4, title: 'Gamepad', price: 50,img:'../src/img/gamepad.jpg'},
//     {id: 5, title: 'Без рисунка', price: 50},
//     {id: 6, title: 'Без рисунка и цены',},
//     {id:7},
// ];
// //Функция для формирования верстки каждого товара
// //Добавить в выводе изображение
// const renderProduct = (title='Товар',price=0,img='../src/img/nothing.jpg') => {
//     return `<div class="product-item">
//                 <img src="${img}" width="150" height="150">
//                 <h3>${title}</h3>
//                 <p>${price}</p>
//                 <button class="buy-btn">Купить</button>
//             </div>`
// };
// const renderPage = list => {
//     const productsList = list.map(item => renderProduct(item.title,item.price,item.img));
//     console.log(productsList);
//     document.querySelector('.products').innerHTML = productsList;
// };

// renderPage(products);