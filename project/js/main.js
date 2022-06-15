const API = 'https://raw.githubusercontent.com/GeekBrainsTutorial/online-store-api/master/responses';

const app = new Vue({
    el: '#app',
    data: {
        //подвозьмём с образца
        catalogUrl: '/catalogData.json',
        products: [],
        filtered: [],
        imgCatalog: 'https://via.placeholder.com/200x150',
        userSearch: '',
        showCart: false,
        //Корзина
        imgCart: 'https://via.placeholder.com/50x100',
        cartUrl: '/getBasket.json',
        cartItems: [],
    },
    methods: {
        getJson(url){//подрузка файла, как раньше, только теперь с гитахаба
            return fetch(url)
                .then(result => result.json())//работа с промисом
                .catch(error => {
                    console.log(error);
                })
        },
        //накидаем в корзину
        addProduct(item){
            console.log(item.id_product);

            let find = this.cartItems.find(el => el.id_product === item.id_product);
            if(find){
                find.quantity+=1;
            }else{
                let new_product=Object.assign({quantity:1},item);
                this.cartItems.push(new_product);
            }
        },
        
        //УДАЛЕНИЕ ИЗ КОРЗИНКИ
        remove(item){
            console.log('УДООЛЯТЬ');
            if(item.quantity>1){
                item.quantity--;
            } else {
                this.cartItems.splice(this.cartItems.indexOf(item), 1);
            }
              
        },

        //фильтр
        filter(){
            let regexp = new RegExp(this.userSearch, 'i');
            this.filtered =  this.products.filter(el => regexp.test(el.product_name));
        },
    },    

    mounted(){
        //метод отработки после загрузки приложения
        //в нашем случае вгураем списки
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
                   this.filtered.push(el);
               }
           });
        //загрузка с локального файла
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                    this.filtered.push(el);
                }
            })
        //подгрузим корзину
        this.getJson(`${API + this.cartUrl}`)
        .then(data => {
            for (let item of data.contents){
                this.cartItems.push(item);
            }
        });
    }
})