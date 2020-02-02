import React, { useEffect, useRef } from 'react'
import { createUseStyles } from 'react-jss'

import OlMap from 'ol/Map'
import OlView from 'ol/View'
import OlLayerTile from 'ol/layer/Tile'
import OlSourceOSM from 'ol/source/OSM'
import GeoJSON from 'ol/format/GeoJSON'
import { Vector as VectorSource } from 'ol/source'
import { Vector as VectorLayer } from 'ol/layer'
import { fromLonLat } from 'ol/proj'

import { styleFunction } from '../utilities/FeatureHelpers'
import * as geoJson from '../assets/voedselbos_features_updated.json'
// import * as apiKey from '../maptiler.json'


const useStyles = createUseStyles({
    map: {
        height: '100%',
        zIndex: 100,

        '& .ol-zoom': {
            display: 'none'
        },

        '& .ol-control': {
            position: 'absolute',
            background: 'rgba(255,255,255,0.4)',
            borderRadius: 4,
            padding: 2,

            '& button': {
                display: 'block',
                margin: 1,
                padding: 0,
                color: '#fff',
                fontSize: '1.14em',
                fontWeight: 'bold',
                textDecoration: 'none',
                textTransform: 'none',
                textAlign: 'center',
                height: '1.375em',
                width: '1.375em',
                lineHeight: '0.4em',
                background: 'rgba(76, 112, 2, 0.8)',
                cursor: 'pointer'
            }
        },

        '& .ol-rotate': {
            display: 'none' // TODO: show/hide dynamically
        },

        '& .ol-attribution': {
            position: 'absolute',
            bottom: 0,
            left: 0,
            background: 'rgba(255,255,255,0.8)',
            borderRadius: '0 4px 0 0',
            fontSize: '0.6em',

            '& ul': {
                padding: '2px 4px',
                margin: 0,
                listStyleType: 'none',
                '& li': {
                    display: 'inline-block'
                }
            },

            '& button': {
                display: 'none !important'
            }
        }
    }
})

export const MapCanvas: React.FC = () => {

    // console.log(`OL canvas init with API key: ${apiKey.key}`)

    const mapEl: any = useRef<HTMLDivElement>()
    const classes = useStyles()
    console.log(geoJson)
    // Load GeoJSON features
    const vectorSource = new VectorSource({
        features: (new GeoJSON()).readFeatures(geoJson.data)
    })
    const vectorLayer = new VectorLayer({
        source: vectorSource,
        style: styleFunction,
        updateWhileAnimating: true,
        updateWhileInteracting: true
    })

    const map = new OlMap({
        layers: [
            new OlLayerTile({
                source: new OlSourceOSM()
            }),
            vectorLayer
        ],
        view: new OlView({
            center: fromLonLat([4.431915, 51.908404]),
            zoom: 19.5
        })
    })

    useEffect(() => {
        map.setTarget(mapEl.current)

        setTimeout(() => {
            map.updateSize()
        }, 500)

        return () => {
            console.log('Unloading map canvas...')
            map.setTarget(undefined)
        }
    })

    return (
        <div className={classes.map} ref={mapEl} />
    )
}
