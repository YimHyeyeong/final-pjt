<template>
  <div>
    <span class="bg"></span>
      <v-app id="inspire">
        <v-container >
          <v-row >
        
            <v-col  cols="auto">
              <div style="position:relative;">
                <img class="img-size" :src="require(`../assets/${imgUrl}.jpg`)" alt="">
                <weather :lat="lat" :lng="lng"></weather>
                <weather-movie></weather-movie>
              </div>
            </v-col>
          
          </v-row>
          <br>
          
          <br>
          <div v-if="!profile.likeGenres.length" style="text-align:center;">
            
            <genre-choice></genre-choice>
          </div>
          <similar-user></similar-user>
          <genre-movie-list></genre-movie-list>
        </v-container>
      <img style="position:fixed; bottom:0; width:10rem;" src="@/assets/꽃다발.png" alt="">
      <!-- <img style="position:fixed; right:0; width:10rem; height:13rem;" src="@/assets/8888.png" alt=""> -->
      </v-app>
  </div>
</template>


<script>
import WeatherMovie from '../components/home/WeatherMovie.vue'
import Weather from '../components/home/Weather.vue'
import SimilarUser from '../components/home/SimilarUser.vue'
import GenreChoice from '../components/home/GenreChoice.vue'
import GenreMovieList from '../components/home/GenreMovieList.vue'
import { mapState } from 'vuex'

export default {
  name: 'Home',
  components:{
    WeatherMovie,
    Weather,
    SimilarUser,
    GenreChoice,
    GenreMovieList,
  },
  data: function () {
    return {
      lat: 0,
      lng: 0,
    }
  },
  computed: {
    ...mapState([
      'profile' ,'seoulWeather'
    ]),
    imgUrl: function () {
      if (this.seoulWeather.main ) {
        return this.seoulWeather.main
      } else {
        return 'Clear'
      } 
    }
  },
  created: function () {
    if (!('jwt' in localStorage)) {
      this.$router.push({ name: 'Login' })
    }
    if('geolocation' in navigator) {
      navigator.geolocation.getCurrentPosition(position => {
        let pos = position.coords
        this.lat = pos['latitude']
        this.lng = pos['longitude']
        this.$store.dispatch('LoadWeatherMovie', pos)
      })
    } 
  },
}
</script>

<style scoped>
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
.img-size {
  width:1160px;
  height: 750px;
  margin-top: 100px;
}
</style>