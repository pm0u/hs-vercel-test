import React from "react"
import Link from "next/link"

interface BreadcrumbProps {
  /** Objects with a label and optional link displayed in order. */
  crumbs: Array<LinkedBreadcrumbParams | UnlinkedBreadcrumbParams>
}

interface UnlinkedBreadcrumbParams {
  /** Displayed label */
  label: string
}

type LinkedBreadcrumbParams = UnlinkedBreadcrumbParams & { href: string }

type UnlinkedBreadcrumbProps = UnlinkedBreadcrumbParams & {
  /** if this is current page, display in bold. Only applies to last crumb. */
  current?: boolean
}

const UnlinkedBreadcrumb = ({
  label,
  current = false,
}: UnlinkedBreadcrumbProps) => {
  return (
    <li className="inline">
      <span
        className={current ? "font-bold" : undefined}
        aria-current={current ? "page" : undefined}
      >
        {label}
      </span>
    </li>
  )
}

const LinkedBreadcrumb = ({ label, href }: LinkedBreadcrumbParams) => {
  return (
    <li className="inline">
      <Link href={href} className="hover:text-red-50">
        {label}
      </Link>
    </li>
  )
}

const Separator = () => <span aria-hidden="true"> » </span>

/**
 * Breadcrumbs to display current location within the ETA2021 microsite
 */
export const Breadcrumbs = ({ crumbs }: BreadcrumbProps) => {
  return (
    <nav
      aria-label="breadcrumbs"
      className="text-legacy-xxs uppercase leading-legacy-extra-loose tracking-legacy-widest legacy-md-lg:text-legacy-xs"
    >
      <ol>
        {crumbs.map((crumb, i) => {
          const isLast = i === crumbs.length - 1
          if ("href" in crumb) {
            return (
              <React.Fragment key={crumb.label}>
                <LinkedBreadcrumb {...crumb} />
                {!isLast && <Separator />}
              </React.Fragment>
            )
          }
          return (
            <React.Fragment key={crumb.label}>
              <UnlinkedBreadcrumb {...crumb} current={isLast} />
              {!isLast && <Separator />}
            </React.Fragment>
          )
        })}
      </ol>
    </nav>
  )
}
