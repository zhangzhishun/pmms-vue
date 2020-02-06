
<template>
<div>
    <h1>党费费用说明</h1>
    <div style="text-align:left">
        学生党员（包括没有工资收入的研究生党员）、没有经济收入的党员，
        应参照《规定》中党费收缴项的第六条规定执行，每月交纳党费2角。
        但如果党员交纳党费确定有困难，可以按《规定》中党费收缴项中的第八条规定执行，
        “由本人提出申请，经党支部委员会同意，可以少交或免交”。
    </div>
</div>
</template>

<script>
    import store from '@/store'
    export default {
        name: "StatementFee",
        components: {
          store,
        },
        // 创建前状态
        beforeCreate () {
            // 在页面加载前读取sessionStorage
            if (sessionStorage.getItem('token') != '') {
                store.state.token = sessionStorage.getItem('token')
            }
            // 在页面刷新前将store保存到sessionStorage里
            window.addEventListener('beforeunload', () => {
                sessionStorage.token = store.state.token
            })
        },
        methods: {
            
        },
        data() {
            return {
            };
        }
    };
</script>


<style>
  
</style>
