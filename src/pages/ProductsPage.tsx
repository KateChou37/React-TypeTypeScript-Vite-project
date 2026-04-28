// 商品列表頁，提供分類、搜尋、排序與分頁瀏覽。
import { useEffect, useMemo, useRef, useState } from 'react'
import { ErrorState } from '../components/ErrorState'
import { LoadingState } from '../components/LoadingState'
import { Pagination } from '../components/Pagination'
import { ProductCard } from '../components/ProductCard'
import { fetchProducts } from '../slices/productSlice'
import { useAppDispatch, useAppSelector } from '../store/hooks'

// 每頁顯示的商品數量，分頁計算與列表切片會共用這個值。
const pageSize = 6
type SortOption = 'price-asc' | 'price-desc' | 'rating-desc' | 'rating-asc'

const sortOptionLabels: Record<SortOption, string> = {
  'price-asc': '價格低到高',
  'price-desc': '價格高到低',
  'rating-desc': '評分高到低',
  'rating-asc': '評分低到高',
}
const sortOptions = Object.entries(sortOptionLabels) as Array<[SortOption, string]>
type OpenDropdown = 'category' | 'sort' | null

function ProductsPage() {
  const dispatch = useAppDispatch()
  const { items, productsStatus, error } = useAppSelector((state) => state.products)
  const [currentPage, setCurrentPage] = useState(1)
  const [selectedCategory, setSelectedCategory] = useState('all')
  const [sortOption, setSortOption] = useState<SortOption>('price-asc')
  const [searchKeyword, setSearchKeyword] = useState('')
  const [openDropdown, setOpenDropdown] = useState<OpenDropdown>(null)
  const productGridRef = useRef<HTMLDivElement>(null)
  // 從商品資料動態整理分類，避免分類選單與 mock data 手動同步。
  const categories = useMemo(
    () => Array.from(new Set(items.map((product) => product.category))),
    [items],
  )
  // 依序套用分類、搜尋與排序，最後得到目前畫面真正要顯示的商品。
  const visibleItems = useMemo(() => {
    const categoryFilteredItems =
      selectedCategory === 'all'
        ? items
        : items.filter((product) => product.category === selectedCategory)

    const normalizedKeyword = searchKeyword.trim().toLowerCase()
    const searchedItems =
      normalizedKeyword.length === 0
        ? categoryFilteredItems
        : categoryFilteredItems.filter((product) => {
            const title = product.title.toLowerCase()
            const description = product.description.toLowerCase()

            return title.includes(normalizedKeyword) || description.includes(normalizedKeyword)
          })

    return [...searchedItems].sort((firstProduct, secondProduct) => {
      switch (sortOption) {
        case 'price-asc':
          return firstProduct.price - secondProduct.price
        case 'price-desc':
          return secondProduct.price - firstProduct.price
        case 'rating-desc':
          return secondProduct.rating - firstProduct.rating
        case 'rating-asc':
          return firstProduct.rating - secondProduct.rating
        default:
          return 0
      }
    })
  }, [items, searchKeyword, selectedCategory, sortOption])
  const totalPages = Math.max(1, Math.ceil(visibleItems.length / pageSize))
  const resolvedCurrentPage = Math.min(currentPage, totalPages)

  // 只切出目前頁面的商品，避免一次渲染全部結果。
  const paginatedItems = useMemo(() => {
    const startIndex = (resolvedCurrentPage - 1) * pageSize

    return visibleItems.slice(startIndex, startIndex + pageSize)
  }, [resolvedCurrentPage, visibleItems])

  // 第一次進入頁面時載入商品；已載入過就沿用 Redux 裡的資料。
  useEffect(() => {
    if (productsStatus === 'idle') {
      void dispatch(fetchProducts())
    }
  }, [dispatch, productsStatus])

  // 換頁時限制頁碼範圍，並把視窗捲回商品列表上方。
  const handlePageChange = (page: number) => {
    const nextPage = Math.min(Math.max(page, 1), totalPages)

    if (nextPage === resolvedCurrentPage) {
      return
    }

    setCurrentPage(nextPage)
    window.requestAnimationFrame(() => {
      productGridRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    })
  }

  const handleCategoryChange = (category: string) => {
    setSelectedCategory(category)
    setCurrentPage(1)
    setOpenDropdown(null)
  }

  const handleSortChange = (option: SortOption) => {
    setSortOption(option)
    setCurrentPage(1)
    setOpenDropdown(null)
  }

  const handleSearchChange = (keyword: string) => {
    setSearchKeyword(keyword)
    setCurrentPage(1)
  }

  const selectedCategoryLabel = selectedCategory === 'all' ? '全部分類' : selectedCategory

  return (
    <section className="section-stack">
      <div className="section-heading">
        <h1>耳機選購</h1>
        <p className="section-copy">從降噪耳罩、真無線到監聽耳機，挑選最適合你的聲音風格。</p>
      </div>

      {productsStatus === 'loading' ? <LoadingState title="載入耳機商品中" description="正在整理最新耳機清單。" /> : null}
      {productsStatus === 'failed' && error ? (
        <ErrorState message={error} onAction={() => void dispatch(fetchProducts())} />
      ) : null}
      {productsStatus === 'succeeded' ? (
        <>
          <div className="products-toolbar ui-card">
            <div
              className="field products-custom-select"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setOpenDropdown(null)
                }
              }}
            >
              <span>分類</span>
              <button
                aria-controls="products-category-filter"
                aria-expanded={openDropdown === 'category'}
                className="products-custom-select__button"
                id="products-category-filter"
                onClick={() =>
                  setOpenDropdown((currentDropdown) =>
                    currentDropdown === 'category' ? null : 'category',
                  )
                }
                type="button"
              >
                <span>{selectedCategoryLabel}</span>
                <i className="bi bi-chevron-down" aria-hidden="true" />
              </button>

              {openDropdown === 'category' ? (
                <div
                  aria-labelledby="products-category-filter"
                  className="products-custom-select__menu"
                  role="listbox"
                >
                  <button
                    aria-selected={selectedCategory === 'all'}
                    className="products-custom-select__option"
                    onClick={() => handleCategoryChange('all')}
                    role="option"
                    type="button"
                  >
                    全部分類
                  </button>

                {categories.map((category) => (
                  <button
                    aria-selected={selectedCategory === category}
                    className="products-custom-select__option"
                    key={category}
                    onClick={() => handleCategoryChange(category)}
                    role="option"
                    type="button"
                  >
                    {category}
                  </button>
                ))}
                </div>
              ) : null}
            </div>

            <div
              className="field products-custom-select"
              onBlur={(event) => {
                if (!event.currentTarget.contains(event.relatedTarget)) {
                  setOpenDropdown(null)
                }
              }}
            >
              <span>排序</span>
              <button
                aria-controls="products-sort-option"
                aria-expanded={openDropdown === 'sort'}
                className="products-custom-select__button"
                id="products-sort-option"
                onClick={() =>
                  setOpenDropdown((currentDropdown) =>
                    currentDropdown === 'sort' ? null : 'sort',
                  )
                }
                type="button"
              >
                <span>{sortOptionLabels[sortOption]}</span>
                <i className="bi bi-chevron-down" aria-hidden="true" />
              </button>

              {openDropdown === 'sort' ? (
                <div
                  aria-labelledby="products-sort-option"
                  className="products-custom-select__menu"
                  role="listbox"
                >
                  {sortOptions.map(([value, label]) => (
                    <button
                      aria-selected={sortOption === value}
                      className="products-custom-select__option"
                      key={value}
                      onClick={() => handleSortChange(value)}
                      role="option"
                      type="button"
                    >
                      {label}
                    </button>
                  ))}
                </div>
              ) : null}
            </div>

            <label className="field products-search-field" htmlFor="products-search-keyword">
              <span>搜尋</span>
              <input
                id="products-search-keyword"
                onChange={(event) => handleSearchChange(event.target.value)}
                placeholder="輸入商品名稱或描述"
                type="search"
                value={searchKeyword}
              />
            </label>
          </div>

          <div className="product-grid products-results" ref={productGridRef}>
            {paginatedItems.length > 0 ? (
              paginatedItems.map((product) => <ProductCard key={product.id} product={product} />)
            ) : (
              <p className="empty-state products-empty-state">找不到符合條件的商品</p>
            )}
          </div>

          {paginatedItems.length > 0 && totalPages > 1 ? (
            <Pagination
              currentPage={resolvedCurrentPage}
              onPageChange={handlePageChange}
              totalPages={totalPages}
            />
          ) : null}
        </>
      ) : null}
    </section>
  )
}

export default ProductsPage
