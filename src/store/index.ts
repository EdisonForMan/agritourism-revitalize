import Vue from 'vue'
import Vuex from 'vuex'
import { projectData } from "@/components/Revitalize/data/project_data";
import { sfdData } from "@/components/Revitalize/data/sfd_data"
Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    projectData,
    sfdData
  },
  mutations: {
  },
  actions: {
  },
  modules: {
  }
})
