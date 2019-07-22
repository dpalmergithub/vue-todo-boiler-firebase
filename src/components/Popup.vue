<template>
  <v-dialog max-width="600px" @input="reset" v-model="dialog">
    <v-btn flat small slot="activator" class="success">Add new project</v-btn>
    <v-card>
      <v-card-title>
        <h2>Add a New Project</h2>
      </v-card-title>
      <v-card-text>
        <v-form class="px-3" ref="form">
          <v-text-field
            label="Title"
            v-model="title"
            prepend-icon="folder"
            :rules="inputRules"
          ></v-text-field>
          <v-textarea
            label="description"
            v-model="description"
            prepend-icon="edit"
            :rules="inputRules"
          ></v-textarea>

          <v-menu>
            <v-text-field
              slot="activator"
              label="Due Date"
              prepend-icon="date_range"
              :value="formattedDate"
              :rules="inputRules"
            ></v-text-field>
            <v-date-picker v-model="due_date"></v-date-picker>
          </v-menu>

          <v-spacer></v-spacer>
          <v-btn
            :loading="loading"
            flat
            class="success mx-0 mt-3 text-uppercase"
            @click="submit"
            >Add Project</v-btn
          >
        </v-form>
      </v-card-text>
    </v-card>
  </v-dialog>
</template>

<script>
  import format from "date-fns/format";
  import db from "@/fb";
  export default {
    data() {
      return {
        title: "",
        description: "",
        due_date: "",
        inputRules: [
          v => (v && v.length >= 3) || "Minimum length is 3 characters."
        ],
        loading: false,
        dialog: false
      };
    },
    methods: {
      submit() {
        if (this.$refs.form.validate()) {
          this.loading = true;

          //hard coded boiler
          const project = {
            title: this.title,
            description: this.description,
            due_date: format(this.due_date, "Do MMM YYYY"),
            assignee: "Daniel Firebase",
            status: "active"
          };

          db.collection("projects")
            .add(project)
            .then(() => {
              this.loading = false;
              this.dialog = false;
              this.$emit("projectAdded");
            });
        }
        //this.loading = false;
        return false;
      },
      reset() {
        this.$refs.form.reset();
      }
    },
    computed: {
      formattedDate() {
        return this.due_date ? format(this.due_date, "Do MMM YYYY") : "";
      }
    }
  };
</script>
