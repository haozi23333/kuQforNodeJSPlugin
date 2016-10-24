/**
 * Created by haozi on 10/23/2016.
 */

import  Api from './api'
import Client from './client'
import iconv from 'iconv'

let Iconv = iconv.Iconv
let cov = new Iconv('UTF-8','GBK')

export {
    Api,
    Client,
    cov
}