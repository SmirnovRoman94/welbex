<template>
    <div>
        <div>
            <div class="header">
                <h1 class="header_item">Таблица заказов</h1>
                <div style="display: flex; width: 50%; justify-content: flex-end; margin-right: 30px">
                    <button class="btn btnPrimary" @click="showModal = true">Поиск</button>
                    <div style="margin-left: 10px">
                        <button class="btn btnPrimary" v-if="cleareSearchBtn" @click="crearSearch">Сбросить фильтр</button>
                    </div>
                </div>
            </div>
            <table>
                <thead>
                    <tr>
                        <th v-for="item in headerTable" :key="item.id">
                            <div @click="sort(item)" :class="changeClass(item)">
                                <span>{{item.txt}}</span>
                            </div>
                        </th>
                    </tr>
                </thead>
                <tbody v-if="noData == false">
                    <tr v-for="item in paginatedData" :key="item.id" :class="{'loading_tr': loading == true}">
                        <td :class="{'loading_td': loading == true}">{{item.date}}</td>
                        <td :class="{'loading_td': loading == true}">{{item.name}}</td>
                        <td :class="{'loading_td': loading == true}">{{item.count}}</td>
                        <td :class="{'loading_td': loading == true}">{{item.distance}}</td>
                    </tr>
                </tbody>
                <tbody v-else>
                    <tr class="error_data_item">
                        <td>Отсутствуют данные ...</td>
                    </tr>
                </tbody>
            </table>
            <div class="controls" v-if="loading == false">
                <div class="select">
                    <select v-model="selected" >
                            <option v-for="option in options" :key="option.txt">
                                <p>{{ option.txt }}</p>
                            </option>
                    </select>
                </div>
                <div class="controls_item">
                    <span class="controls_item_btn_next" :class="{'disabled' : pageNumber==0}" @click="prevPage"><mdicon name="ChevronLeft" /> </span>
                    <div v-for="item in numberPage" :key="item" class="controls_item_btn" :class="{'active': pageNumber+1 == item}">
                        <span  @click="enterPage(item)">{{item}}</span>
                    </div>
                    <span class="controls_item_btn_next" :class="{'disabled' : pageNumber >= pageCount -1}" @click="nextPage"><mdicon name="ChevronRight" /> </span>
                </div>
            </div>
        </div>
        <modal-comp v-show="showModal" :clear="defClear" @close="showModal = false" @search="searchItem"> </modal-comp>
    </div>
</template>

