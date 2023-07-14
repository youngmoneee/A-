import { createRouter, createWebHistory, RouteRecordRaw } from 'vue-router';
import KakaoButton from '@/components/login/KakaoButton.vue';
import GoogleButton from '@/components/login/GoogleButton.vue';

const routes: Array<RouteRecordRaw> = [
  {
    path: '/auth/kakao',
    name: 'kakaoLogin',
    component: KakaoButton,
  },
  {
    path: '/auth/google',
    name: 'googleLogin',
    component: GoogleButton,
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

export default router;
