// 所有路由信息
import Vue from 'vue'
import Router from 'vue-router'
import Login from '@/components/Login'
import PartyAdmin from '@/components/admin/partyAdmin/PartyAdmin'
import PersonalInfo from '@/components/admin/personalInfo/PersonalInfo'
import RecruiteParty from '@/components/admin/recruiteParty/RecruiteParty'
import StudentInfo from '@/components/student/studentInfo/StudentInfo'
import AdminMain from '@/components/admin/AdminMain'
import StudentMain from '@/components/student/StudentMain'

Vue.use(Router)



export default new Router({
  routes: [
    {
      path: '/',
      redirect: '/login',
      meta: {
        // 设置请求拦截 如果为false那么不需要登录即刻访问该界面 
        requireAuth: false,
      },
    },
    {
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        requireAuth: false,
      },
    },
    {
      path: '/adminMain',
      name: 'adminMain',
      component: AdminMain,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/studentMain',
      name: 'studentMain',
      component: StudentMain,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/partyAdmin',
      name: 'partyAdmin',
      component: PartyAdmin,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/personalInfo',
      name: 'personalInfo',
      component: PersonalInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/studentInfo',
      name: 'studentInfo',
      component: StudentInfo,
      meta: {
        requireAuth: true
      }
    },
    {
      path: '/recruiteParty',
      name: 'recruiteParty',
      component: RecruiteParty,
      meta: {
        requireAuth: true
      }
    }
  ],
  //mode :"history"//除去#号
})