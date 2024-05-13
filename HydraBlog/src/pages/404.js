import React from 'react'
import Layout from '../components/layout'
import * as styles from './ErrorPage.module.scss'

export default function Error404Page() {
  return (
    <Layout>
        <div className={styles.errorPage}>
            <h1>Oh no! We could not find what you're looking for :c</h1>
        </div>
    </Layout>
  )
}
