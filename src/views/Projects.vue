<template>
  <div class="projects">
    <h1 class="subheading grey--text">Projects</h1>
    <v-container class="my-5">
      <v-expansion-panel>
        <v-expansion-panel-content
          v-for="project in projects"
          :key="project.id"
        >
          <template slot="header">
            {{ project.title }}
          </template>
          <v-card>
            <v-card-text class="px-4">
              <div class="font-weight-bold">Due by: {{ project.due_date }}</div>
              <div class="project-content">
                {{ project.description }}
              </div>
            </v-card-text>
          </v-card>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-container>
  </div>
</template>

<script>
  import db from "@/fb";
  export default {
    data() {
      return {
        projects: []
      };
    },
    methods: {
      sortBy(prop) {
        this.projects.sort((a, b) => (a[prop] < b[prop] ? -1 : 1));
      }
    },
    created() {
      db.collection("projects").onSnapshot(doc => {
        const changes = doc.docChanges();
        changes.forEach(change => {
          if (change.type == "added") {
            this.projects.push({
              ...change.doc.data(),
              id: change.doc.id
            });
          }
        });
      });
    }
  };
</script>
