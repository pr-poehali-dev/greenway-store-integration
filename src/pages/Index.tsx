import { useState, useMemo } from 'react';
import Icon from '@/components/ui/icon';
import { Button } from '@/components/ui/button';
import { Card } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Slider } from '@/components/ui/slider';
import { Checkbox } from '@/components/ui/checkbox';

const HERO_IMG = 'https://cdn.poehali.dev/projects/5106c28a-a11b-4fed-9e42-b02f4ac46b89/files/d417d359-ea1d-4005-af52-e4e1ae4bade4.jpg';

const CATEGORIES = ['Здоровье', 'Красота', 'Дом', 'Питание'] as const;
const FEATURES = ['Без химии', 'Веган', 'Эко-упаковка', 'Гипоаллергенно'] as const;

type Product = {
  id: number;
  name: string;
  desc: string;
  price: number;
  category: string;
  features: string[];
  emoji: string;
};

const PRODUCTS: Product[] = [
  { id: 1, name: 'Фиточай «Баланс»', desc: 'Травяной сбор для очищения и лёгкости каждый день.', price: 890, category: 'Здоровье', features: ['Без химии', 'Веган'], emoji: '🍵' },
  { id: 2, name: 'Крем-баттер для тела', desc: 'Питание и увлажнение на растительных маслах.', price: 1290, category: 'Красота', features: ['Без химии', 'Гипоаллергенно'], emoji: '🧴' },
  { id: 3, name: 'Эко-гель для посуды', desc: 'Отмывает жир и безопасен для кожи рук и природы.', price: 640, category: 'Дом', features: ['Эко-упаковка', 'Веган'], emoji: '🫧' },
  { id: 4, name: 'Протеин растительный', desc: 'Гороховый белок для энергии и восстановления.', price: 2190, category: 'Питание', features: ['Веган', 'Без химии'], emoji: '🌱' },
  { id: 5, name: 'Сыворотка для лица', desc: 'Сияние кожи с экстрактом зелёного чая.', price: 1650, category: 'Красота', features: ['Гипоаллергенно', 'Эко-упаковка'], emoji: '💧' },
  { id: 6, name: 'Витамин D3 + K2', desc: 'Поддержка иммунитета и крепких костей.', price: 1120, category: 'Здоровье', features: ['Веган'], emoji: '☀️' },
  { id: 7, name: 'Стиральный порошок эко', desc: 'Бережная стирка без фосфатов и отдушек.', price: 780, category: 'Дом', features: ['Эко-упаковка', 'Без химии'], emoji: '🧺' },
  { id: 8, name: 'Смесь суперфудов', desc: 'Спирулина, ягоды годжи и семена чиа.', price: 1480, category: 'Питание', features: ['Веган', 'Гипоаллергенно'], emoji: '🫐' },
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

  const toggle = (list: string[], set: (v: string[]) => void, val: string) =>
    set(list.includes(val) ? list.filter((x) => x !== val) : [...list, val]);

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
            <a href="#blog" className="transition-colors hover:text-primary">Блог</a>
            <a href="#contacts" className="transition-colors hover:text-primary">Контакты</a>
          </nav>
          <Button size="sm" className="rounded-full">
            <Icon name="ShoppingBag" size={16} />
            Корзина
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
              alt="Натуральные эко-товары Greenway"
              className="relative aspect-square w-full rounded-[2rem] object-cover shadow-2xl"
            />
            <div className="absolute bottom-5 left-5 flex items-center gap-3 rounded-2xl bg-background/90 px-4 py-3 shadow-lg backdrop-blur">
              <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/10 text-primary">
                <Icon name="ShieldCheck" size={20} />
              </span>
              <div className="text-sm">
                <div className="font-semibold">Сертифицировано</div>
                <div className="text-muted-foreground">Эко-стандарт качества</div>
              </div>
            </div>
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
                      <div className="mt-3 flex flex-wrap gap-1.5">
                        {p.features.map((f) => (
                          <span key={f} className="rounded-full bg-accent/20 px-2.5 py-0.5 text-xs text-primary">{f}</span>
                        ))}
                      </div>
                      <div className="mt-4 flex items-center justify-between">
                        <span className="font-display text-2xl font-bold text-primary">{p.price} ₽</span>
                        <Button size="sm" className="rounded-full">
                          <Icon name="Plus" size={16} />
                          В корзину
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

      {/* Contacts */}
      <section id="contacts" className="container py-16 md:py-24">
        <div className="grid gap-10 rounded-3xl bg-primary p-8 text-primary-foreground md:grid-cols-2 md:p-14">
          <div>
            <h2 className="font-display text-4xl font-bold md:text-5xl">Свяжитесь с нами</h2>
            <p className="mt-4 text-primary-foreground/80">
              Есть вопросы о товарах или доставке? Мы всегда на связи и рады помочь.
            </p>
            <div className="mt-8 space-y-4">
              {[
                ['Mail', 'hello@greenway.ru'],
                ['Phone', '+7 (800) 000-00-00'],
                ['MapPin', 'Москва, ул. Зелёная, 1'],
              ].map(([icon, text]) => (
                <div key={text} className="flex items-center gap-3">
                  <span className="flex h-10 w-10 items-center justify-center rounded-full bg-primary-foreground/10">
                    <Icon name={icon} size={18} />
                  </span>
                  {text}
                </div>
              ))}
            </div>
            <div className="mt-8 flex gap-3">
              {['Instagram', 'Send', 'Music'].map((i) => (
                <a key={i} href="#" className="flex h-11 w-11 items-center justify-center rounded-full bg-primary-foreground/10 transition-colors hover:bg-primary-foreground/20">
                  <Icon name={i} size={18} />
                </a>
              ))}
            </div>
          </div>
          <div className="rounded-2xl bg-primary-foreground/10 p-8">
            <h3 className="font-display text-2xl font-semibold">Напишите нам</h3>
            <div className="mt-5 space-y-4">
              <input placeholder="Ваше имя" className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
              <input placeholder="Email" className="w-full rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
              <textarea placeholder="Сообщение" rows={4} className="w-full resize-none rounded-xl border border-primary-foreground/20 bg-primary-foreground/5 px-4 py-3 text-sm placeholder:text-primary-foreground/50 focus:outline-none focus:ring-2 focus:ring-accent" />
              <Button size="lg" className="w-full rounded-full bg-accent text-accent-foreground hover:bg-accent/90">
                Отправить сообщение
              </Button>
            </div>
          </div>
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
    </div>
  );
};

export default Index;
