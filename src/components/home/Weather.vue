<template>
  <div class="weather-position" @mouseover="getAddress">
    <div style="margin-top:180px;">
      <p class="font-style1" >{{seoulWeather.main}}</p>
    </div>

    <div class="center-position">
      <img style="width: 200px;" :src="isIcon" alt="">
      <p class="font-style2">{{ address[0] }}</p>
      <p class="font-style2">{{ address[1] }}{{ address[2] }}</p>
      <p class="font-style2">{{nowTemp}} °C</p>
    </div>

    <div style="text-align: right; margin-top:200px;" >
      <p  class="font-style1">{{minTemp}} °C / {{maxTemp}} °C</p>
    </div>
  
  </div>
</template>

<script>
import { mapState,mapGetters } from 'vuex'

export default {
  name:'Weather',
  props: {
    lat: Number,
    lng: Number,
  },
  data: function () {
    return {
      address: ['현재 위치는..', '', '']
    }
  },
  methods: {
    initMap: function () {
      console.log(window.kakao.maps.services, 'kakao')
    },
    getAddress: function () {
      if (this.address[0] === '현재 위치는..') {
        const geocoder = new kakao.maps.services.Geocoder()
        const callback = (res, status) => {
          if (status === kakao.maps.services.Status.OK) {
            this.address = res[0]['address_name'].split(' ')
            console.log(res[0]['address_name'], '찐 현재위치');
          } else {
            console.log('실패');
          }
        }
        geocoder.coord2RegionCode(this.lng, this.lat, callback)
      }
    },
  },
  computed: {
    ...mapState(['seoulWeather','addWeatherData']),
    ...mapGetters(['nowTemp','maxTemp','minTemp']),
    isIcon: function () {
      if (this.seoulWeather.icon) {
        return `http://openweathermap.org/img/wn/${this.seoulWeather.icon}@2x.png`
      } else {
        return ''
      }
    },
  },
  mounted: function () {
    const script = document.createElement('script')
    /* global kakao */
    script.onload = () => kakao.maps.load(this.initMap)
    script.type = "text/javascript"
    script.src = `//dapi.kakao.com/v2/maps/sdk.js?appkey=${process.env.VUE_APP_KAKAO_API_KEY}&libraries=services&autoload=false`
    document.head.appendChild(script)
    this.getAddress()
  },
}
</script>

<style scoped>
.weather-position {
  position: absolute;
  width: 1000px;
  top:120px;
  left: 170px;
  display: flex;
  justify-self: space-around;
}
.center-position {
  text-align: center; 
  margin:0px 130px; 
}
.font-style1 {
  color: white;
  font-size: 60px;
  margin-bottom: 0;
}
.font-style2 {
  color: white;
  font-size: 40px;
  margin-bottom: 0;
}
</style>