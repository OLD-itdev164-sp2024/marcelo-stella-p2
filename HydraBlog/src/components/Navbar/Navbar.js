import React from 'react'
import * as styles from './Navbar.module.scss'
import { Link } from 'gatsby'

export default function Navbar() {
  return (
    <div className={styles.navbar}>
        <span className={styles.logoName}><Link to='/'>Hydra Blog</Link></span>
        <ul className={styles.menuList}>
            <li><Link to='/'>Home</Link></li>
            <li><Link to='/about'>About Me</Link></li>
            <li><Link to='/blog'>Blog Posts</Link></li>
            <li><Link to='/contact'>Contact Me</Link></li>
        </ul>
    </div>
  )
}
