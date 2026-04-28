// 關於頁，呈現品牌理念、特色與服務承諾。
import { motion } from 'framer-motion'
import {
  fadeRight,
  fadeUp,
  fadeUpSoft,
  scaleIn,
  staggerContainer,
  viewportOnce,
} from '../utils/motion'
import { assetPath } from '../utils/assetPath'

function AboutPage() {
  return (
    <motion.section className="section-stack">
      <motion.div
        className="section-heading text-center"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.span className="eyebrow mx-auto" variants={fadeUpSoft}>
          關於 SoundNest
        </motion.span>
        <motion.h1 variants={fadeUpSoft}>我們專注做一件事，幫你找到更適合的耳機。</motion.h1>
        <motion.p className="section-copy" variants={fadeUpSoft}>
          從真無線藍牙、降噪耳罩到專業監聽，我們相信耳機不是規格表的堆疊，
          而是與生活場景、使用習慣和聲音偏好緊密相連的選擇。
        </motion.p>
        <motion.div className="about-hero-image-wrap" variants={scaleIn}>
          <img
            alt="SoundNest 精選耳機展示"
            className="about-hero-image"
            src={assetPath('images/about/about-01.png')}
          />
        </motion.div>
      </motion.div>

      <motion.div
        className="row g-4"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <div className="col-lg-4">
          <motion.article className="home-step-card h-100" variants={fadeUp}>
            <span className="home-step-en">SELECT</span>
            <h3>精準選品</h3>
            <p className="mb-0 section-copy">
              我們聚焦真正有辨識度的耳機產品，從入門到進階，讓挑選過程更清楚。
            </p>
          </motion.article>
        </div>
        <div className="col-lg-4">
          <motion.article className="home-step-card h-100" variants={fadeUp}>
            <span className="home-step-en">SCENARIO</span>
            <h3>依情境推薦</h3>
            <p className="mb-0 section-copy">
              通勤、工作、運動、遊戲、創作，每種情境對耳機的需求都不一樣。
            </p>
          </motion.article>
        </div>
        <div className="col-lg-4">
          <motion.article className="home-step-card h-100" variants={fadeUp}>
            <span className="home-step-en">SERVICE</span>
            <h3>真誠服務</h3>
            <p className="mb-0 section-copy">
              我們希望你買到的是適合自己的耳機，而不只是被行銷語言推著做決定。
            </p>
          </motion.article>
        </div>
      </motion.div>

      <motion.section
        className="home-contact row g-4 align-items-center"
        initial="hidden"
        variants={staggerContainer}
        viewport={viewportOnce}
        whileInView="visible"
      >
        <motion.div className="col-lg-7" variants={fadeRight}>
          <div className="home-copy-block">
            <span className="eyebrow">品牌理念</span>
            <h2>好聲音，應該自然地走進每一天。</h2>
            <p className="section-copy">
              SoundNest 希望把耳機選購這件事變得更直覺、更有溫度。你可以快速比較規格，
              也可以從自己的生活出發，找到一副真的會每天想戴上的耳機。
            </p>
          </div>
        </motion.div>
        <motion.div className="col-lg-5" variants={scaleIn}>
          <div className="home-contact-card">
            <div>
              <span className="home-contact-label">客服信箱</span>
              <strong>service@soundnest.com.tw</strong>
            </div>
            <div>
              <span className="home-contact-label">服務時間</span>
              <strong>週一至週五 10:00 - 18:00</strong>
            </div>
          </div>
        </motion.div>
      </motion.section>
    </motion.section>
  )
}

export default AboutPage
