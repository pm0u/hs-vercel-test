import { useCallback } from "react"
import styles from "styles/next-is-now.module.scss"
import { useNextIsNow } from "lib/next-is-now"
import { useClock } from "lib/next-is-now/clock"
import Link from "next/link"
import { YoutubePopout } from "components/base"
import { ChicagoFLF, Geneva } from "components/base/fonts"
import { sanityClient, urlFor } from "lib/sanity"
import { NextIsNowData } from "types/next-is-now"
import { useSanityImages } from "hooks/use-sanity-images"
import Image from "next/image"
import { intToString } from "helpers/numbers"

/**
 * Separate to prevent constant re-renders in the larger component
 */
const Clock = () => {
  const { time } = useClock()
  return (
    <span className="nin__nav__clock" aria-hidden="true">
      {time}
    </span>
  )
}

const onTodoClick = (todoId: string) => {
  const evt = new CustomEvent("todo-complete", { detail: { todo: todoId } })
  document.dispatchEvent(evt)
}

/**
 * @todo: responsive image sizing on the YT posters, wordmark, emojis
 */
const NextIsNow = ({
  newWordmark,
  oldWordmark,
  todoListEmoji,
  spaceInvaderEmoji,
  webinars,
  linkedInIcon,
  linkedInIconTransformed,
  handshakeIcon,
  handshakeIconTransformed,
  demoIcon,
  demoIconTransformed,
  recruitingIcon,
  recruitingIconTransformed,
  etaIcon,
  etaIconTransformed,
  hntIcon,
  hntIconTransformed,
  howToRecruitIcon,
  howToRecruitIconTransformed,
  careerFairIcon,
  careerFairIconTransformed,
  numStudents,
  numUniversities,
}: NextIsNowData) => {
  const [
    todoListEmojiProps,
    newWordmarkProps,
    oldWordmarkProps,
    featuredVideoProps,
    secondVideoProps,
    thirdVideoProps,
    spaceInvaderEmojiProps,
  ] = useSanityImages([
    todoListEmoji,
    newWordmark,
    oldWordmark,
    webinars[0].youtubeVideoPoster,
    webinars[1].youtubeVideoPoster,
    webinars[2].youtubeVideoPoster,
    spaceInvaderEmoji,
  ])

  const onWebinarOpen = useCallback(() => {
    onTodoClick("webinar-todo")
  }, [])
  const ref = useNextIsNow()
  return (
    <div
      className={styles.ninWrapper}
      ref={ref}
      // type coercion is necessary to please TS
      style={{
        ["--font-chicago-flf" as any]: ChicagoFLF.style.fontFamily,
        ["--font-geneva" as any]: Geneva.style.fontFamily,
      }}
    >
      <svg className="absolute -left-full h-0 w-0" aria-hidden="true">
        <filter id="posterize">
          <feColorMatrix type="saturate" values="0.35" result="desat" />
          <feComponentTransfer>
            <feFuncR type="gamma" exponent="0.8" amplitude="1.2" offset="0.1" />
            <feFuncG type="gamma" exponent="0.8" amplitude="1.2" offset="0.1" />
            <feFuncB type="gamma" exponent="0.8" amplitude="1.2" offset="0.1" />
          </feComponentTransfer>

          <feComponentTransfer>
            <feFuncR type="discrete" tableValues="0 0.25 0.5 0.75 1" />
            <feFuncG type="discrete" tableValues="0 0.25 0.5 0.75 1" />
            <feFuncB type="discrete" tableValues="0 0.25 0.5 0.75 1" />
          </feComponentTransfer>
        </filter>
      </svg>
      <div className="nin">
        <div className="nin__loading-screen" aria-hidden="true">
          <div className="nin__loading-screen__card">
            <div className="nin__loading-screen__card__title">
              Loading your fall
              <br />
              recruiting hub
            </div>
            <div className="nin__loading-screen__card__progress-indicator">
              .
            </div>
            <div className="nin__loading-screen__card__details">
              <span>
                Access{" "}
                <span className="nin__stat">{intToString(numStudents)}+</span>{" "}
                students
                <br />
                at{" "}
                <span className="nin__stat">
                  {intToString(numUniversities, 10000)}
                </span>
                + schools.
              </span>
              <span>(C) 2021 Handshake</span>
            </div>
          </div>
        </div>

        <header
          role="banner"
          className="nin__nav nin__transformable"
          data-transform-delay="3000"
        >
          <h1 className="nin__nav__wordmark">
            <a href="/employers/">
              <span className="nin__nav__wordmark__old" aria-hidden="true">
                <Image {...oldWordmarkProps} alt="" className="inline-block" />
                Fall Recruiting Hub
              </span>
              <Image
                {...newWordmarkProps}
                alt=""
                className="nin__nav__wordmark__transformed"
              />
            </a>
          </h1>
          <Clock />
        </header>

        <main role="main" className="nin__desktop-grid">
          <div className="nin__desktop-grid__item nin__desktop-grid__item--todo">
            <section
              data-transform-delay="2000"
              className="nin__window nin__transformable nin__draggable nin__window nin__window--post-it-note nin__window--todo"
            >
              <header className="nin__window__header nin__draggable__handle">
                <h2>Todo</h2>
              </header>
              <div className="nin__window__body nin__draggable__handle">
                <h3>
                  How to Hit Your Fall Recruiting Goals
                  <Image
                    {...todoListEmojiProps}
                    alt="bullseye emoji"
                    className="nin__emoji"
                  />
                </h3>
                <ul className="nin__todo-list">
                  <li>
                    <input
                      type="checkbox"
                      data-todo
                      id="webinar-todo"
                      disabled
                    />
                    <label htmlFor="webinar-todo">
                      Build more meaningful relationships by watching the
                      recorded webinars
                    </label>
                  </li>
                  <li>
                    <input
                      type="checkbox"
                      data-todo
                      id="featured-resource-todo"
                      disabled
                    />
                    <label htmlFor="featured-resource-todo">
                      Learn how to connect with early talent in our Gen Z
                      recruiting guide
                    </label>
                  </li>
                </ul>
              </div>
              <div
                className="nin__window--post-it-note__bottom"
                aria-hidden="true"
              >
                <div className="footer-line"></div>
                <div className="footer-line"></div>
                <div className="footer-line"></div>
              </div>
            </section>
          </div>

          <div className="nin__desktop-grid__item nin__desktop-grid__item--videos">
            <section className="nin__window nin__transformable nin__draggable nin__window--videos">
              <header className="nin__window__header nin__draggable__handle">
                <h2>
                  <span className="nin__cut-on-mobile">
                    Learn with On-Demand
                  </span>{" "}
                  Webinars
                </h2>
              </header>
              <div className="nin__window__body">
                <div className="nin__window--videos__featured-video">
                  <h3 className="screen-reader-text">Featured video</h3>
                  <article className="nin__window__video">
                    <h4>
                      Find &amp; Engage Qualified Candidates From{" "}
                      <span className="nin__stat">
                        {intToString(numStudents)}+{" "}
                      </span>
                      Students
                    </h4>
                    <YoutubePopout
                      videoId="Nv_XBhm5YR8"
                      playIcon={null}
                      className="youtube-player-button"
                      onModalOpen={onWebinarOpen}
                    >
                      <Image {...featuredVideoProps} alt="" />
                    </YoutubePopout>
                  </article>
                </div>
                <div className="nin__window--videos__secondary-videos">
                  <h3>Other Videos to Prepare for Fall</h3>
                  <ul className="nin__window--videos__secondary-videos__list">
                    <li>
                      <article className="nin__window__video">
                        <h4>
                          Connect with Candidates Where They Prefer to Meet
                        </h4>
                        <YoutubePopout
                          videoId="HD4T96r3E_o"
                          className="youtube-player-button"
                          onModalOpen={onWebinarOpen}
                          playIcon={null}
                        >
                          <Image {...secondVideoProps} alt="" />
                        </YoutubePopout>
                      </article>
                    </li>
                    <li>
                      <article className="nin__window__video">
                        <h4>
                          Building 1:1 Relationships With Students At Scale
                        </h4>
                        <YoutubePopout
                          videoId="O4-K1MRmUgw"
                          className="youtube-player-button"
                          onModalOpen={onWebinarOpen}
                          playIcon={null}
                        >
                          <Image {...thirdVideoProps} alt="" />
                        </YoutubePopout>
                      </article>
                    </li>
                  </ul>
                </div>
              </div>
            </section>
          </div>

          <div className="nin__desktop-grid__item nin__desktop-grid__item--featured-resource">
            <section className="nin__window nin__transformable nin__draggable nin__window--featured-resource">
              <header className="nin__window__header nin__draggable__handle">
                <h2>Featured Resource</h2>
              </header>
              <div className="nin__window__body">
                <h3>The Gen Z Recruiting Guide</h3>
                <p>
                  10 ways to connect with the most diverse generation for your
                  early talent program.
                </p>
                <Link
                  href="https://joinhandshake.com/blog/employers/10-ways-to-include-recruit-gen-z-into-your-multi-generational-workforce/"
                  className="nin__window__button"
                  target="_blank"
                  onClick={() => onTodoClick("featured-resource-todo")}
                >
                  <span>Download guide</span>
                </Link>
              </div>
            </section>
          </div>

          <div className="nin__desktop-grid__item nin__desktop-grid__item--desktop-icons">
            <div className="nin__transformable" data-transform-delay="4000">
              {" "}
              <a
                href="http://www.linkedin.com/shareArticle?mini=true&url=https://joinhandshake.com/next-is-now"
                className="nin__icon nin__icon--share-site-on-linkedin-nextisnow"
                target="_blank"
                rel="noreferrer"
              >
                <span
                  className="nin__icon__image nin__icon__image--original"
                  style={{
                    backgroundImage: `url(${urlFor(linkedInIcon).toString()})`,
                  }}
                ></span>

                <span
                  className="nin__icon__image nin__icon__image--transformed"
                  style={{
                    backgroundImage: `url(${urlFor(
                      linkedInIconTransformed.asset._ref
                    ).toString()})`,
                  }}
                ></span>
                <span className="nin__icon__label">
                  Share site on LinkedIn #NextIsNow
                </span>
              </a>
            </div>
            <div className="nin__transformable" data-transform-delay="4300">
              {" "}
              <Link
                href="/employers/customers/"
                className="nin__icon nin__icon--see-handshake-case-studies"
                target="_blank"
              >
                <span
                  className="nin__icon__image nin__icon__image--original"
                  style={{
                    backgroundImage: `url(${urlFor(handshakeIcon).toString()})`,
                  }}
                ></span>

                <span
                  className="nin__icon__image nin__icon__image--transformed"
                  style={{
                    backgroundImage: `url(${urlFor(
                      handshakeIconTransformed
                    ).toString()})`,
                  }}
                ></span>
                <span className="nin__icon__label">
                  See Handshake case studies
                </span>
              </Link>
            </div>
            <div className="nin__transformable" data-transform-delay="4600">
              {" "}
              <Link
                href="/employers/request-more-info/"
                className="nin__icon nin__icon--request-handshake-demo"
                target="_blank"
              >
                <span
                  className="nin__icon__image nin__icon__image--original"
                  style={{
                    backgroundImage: `url(${urlFor(demoIcon).toString()})`,
                  }}
                ></span>

                <span
                  className="nin__icon__image nin__icon__image--transformed"
                  style={{
                    backgroundImage: `url(${urlFor(
                      demoIconTransformed
                    ).toString()})`,
                  }}
                ></span>
                <span className="nin__icon__label">Request Handshake demo</span>
              </Link>
            </div>
          </div>

          <div className="nin__desktop-grid__item nin__desktop-grid__item--helpful-resources">
            <section className="nin__window nin__transformable nin__draggable nin__window--helpful-resources">
              <header className="nin__window__header nin__draggable__handle">
                <h2>
                  <span className="nin__cut-on-mobile">Helpful</span> Resources
                </h2>
              </header>
              <div
                className="nin__window__fake-folder-details"
                aria-hidden="true"
              >
                <span className="nin__window__fake-folder-details__left">
                  5 items
                </span>
                <span className="nin__window__fake-folder-details__center">
                  256K in disk
                </span>
              </div>
              <div className="nin__window__fake-scrollbars">
                <div className="nin__window__body">
                  <ul className="nin__window__icon-list">
                    <li
                      className="nin__window__icon-list__item"
                      data-associated-todo="resources-todo"
                    >
                      <Link
                        href="/employers/resources/fall-2021-recruiting-cheat-sheet/"
                        className="nin__icon nin__icon--fall-recruiting-cheat-sheet"
                        target="_blank"
                      >
                        <span
                          className="nin__icon__image nin__icon__image--original"
                          style={{
                            backgroundImage: `url(${urlFor(
                              recruitingIcon
                            ).toString()})`,
                          }}
                        ></span>

                        <span
                          className="nin__icon__image nin__icon__image--transformed"
                          style={{
                            backgroundImage: `url(${urlFor(
                              recruitingIconTransformed
                            ).toString()})`,
                          }}
                        ></span>
                        <span className="nin__icon__label">
                          Fall Recruiting Cheat Sheet
                        </span>
                      </Link>
                    </li>
                    <li
                      className="nin__window__icon-list__item"
                      data-associated-todo="resources-todo"
                    >
                      <Link
                        href="/blog/employers/fall-recruiting-tips-from-handshakes-early-talent-award-winners/"
                        className="nin__icon nin__icon--early-talent-award-winners-tips"
                        target="_blank"
                      >
                        <span
                          className="nin__icon__image nin__icon__image--original"
                          style={{
                            backgroundImage: `url(${urlFor(
                              etaIcon
                            ).toString()})`,
                          }}
                        ></span>

                        <span
                          className="nin__icon__image nin__icon__image--transformed"
                          style={{
                            backgroundImage: `url(${urlFor(
                              etaIconTransformed
                            ).toString()})`,
                          }}
                        ></span>
                        <span className="nin__icon__label">
                          Early Talent Award Winners&apos; Tips
                        </span>
                      </Link>
                    </li>
                    <li
                      className="nin__window__icon-list__item"
                      data-associated-todo="resources-todo"
                    >
                      <Link
                        href="/network-trends"
                        className="nin__icon nin__icon--handshake-network-trends"
                        target="_blank"
                      >
                        <span
                          className="nin__icon__image nin__icon__image--original"
                          style={{
                            backgroundImage: `url(${urlFor(
                              hntIcon
                            ).toString()})`,
                          }}
                        ></span>

                        <span
                          className="nin__icon__image nin__icon__image--transformed"
                          style={{
                            backgroundImage: `url(${urlFor(
                              hntIconTransformed
                            ).toString()})`,
                          }}
                        ></span>
                        <span className="nin__icon__label">
                          Handshake Network Trends
                        </span>
                      </Link>
                    </li>
                    <li
                      className="nin__window__icon-list__item"
                      data-associated-todo="resources-todo"
                    >
                      <Link
                        href="/blog/employers/10-ways-to-include-recruit-gen-z-into-your-multi-generational-workforce/"
                        className="nin__icon nin__icon--how-recruiting-gen-z-is-different"
                        target="_blank"
                      >
                        <span
                          className="nin__icon__image nin__icon__image--original"
                          style={{
                            backgroundImage: `url(${urlFor(
                              howToRecruitIcon
                            ).toString()})`,
                          }}
                        ></span>

                        <span
                          className="nin__icon__image nin__icon__image--transformed"
                          style={{
                            backgroundImage: `url(${urlFor(
                              howToRecruitIconTransformed
                            ).toString()})`,
                          }}
                        ></span>
                        <span className="nin__icon__label">
                          How Recruiting Gen Z is Different
                        </span>
                      </Link>
                    </li>
                    <li
                      className="nin__window__icon-list__item"
                      data-associated-todo="resources-todo"
                    >
                      <Link
                        href="/blog/employers/virtual-career-fairs-7-ways-employers-can-stand-out/"
                        className="nin__icon nin__icon--stand-out-at-virtual-career-fairs"
                        target="_blank"
                      >
                        <span
                          className="nin__icon__image nin__icon__image--original"
                          style={{
                            backgroundImage: `url(${urlFor(
                              careerFairIcon
                            ).toString()})`,
                          }}
                        ></span>

                        <span
                          className="nin__icon__image nin__icon__image--transformed"
                          style={{
                            backgroundImage: `url(${urlFor(
                              careerFairIconTransformed
                            ).toString()})`,
                          }}
                        ></span>
                        <span className="nin__icon__label">
                          Stand Out at Virtual Career Fairs
                        </span>
                      </Link>
                    </li>
                  </ul>
                </div>
                <div
                  className="nin__window__fake-scrollbars__right"
                  aria-hidden="true"
                ></div>
                <div
                  className="nin__window__fake-scrollbars__bottom"
                  aria-hidden="true"
                ></div>
              </div>
            </section>
          </div>
          {/* Hide the email signup since event is over */}
          {/* <div className="nin__desktop-grid__item nin__desktop-grid__item--mailing-list">
            <section className="nin__window nin__transformable nin__draggable nin__window--mailing-list">
              <header className="nin__window__header nin__draggable__handle">
                <h2>Subscribe</h2>
              </header>
              <div className="nin__window__body">
                <div
                  className="marketo-form marketo-form--nin"
                  data-marketo-form
                  data-base-url="//go.joinhandshake.com"
                  data-munchkin-id="390-ZTF-353"
                  data-form-id="1932"
                  data-business-email-only
                  data-on-success-dont-scroll
                  data-shadow-buttons
                >
                  <div id="marketo-form__initial">
                    <h3>
                      Stay in the loop on the latest early talent trends and
                      insights.
                    </h3>
                    <div className="load-wrap">
                      <form id="mktoForm_1932"></form>
                    </div>
                  </div>
                  <div id="marketo-form__success">
                    <img
                      src="https://joinhandshake.com/wp-content/themes/handshake/dist/assets/images/next-is-now/mailing-list__success.svg"
                      className="mx-auto"
                    />
                    <p>
                      Thanks!
                      <br />
                      You’re subscribed!
                    </p>
                  </div>
                </div>
                <Script src=" //go.joinhandshake.com/js/forms2/js/forms2.min.js" />
              </div>
            </section>
                        </div> */}

          <div className="nin__desktop-grid__item nin__desktop-grid__item--about">
            <section className="nin__window nin__transformable nin__draggable nin__window--about">
              <header className="nin__window__header nin__draggable__handle">
                <h2>System Message</h2>
              </header>
              <div className="nin__window__body">
                <h3>About #NextIsNow</h3>
                <p>
                  Floppy disks are out and cloud storage is in.
                  <br />
                  Just like technology, recruiting has evolved.{" "}
                </p>
                <p>
                  Kick off your fall recruiting season confidently—on and
                  off-campus—by building relationships at scale with students on
                  Handshake.
                </p>
                <h4>
                  Bonus{" "}
                  <Image
                    {...spaceInvaderEmojiProps}
                    alt="space invader emoji"
                    className="nin__emoji"
                  />
                </h4>
                <p>
                  Share this site on LinkedIn with #NextIsNow and tell us how
                  you’re engaging students virtually for a chance to win a
                  Nintendo Switch
                </p>
              </div>
            </section>
          </div>
        </main>

        <div
          className="nin__custom-cursor nin__custom-cursor--loading"
          aria-hidden="true"
        >
          <div className="nin__custom-cursor__icon nin__custom-cursor__icon--loading"></div>
          <div className="nin__custom-cursor__icon nin__custom-cursor__icon--normal"></div>
          <div className="nin__custom-cursor__icon nin__custom-cursor__icon--hover"></div>
          <div className="nin__custom-cursor__icon nin__custom-cursor__icon--scroll"></div>
        </div>
      </div>
    </div>
  )
}

export default NextIsNow

export const getStaticProps = async () => {
  const pageData = await sanityClient.fetch(
    /* groq */ `*[_type == 'nextIsNow'][0]`
  )

  return {
    props: {
      ...pageData,
    },
  }
}
