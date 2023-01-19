import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"
import { API_URL } from "../config"
import Header from "./components/Header"
import PostsSkeleton from "./components/PostsSkeleton"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [preLoading, setPreLoading] = useState(true)
  const [searching, setSearching] = useState(false)
  const [notFound, setNotFound] = useState(false)

  useEffect(() => {

    async function fetchPosts() {
      const posts = await fetch(API_URL).then(res => res.json())

      setPosts(posts)
      setPreLoading(false)
    }
    fetchPosts()

  }, [])

  return (
    <>
      <Head>
        <title>Programing Posts Api</title>
        <meta
          name="description"
          content="Programing Posts Api for getting programming posts from other promgramming ralated blogs fast and easy."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
        <meta name="content-type" content="utf-8" />
      </Head>
      {preLoading ? (
        <div id="overlay">
          <div className="spinner"></div>
        </div>
      ) : <main>
        <Header setPosts={setPosts} searching={searching} setSearching={setSearching} setNotFound={setNotFound} />
        <div className="posts">
          {posts.length > 0 && (
            posts.map((post, idx) => (
              <div className="post" key={idx}>
                <h2 className="title">{post.title}</h2>
                <p className="desc">{post.description}</p>
                <div className="flex">
                  <Link className="blog" href={post.source} target="_blank">
                    Source: {post.blog}
                  </Link>
                  <Link className="read-more" href={post.url} target="_blank">
                    Read More
                  </Link>
                </div>
              </div>
            ))
          )}
          {searching && <PostsSkeleton />}
          {notFound && !searching && <div className="err">Not found! try another keyword</div>}
        </div>
      </main>}
    </>
  )
}
