import React from "react"
import blogStyles from "./blog.module.scss"
import { Link, graphql, useStaticQuery } from "gatsby"

import Img from "gatsby-image"

import { useAuthorImage } from "./utilities/use-author-image"

const Blog = () => {
  const { ...GatsbyImageSharpFixed } = useAuthorImage()

  const data = useStaticQuery(graphql`
    query {
      allMdx(filter: { fields: { contentType: { eq: "posts" } } }) {
        edges {
          node {
            frontmatter {
              title
              tags
              date (formatString: "MMMM DD, YYYY")
              author
            }
            excerpt
            timeToRead
            fields {
              slug
            }
          }
        }
      }
    }
  `)

  return (
    <div className={blogStyles.blogWrapper}>
      {data.allMdx.edges.map(edge => {
        return (
          <Link to={`/blog/${edge.node.fields.slug}`}>
          <article className={blogStyles.blogItem}>
            <figure>
              <Img
                fixed={GatsbyImageSharpFixed}
                alt="blog-thumbnail"
                className={blogStyles.image}
              />
            </figure>

            <div className={blogStyles.content}>
              <h2>
                
                  {edge.node.frontmatter.title}
              </h2>
              <div className={blogStyles.metaData}>
                <date>
                  {edge.node.frontmatter.date}
                </date>
                <span>
                   &nbsp; / &nbsp; {edge.node.timeToRead} min read  &nbsp; / &nbsp; By {edge.node.frontmatter.author} 
                </span>
                <ul>
                  {edge.node.frontmatter.tags.map(tag => {
                    return <li>{tag}</li>
                  })}
                
                </ul>
              </div>
            </div>
          </article>
          </Link>
        )
      })}
    </div>
    
  )
}

export default Blog