<script>
import ModalComp from './ModalComp.vue';
export default {
    name: "table_component",
    components: {ModalComp},
    props: {
        dataTable: {
            type: Array,
        }
    },
    data: () => ({
        loading: true,
        dataTableSearch: [],
        noData: false,
        headerTable: [
            {txt: 'Дата', value: 'date', sorting: null, id: 1},
            {txt: 'Название', value: 'name', sorting: null, id: 2},
            {txt: 'Количество', value: 'count', sorting: null, id: 3},
            {txt: 'Расстояние', value: 'distance', sorting: null, id: 4}
        ],
        selected: 5,
        options: [
            {txt: 5, id: 1},
            {txt: 10, id: 2},
            {txt: 15, id: 3}
        ],
        //pagination
        pageNumber: 0,
        numberPage: [],
        //sort
        beforeSort: null,
        //search
        showModal: false,
        cleareSearchBtn: false,
        defClear: false
    }),
    computed: {
        pageCount(){
            let lenght = this.dataTableSearch.length,
                count = this.selected
            return Math.ceil(lenght/count);
        },
        paginatedData(){
            const start = this.pageNumber * this.selected;
            const end = start + Number(this.selected);
            return this.dataTableSearch.slice(start, end)
        },

    },
    methods: {
        prevPage(){
            this.pageNumber--
        },
        nextPage(){
            this.pageNumber++
        },
        enterPage(item){
            this.pageNumber = item-1
        },
        sort(item){
           this.beforeSort = item
            if(item.txt == 'Название'){
                if(item.sorting == false || item.sorting == null){
                    let qw = this.dataTableSearch
                    qw.sort(function(a,b){
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase()
                        if(nameA < nameB){
                            return -1
                        }
                        if(nameA > nameB){
                            return 1
                        }
                        return 0
                    })
                    item.sorting = true
                }else{
                    let qw = this.dataTableSearch
                    qw.reverse(function(a,b){
                        let nameA = a.name.toLowerCase();
                        let nameB = b.name.toLowerCase()
                        if(nameA < nameB){
                            return -1
                        }
                        if(nameA > nameB){
                            return 1
                        }
                        return 0
                    })
                    item.sorting = false
                }
            }
            if(item.txt == 'Количество'){
                if(item.sorting == false || item.sorting == null){
                    let qw = this.dataTableSearch
                    qw.sort(function(a,b){
                        return a.count-b.count
                    })
                    item.sorting = true
                }else{
                    let qw = this.dataTableSearch
                    qw.reverse(function(a,b){
                        return a.count-b.count
                    })
                    item.sorting = false
                }
            }
            if(item.txt == 'Расстояние'){
                if(item.sorting == false || item.sorting == null){
                    let qw = this.dataTableSearch
                    qw.sort(function(a,b){
                        return a.distance-b.distance
                    })
                    item.sorting = true
                }else{
                    let qw = this.dataTableSearch
                    qw.reverse(function(a,b){
                        return a.distance-b.distance
                    })
                    item.sorting = false
                }
            }

        },
        changeClass(item){
            return {
                span : item.sorting == null,
                qw : item.sorting == true,
                up : item.sorting == false
            }
        },
        searchItem(item){
            this.showModal = false;
            this.cleareSearchBtn = true;
            switch (item.colums){
                case 'date': 
                    this.searchItemDate(item)
                break;
                case 'name': 
                    this.searchItemName(item)
                break;
                case 'count': 
                    this.searchItemCount(item)
                break;
                case 'distance': 
                    this.searchItemDist(item)
                break;
            }

        },
        searchItemDate(item){
            let searchArray = new Array();
            if(item.value == 0 || item.value == 1){
                searchArray =  this.dataTable.filter(itemTable => itemTable.date == item.name)
            }
            if(item.value == 2){
                searchArray =  this.dataTable.filter(itemTable => itemTable.date > item.name)
            }
            if(item.value == 3){
                searchArray =  this.dataTable.filter(itemTable => itemTable.date < item.name)
            }
            
            if(Object.keys(searchArray).length == 0){
                this.noData = true
            }else{
                return this.dataTableSearch = searchArray
            }
        },
        searchItemName(item){
            let searchArray = new Array();
                searchArray =  this.dataTable.filter(itemTable => itemTable.name.toLowerCase().replace(/['"]+/g, '') == item.name.toLowerCase())
                if(Object.keys(searchArray).length == 0){
                    this.noData = true
                }else{
                    return this.dataTableSearch = searchArray
                }

        },
        searchItemCount(item){
            let searchArray = new Array();
            if(item.value == 0 || item.value == 1){
                searchArray =  this.dataTable.filter(itemTable => itemTable.count == item.name)
            }
            if(item.value == 2){
                searchArray =  this.dataTable.filter(itemTable => itemTable.count > item.name)
            }
            if(item.value == 3){
                searchArray =  this.dataTable.filter(itemTable => itemTable.count < item.name)
            }
            
            if(Object.keys(searchArray).length == 0){
                this.noData = true
            }else{
                return this.dataTableSearch = searchArray
            }
        },
        searchItemDist(item){
            let searchArray = new Array();
            if(item.value == 0 || item.value == 1){
                searchArray =  this.dataTable.filter(itemTable => itemTable.distance == item.name)
            }
            if(item.value == 2){
                searchArray =  this.dataTable.filter(itemTable => itemTable.distance > item.name)
            }
            if(item.value == 3){
                searchArray =  this.dataTable.filter(itemTable => itemTable.distance < item.name)
            }
            
            if(Object.keys(searchArray).length == 0){
                this.noData = true
            }else{
                return this.dataTableSearch = searchArray
            }
        },
        crearSearch(){
            console.log(this.dataTableSearch)
            console.log(this.dataTable)
            this.cleareSearchBtn = false
            this.defClear = true
            this.noData = false

            return this.dataTableSearch = this.dataTable

            
        }

    },
    watch: {
        noData: function(){
            console.log(this.noData)
        },
        dataTable: function(){
            this.dataTable.forEach(item => {
                    this.dataTableSearch.push(item)
            });
            setTimeout(() => {
                this.loading = false
            },3000)
        },
        pageCount: {
            handler: function(n){
                this.numberPage = [];
                for(let i = 1; i<n+1; i++){
                    this.numberPage.push(i)
                }
            },
            deep: true
        },
        beforeSort:{
            handler: function(aft, old){
                if(old !== null){
                    if(aft.id !== old.id){
                        return old.sorting = null
                    }
                }
            },
            deep: true
        }
    }
    
}
</script>

<style lang="scss" scoped>
.header{
    display: flex;
    justify-content:space-around;
    border-bottom: 1px solid #000;
    .header_item{
        font-size: 30px;
        font-weight: 600;
        width: 50%;
    }
}
th{
    width: 220px;
}
.qw::after{
    content: '↓';
    font-size: 15px;
    padding-left: 5px;
    
}
.up::after{
    content: '↑';
    font-size: 15px;
    padding-left: 5px;
}
@media screen and (max-width: 770px) {
    th{
        width: 70px;
        padding: 0 5px;
    }
    .span, .qw , .up{
        font-size: 14px;
    }
    td{
        font-size: 10px;
        padding: 5px;
    }
}
@media screen and (max-width: 480px) {
    th{
        width: 70px;
        padding: 0 5px;
    }
    .span, .qw , .up{
        font-size: 12px;
    }
    td{
        font-size: 5px;
        padding: 5px;
    }
    .qw::after{
        font-size: 8px;
        padding-left: 0;
    }
}
.controls{
    margin: 0 2em;
    display: flex;
    justify-content: space-between;

    .controls_item{
        display: flex;

    }
}
.controls_item_btn{
    transition: .5s;
    width: 26px;
    height: 26px;
    border: 1px solid #494ce8;
    border-radius: 20%;
    margin-right: 5px;

    span{
        display: flex;
        justify-content: center;
        align-content: center;
    }
}
.controls_item_btn_next{
    transition: .5s;
    color: #fff;
    width: 26px;
    height: 26px;
    border-radius: 20%;
    margin-right: 5px;
    border: 1px solid #494ce8;
    background-color: #494ce8;

    span{
        display: flex;
        justify-content: center;
        align-content: center;
    }
}
.controls_item_btn:hover{
    background-color: #494ce886;
}
.controls_item_btn.active{
    background-color: #494ce886;
}
.controls_item_btn_next.disabled{
    pointer-events: none;
    background-color: rgba(148, 144, 144, 0.514);
    cursor: none;
    span{
        color: rgba(240, 248, 255, 0.514);
    }
}

.select select{
    width: 200px;
    height: 26px;
    border-radius: 5px;
    border: 1px solid #494ce8;
}
.error_data_item{
    background-color: none;
    text-align: center;
    font-weight: 200;
    box-shadow: 0;
}


</style>