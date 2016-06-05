import React from 'react'
import { Link } from 'react-router'
import { padStart } from 'lodash'

import s001 from '../../sketches/001'
import s002 from '../../sketches/002'
import s003 from '../../sketches/003'
import s005 from '../../sketches/005'

export default (props) => {

  const renderLinks = () => {
    return sketchData.map((sketch, i) => {
      const seq = padStart(i + 1, 3,'0')
      return (
        <li key={sketch.id}>
          <Link to={`/sketch/${seq}`}>
            {seq + ' ' + sketch.title}
          </Link>
        </li>
      )
    })
  }

  return (
    <div className="animated fadeIn">
      <ul className="sketch-list">{renderLinks()}</ul>
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

]
