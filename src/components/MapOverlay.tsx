import React, { useEffect } from 'react'
import { createUseStyles } from 'react-jss'

import { AddButton } from '../components/AddButton'
import { MenuToggle } from '../components/Menu'


const useStyles = createUseStyles({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    height: '100%',
    width: '100%'
  }
})

export const MapOverlay: React.FC = () => {

  const classes = useStyles()

  useEffect(() => {
    console.log('Unloading map page...')
    return () => {
      console.log('Unloading map page...')
    }
  })

  return (
    <div className={classes.container}>
      <MenuToggle />
      <AddButton />
    </div>
  )
}