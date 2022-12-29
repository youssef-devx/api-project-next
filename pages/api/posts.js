import db from "./db.json"

export default function handler(req, res) {
  const { query } = req
  const isSearch = query.searchKeyword === "" ? false : true
  const regex = isSearch && new RegExp(`${query.searchKeyword}`, "ig")
  const posts = isSearch
    ? db.filter(post => regex.test(post.description) || regex.test(post.title))
    : db

  res.status(200).json(posts.slice(0, 100).sort((a, b) => 0.5 - Math.random()))
}
