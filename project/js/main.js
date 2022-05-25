//Список товаров
const API_all = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json';
const API_basket = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/addToBasket.json';


//единица товара
class Item {
    constructor(product, img = 'src/img/nothing.jpg') {
        this.id_product = product.id_product;
        this.product_name = product.product_name;
        this.price = product.price;
        if (product.img) {//если  идёт картинка
            this.img = product.img;//ставим картинку
        } else {//если картинки ссобой нет
            this.img = img;//берём какая есть всегда
        }
    }
}

//Наши товары для страницы
class ProductItem extends Item {
    constructor(product, img = 'src/img/nothing.jpg') {
        super(product, img)
    }

    render() {
        //console.log(`отрисовка товара ${this.id}`)
        return `<div class="product-item">
                <img src="${this.img}" width="150" height="150">
                <h3>${this.product_name}</h3>
                <p>${this.price}</p>
                <button class="buy-btn" data-id="${this.id_product}">Купить</button>
            </div>`
    }
}

//Загрузка нужного списка
class List {
    constructor(url = "./src/json/products.json") {
        //куда запихаем товары
        this.products = [];//список покупок
        this.url = url;
        this._getProducts()
            .then(data => {
                this.products = data;
                this.render();
            });//создадим функцию извлечения продуктов
        console.log(this.products)
        //this.render();//как покажем
    }

    _getProducts() {//достанем полку
        return fetch(this.url)
            .then(result => result.json())
            .catch(error => {
                console.log(error);
            });
    }//_getProducts   
}

//список для старницы
class ProductList extends List {
    constructor(card, container = '.products', url) {
        super(url)
        this.container = container;
        this.card = card;//типо карточку корзины написали

    }

    find(id) {
        for (let item of this.products) {
            if (item.id_product == id) {
                return item;
            }
        }
    }

    render() {//к показу!
        const block = document.querySelector(this.container);//Найдём где показать

        for (let product of this.products) {
            console.log(product)
            const item = new ProductItem(product);//Заделали продукт
            block.innerHTML += item.render();//Подкинем к показу к выбранному контейнеру
        }
        document.querySelector(this.container).addEventListener('click', pressed => {
            if (pressed.target.classList.contains('buy-btn')) {
                let id = pressed.target.getAttribute('data-id');
                this.card.addItem(this.find(id))
                //console.log(this.find(id))
                //console.log(`pressed ${pressed.target.getAttribute('data-id')}`)
            }
        });
    }
}


//Элемент корзины
class CardItem extends Item {
    constructor(product, img = 'https://placehold.it/50x100') {
        super(product, img);
        this.quantity = 1;
    }
    render() {
        return `<div class="cart-item" data-id="${this.id_product}">
                <div class="product-bio">
                <img src="${this.img}" alt="Some image">
                <div class="product-desc">
                <p class="product-title">${this.product_name}</p>
                <p class="product-quantity">Quantity: ${this.quantity}</p>
            <p class="product-single-price">$${this.price} each</p>
            </div>
            </div>
            <div class="right-block">
                <p class="product-price">$${this.quantity * this.price}</p>
                <button class="del-btn" data-id="${this.id_product}">&times;</button>
            </div>
            </div>`
    }
}




//карточка корзины
class Card {
    constructor() {
        this.goods = [];
        this._init();
    }

    addItem(good) {
        this.goods.push(new CardItem(good));
        console.log(this.goods)
        this.cardUpdate();
    }

    cardUpdate(){
        let bascket = document.querySelector('.cart-block');
        for (let item of this.goods){
            bascket.innerHTML += item.render();
        }
    }

    _init() {

        document.querySelector('.btn-cart').addEventListener('click', () => {
            //console.log('basket pressed')
            document.querySelector('.cart-block').classList.toggle('invisible');
        });
    }
}


//Покажем

//let list = new ProductList(container='.products',url=API_all);//'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses/catalogData.json');
let card = new Card();
let list = new ProductList(card)
