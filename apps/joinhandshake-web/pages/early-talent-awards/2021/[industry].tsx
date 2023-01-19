import { useRouter } from "next/router"
const IndustryPage = () => {
  const router = useRouter()
  const { industry } = router.query
  return <div>{industry}</div>
}

export default IndustryPage
