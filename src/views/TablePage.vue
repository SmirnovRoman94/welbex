<template>
    <div class="wrapper">
        <div class="wrapper-content">
            <section>
                <div class="container">
                    <table-comp :dataTable="GET_PACKAGE"></table-comp>
                </div>
            </section>
        </div>
    </div>
</template>


<script>

import TableComp from '@/components/TableComp.vue'
import { mapActions, mapGetters } from 'vuex'
export default {
    components: {
        TableComp
    },
    computed: {
        ...mapGetters([
            "GET_PACKAGE"
        ])
    },
    methods: {
        ...mapActions([
            'INIT_PACKAGE'
        ])
    },
    mounted(){
        this.INIT_PACKAGE()
    }
}
</script>

<style lang="scss" scoped>

</style>