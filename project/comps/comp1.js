Vue.component('first_comp',{
    data(){
        return {name:'NAME'}
    },
    template:`
    <div>
    <p> first component </p>
    <slot></slot>
    <tr>
    <h1>Приветта!!! {{name}}</h1>
    <my_button></my_button>
    </div>`
});

Vue.component('my_button',{
    data(){
        return{
            counter:0
        }
    },
    template:`
    <div>
        <button @click="counter++"> нажато {{counter}} раз </button
    </div>`
})