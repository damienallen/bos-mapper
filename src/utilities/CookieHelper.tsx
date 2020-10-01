import Cookies from 'universal-cookie'
import { RootStore } from '../stores'


export const fetchCookies = (store: RootStore) => {
    const cookies = new Cookies()

    const cachedToken = cookies.get('token')
    if (cachedToken) {
        store.settings.setToken(cachedToken)
        console.log(`Using cached token '${cachedToken}'`)
    }

    const droneMap = cookies.get('drone')
    if (droneMap === 'true') {
        store.map.setBaseMap('drone')
    } else if (droneMap === 'false') {
        store.map.setBaseMap('vector/v2')
    } else {
        cookies.set('drone', true)
    }

    const showDead = cookies.get('showDead')
    if (showDead) {
        store.settings.setShowDead(true)
    } else {
        store.settings.setShowDead(false)
    }

    const showNotes = cookies.get('showNotes')
    if (showNotes) {
        store.settings.setShowNotes(true)
    } else {
        store.settings.setShowNotes(false)
    }
}
