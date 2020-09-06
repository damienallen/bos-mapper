import React from 'react'
import { createUseStyles } from 'react-jss'
import { observer, MobXProviderContext } from 'mobx-react'
import {
  IonListHeader,
  IonLabel,
} from '@ionic/react'

const useStores = () => {
  return React.useContext(MobXProviderContext)
}

const useStyles = createUseStyles({
  container: {
    width: '100%',
  },
  summaryItems: {
    padding: '0 16px'
  },
  item: {
    marginBottom: 16
  },
  itemHeader: {
    opacity: 0.6
  },
})


export const DataSummary: React.FC = observer(() => {
  const { map, species } = useStores()
  const classes = useStyles()

  return (
    <div className={classes.container} >

      <IonListHeader>
        <IonLabel color="medium">Overzicht</IonLabel>
      </IonListHeader>

      <div className={classes.summaryItems}>

        <div className={classes.item}>
          {map.featuresGeoJson ? map.featuresGeoJson.features.length : '--'}
          <span className={classes.itemHeader}> bomen</span>
        </div>

        <div className={classes.item}>
          {map.featuresGeoJson ? map.numUnknown : '--'}
          <span className={classes.itemHeader}> onbekend</span>
        </div>

        <div className={classes.item}>
          {species.list.length ? species.list.length - 1 : '--'}
          <span className={classes.itemHeader}> soorten</span>
        </div>

      </div>

    </div>
  )
})