import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const HERO_IMG = 'https://cdn.poehali.dev/projects/5106c28a-a11b-4fed-9e42-b02f4ac46b89/bucket/517474ad-7621-4a6a-930c-06bececd2073.png';
const SHOP_URL = 'https://greenwayglobal.com/shop?gw=v1yaMn6Ip4';

const CATEGORIES = ['Уборка', 'Красота', 'Здоровье', 'Питание'] as const;
const FEATURES = ['Без химии', 'Веган', 'Эко-упаковка', 'Гипоаллергенно'] as const;

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  article: string;
  category: string;
  features: string[];
  emoji: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'BioTrim Laundry Gel', desc: 'Концентрированный гель для стирки на растительной основе. Бережная стирка без фосфатов.', price: 990, article: 'GW-01001', category: 'Уборка', features: ['Без химии', 'Веган', 'Эко-упаковка'], emoji: '🧴' },
  { id: 2, name: 'BioSoap Natural Dish Soap', desc: 'Натуральное средство для мытья посуды. Отмывает жир и безопасно для кожи рук.', price: 640, article: 'GW-01002', category: 'Уборка', features: ['Без химии', 'Гипоаллергенно'], emoji: '🫧' },
  { id: 3, name: 'Eco Soda for Home', desc: 'Универсальная сода для дома: чистит, удаляет запахи и смягчает воду.', price: 380, article: 'GW-01003', category: 'Уборка', features: ['Эко-упаковка', 'Веган'], emoji: '🧂' },
  { id: 4, name: 'Home G9 Eco Detergent', desc: 'Универсальное чистящее средство на минералах. Мощная чистота без компромиссов.', price: 1290, article: 'GW-01004', category: 'Уборка', features: ['Без химии', 'Эко-упаковка'], emoji: '🧼' },
  { id: 5, name: 'Nice Eco Soap', desc: 'Натуральное твёрдое мыло для рук и тела с растительными маслами.', price: 320, article: 'GW-01005', category: 'Красота', features: ['Без химии', 'Гипоаллергенно', 'Веган'], emoji: '🧼' },
  { id: 6, name: 'Крем-баттер для тела', desc: 'Питание и увлажнение кожи на растительных маслах. Мягкость на весь день.', price: 1290, article: 'GW-02001', category: 'Красота', features: ['Без химии', 'Гипоаллергенно'], emoji: '🧴' },
  { id: 7, name: 'Фиточай «Баланс»', desc: 'Травяной сбор для очищения и лёгкости каждый день.', price: 890, article: 'GW-03001', category: 'Здоровье', features: ['Без химии', 'Веган'], emoji: '🍵' },
  { id: 8, name: 'Смесь суперфудов', desc: 'Спирулина, ягоды годжи и семена чиа для энергии и иммунитета.', price: 1480, article: 'GW-04001', category: 'Питание', features: ['Веган', 'Гипоаллергенно'], emoji: '🫐' },
];

const BLOG = [
  { tag: 'Здоровье', title: '5 привычек для чистого тела', read: '4 мин', emoji: '🌿' },
  { tag: 'Дом', title: 'Как перейти на эко-быт без стресса', read: '6 мин', emoji: '🏡' },
  { tag: 'Красота', title: 'Растительные масла в уходе за кожей', read: '5 мин', emoji: '🌸' },
];

