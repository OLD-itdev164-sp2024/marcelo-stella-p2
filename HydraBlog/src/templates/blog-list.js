import * as React from "react"
import { Link, graphql } from "gatsby"
import Layout from "../components/layout"
import * as styles from './BlogList.module.scss'

export default function BlogList({ data, pageContext }) {
    const posts = data.allMarkdownRemark.edges.map(edge => edge.node);
    const { currentPage, numPages } = pageContext;
    const isFirst = currentPage === 1;
    const isLast = currentPage === numPages;
    const prevPagePath = currentPage - 1 === 1 ? `/blog/` : `/blog/` + (currentPage - 1).toString();
    const nextPagePath = '/blog/' + (currentPage + 1).toString();
    const prevPageClassName = isFirst ? styles.disabledButton : styles.button;
    const nextPageClassName = isLast ? styles.disabledButton : styles.button;
    const getPageNumberPath = (currentIndex) => {
        if(currentIndex === 0) {
            return '/blog';
        }

            return '/blog/' + (currentIndex + 1);
    }


  return (
    <Layout>
            <div className={styles.blogPosts}>
            <h1>My Blog posts</h1>

            {posts.map(post => {
                const { frontmatter, excerpt } = post;
                const { title, date, author } = frontmatter;

                return(
                    <article key={post.id}>
                        <Link to={post.fields.slug}><h2>{title}</h2></Link>
                        <small>{author}, {date}</small>
                        <p>{excerpt}</p>
                    </article>
                )
            })}
            <Link className={prevPageClassName} to={prevPagePath} rel="prev">&larr; Previous page</Link>
            {Array.from({length: numPages}, (_, i) => {
                let pageNumberClassName = styles.pageNumber;
                if(currentPage === i + 1) {
                    pageNumberClassName = styles.currentPageNumber
                }

                return(
                    <Link className={pageNumberClassName} key={i + 1} to={getPageNumberPath(i)}>{i + 1}</Link>
                )
            })}
            <Link className={nextPageClassName} to={nextPagePath} rel="prev">&rarr; Next page</Link>
            </div>
        </Layout>
  )
}

export const pageQuery = graphql`
    query blogPageQuery($skip: Int!, $limit: Int!){
        allMarkdownRemark(
            sort: {fields: [frontmatter___date], order: DESC}
            limit: $limit
            skip: $skip
        ) {
            edges{
                node{
                    fields{
                        slug
                    }
                    frontmatter{
                        date(fromNow: true)
                        title
                        author
                    }
                    excerpt(
                        format: PLAIN
                        pruneLength: 100
                        truncate: true
                    )
                    id
                }
            }
        }
    }
`