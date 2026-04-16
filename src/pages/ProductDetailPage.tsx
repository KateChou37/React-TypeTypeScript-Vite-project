import { useEffect, useState } from 'react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { addToCart } from '../slices/cartSlice'
import { clearCurrentProduct, fetchProductById } from '../slices/productSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

function ProductDetailPage() {
  const { id } = useParams()
  const navigate = useNavigate()
  const dispatch = useAppDispatch()
  const [openQuestionIndex, setOpenQuestionIndex] = useState(0)
  const [selectedImageState, setSelectedImageState] = useState({ productId: 0, index: 0 })
  const { currentProduct, productDetailStatus, error } = useAppSelector((state) => state.products)

  useEffect(() => {
    if (id) {
      void dispatch(fetchProductById(Number(id)))
    }

    return () => {
      dispatch(clearCurrentProduct())
    }
  }, [dispatch, id])

  if (productDetailStatus === 'loading') {
    return <LoadingState title="載入耳機資訊中" description="正在取得商品詳情。" />
  }

  if (productDetailStatus === 'failed' || !currentProduct) {
    return (
      <ErrorState
        message={error ?? '找不到這款耳機商品。'}
        actionLabel="返回商品列表"
        onAction={() => void navigate('/products')}
      />
    )
  }

  const productModel = `SN-${currentProduct.id.toString().padStart(4, '0')}`
  const productGalleryImages =
    currentProduct.images && currentProduct.images.length > 0
      ? currentProduct.images
      : currentProduct.image
        ? [currentProduct.image]
        : []
  const selectedImageIndex =
    selectedImageState.productId === currentProduct.id ? selectedImageState.index : 0
  const selectedImage = productGalleryImages[selectedImageIndex] ?? productGalleryImages[0]
  const productQuestions = [
    {
      question: '這款耳機適合長時間配戴嗎？',
      answer:
        '適合。建議依照個人耳型與使用情境調整配戴位置，長時間使用時可每 1 至 2 小時短暫休息，讓耳朵維持舒適狀態。',
    },
    {
      question: '可以用在遊戲、通話或線上會議嗎？',
      answer:
        '可以。這款耳機具備清楚的聲音表現，適合日常娛樂、語音通話與線上會議；若特別重視競技低延遲，可優先確認裝置是否支援對應模式。',
    },
    {
      question: '商品會附保固嗎？',
      answer:
        '商品出貨會依照商城保固政策提供基本保固服務。收到商品後請保留訂單紀錄，若遇到非人為故障，可聯繫客服協助確認。',
    },
    {
      question: '下單後多久可以收到？',
      answer:
        '現貨商品通常會在訂單成立後依序安排出貨，實際到貨時間會依配送地區與物流狀況而不同。',
    },
    {
      question: '如果不適合可以退換貨嗎？',
      answer:
        '可依商城退換貨規範申請。建議收到商品後先確認外觀、配件與功能，並保留完整包裝，以利後續處理。',
    },
  ]

  return (
    <div className="product-detail-page">
      <nav className="product-detail-breadcrumb" aria-label="Breadcrumb">
        <Link to="/">首頁</Link>
        <span>/</span>
        <Link to="/products">產品資訊</Link>
        <span>/</span>
        <span>{currentProduct.title}</span>
      </nav>

      <section className="product-detail-hero">
        <div className="product-detail-gallery">
          <div className="product-detail-image-stage ui-card">
            {selectedImage ? (
              <img
                alt={currentProduct.title}
                className="product-detail-main-image"
                src={selectedImage}
              />
            ) : null}
          </div>

          {productGalleryImages.length > 0 ? (
            <div className="product-detail-thumbs" aria-label="商品圖片縮圖">
              {productGalleryImages.map((image, index) => (
                <button
                  aria-label={`查看商品圖片 ${index + 1}`}
                  className={`product-detail-thumb${selectedImageIndex === index ? ' is-active' : ''}`}
                  key={image}
                  onClick={() => setSelectedImageState({ productId: currentProduct.id, index })}
                  type="button"
                >
                  <img
                    alt={`${currentProduct.title} 圖片 ${index + 1}`}
                    decoding="async"
                    loading="lazy"
                    src={image}
                  />
                </button>
              ))}
            </div>
          ) : null}
        </div>

        <article className="product-detail-summary ui-card">
          <span className="ui-badge ui-badge--secondary">{currentProduct.category}</span>
          <h1>{currentProduct.title}</h1>
          <p className="product-detail-model">Model NO.: {productModel}</p>
          <p className="section-copy">{currentProduct.description}</p>

          <dl className="product-detail-spec-list">
            <div>
              <dt>售價</dt>
              <dd>${currentProduct.price.toFixed(2)}</dd>
            </div>
            <div>
              <dt>評分</dt>
              <dd>{currentProduct.rating.toFixed(1)} / 5</dd>
            </div>
            <div>
              <dt>庫存</dt>
              <dd>剩餘 {currentProduct.inventory} 件</dd>
            </div>
          </dl>

          <div className="inline-actions">
            <button className="ui-button ui-button--primary" onClick={() => dispatch(addToCart(currentProduct))} type="button">
              加入購物車
            </button>
            <Link className="ui-button ui-button--ghost" to="/cart">
              查看購物車
            </Link>
          </div>
        </article>
      </section>

      <section className="product-detail-content">
        <div className="product-detail-section-heading">
          <span className="ui-badge ui-badge--accent">詳細介紹</span>
          <h2>About {currentProduct.title}</h2>
        </div>

        <div className="product-detail-content-grid">
          <article className="product-detail-description">
            <p>
              {currentProduct.description}
              我們依照日常配戴、遊戲娛樂、通話與聲音表現整理這款耳機的核心重點，
              讓你可以更快判斷它是否符合自己的使用情境。
            </p>
          </article>

          <div className="product-detail-feature-panel ui-card">
            <h3>Key Features</h3>
            <ul className="product-detail-feature-list">
              {currentProduct.features.map((feature) => (
                <li key={feature}>{feature}</li>
              ))}
            </ul>
          </div>
        </div>

        <div className="product-detail-table-wrap">
          <table className="product-detail-table">
            <tbody>
              <tr>
                <th>產品分類</th>
                <td>{currentProduct.category}</td>
              </tr>
              <tr>
                <th>型號</th>
                <td>{productModel}</td>
              </tr>
              <tr>
                <th>庫存狀態</th>
                <td>現貨 {currentProduct.inventory} 件</td>
              </tr>
              <tr>
                <th>推薦情境</th>
                <td>{currentProduct.features.join(' / ')}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <section className="product-detail-faq" aria-labelledby="product-detail-faq-title">
          <div className="product-detail-section-heading">
            <span className="ui-badge ui-badge--secondary">Q&A</span>
            <h2 id="product-detail-faq-title">常見問題</h2>
          </div>

          <div className="product-detail-accordion">
            {productQuestions.map((item, index) => {
              const isOpen = openQuestionIndex === index
              const buttonId = `product-question-${index}`
              const panelId = `product-answer-${index}`

              return (
                <div className="product-detail-accordion-item" key={item.question}>
                  <button
                    aria-controls={panelId}
                    aria-expanded={isOpen}
                    className="product-detail-accordion-trigger"
                    id={buttonId}
                    onClick={() => setOpenQuestionIndex(isOpen ? -1 : index)}
                    type="button"
                  >
                    <span>{item.question}</span>
                    <i className={`bi ${isOpen ? 'bi-dash-lg' : 'bi-plus-lg'}`} />
                  </button>
                  <div
                    aria-labelledby={buttonId}
                    className={`product-detail-accordion-panel${isOpen ? ' is-open' : ''}`}
                    id={panelId}
                    role="region"
                  >
                    <p>{item.answer}</p>
                  </div>
                </div>
              )
            })}
          </div>
        </section>
      </section>
    </div>
  )
}

export default ProductDetailPage