const Index = () => {
  const [activeCat, setActiveCat] = useState<string[]>([]);
  const [activeFeat, setActiveFeat] = useState<string[]>([]);
  const [maxPrice, setMaxPrice] = useState(2500);
  const [copied, setCopied] = useState<string | null>(null);

  const toggle = (list: string[], set: (v: string[]) => void, val: string) =>
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

  const copyArticle = (article: string) => {
    navigator.clipboard?.writeText(article);
    setCopied(article);
    setTimeout(() => setCopied(null), 1500);
  };

  const filtered = useMemo(
    () =>
      PRODUCTS.filter(
        (p) =>
          (activeCat.length === 0 || activeCat.includes(p.category)) &&
          (activeFeat.length === 0 || activeFeat.every((f) => p.features.includes(f))) &&
          p.price <= maxPrice
      ),
    [activeCat, activeFeat, maxPrice]
  );

  const scrollToCatalog = () =>
    document.getElementById('catalog')?.scrollIntoView({ behavior: 'smooth' });

  return (
    <div className="min-h-screen bg-background leaf-texture">
      {/* Header */}
      <header className="sticky top-0 z-50 border-b border-border/60 bg-background/85 backdrop-blur-md">
        <div className="container flex h-16 items-center justify-between">
          <a href="#" className="flex items-center gap-2">
            <span className="flex h-9 w-9 items-center justify-center rounded-full bg-primary text-primary-foreground">
              <Icon name="Leaf" size={18} />
            </span>
            <span className="font-display text-2xl font-bold text-primary">Greenway</span>
          </a>
          <nav className="hidden items-center gap-8 text-sm font-medium md:flex">
            <a href="#" className="transition-colors hover:text-primary">Главная</a>
            <a href="#catalog" className="transition-colors hover:text-primary">Каталог</a>
            <a href="#delivery" className="transition-colors hover:text-primary">Доставка</a>
            <a href="#blog" className="transition-colors hover:text-primary">Блог</a>
            <a href="#contacts" className="transition-colors hover:text-primary">Контакты</a>
          </nav>
          <Button size="sm" className="rounded-full" asChild>
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="ShoppingBag" size={16} />
              В магазин
            </a>
          </Button>
        </div>
      </header>

      {/* Hero */}
      <section className="relative overflow-hidden">
        <div className="container grid items-center gap-10 py-16 md:grid-cols-2 md:py-24">
          <div className="animate-fade-up">
            <Badge className="mb-5 rounded-full bg-accent px-4 py-1.5 text-accent-foreground hover:bg-accent">
              🌍 Забота о вас и планете
            </Badge>
            <h1 className="font-display text-5xl font-bold leading-[1.05] text-primary md:text-7xl">
              Натуральные товары для жизни в гармонии
            </h1>
            <p className="mt-6 max-w-md text-lg text-muted-foreground">
              Greenway — продукты для здоровья, красоты и дома из природных ингредиентов. Без лишней химии, с любовью к природе.
            </p>
            <div className="mt-8 flex flex-wrap gap-3">
              <Button size="lg" className="rounded-full" onClick={scrollToCatalog}>
                Открыть каталог
                <Icon name="ArrowRight" size={18} />
              </Button>
              <Button size="lg" variant="outline" className="rounded-full border-primary/30" asChild>
                <a href="#blog">Читать блог</a>
              </Button>
            </div>
            <div className="mt-10 flex gap-8">
              {[['100%', 'натуральный состав'], ['4.9★', 'средняя оценка'], ['12k+', 'счастливых клиентов']].map(([n, l]) => (
                <div key={l}>
                  <div className="font-display text-3xl font-bold text-primary">{n}</div>
                  <div className="text-sm text-muted-foreground">{l}</div>
                </div>
              ))}
            </div>
          </div>
          <div className="relative animate-fade-up" style={{ animationDelay: '0.15s' }}>
            <div className="absolute -inset-4 rounded-[2rem] bg-accent/20 blur-2xl" />
            <img
              src={HERO_IMG}
              alt="Greenway — выбор в пользу будущего: до и после"
              className="relative w-full rounded-[2rem] object-cover shadow-2xl"
            />
          </div>
        </div>
      </section>

      {/* Catalog */}
      <section id="catalog" className="container py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl font-bold text-primary md:text-5xl">Каталог товаров</h2>
          <p className="mt-3 text-muted-foreground">Подберите то, что подходит именно вам</p>
        </div>

        <div className="grid gap-8 lg:grid-cols-[280px_1fr]">
          {/* Filters */}
          <aside className="h-fit rounded-2xl border border-border bg-card p-6 lg:sticky lg:top-24">
            <div className="mb-6 flex items-center gap-2 font-display text-2xl font-semibold text-primary">
              <Icon name="SlidersHorizontal" size={20} />
              Фильтры
            </div>

            <div className="mb-6">
              <div className="mb-3 text-sm font-semibold">Категории</div>
              <div className="space-y-2.5">
                {CATEGORIES.map((c) => (
                  <label key={c} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox checked={activeCat.includes(c)} onCheckedChange={() => toggle(activeCat, setActiveCat, c)} />
                    {c}
                  </label>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <div className="mb-3 text-sm font-semibold">Характеристики</div>
              <div className="space-y-2.5">
                {FEATURES.map((f) => (
                  <label key={f} className="flex cursor-pointer items-center gap-2.5 text-sm">
                    <Checkbox checked={activeFeat.includes(f)} onCheckedChange={() => toggle(activeFeat, setActiveFeat, f)} />
                    {f}
                  </label>
                ))}
              </div>
            </div>

            <div>
              <div className="mb-3 flex justify-between text-sm font-semibold">
                <span>Цена до</span>
                <span className="text-primary">{maxPrice} ₽</span>
              </div>
              <Slider value={[maxPrice]} onValueChange={(v) => setMaxPrice(v[0])} min={500} max={2500} step={50} />
            </div>

            {(activeCat.length > 0 || activeFeat.length > 0 || maxPrice < 2500) && (
              <Button
                variant="ghost"
                size="sm"
                className="mt-6 w-full text-muted-foreground"
                onClick={() => { setActiveCat([]); setActiveFeat([]); setMaxPrice(2500); }}
              >
                <Icon name="X" size={14} />
                Сбросить
              </Button>
            )}
          </aside>

          {/* Grid */}
          <div>
            <div className="mb-5 text-sm text-muted-foreground">Найдено товаров: {filtered.length}</div>
            {filtered.length === 0 ? (
              <div className="flex flex-col items-center justify-center rounded-2xl border border-dashed border-border py-20 text-center text-muted-foreground">
                <Icon name="SearchX" size={40} className="mb-3 opacity-50" />
                Ничего не найдено. Измените фильтры.
              </div>
            ) : (
              <div className="grid gap-6 sm:grid-cols-2 xl:grid-cols-3">
                {filtered.map((p) => (
                  <Card key={p.id} className="group flex flex-col overflow-hidden rounded-2xl border-border hover-scale">
                    <div className="flex aspect-square items-center justify-center bg-secondary text-7xl">
                      {p.emoji}
                    </div>
                    <div className="flex flex-1 flex-col p-5">
                      <Badge variant="secondary" className="mb-2 w-fit rounded-full text-xs">{p.category}</Badge>
                      <h3 className="font-display text-2xl font-semibold leading-tight text-primary">{p.name}</h3>
                      <p className="mt-1.5 flex-1 text-sm text-muted-foreground">{p.desc}</p>

                      <button
                        onClick={() => copyArticle(p.article)}
                        className="mt-3 flex items-center gap-2 self-start rounded-lg border border-dashed border-primary/30 bg-muted px-2.5 py-1.5 text-xs font-medium text-primary transition-colors hover:bg-primary/5"
                      >
                        <Icon name="Barcode" size={14} />
                        Артикул: {p.article}
                        <Icon name={copied === p.article ? 'Check' : 'Copy'} size={13} className={copied === p.article ? 'text-green-600' : 'opacity-60'} />
                      </button>

                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.features.map((f) => (
                          <span key={f} className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs text-primary">{f}</span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-display text-2xl font-bold text-primary">{p.price} ₽</span>
                        <Button size="sm" className="rounded-full" asChild>
                          <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                            <Icon name="ExternalLink" size={16} />
                            Купить
                          </a>
                        </Button>
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Blog */}
      <section id="blog" className="bg-secondary/50 py-16 md:py-24">
        <div className="container">
          <div className="mb-10 text-center">
            <h2 className="font-display text-4xl font-bold text-primary md:text-5xl">Блог о здоровой жизни</h2>
            <p className="mt-3 text-muted-foreground">Полезные статьи об экологии и заботе о себе</p>
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {BLOG.map((b) => (
              <Card key={b.title} className="group cursor-pointer overflow-hidden rounded-2xl border-border hover-scale">
                <div className="flex h-40 items-center justify-center bg-primary/5 text-6xl">{b.emoji}</div>
                <div className="p-6">
                  <div className="mb-2 flex items-center gap-3 text-xs text-muted-foreground">
                    <Badge variant="secondary" className="rounded-full">{b.tag}</Badge>
                    <span className="flex items-center gap-1"><Icon name="Clock" size={12} />{b.read}</span>
                  </div>
                  <h3 className="font-display text-2xl font-semibold text-primary">{b.title}</h3>
                  <span className="mt-3 flex items-center gap-1 text-sm font-medium text-primary">
                    Читать <Icon name="ArrowRight" size={14} className="transition-transform group-hover:translate-x-1" />
                  </span>
                </div>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Delivery */}
      <section id="delivery" className="container py-16 md:py-24">
        <div className="mb-10 text-center">
          <h2 className="font-display text-4xl font-bold text-primary md:text-5xl">Доставка и заказ</h2>
          <p className="mt-3 text-muted-foreground">Заказываешь онлайн — получаешь у себя в городе</p>
        </div>

        <div className="grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-border p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon name="Package" size={20} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-primary">Заказ до 3000 ₽</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                Доставка Почтой России
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                Доставку оплачиваешь при получении
              </li>
            </ul>
          </Card>

          <Card className="relative overflow-hidden rounded-2xl border-accent/40 p-7">
            <Badge className="absolute right-5 top-5 rounded-full bg-accent text-accent-foreground hover:bg-accent">Выгоднее</Badge>
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-accent/20 text-primary">
                <Icon name="Gift" size={20} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-primary">Заказ от 3000 ₽</h3>
            </div>
            <ul className="space-y-2.5 text-sm text-muted-foreground">
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                Почта России
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                Курьер до двери
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                Любой ПВЗ, в том числе «Пятёрочка»
              </li>
              <li className="flex items-start gap-2">
                <Icon name="Check" size={16} className="mt-0.5 shrink-0 text-primary" />
                Доставка включена в стоимость
              </li>
            </ul>
          </Card>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <Card className="rounded-2xl border-border p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon name="ListChecks" size={20} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-primary">Как оформить заказ</h3>
            </div>
            <ol className="space-y-2.5 text-sm text-muted-foreground">
              {[
                'Заходи в магазин по ссылке ниже',
                'Выбирай товары и добавляй в корзину',
                'При оформлении указывай точный адрес — улица, дом, квартира, индекс',
                'Магазин работает как обычный маркетплейс — заказываешь онлайн, получаешь у себя в городе',
              ].map((step, i) => (
                <li key={step} className="flex items-start gap-2.5">
                  <span className="flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary/10 text-xs font-semibold text-primary">{i + 1}</span>
                  {step}
                </li>
              ))}
            </ol>
            <Button className="mt-5 w-full rounded-full" asChild>
              <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
                Оформить заказ
                <Icon name="ArrowRight" size={16} />
              </a>
            </Button>
          </Card>

          <Card className="rounded-2xl border-border p-7">
            <div className="mb-4 flex items-center gap-3">
              <span className="flex h-11 w-11 items-center justify-center rounded-full bg-secondary text-primary">
                <Icon name="CreditCard" size={20} />
              </span>
              <h3 className="font-display text-2xl font-semibold text-primary">Оплата</h3>
            </div>
            <p className="text-sm text-muted-foreground">Банковской картой онлайн при оформлении заказа.</p>

            <div className="mt-6 flex items-start gap-3 rounded-xl bg-secondary/60 p-4 text-sm">
              <Icon name="AlertTriangle" size={18} className="mt-0.5 shrink-0 text-accent-foreground" />
              <span className="text-muted-foreground">
                Проверяй правильность адреса перед отправкой заказа — неверный адрес может привести к задержке или потере посылки.
              </span>
            </div>

            <a
              href="https://t.me/Lybana21"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-6 flex items-center gap-3 rounded-xl border border-border p-4 transition-colors hover:bg-secondary/60"
            >
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name="Send" size={18} />
              </span>
              <div className="text-sm">
                <div className="font-semibold">Вопросы по доставке</div>
                <div className="text-muted-foreground">Написать в Telegram: @Lybana21</div>
              </div>
            </a>
          </Card>
        </div>
      </section>

      {/* Shop CTA */}
      <section className="container pb-6">
        <div className="rounded-3xl border border-border bg-card p-8 text-center md:p-12">
          <span className="mx-auto mb-5 flex h-14 w-14 items-center justify-center rounded-full bg-secondary text-primary">
            <Icon name="Store" size={26} />
          </span>
          <h2 className="font-display text-3xl font-bold text-primary md:text-4xl">Готовы выбрать товар?</h2>
          <p className="mx-auto mt-3 max-w-xl text-muted-foreground">
            Переходите в официальный магазин Greenway, выбирайте товары и заказывайте самостоятельно.
            Если возникнут вопросы — пишите мне в WhatsApp, всегда помогу разобраться.
          </p>
          <Button size="lg" className="mt-6 rounded-full px-8" asChild>
            <a href={SHOP_URL} target="_blank" rel="noopener noreferrer">
              <Icon name="ExternalLink" size={18} />
              Перейти в официальный магазин
            </a>
          </Button>

          <div className="mx-auto mt-8 flex max-w-xl items-start gap-3 rounded-2xl bg-accent/10 p-5 text-left">
            <Icon name="AlertTriangle" size={20} className="mt-0.5 shrink-0 text-primary" />
            <p className="text-sm text-muted-foreground">
              <span className="font-semibold text-primary">Важно перед заказом:</span> внимательно читайте описание и способ применения каждого товара на странице официального магазина.
              Некоторые продукты, например витамины и БАДы, нужно принимать по назначению врача — убедитесь, что они действительно вам нужны.
              Избыток витаминов и активных веществ может быть вреден так же, как и их нехватка.
            </p>
          </div>
        </div>
      </section>

      {/* Contacts */}
      <section id="contacts" className="container py-16 md:py-24">
        <div className="flex flex-col items-center gap-8 rounded-3xl bg-primary p-8 text-center text-primary-foreground md:p-16">
          <span className="flex h-16 w-16 items-center justify-center rounded-full bg-primary-foreground/10">
            <Icon name="MessageCircle" size={30} />
          </span>
          <div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Свяжитесь с нами</h2>
            <p className="mx-auto mt-4 max-w-md text-primary-foreground/80">
              Есть вопросы о товарах или доставке? Напишите нам в WhatsApp — ответим быстро и с удовольствием поможем.
            </p>
          </div>
          <Button size="lg" className="rounded-full bg-accent px-8 text-accent-foreground hover:bg-accent/90" asChild>
            <a href="https://wa.me/79965900246" target="_blank" rel="noopener noreferrer">
              <Icon name="Phone" size={18} />
              8 996 590-02-46
            </a>
          </Button>
        </div>
      </section>

      {/* Footer */}
      <footer className="border-t border-border bg-secondary/40 py-10">
        <div className="container flex flex-col items-center justify-between gap-4 text-sm text-muted-foreground md:flex-row">
          <div className="flex items-center gap-2 font-display text-xl font-bold text-primary">
            <Icon name="Leaf" size={18} /> Greenway
          </div>
          <span>© 2026 Greenway. Натуральные товары для жизни.</span>
        </div>
      </footer>

      {/* Floating WhatsApp button */}
      <a
        href="https://wa.me/79965900246"
        target="_blank"
        rel="noopener noreferrer"
        aria-label="Написать в WhatsApp"
        className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-[#25D366] text-white shadow-xl transition-transform hover:scale-110"
      >
        <Icon name="MessageCircle" size={28} />
      </a>
    </div>
  );
};

export default Index;