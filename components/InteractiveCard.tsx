import { Image } from '@/components/ui/image'
import { Link } from '@/components/ui/link'
import { GradientBorder } from '@/components/ui/gradient-border'
import { GrowingUnderline } from '@/components/ui/growing-underline'

const InteractiveCard = ({ title, description, imgSrc, href, label }) => (
  <GradientBorder
    offset={28}
    className="flex transform flex-col rounded-[20px] bg-zinc-50 p-4 transition-transform duration-300 ease-in-out hover:scale-105 dark:bg-white/5 dark:shadow-none md:p-6"
  >
    {/* <TiltedGridBackground className="inset-0 z-[-1] rounded-[20px]" /> */}
    <div className="mb-4 flex items-center gap-4">
      <Image src={imgSrc} alt={title} width={80} height={80} className="h-15 w-15 shrink-0" />
      <div className="flex flex-col items-start gap-1 pt-1">
        <h2 className="text-[20px] font-bold leading-[28px]">
          {href ? (
            <Link href={href} aria-label={`Link to ${title}`}>
              <GrowingUnderline>{title}</GrowingUnderline>
            </Link>
          ) : (
            title
          )}
        </h2>
      </div>
      {/* Label with dynamic effect */}
      {label && (
        <div className="absolute right-3 top-3">
          <span className="inline-block transform rounded-full bg-green-100 px-2 py-0.5 text-xs font-medium text-green-500 transition-all duration-300 group-hover:scale-110 group-hover:bg-green-200 dark:bg-green-900 dark:text-green-400 dark:group-hover:bg-green-800">
            {label}
          </span>
        </div>
      )}
    </div>
    <p className="text line-clamp-3 grow">{description}</p>
  </GradientBorder>
)

export default InteractiveCard
