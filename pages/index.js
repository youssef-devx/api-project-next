import Head from "next/head"
import Link from "next/link"
import { useEffect, useState } from "react"

export default function Home() {
  const [posts, setPosts] = useState([])
  const [loaded, setLoaded] = useState(false)
  const [notFound, setNotFound] = useState(false)
  const [searchKeyword, setSearchKeyword] = useState("")

  useEffect(() => {
    loadPosts()
  }, [])

  async function loadPosts(search) {
    const data = await fetch(
      `/api/posts?searchKeyword=${search ? search : ""}`
    ).then(res => res.json())

    data.length === 0 && setNotFound(true)
    setPosts(data)
    setLoaded(true)
  }

  function onSearch(e) {
    e.preventDefault()
    loadPosts(searchKeyword)
  }

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
      <main>
        {/* style={{ display: loaded ? "none" : "block" }} */}
        {!loaded ? (
          <div id="overlay">
            <div className="spinner"></div>
          </div>
        ) : (
          ""
        )}
        <div className="main">
          <h1>Programing posts api</h1>
          <Link
            href="https://rapidapi.com/youssefboulalq@gmail.com/api/programming-posts/"
            target="_blank"
            className="big-btn"
          >
            Get The Api Key
          </Link>
          <form onSubmit={onSearch}>
            <div className="flex">
              <label htmlFor="search">Search:</label>
              <input
                onChange={e => setSearchKeyword(e.target.value)}
                value={searchKeyword}
                type="text"
                className="search-input"
                placeholder="Search for a keyword"
                id="search"
              />
              <button className="search-btn" onClick={onSearch}>
                Search
              </button>
            </div>
          </form>
        </div>
        <div className={loaded ? "posts" : "posts-template"}>
          {posts.length > 0 ? (
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
          ) : (
            <></>
          )}
          {notFound ? (
            <div className="err">Not found! try another keyword</div>
          ) : (
            ""
          )}
        </div>
      </main>
    </>
  )
}
