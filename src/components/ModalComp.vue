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
                <select v-model="selectedColumns" @change="changeColumn($event)">
                    <option v-for="option in optionsColumn" :key="option.id" :value="option.value">
                        <p>{{ option.txt }}</p>
                    </option>
                </select>
            </div>
            <div class="select">
                <select v-model="selectedValue" @change="changeVal($event)">
                    <option v-for="option in optionsValue" :key="option.id" :value="option.value">
                        <p>{{ option.txt }}</p>
                    </option>
                </select>
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
        optionsColumn: [
            {txt: 'Дата', id: 0, value: 'date'},
            {txt: 'Название', id: 1, value: 'name'},
            {txt: 'Количество', id: 2, value: 'count'},
            {txt: 'Расстояние', id: 3, value: 'distance'}
        ],
        optionsValue: [
            {txt: 'Равно', id: 0, value: 0},
            {txt: 'Содержит', id: 1, value: 1},
            {txt: 'Больше', id: 2, value: 2},
            {txt: 'Меньше', id: 3, value: 3}
        ],
        selectedColumns: 'name',
        selectedValue: 0
    }),
    methods: {
        changeColumn(event){
            this.api_search.colums = event.target.value
        },
        changeVal(event){
            this.api_search.value = event.target.value
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
        }
    }
}
</script>

<style lang="scss" scoped>
.btn.btnPrimary.disable{
    background-color: #494ce87e;
    pointer-events: none;
    cursor: none;
}
// Animation
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
.select select{
    padding: 0 22px;
    margin-top: 1em;
    width: 80%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #000;
}
input{
    margin-top: 1em;
    width: 80%;
    height: 40px;
    border-radius: 5px;
    border: 1px solid #000;
}
</style>