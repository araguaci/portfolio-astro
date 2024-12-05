import { defineCollection, z, reference } from 'astro:content'
import { CATEGORIES } from '@/data/categories'

const blogCollection = defineCollection({
	type: 'content',
	// Type-check frontmatter using a schema
	schema: ({ image }) =>
		z.object({
			title: z.string().max(80),
			description: z.string(),
			// Transform string to Date object
			pubDate: z
				.string()
				.or(z.date())
				.transform((val) => new Date(val)),
			updatedDate: z
				.string()
				.optional()
				.transform((str) => (str ? new Date(str) : undefined)),
			heroImage: image(),
			category: z.enum(CATEGORIES),
			tags: z.array(z.string()),
			// Reference a single author from the `authors` collection by `id`
			// author: reference('authors').optional(),
			// Reference an array of related posts from the `blog` collection by `slug`
			// relatedPosts: z.array(reference('blog')),
			author: z.string().default('Anonymous'),
			authorContact: z.string().email().optional(),
			canonicalURL: z.string().url().optional(),
			draft: z.boolean().default(false)
		})
})

// Author collection schema
const authorsCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		// portfolio: z.string().url(),
		meta_title: z.string().optional(),
		email: z.string().optional(),
		image: z.string().optional(),
		description: z.string().optional(),
		social: z
			.array(
				z
					.object({
						name: z.string().optional(),
						icon: z.string().optional(),
						link: z.string().optional()
					})
					.optional()
			)
			.optional(),
		draft: z.boolean().optional()
	})
})

// Pages collection schema
const pagesCollection = defineCollection({
	type: 'content',
	schema: z.object({
		title: z.string(),
		meta_title: z.string().optional(),
		description: z.string().optional(),
		image: z.string().optional(),
		draft: z.boolean().optional()
	})
})

// Export collections
export const collections = {
	blog: blogCollection,
	authors: authorsCollection
	// pages: pagesCollection,
}
// export const collections = { blog }
