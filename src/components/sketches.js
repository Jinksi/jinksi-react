import React from 'react'
import { Link } from 'react-router'
import { padStart } from 'lodash'

import s001 from '../../sketches/001'
import s002 from '../../sketches/002'
import s003 from '../../sketches/003'
import s005 from '../../sketches/005'
import s006 from '../../sketches/006'
import s007 from '../../sketches/007'
import s008 from '../../sketches/008'
import s009 from '../../sketches/009'
import s010 from '../../sketches/010'

export default (props) => {

  const renderLinks = () => {
    return sketchData.map((sketch, i) => {
      return (
        <li key={sketch.id}>
          <Link to={`/sketch/${sketch.id}`}>
            {sketch.id + ' ' + sketch.title}
          </Link>
        </li>
      )
    })
  }

  return (
    <div className="animated fadeIn">
      <ul className="sketch-list">{renderLinks()}</ul>
      <p>
        these sketches are created with the javascript library, p5js.
      </p>
      <p>
        use the &larr; and &rarr; arrow keys to navigate sketches.<br/>
        use the <b>esc</b> key to toggle fullscreen.
      </p>
    </div>
  )
}

export const sketchData = [

  {
    id: '001',
    title: 'perlin chaser',
    file: s001
  },
  {
    id:'002',
    title: 'toon trance',
    file: s002
  },
  {
    id:'003',
    title: 'saturn',
    file: s003
  },
  {
    id:'005',
    title: 'perlin Splatter',
    file: s005
  },
  {
    id:'006',
    title: 'frcs',
    file: s006
  },
  {
    id:'007',
    title: 'beltflow',
    file: s007
  },
  {
    id:'008',
    title: 'seek',
    file: s008
  },
  {
    id:'009',
    title: 'gaunt',
    file: s009
  },
  {
    id:'010',
    title: 'duophnic',
    file: s010
  },

]
