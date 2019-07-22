<template>
  <nav>
    <v-snackbar v-model="snackbar" :timeout="3000" top>
      <span>New project added successfully.</span>
      <v-btn  @click="snackbar = false" flat color="white">Close</v-btn>
    </v-snackbar>
    <v-toolbar app>
      <v-toolbar-side-icon @click="drawer=!drawer"></v-toolbar-side-icon>
      <v-toolbar-title>
        <span class="font-weight-light">VueTodo</span>
      </v-toolbar-title>
      <v-spacer></v-spacer>

      <!--dropdown menu-->
      <v-menu offset-y>
        <v-btn flat slot="activator" color="grey">
          <v-icon small left>expand_more</v-icon>
          <span class="caption">Menu</span>
        </v-btn>
        <v-list>
          <v-list-tile
            v-for="link in links"
            :key="link.text"
            router
            :to="link.route"
          >
            <v-list-tile-content>
              <v-list-tile-title class="caption">
                {{ link.text }}
              </v-list-tile-title>
            </v-list-tile-content>
          </v-list-tile>
        </v-list>
      </v-menu>

      <v-btn flat color="grey">
        <span>Sign Out</span>
        <v-icon right>exit_to_app</v-icon>
      </v-btn>
    </v-toolbar>

    <v-navigation-drawer v-model="drawer" app class="blue darken-2">
      <v-layout column align-center>
        <v-flex class="mt-5">
          <v-avatar size="100">
            <img src="/user.png" />
          </v-avatar>
          <p class="white--text subheading mt-3">Daniel Palmer</p>
        </v-flex>
        <v-flex>
          <Popup @projectAdded="snackbar = true"/>
        </v-flex>
      </v-layout>
      <v-list>
        <v-list-tile
          v-for="link in links"
          :key="link.text"
          router
          :to="link.route"
        >
          <v-list-tile-action>
            <v-icon class="white--text">{{ link.icon }}</v-icon>
          </v-list-tile-action>
          <v-list-tile-content>
            <v-list-tile-title class="white--text">
              {{ link.text }}
            </v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>
      </v-list>
    </v-navigation-drawer>
  </nav>
</template>

<script>
  import Popup from "./Popup.vue";
  export default {
    data() {
      return {
        drawer: false,
        links: [
          { icon: "dashboard", text: "Dashboard", route: "/" },
          { icon: "folder", text: "My Projects", route: "/projects" },
          { icon: "person", text: "Team", route: "/team" }
        ],
        snackbar:false
      };
    },
    components: { Popup }
  };
</script>
