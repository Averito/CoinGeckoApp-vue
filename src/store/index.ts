import { createStore } from 'vuex'

import { landingModule } from '@/store/modules/landingModule/landingModule'
import { portfolioModule } from '@/store/modules/portfolioModule/portfolioModule'

export default createStore({
  strict: true,
  modules: {
    landing: landingModule,
    portfolio: portfolioModule
  }
})
