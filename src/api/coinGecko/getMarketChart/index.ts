import axios from 'axios'

import { Graph } from '@/api/coinGecko/getMarketChart/types'
import { BaseValue } from '@/api/coinGecko/getCoins/types'
import { getUrlSearchParamsStr } from '@/helpers/getUrlSearchParamsStr'

export interface OptionsParams {
  days: string
  vs_currency: BaseValue
  interval: string
}

type Options = OptionsParams | Record<string, string>

export const getMarketChart = async (options: Options, coinName: string) => {
  const paramsString = getUrlSearchParamsStr(options as Record<string, string>)

  const response = await axios.get<Graph>(`https://api.coingecko.com/api/v3/coins/${coinName}/market_chart?${paramsString}`)
  return response.data
}
