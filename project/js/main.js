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
        show: false
    },
    methods: {
        getJson(url){//подрузка файла, как раньше, только теперь с гитахаба
            return fetch(url)
                .then(result => result.json())//работа с промисом
                .catch(error => {
                    console.log(error);
                })
        }
    },
    mounted(){
        //метод отработки после загрузки приложения
        //в нашем случае вгураем списки
       this.getJson(`${API + this.catalogUrl}`)
           .then(data => {
               for(let el of data){
                   this.products.push(el);
               }
           });
        this.getJson(`getProducts.json`)
            .then(data => {
                for(let el of data){
                    this.products.push(el);
                }
            })
    }
})