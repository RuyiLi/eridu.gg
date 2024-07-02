'use client'

import { Heading } from '@/components/radix/Heading'
import { banners } from '@/util/constants'
import { useParams } from 'next/navigation'

// export const getStaticProps = async () => {
//   const bannerSlug = useParams().bannerSlug

//   if (!banners.includes(bannerSlug)) {
//     return {
//       notFound: true,
//     }
//   }

//   return {}
// }

export default () => {
  const bannerSlug = useParams().bannerSlug
  return <Heading>{bannerSlug} Channel</Heading>
}
