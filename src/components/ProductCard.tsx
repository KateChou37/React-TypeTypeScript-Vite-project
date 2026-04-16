import { Link } from 'react-router-dom'
import { Button } from './ui/Button'
import { addToCart } from '../slices/cartSlice'
import { useAppDispatch } from '../store/hooks'
import type { Product } from '../types'
import './ProductCard.css'

interface ProductCardProps {
  product: Product
}

export function ProductCard({ product }: ProductCardProps) {
  const dispatch = useAppDispatch()

  return (
    <article className="product-card esports-product-card ui-card">
      <div className="product-card-top esports-product-card__top">
        <div>
          <span className="ui-badge">{product.category}</span>
          <h3 className="product-title" title={product.title}>
            {product.title}
          </h3>
        </div>
        <span className="price u-gradient-text">${product.price}</span>
      </div>

      <div className="esports-product-card__visual u-grid-overlay">
        {product.image ? (
          <img
            alt={product.title}
            className="product-image esports-product-card__image"
            decoding="async"
            loading="lazy"
            src={product.image}
          />
        ) : (
          <div className="esports-headphone">
            <div className="esports-headphone__arc" />
            <div className="esports-headphone__ear esports-headphone__ear--left" />
            <div className="esports-headphone__ear esports-headphone__ear--right" />
          </div>
        )}
        <span className="esports-product-card__sku">SKU #{product.id.toString().padStart(3, '0')}</span>
      </div>

      <p className="muted">{product.description}</p>

      <div className="product-meta esports-product-card__meta">
        <span className="ui-badge ui-badge--accent">★ {product.rating.toFixed(1)}</span>
        <span>庫存 {product.inventory} 件</span>
      </div>

      <div className="inline-actions esports-product-card__actions">
        <Link className="ui-button ui-button--ghost" to={`/products/${product.id}`}>
          查看詳情
        </Link>
        <Button onClick={() => dispatch(addToCart(product))}>
          加入購物車
        </Button>
      </div>
    </article>
  )
}
