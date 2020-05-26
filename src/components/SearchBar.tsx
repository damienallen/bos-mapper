import React from 'react'
import { observer, MobXProviderContext } from 'mobx-react'
import { createUseStyles } from 'react-jss'
import { IonSearchbar } from '@ionic/react'

import { MenuToggle } from './Menu'


const useStores = () => {
    return React.useContext(MobXProviderContext)
}

const useStyles = createUseStyles({
    container: {
        position: 'absolute',
        top: 0,
        right: 0,
        padding: 10,
        width: '100vw',
        maxWidth: 400,
        zIndex: 150,
    },
    bar: {
        width: '100%',
        borderRadius: 4,
        padding: 5,
        background: (searchBackground: string) => searchBackground,
        display: 'flex'
    },
    search: {
        flex: 1,
        padding: 0,
        height: 36,
        '--background': 'none'
    },
    menuToggle: {
        flex: '0 1',
        height: 36
    }
})

export const SearchBar: React.FC = observer(() => {
    const [searchText] = React.useState('')
    const { species, map, ui } = useStores()
    const classes = useStyles(map.overlayBackground)

    const onKeyPress = (e: any) => {
        if (e.key === 'Enter') e.target.blur()
    }

    return (
        <div className={classes.container}>
            <div className={classes.bar}>

                <IonSearchbar
                    className={classes.search}
                    value={searchText}
                    onIonChange={e => species.setQuery(e.detail.value!)}
                    onIonFocus={e => {
                        ui.setShowTreeDetails(false)
                        map.setSelectedFeature(null)
                    }}
                    onKeyDown={onKeyPress}
                    debounce={400}
                    placeholder='Zoeken'
                    mode='ios'
                />

                <div className={classes.menuToggle}>
                    <MenuToggle />
                </div>

            </div>
        </div>
    )
})
