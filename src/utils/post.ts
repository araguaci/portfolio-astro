import { getCollection } from 'astro:content'

export const getCategories = async () => {
	const posts = await getCollection('blog')
	const categories = new Set(posts.map((post) => post.data.category))
	return Array.from(categories)
}
// sort posts by date, earliest to latest
export const sortByDate = (array: any[]) => {
	const sortedArray = array.sort(
		(a: any, b: any) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf()
	)
	return sortedArray
}

export const getPosts = async (max?: number) => {
	return (await getCollection('blog'))
		.filter((post) => !post.data.draft)
		.sort((a, b) => b.data.pubDate.valueOf() - a.data.pubDate.valueOf())
		.slice(0, max)
}

// get all authors
export const getAuthors = async () => {
	const posts = await getCollection('blog')
	const authors = new Set(posts.map((post) => post.data.author))
	return Array.from(authors)
}

// get all posts by author
export const getPostsByAuthor = async (author: string) => {
	return (await getCollection('blog'))
		.filter((post) => post.data.author === author)
		.sort((a, b) => a.data.pubDate.valueOf() - b.data.pubDate.valueOf())
}

export const getTags = async () => {
	const posts = await getCollection('blog')
	const tags = new Set(posts.map((post) => post.data.tags).flat())
	return Array.from(tags)
}

export const getPostByTag = async (tag: string) => {
	const posts = await getPosts()
	return posts.filter((post) => post.data.tags.includes(tag))
}

export const filterPostsByCategory = async (category: string) => {
	const posts = await getPosts()
	return posts.filter((post) => post.data.category.toLowerCase() === category)
}
