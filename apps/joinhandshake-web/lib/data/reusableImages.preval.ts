import preval from "next-plugin-preval"
import { getReusableImages } from "../../helpers/sanity"

const getData = async () => {
  const images = await getReusableImages()

  const imagesById = (images as any[]).reduce((imageObj, currentImage) => {
    return {
      ...imageObj,
      [currentImage.id.current]: currentImage,
    }
  }, {})

  return imagesById
}

export default preval(getData())
