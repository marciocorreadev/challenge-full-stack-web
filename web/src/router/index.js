import StudentList from '@/views/StudentList.vue';
import Student from '@/views/Student.vue';
import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/student',
    name: 'Cadastro de Aluno',
    component: Student,
  },
  {
    path: '/student/:id',
    name: 'Atualização de Aluno',
    component: Student
  },
  {
    path: '/',
    name: 'Consulta de Alunos',
    component: StudentList,
  },
];

const router = new VueRouter({ routes });

export default router;
