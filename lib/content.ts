import courseDetailsJson from '@/content/products.json'
import offersJson from '@/content/offer-index.json'
import mediaJson from '@/content/media.json'
import postsJson from '@/content/insights.json'
import testimonialsJson from '@/content/testimonials.json'
import profileJson from '@/content/profile.json'
import siteCopyJson from '@/content/site-copy.json'
import homeCopyJson from '@/content/home-copy.json'
import aboutCopyJson from '@/content/about-copy.json'
import commercialCopyJson from '@/content/commercial-copy.json'
import legalCopyJson from '@/content/legal-copy.json'
import servicePagesJson from '@/content/service-pages.json'
import navigationJson from '@/content/navigation.json'
import contactCopyJson from '@/content/contact-copy.json'
import {
  validateLocalizedRoot,
  validateMediaCollection,
  validatePosts,
  validateProductCollection,
  validateProfile,
  validateTestimonials,
} from '@/lib/content-schema'

/** Central build-time validation boundary for public content. */
export const content={
  courseDetails:validateProductCollection(courseDetailsJson,'products'),
  offers:validateProductCollection(offersJson,'offer-index'),
  media:validateMediaCollection(mediaJson,'media'),
  posts:validatePosts(postsJson,'insights'),
  testimonials:validateTestimonials(testimonialsJson,'testimonials'),
  profile:validateProfile(profileJson,'profile'),
  siteCopy:validateLocalizedRoot(siteCopyJson,'site-copy'),
  homeCopy:validateLocalizedRoot(homeCopyJson,'home-copy'),
  aboutCopy:validateLocalizedRoot(aboutCopyJson,'about-copy'),
  commercialCopy:validateLocalizedRoot(commercialCopyJson,'commercial-copy'),
  legalCopy:validateLocalizedRoot(legalCopyJson,'legal-copy'),
  servicePages:validateLocalizedRoot(servicePagesJson,'service-pages'),
  navigation:validateLocalizedRoot(navigationJson,'navigation'),
  contactCopy:validateLocalizedRoot(contactCopyJson,'contact-copy'),
}
