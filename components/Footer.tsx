import Link from './Link'
import siteMetadata from '@/data/siteMetadata'

export default function Footer() {
  return (
    <footer>
      <div className="mt-8 flex flex-col items-center">
        <div className="relative mb-8 w-full">
          <div className="flex justify-center space-x-2 text-sm text-gray-500 dark:text-gray-400">
            <div>{siteMetadata.author}</div>
            <div>{` • `}</div>
            <div>{`© ${new Date().getFullYear()}`}</div>
            <div>{` • `}</div>
            <Link href="/">{siteMetadata.title}</Link>
          </div>
        </div>
      </div>
    </footer>
  )
}
