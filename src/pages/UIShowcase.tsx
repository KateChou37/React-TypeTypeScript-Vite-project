import { Badge } from '../components/ui/Badge'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { colorTokens, figmaMapping, radiusTokens, shadowTokens, spacingTokens } from '../design-system'

function UIShowcase() {
  return (
    <section className="section-stack">
      <div className="section-heading text-center">
        <Badge variant="secondary" className="mx-auto">
          UI Showcase
        </Badge>
        <h1>Bootstrap 5 Esports UI System</h1>
        <p className="section-copy">
          展示目前專案的 design tokens、元件變體、互動狀態與 Figma 對照方式。
        </p>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <Card>
            <h2 className="section-title mb-3">Buttons</h2>
            <div className="d-flex flex-wrap gap-3">
              <Button>Primary</Button>
              <Button variant="secondary">Secondary</Button>
              <Button variant="ghost">Ghost</Button>
              <Button disabled>Disabled</Button>
            </div>
          </Card>
        </div>
        <div className="col-lg-6">
          <Card>
            <h2 className="section-title mb-3">Badges</h2>
            <div className="d-flex flex-wrap gap-3">
              <Badge>Primary</Badge>
              <Badge variant="secondary">Secondary</Badge>
              <Badge variant="accent">Accent</Badge>
            </div>
          </Card>
        </div>
        <div className="col-lg-6">
          <Card>
            <h2 className="section-title mb-3">Inputs</h2>
            <div className="d-grid gap-3">
              <Input id="showcase-email" label="Email" placeholder="輸入 Email" />
              <Input
                id="showcase-error"
                error="這是錯誤狀態示範"
                label="錯誤輸入框"
                placeholder="輸入內容"
              />
            </div>
          </Card>
        </div>
        <div className="col-lg-6">
          <Card>
            <h2 className="section-title mb-3">Card Hover</h2>
            <p className="section-copy mb-0">
              卡片元件已接入 Framer Motion，滑鼠移入時會有抬升與 glow 效果。
            </p>
          </Card>
        </div>
      </div>

      <div className="row g-4">
        <div className="col-lg-6">
          <Card>
            <h2 className="section-title mb-3">Figma Mapping</h2>
            <div className="table-responsive">
              <table className="table table-dark table-borderless align-middle mb-0">
                <thead>
                  <tr>
                    <th>Token</th>
                    <th>Code</th>
                  </tr>
                </thead>
                <tbody>
                  {Object.entries(figmaMapping).map(([key, value]) => (
                    <tr key={key}>
                      <td>{key}</td>
                      <td>{value}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>
        </div>
        <div className="col-lg-6">
          <Card>
            <h2 className="section-title mb-3">Token Catalog</h2>
            <div className="showcase-token-grid">
              {[colorTokens, spacingTokens, radiusTokens, shadowTokens].map((group, index) => (
                <div className="showcase-token-group" key={index}>
                  {Object.entries(group).map(([key, value]) => (
                    <div className="showcase-token-item" key={key}>
                      <span>{key}</span>
                      <strong>{value}</strong>
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </Card>
        </div>
      </div>
    </section>
  )
}

export default UIShowcase
