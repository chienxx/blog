import React from 'react'
import { genPageMetadata } from 'app/seo'
import LabelSwitcher from './client'

export const metadata = genPageMetadata({ title: 'Tools' })

const Tools = () => {
  return (
    <div>
      <LabelSwitcher />
    </div>
  )
}

export default Tools
