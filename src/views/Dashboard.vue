<template>
  <div class="dashboard">
    <h1 class="subheading grey--text">Dashboard</h1>
    <v-container class="my-5">
      <v-layout row class="mb-3">
        <v-tooltip top>
          <v-btn
            small
            flat
            color="grey"
            @click="sortBy('title')"
            slot="activator"
          >
            <v-icon left small>folder</v-icon>
            <span class="caption text-lowercase">By Project Name</span>
          </v-btn>
          <span>Sort projects by project name</span>
        </v-tooltip>
        <v-tooltip top>
          <v-btn
            small
            flat
            color="grey"
            @click="sortBy('assignee')"
            slot="activator"
          >
            <v-icon left small>person</v-icon>
            <span class="caption text-lowercase">By Assignee</span>
          </v-btn>
          <span>Sort projects by assignee</span>
        </v-tooltip>
      </v-layout>

      <v-card flat v-for="project in projects" :key="project.id">
        <v-layout row wrap :class="`pa-3 project ${project.status}`">
          <v-flex xs12 md6>
            <div class="caption grey--text">Project Title</div>
            <p>{{ project.title }}</p>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Assignee</div>
            <p>{{ project.assignee }}</p>
          </v-flex>
          <v-flex xs6 sm4 md2>
            <div class="caption grey--text">Due by</div>
            <p>{{ project.due_date }}</p>
          </v-flex>
          <v-flex xs2 sm4 md2>
            <v-chip
              small
              :class="`${project.status} white--text caption my-2 text-capitalize`"
            >
              {{ project.status }}
            </v-chip>
          </v-flex>
        </v-layout>
        <v-divider></v-divider>
      </v-card>
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

<style>
  .project.active {
    border-left: 4px solid green;
  }
  .project.completed {
    border-left: 4px solid gray;
  }

  .v-chip.active {
    background-color: green;
  }
  .v-chip.completed {
    background-color: black;
  }
</style>
