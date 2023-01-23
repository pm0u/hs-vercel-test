import { useRouter } from "next/router"
import { useUrl } from "hooks/use-url"
const IndustryPage = () => {
  const { url } = useUrl()
  const router = useRouter()
  const { industry } = router.query
  return (
    <div>
      {industry},{url}
    </div>
  )
}

export default IndustryPage
