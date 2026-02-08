import { MetadataRoute } from 'next'
import { getAllActivities } from '@/queries/activity'
import { findAllResorts } from '@/queries/resort'

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://divingnest.com'

  // Static pages
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: baseUrl,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 1,
    },
    {
      url: `${baseUrl}/about-us`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${baseUrl}/contact`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
    {
      url: `${baseUrl}/enjoy`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/stay`,
      lastModified: new Date(),
      changeFrequency: 'daily',
      priority: 0.9,
    },
    {
      url: `${baseUrl}/privacy-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
    {
      url: `${baseUrl}/refund-policy`,
      lastModified: new Date(),
      changeFrequency: 'yearly',
      priority: 0.5,
    },
  ]

  try {
    // Dynamic activity pages
    const activities = await getAllActivities()
    const activityPages: MetadataRoute.Sitemap = activities.map((activity) => ({
      url: `${baseUrl}/enjoy/${encodeURIComponent(activity.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    // Dynamic resort pages
    const resorts = await findAllResorts()
    const resortPages: MetadataRoute.Sitemap = resorts.map((resort) => ({
      url: `${baseUrl}/stay/${encodeURIComponent(resort.name)}`,
      lastModified: new Date(),
      changeFrequency: 'weekly' as const,
      priority: 0.8,
    }))

    return [...staticPages, ...activityPages, ...resortPages]
  } catch (error) {
    console.error('Error generating sitemap:', error)
    // Return static pages only if dynamic content fails
    return staticPages
  }
}