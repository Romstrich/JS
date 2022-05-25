//Список товаров

class ProductList {
    constructor(container = '.products') {
        this.container = container;//куда запихаем товары
        this.products = []//список покупок
        this._getProducts()
            .then(data=>{
            //  console.log(data);
            this.products=data;
            this.render();//как покажем
//+            console.log(this.products)
        });//создадим функцию извлечения продуктов
        console.log(this.products)  
        //this.render();//как покажем
    }
    _getProducts() {//достанем полку
        return fetch("./src/json/products.json")
            .then(result => result.json())           
            .catch(error=>{
                console.log(error);
            });
        // this.products = [
            // { id: 1, title: 'Notebook', price: 2000, img: '../src/img/noutbuk.jpg' },
            // { id: 2, title: 'Mouse', price: 20, img: '../src/img/mouse.jpg' },
            // { id: 3, title: 'Keyboard', price: 200, img: '../src/img/keyboard.jpg' },
            // { id: 4, title: 'Gamepad', price: 50, img: '../src/img/gamepad.jpg' },
            // { id: 5, title: 'Без рисунка', price: 50 },
            // {id: 6, title: 'Без рисунка и цены',},
            // {id:7},
        // ];
    }//_getProducts

    render() {//к показу!
        const block = document.querySelector(this.container);//Найдём где показать
        
        for (let product of this.products) {
            console.log(product)
            const item = new ProductItem(product);//Заделали продукт
            block.innerHTML += item.render();//Подкинем к показу к выбранному контейнеру
        }
    }
    
    allSumm
}

//Наши товары
class ProductItem {
    constructor(product, img = 'src/img/nothing.jpg') {
        this.id = product.id;
        this.title = product.title;
        this.price = product.price;
        if (product.img) {//если  идёт картинка
            this.img = product.img;//ставим картинку
        } else {//если картинки ссобой нет
            this.img = img;//берём какая есть всегда
        }
    }

    render() {
        return `<div class="product-item">
                <img src="${this.img}" width="150" height="150">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn">Купить</button>
            </div>`
    }
}

//корзина
// в козине:
//     -элемент списка корзины:
//         -продукт    количество  сумма
//     -элемент списка корзины:
//         -продукт    количество  сумма
//     ...
//     -обсчая сумма
class GoodsList {
    constructor() {
        this.goods=[];//список покупок
        this._goodsSum();//сразу сумма корзины
    }

    _goodsSum(){
        this.summa=0;//сумма корзины = 0
        for(let good in this.goods){//побежали прибавлять стоимость корзины
            this.summa+=good.summa;
        }
    }
}
//элемент корзины
class GoodsItem {
    constructor(product, quantity = 1) {
        this.product = product;//товар 
        this.quantity = quantity;//количество 
        this._getSum();//суммарная стоимость одной позиции
    }

    _getSum() {
        this.summa = this.product.price * this.quantity
    }

    _upQuantity() {//прибавили
        this.quantity += 1
        this._getSum()
    }

    _downQuantity() {//убрали
        //Ещё удаление при количестве == 0
        this.quantity -= 1
        this._getSum()
    }
}



//Покажем
let list = new ProductList();







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