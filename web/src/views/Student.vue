<template>


  <v-container>
      <div class="alert alert-danger" >
      This is a danger alert—check it out!
    </div>

    <v-form ref="form" v-model="valid">
      <v-text-field v-model="ra" label="RA"></v-text-field>

      <v-text-field
        v-model="name"
        :rules="nameRules"
        label="name"
        required
      ></v-text-field>

      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="E-mail"
        required
      ></v-text-field>

      <v-text-field
        v-model="cpf"
        :rules="cpfRules"
        label="CPF"
        :disabled="isEdition"
        required
      ></v-text-field>
      <v-btn class="mr-4" type="button" to="/"> Cancelar </v-btn>
      <v-btn v-if="!isEdition" class="mr-4" type="button" @click="reset()">
        Limpar
      </v-btn>
      <v-btn class="mr-4" type="submit" @click="submit()" :disabled="!valid">
        Salvar
      </v-btn>
    </v-form>


  </v-container>
</template>

<script>
import studentService from "./students.js";

export default {
  data: () => ({
    valid: false,
    nameRules: [(v) => !!v || "name é obrigatório"],
    email: "",
    emailRules: [
      (v) => !!v || "E-mail é obrigatório",
      (v) => /.+@.+\..+/.test(v) || "E-mail inválido",
    ],
    name: "",
    id: "",
    ra: "",
    cpf: "",
    cpfRules: [(v) => !!v || "CPF é obrigatório"],
    isEdition: false,
  }),
  async created() {
    const ra = this.$router.history.current.params.id;
    if (ra != undefined) {
      this.isEdition = true;
      const student = await studentService.getStudent(ra);
      this.id = student.id;
      this.ra = student.ra;
      this.email = student.email;
      this.cpf = student.cpf;
      this.name = student.name;
    }
  },

  methods: {
    validate() {
      this.$refs.form.validate();
    },
    reset() {
      this.$refs.form.reset();
    },
    submit() {
      if (this.isEdition) {
        studentService
          .updateStudent(this.ra, this.name, this.email, this.id)
          .then(() => {
            this.hasMessage = false;
            this.alertMessage = "Aluno atualizado com sucesso";
            this.$router.push("/");
          })
          .catch(() => {
            this.hasMessage = true;
            this.alertMessage = "Erro ao atualizar aluno";
          });
        return;
      }

      studentService
        .createStudent(this.ra, this.name, this.cpf, this.email)
        .then(() => {
          this.reset();
          this.hasMessage = false;
          this.alertMessage = "Aluno cadastrado com sucesso";
          this.$router.push("/");
        })
        .catch(() => {
          this.hasMessage = true;
          this.alertMessage = "Erro ao cadastrar aluno";
        });
    },
  },
};
</script>
