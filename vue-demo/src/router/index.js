import Vue from 'vue'
import Router from 'vue-router'
import Login from "../components/app/login.vue"
import Reg from "../components/app/reg.vue"
import Info from "../components/app/info/info.vue"

import AddMovies from "../components/app/info/movie/addMovies.vue"
import MovieList from "../components/app/info/movie/movieList.vue"
import AddMovieNews from "../components/app/info/movieNews/addMovieNews.vue"
import MovieNewsList from "../components/app/info/movieNews/movieNewsList.vue"
import AddSchedule from "../components/app/info/schedule/addSchedule.vue"
import AddStudio from "../components/app/info/studio/addStudio.vue"
import StudioList from "../components/app/info/studio/studioList.vue"
import AddTheater from "../components/app/info/theater/addTheater.vue"
import TheaterList from "../components/app/info/theater/theaterList.vue"
import Img from "../components/app/info/img/img.vue"
Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'login',
      component: Login
    }, {
      path: '/reg',
      name: 'reg',
      component: Reg
    }, {
      path: '/info',
      name: 'info',
      component: Info
    }, {
    	path: "/info",
    	component: Info,
    	children: [
        {
          path: "addMovies",
          component: AddMovies
        },
        {
          path: "moviesList",
          component: MovieList
        },
        {
          path: "addMovieNews",
          component: AddMovieNews
        },
        {
          path: "movieNewsList",
          component: MovieNewsList
        },
        {
          path: "addSchedule",
          component: AddSchedule
        },
        {
          path: "addStudio",
          component: AddStudio
        },
        {
          path: "studioList",
          component: StudioList
        },
        {
          path: "addTheater",
          component: AddTheater
        }, 
        {
          path: "theaterList",
          component: TheaterList
        },
        {
          path: "img/:movieId",
          component: Img
        },
    	]
    }
  ]
})
