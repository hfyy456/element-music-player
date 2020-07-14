<template>
    <div id="app">
        <Topmenu />
        <Leftmenu />
        <div>
            <router-view></router-view>
        </div>
        <Bottombar />
    </div>
</template>

<script>
import { Topmenu, Bottombar, Leftmenu } from '@/components'
export default {
    name: 'elc',
    components: {
        Topmenu,
        Bottombar,
        Leftmenu,
    },
    created() {
        this.$store.dispatch('app/getConfig')
    },
}
</script>

<style>
/* CSS */
body {
    margin: 0;
}

.uk-notification-message {
    font-size: 14px;
    text-align: center;
}
::-webkit-scrollbar {
    width: 7px;
    background-color: #afafaf;
}
::-webkit-scrollbar-thumb {
    background-color: #636363;
}
.el-slider__bar {
    height: 4px !important;
    background-color: #e83c3c !important;
}
.el-slider__button {
    width: 8px !important;
    height: 8px !important;
    border: 2px solid #e83c3c !important;
}
.el-card {
    background-color: #fafafa !important;

    border: 1px solid #e4e7ed !important;
    box-shadow: none !important;
    border-radius: none !important;
}
.el-card__body {
    padding: 0 !important;
}
</style>
