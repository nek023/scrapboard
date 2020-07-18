import React from 'react'
import ReactDOM from 'react-dom'
import { App } from './components/App'
import { Page } from '../lib/types'

const url = new URL(window.location.href)
const projectName = url.searchParams.get('project')
const pageTitle = url.searchParams.get('page')
if (projectName == null || pageTitle == null) {
  throw new Error('failed to fetch page info')
}

const page: Page = {
  project: projectName,
  title: pageTitle,
}

ReactDOM.render(<App page={page} />, document.getElementById('root'))
