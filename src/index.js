/**
 * Created by haozi on 10/23/2016.
 */

import  Api from './api'
import Client from './client'
import iconv from 'iconv'
import Route from './route'

let Iconv = iconv.Iconv
let cov = new Iconv('UTF-8','GBK')
let recov = new Iconv('GBK','UTF-8')


export {
    Api,
    Client,
    cov,
    recov ,
    Route
}