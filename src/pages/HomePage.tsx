import { useEffect } from 'react'
import { motion } from 'framer-motion'
import { Link } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { ProductCard } from '../components/ProductCard'
import { Button } from '../components/ui/Button'
import { fetchProducts } from '../slices/productSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'
import {
  fadeLeft,
  fadeRight,
  fadeUp,
  heroCtaVariants,
  heroImageVariants,
  heroSubtitleVariants,
  heroTitleVariants,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from '../utils/motion'

function HomePage() {
  const dispatch = useAppDispatch()
  const { items, productsStatus, error } = useAppSelector((state) => state.products)
  const featuredProducts = items.slice(0, 3)
  const testimonials = [
    {
      quote:
        '降噪真的很有感，捷運通勤時整個世界安靜下來，低頻也很飽滿。',
      author: '台北 林先生',
    },
    {
      quote:
        '我長時間剪片會戴監聽耳機，聲音細節清楚，頭戴壓力也比想像中舒服。',
      author: '台中 陳小姐',
    },
    {
      quote:
        '真無線耳機連線很穩，外出開會和運動切換都方便，已經變成每天必帶。',
      author: '高雄 王小姐',
    },
  ]

  useEffect(() => {
    if (productsStatus === 'idle') {
      void dispatch(fetchProducts())
    }
  }, [dispatch, productsStatus])

  return (
    <div className="home-page">
      <section className="home-hero  position-relative overflow-hidden u-grid-overlay">
        <div className="row g-4 align-items-center">
          <div className="col-lg-7">
            <div className="home-hero-copy esports-home-hero__copy">
              <span className="ui-badge">Esports Audio Loadout</span>
              <motion.h1
                animate="visible"
                className="esports-home-hero__title"
                initial="hidden"
                variants={heroTitleVariants}
              >
                <span className="esports-home-hero__title">解鎖更低延遲、更強定位感的</span>
                <span className="u-gradient-text">戰鬥音場</span>
              </motion.h1>
              <motion.p
                animate="visible"
                className="home-lead"
                initial="hidden"
                variants={heroSubtitleVariants}
              >
                專為 FPS、MOBA、實況與沉浸遊戲場景打造的電競耳機商城。從無線低延遲、
                7.1 虛擬環繞到直播收音，幫你把每一場對局的聲音細節拉滿。
              </motion.p>
              <motion.div
                animate="visible"
                className="hero-actions esports-home-hero__actions"
                initial="hidden"
                variants={heroCtaVariants}
              >
                <Link className="ui-button ui-button--primary" to="/products">
                  立即選購裝備
                </Link>
                <Link className="ui-button ui-button--ghost" to="/about">
                  查看品牌情報
                </Link>
              </motion.div>

              <div className="esports-home-hero__metrics">
                <div className="esports-metric ui-card">
                  <span className="esports-metric__label">連線穩定度</span>
                  <strong>99.2%</strong>
                </div>
                <div className="esports-metric ui-card">
                  <span className="esports-metric__label">低延遲模式</span>
                  <strong>24ms</strong>
                </div>
                <div className="esports-metric ui-card">
                  <span className="esports-metric__label">玩家評價</span>
                  <strong>4.9/5</strong>
                </div>
              </div>
            </div>
          </div>

          <div className="col-lg-5">
            <motion.div
              animate="visible"
              className="home-hero-visual esports-home-hero__visual esports-home-hero__visual--image"
              initial="hidden"
              variants={heroImageVariants}
            >
              <picture className="esports-home-hero__picture">
                <source
                  media="(min-width: 992px)"
                  srcSet="/images/hero/hero-headset-desktop.png"
                />
                <img
                  alt="Aural X9 Pro 電競耳機"
                  className="esports-home-hero__image"
                  src="/images/hero/hero-headset.png"
                />
              </picture>
            </motion.div>
          </div>
        </div>
      </section>

      <motion.section
        className="home-story row g-4 align-items-center"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.div className="col-lg-5" variants={fadeLeft}>
          <div className="home-figure-card esports-figure-card ui-card">
            <img
              alt="SoundNest 電競耳機情境展示"
              className="esports-figure-card__image"
              src="/images/home/home-02.png"
            />
            <div className="esports-figure-card__grid" />
            <div className="esports-figure-card__copy">
              <span className="ui-badge ui-badge--accent">MISSION</span>
              <strong>讓每個玩家都能聽見先機</strong>
            </div>
          </div>
        </motion.div>
        <motion.div className="col-lg-7" variants={fadeRight}>
          <div className="home-copy-block esports-copy-block">
            <span className="eyebrow">戰術級聲音體驗</span>
            <h2>耳機不是配件，而是每一場對戰裡最重要的感知裝備。</h2>
            <p className="section-copy">
              無論是腳步聲定位、技能預判、團戰通話，還是直播與剪輯，好的耳機都會直接改變你的反應速度與沉浸程度。
            </p>
            <p className="section-copy">
              SoundNest 以玩家場景分類裝備，讓你更快找到適合競技、娛樂、實況或全天配戴的聲音方案。
            </p>
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="home-ritual esports-mode-section">
        <motion.div
          className="section-heading text-center"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <span className="ui-badge ui-badge--secondary mx-auto">Combat Modes</span>
          <h2 className="section-title mb-4">三種模式，對應三種玩家需求</h2>
        </motion.div>

        <motion.div
          className="row g-4"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <motion.div className="col-md-4" variants={fadeUp}>
            <article className="home-step-card esports-mode-card ui-card">
              <span className="home-step-index">01</span>
              <span className="home-step-en">COMMUTE</span>
              <h3>競技定位</h3>
              <p className="mb-0 section-copy">
                強化腳步、換彈與方位判斷，讓 FPS 對戰中的聲音提示更快傳進你的反射神經。
              </p>
            </article>
          </motion.div>
          <motion.div className="col-md-4" variants={fadeUp}>
            <article className="home-step-card esports-mode-card ui-card">
              <span className="home-step-index">02</span>
              <span className="home-step-en">WORK</span>
              <h3>連線協作</h3>
              <p className="mb-0 section-copy">
                高品質麥克風與穩定連線表現，讓隊友通話、直播互動與遠端協作都更俐落。
              </p>
            </article>
          </motion.div>
          <motion.div className="col-md-4" variants={fadeUp}>
            <article className="home-step-card esports-mode-card ui-card">
              <span className="home-step-index">03</span>
              <span className="home-step-en">PLAY</span>
              <h3>沉浸爆發</h3>
              <p className="mb-0 section-copy">
                從 RPG 場景氛圍到節奏遊戲節拍，高解析與低延遲共同撐起完整臨場感。
              </p>
            </article>
          </motion.div>
        </motion.div>
      </motion.section>

      <motion.section
        className="home-product-focus row g-4 align-items-center esports-loadout-section"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.div className="col-lg-6" variants={fadeLeft}>
          <div className="home-copy-block esports-copy-block">
            <span className="ui-badge">Featured Loadout</span>
            <h2>本月主打耳機，為高強度對戰打造定位力與爆發力。</h2>
            <p className="section-copy">
              結合低延遲模式、長時間舒適配戴與清晰通話收音，無論你是夜間排位玩家還是實況主，都能快速進入狀態。
            </p>
            <Link className="ui-button ui-button--primary" to="/products/1">
              查看主打裝備
            </Link>
          </div>
        </motion.div>
        <motion.div className="col-lg-6" variants={fadeRight}>
          <div className="home-product-stage esports-loadout-stage ui-card">
            <img
              alt="AURAL X9 PRO 電競耳機展示"
              className="esports-loadout-stage__image"
              src="/images/home/home-03.png"
            />
          </div>
        </motion.div>
      </motion.section>

      <motion.section className="section-stack esports-market-section">
        <motion.div
          className="section-heading text-center"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <span className="ui-badge ui-badge--accent mx-auto">Top Picks</span>
          <h2>聲音風格不同，總有一款適合你</h2>
          <p className="section-copy">從低延遲電競耳機到高解析監聽款，依照遊戲與聆聽習慣快速完成裝備配置。</p>
        </motion.div>

        {productsStatus === 'loading' ? <LoadingState /> : null}
        {productsStatus === 'failed' && error ? (
          <ErrorState message={error} onAction={() => void dispatch(fetchProducts())} />
        ) : null}
        {productsStatus === 'succeeded' ? (
          <motion.div
            className="product-grid"
            initial="hidden"
            variants={staggerContainer}
            viewport={viewportOnce}
            whileInView="visible"
          >
            {featuredProducts.map((product) => (
              <motion.div key={product.id} variants={fadeUp}>
                <ProductCard product={product} />
              </motion.div>
            ))}
          </motion.div>
        ) : null}
      </motion.section>

      <motion.section className="home-testimonials esports-feedback-section">
        <motion.div
          className="section-heading text-center"
          initial="hidden"
          variants={fadeUp}
          viewport={viewportOnce}
          whileInView="visible"
        >
          <span className="ui-badge ui-badge--secondary mx-auto">Player Reviews</span>
          <h2 className="section-title mb-4">每一副耳機，都來自不同的聆聽需求</h2>
        </motion.div>
        <motion.div
          className="row g-4"
          initial="hidden"
          variants={staggerContainer}
          viewport={viewportOnce}
          whileInView="visible"
        >
          {testimonials.map((item) => (
            <motion.div className="col-md-4" key={item.author} variants={fadeUp}>
              <article className="home-quote-card esports-quote-card ui-card h-100">
                <p className="home-quote-text">“{item.quote}”</p>
                <span className="home-quote-author">{item.author}</span>
              </article>
            </motion.div>
          ))}
        </motion.div>
      </motion.section>

      <motion.section
        className="home-contact row g-4 align-items-center"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.div className="col-lg-7" variants={fadeUp}>
          <div className="home-copy-block esports-copy-block">
            <span className="ui-badge">Support Channel</span>
            <h2>不知道該怎麼配裝？把你的遊戲類型告訴我們。</h2>
            <p className="section-copy">
              我們可以依照 FPS、MOBA、音樂、直播與剪輯需求，推薦更適合你的耳機規格、音場走向與連線方案。
            </p>
          </div>
        </motion.div>
        <motion.div className="col-lg-5" variants={scaleIn}>
          <div className="home-contact-card esports-contact-card ui-card">
            <div>
              <span className="home-contact-label">Discord</span>
              <strong>soundnest.gg/support</strong>
            </div>
            <div>
              <span className="home-contact-label">Email</span>
              <strong>service@soundnest.com.tw</strong>
            </div>
            <div className="inline-actions mt-2">
              <Link className="ui-button ui-button--primary" to="/products">
                進入裝備庫
              </Link>
              <Button variant="secondary">聯絡顧問</Button>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </div>
  )
}

export default HomePage
