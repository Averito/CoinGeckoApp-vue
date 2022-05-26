import axios from 'axios'

import { BaseValue, Coin } from '@/api/coinGecko/getCoins/types'
import { getUrlSearchParamsStr } from '@/helpers/getUrlSearchParamsStr'

export interface OptionsParams {
  per_page: string
  vs_currency: BaseValue
  ids: string
}

type Options = OptionsParams | Record<string, string>

export const getCoins = async (options: Options) => {
  const paramsString = getUrlSearchParamsStr(options as Record<string, string>)

  const response = await axios.get<Coin[]>(`https://api.coingecko.com/api/v3/coins/markets?${paramsString}`)
  return response.data
}
