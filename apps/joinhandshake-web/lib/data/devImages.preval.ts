import preval from "next-plugin-preval"
import { getDevImages } from "../../helpers/sanity"

const getData = async () => {
  const images = await getDevImages()

  const imagesById = (images as any[]).reduce((imageObj, currentImage) => {
    return {
      ...imageObj,
      [currentImage.id.current]: currentImage,
    }
  }, {})

  return imagesById
}

export default preval(getData())
