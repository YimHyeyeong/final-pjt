<template>
  <div>
    <span class="bg"></span>
    <v-app id="inspire">
      <v-container>
        <h1 style="text-align:center; margin:3rem 0px;">Direct Message</h1>
        <v-card v-for="room of rooms" 
          :key="room.roomname" 
          class="mx-auto"
          max-width="400"
          height="200"
          outlined
        >
          <v-list-item three-line style="text-align:center; margin-top:2rem;">
            <v-list-item-content>
              <v-list-item-title class="text-h5 mb-1">
                {{ room.username }}
              </v-list-item-title>
              <v-list-item-subtitle>ROOM {{ room.roomname }}</v-list-item-subtitle>
            </v-list-item-content>
          </v-list-item>

          <v-card-actions style="display:flex; justify-content:center;">
            <v-btn
              outlined
              rounded
              text
              @click="goChat(room.username)"
            >
              CHAT
            </v-btn>
          </v-card-actions>
        </v-card>
        <div style="text-align:center; margin-top:3rem;">

        <router-link style="text-decoration:none; color:black; font-size:1.3rem;" :to="{name: 'Community'}">
          <v-icon>mdi-chat-plus-outline</v-icon>  다른 사람들과 채팅하러 가기 </router-link>
        </div>
      </v-container>
      <img  src="@/assets/actor_bg.png" alt="">
    </v-app>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'ChatRooms',
  data: function () {
    return {
      rooms: [],
      selectUser: '',

    }
  },
  methods: {
    setHeader: function () {
      const token = localStorage.getItem('jwt')
      const header = {
        Authorization: `JWT ${token}`
      }
      return header 
    },
    goChat: function (username) {
      this.$router.push({ name: 'Chat', params: { 'username': username }})
    }
  },
  created: function () {
    axios({
      method: 'get',
      url: `${this.$defaultUrl}/chat/rooms/`,  
      headers: this.setHeader()
    })
    .then(res => {
      console.log(res.data);
      this.rooms = res.data['rooms']
    })
  }
}
</script>

<style>
.bg {
  background-image: url('../assets/main_bg.jpg');
  background-size : 100%;
  background-repeat: repeat;
  position:absolute;
  width: 100%;
  height: 100%;
}
#inspire {
  background: none;
}
</style>