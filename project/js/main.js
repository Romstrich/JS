//Список товаров

class ProductList {
    constructor(container = '.products',url="./src/json/products.json") {
        this.container = container;//куда запихаем товары
        this.products = []//список покупок
        this.url=url
        this._getProducts()
            .then(data=>{
            this.products=data;
            this.render();
        });//создадим функцию извлечения продуктов
        console.log(this.products)  
        //this.render();//как покажем
    }

    _getProducts() {//достанем полку
        return fetch(this.url)
            .then(result => result.json())           
            .catch(error=>{
                console.log(error);
            });
    }//_getProducts

    render() {//к показу!
        const block = document.querySelector(this.container);//Найдём где показать
        
        for (let product of this.products) {
            console.log(product)
            const item = new ProductItem(product);//Заделали продукт
            block.innerHTML += item.render();//Подкинем к показу к выбранному контейнеру
        }
        document.querySelector(this.container).addEventListener('click',pressed=>{
            if (pressed.target.classList.contains('buy-btn')){
            console.log(`pressed ${pressed.target.getAttribute('data-id')}`)
            }
        });
    }
    
    
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
        console.log(`отрисовка товара ${this.id}`)
        return `<div class="product-item">
                <img src="${this.img}" width="150" height="150">
                <h3>${this.title}</h3>
                <p>${this.price}</p>
                <button class="buy-btn" data-id="${this.id}">Купить</button>
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


//карточка корзины
class Card{
    constructor(){    
        this._init();
    }
    
    _init(){
        document.querySelector('.btn-cart').addEventListener('click',()=>{
            //console.log('basket pressed')
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
    }  
}

//Покажем
let list = new ProductList();
let card = new Card();
