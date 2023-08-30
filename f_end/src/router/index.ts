import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import IndexPage from '@/components/index/IndexPage.vue';
import UserInfo from '@/components/UserInfo.vue';
import DeviceController from '@/components/DeviceController.vue';
import RegisterDevice from '@/views/RegisterDevice.vue';
import KakaoCallback from '@/components/callback/KakaoCallback.vue';
import GoogleCallback from '@/components/callback/GoogleCallback.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Index',
    component: IndexPage,
  },
  {
    path: '/device/:name',
    name: 'Device',
    component: DeviceController,
    props: true,
  },
  {
    path: '/register',
    name: 'Register',
    component: RegisterDevice,
  },
  {
    path: '/info',
    name: 'Info',
    component: UserInfo,
  },
  {
    path: '/callback/kakao',
    name: 'KakaoCallback',
    component: KakaoCallback,
  }, {
    path: '/callback/google',
    name: 'GoogleCallback',
    component: GoogleCallback,
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
