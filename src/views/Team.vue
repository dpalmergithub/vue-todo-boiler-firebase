<template>
  <div class="team">
    <h1 class="subheading grey--text">Team</h1>
    <v-container class="my-5">
      <v-layout row wrap>
        <v-flex xs12 sm6 v-for="member in team" :key="member.name">
          <v-card flat class="text-xs-center ma-3">
            <v-responsive class="pt-4">
              <v-avatar size="100">
                <img v-if="member.avatar" :src="member.avatar" />
                <img v-else src="/user.png" />
              </v-avatar>
            </v-responsive>
            <v-card-text>
              <div class="subheading">{{ member.name }}</div>
              <div class="grey-text caption">{{ member.title }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn flat color="grey">
                <v-icon small left>message</v-icon>
                <span>Message</span>
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-flex>
      </v-layout>
    </v-container>
  </div>
</template>

<script>
  export default {
    data() {
      return {
        team: [
          { name: "Daniel Palmer", title: "Application Developer", avatar: "" },
          {
            name: "Jake Dodge",
            title: "Application Developer ServiceNow",
            avatar: "boy.png"
          }
        ]
      };
    }
  };
</script>
