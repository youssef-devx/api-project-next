import Link from 'next/link'
import React, { useState } from 'react'
import { API_URL } from '../../config'

export default function Header({ setPosts, searching, setSearching, setNotFound }) {
  const [searchKeyword, setSearchKeyword] = useState("")


  async function loadPosts(search) {
    const posts = await fetch(
      `${API_URL}?keyword=${search ? search : ""}&limit=100`
    ).then(res => res.json())

    setTimeout(() => setSearching(false), 1000)
    posts.length === 0 ? setNotFound(true) : setNotFound(false)

    setPosts(posts.slice(0, 100))
  }

  function onSearch(e) {
    e.preventDefault()
    setSearching(true)
    loadPosts(searchKeyword)
  }

  return (
    <div className="header">
      <h1>Programing posts api</h1>
      <Link
        href="https://rapidapi.com/youssefboulalq-tfIG9f8ALpe/api/programming-posts/"
        target="_blank"
        className="big-btn"
      >
        Get Api Key
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
          />
          <button
            disabled={searching}
            style={{
              cursor: searching ? "not-allowed" : "",
              backgroundColor: searching ? "gray" : "",
            }}
            className="search-btn"
            onClick={onSearch}
          >
            {searching ? "Searching..." : "Search"}
          </button>
        </div>
      </form>
    </div>
  )
}
