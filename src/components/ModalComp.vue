<template>
    <transition name="modal">
    <div class="modal__wrapper" @click="$emit('close')">
      <div class="modal-content" @click.stop="">
        <div class="modal-header">
          <span class="modal-title">Поиск объекта</span>
          <span class="button-close" @click="$emit('close')">×</span>
        </div>
        <div class="modal-body">
            <div class="select">
                <!-- <select v-model="selectedColumns" @change="changeColumn($event)">
                    <option v-for="option in optionsColumn" :key="option.id" :value="option.value">
                        <p>{{ option.txt }}</p>
                    </option>
                </select> -->
                <div @click="showSelectColumns = !showSelectColumns">
                        <div class="select_input">
                            <span class="select_input_txt">{{selectedColumns}}</span>
                            <span class="select_input_ico" v-if="showSelectColumns == false"><mdicon name="ChevronDown" /></span>
                            <span class="select_input_ico" v-if="showSelectColumns == true"><mdicon name="ChevronUp" /></span>
                        </div>
                    </div>
                    <ul class="select_data" :class="{'active': showSelectColumns == true}">
                        <li class="select_data_item" v-for="option in optionsColumn" :key="option.id" @click="changeColumn(option)">{{option.txt}}</li>
                    </ul>
            </div>
            <div class="select">
                <!-- <select v-model="selectedValue" @change="changeVal($event)">
                    <option v-for="option in optionsValue" :key="option.id" :value="option.value">
                        <p>{{ option.txt }}</p>
                    </option>
                </select> -->
                <div @click="showSelectValue = !showSelectValue">
                        <div class="select_input">
                            <span class="select_input_txt">{{selectedValue}}</span>
                            <span class="select_input_ico" v-if="showSelectValue == false"><mdicon name="ChevronDown" /></span>
                            <span class="select_input_ico" v-if="showSelectValue == true"><mdicon name="ChevronUp" /></span>
                        </div>
                    </div>
                    <ul class="select_data" :class="{'active': showSelectValue == true}">
                        <li class="select_data_item" v-for="option in optionsValue" :key="option.id" @click="changeVal(option)">{{option.txt}}</li>
                    </ul>
            </div>
            
            <input v-model="api_search.name" @input="changeName" placeholder="Навазание для поиска"/>
            <button class="btn btnPrimary" :class="{'disable': api_search.name == ''}" @click="search()">Search</button>
        </div>
      </div>
    </div>
  </transition>
</template>

<script>
export default {
    name: "modalComp",
    props: {
        clear: {
            type: Boolean,
            default: false
        }
    },
    data: () => ({
        api_search: {
            name: '',
            value: 0,
            colums: 'name'
        },
        showSelectColumns: false,
        optionsColumn: [
            {txt: 'Дата', id: 0, value: 'date'},
            {txt: 'Название', id: 1, value: 'name'},
            {txt: 'Количество', id: 2, value: 'count'},
            {txt: 'Расстояние', id: 3, value: 'distance'}
        ],
        showSelectValue: false,
        optionsValue: [
            {txt: 'Равно', id: 0, value: 0},
            {txt: 'Содержит', id: 1, value: 1},
            {txt: 'Больше', id: 2, value: 2},
            {txt: 'Меньше', id: 3, value: 3}
        ],
        selectedColumns: 'Название',
        selectedValue: 'Равно'
    }),
    methods: {
        changeColumn(item){
            this.api_search.colums = item.value
            this.selectedColumns = item.txt
            this.showSelectColumns = false
        },
        changeVal(item){
            this.api_search.value = item.value
            this.selectedValue = item.txt
            this.showSelectValue = false
        },
        changeName(){
            this.api_search.name.replace(/['"]+/g, '')
        },
        search(){
            this.$emit('search', this.api_search)
            
        }
    },
    watch: {
        clear: function(){
            if(this.clear == true){
                this.api_search = {name: '', value: 0, colums: 'name'}
            }
        },
        showSelectColumns: function(){
          if(this.showSelectColumns == true){
            this.showSelectValue = false
          }
        },
        showSelectValue: function(){
          if(this.showSelectValue == true){
            this.showSelectColumns = false
          }
        },
    }
}
</script>

<style lang="scss" scoped>
.btn.btnPrimary.disable{
    background-color: #494ce87e;
    pointer-events: none;
    cursor: none;
}
//Animation
.modal-enter {
  opacity: 0
}
.modal-leave-active {
  opacity: 0
}
.modal-enter .modal-content,
.modal-leave-active .modal-content {
  transform: scale(1.2)
}
.modal__wrapper{
  display: flex;
  justify-content: center;
  align-items: center;
  position: fixed;
  top: 0;
  bottom: 0;
  left: 0;
  transition: opacity .2s ease;
  right: 0;
  z-index: 998;
  background-color: rgba(00,00,00,.48);
}
.modal-content {
  position: relative;
  max-width: 600px;
  padding: 20px 18px;
  background-color: #fff;
  border: 1px solid #dcdfe6;
  transition: all .2s ease;
  border-radius: 8px;
  z-index: 999;
  overflow: hidden;
  @media screen and (min-width: 900px) {
    min-width: 500px;
  }
}
.modal-header {
  display: flex;
  align-self: center;
  justify-content: space-between;
  padding-bottom: 20px;
  span {
    font-size: 24px;
  }
  .button-close {
    cursor: pointer;
  }
}
.modal-body {
  text-align: center;
}
input{
    width: 80%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #000;
    &::placeholder{
      text-align: center;
    }
}

.select{
    margin: 1em auto;
    width: 80%;
    height: 40px;
    border: 1px solid #000;
    border-radius: 5px;
    .select_input{
        display: flex;
        align-items: center;
        height: 40px;
        .select_input_txt{
            width: 100%;
        }
        .select_input_ico{
           margin-left: -23px;
           margin-top: -3px;
        }
    }
    .select_data{
        opacity: 0;
        display: none;
        .select_data_item{
            height: 30px;
            padding: 5px 0;
            border-bottom: 1px solid #000;
        }
        .select_data_item:hover{
            background-color: #494ce886;
        }
    }
    .select_data.active{
        background-color: #fff;
        display: block;
        opacity: 1;
        z-index: 1000;
        position: absolute;
        width: 370px;
        margin: 0 -1px;

    }
}
</style>