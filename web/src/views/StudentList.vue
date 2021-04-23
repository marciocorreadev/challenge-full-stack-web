<template>
  <v-container>
    <div class="row">
      <div class="col">
        <h2>Lista de Alunos</h2>
      </div>
      <div class="col text-right">
        <v-btn to="/student" class="text-rigth"> Cadastrar Aluno </v-btn>
      </div>
    </div>

    <hr />

    <table class="table w-100">
      <thead>
        <tr>
          <th scope="col">Nome</th>
          <th scope="col">E-mail</th>
          <th scope="col">RA</th>
          <th scope="col" class="text-center">Ações</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="(student, index) in students.data" v-bind:key="index">
          <td>{{ student.name }}</td>
          <td>{{ student.email }}</td>
          <td>{{ student.ra }}</td>
          <td class="text-center">
            <button class="btn btn-danger mx-4" @click="deleteStudent(student)">
              Excluir
            </button>
            <button class="btn btn-warning mx-4" @click="editStudent(student)">
              Editar
            </button>
          </td>
        </tr>
      </tbody>
    </table>
  </v-container>
</template>

<script>
import studentsService from "./students.js";

export default {
  data: () => ({
    students: [],
    editedItem: {
      ra: "",
      name: "",
      cpf: "",
    },
  }),
  async created() {
    const response = await studentsService.getStudents();
    this.students = response.data;
  },
  methods: {
    editStudent(student) {
      this.$router.push("/student/" + student.id);
    },
    async deleteStudent(student) {
      await studentsService.deleteStudent(student.id);
      this.updateTable();
    },
    async updateTable() {
      const response = await studentsService.getStudents();
      this.students = response.data;
    },
  },
};
</script>
