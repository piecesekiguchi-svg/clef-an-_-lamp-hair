import React, { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { cn } from '@/src/lib/utils';
import { ChevronRight, Star, MapPin, Phone, Clock, Calendar, CheckCircle2, AlertCircle, X, Instagram } from 'lucide-react';

// --- Components ---

const Section = ({ className, children, id }: { className?: string, children: React.ReactNode, id?: string }) => (
  <section id={id} className={cn("py-16 md:py-24 px-6 md:px-12 max-w-7xl mx-auto", className)}>
    {children}
  </section>
);

const Button = ({ children, className, variant = 'primary', ...props }: React.ButtonHTMLAttributes<HTMLButtonElement> & { variant?: 'primary' | 'secondary' | 'outline' }) => {
  const variants = {
    primary: "bg-[#8c8279] text-white hover:bg-[#7a7067] shadow-sm", // Muted warm gray-brown
    secondary: "bg-[#e6e2de] text-[#5c544e] hover:bg-[#dcd8d4]", // Very light beige
    outline: "border border-[#a89f91] text-[#5c544e] hover:bg-[#fcfbf9] hover:text-[#4a423e]" // Delicate border
  };
  
  return (
    <button 
      className={cn(
        "px-10 py-4 rounded-sm font-light transition-all duration-500 flex items-center justify-center gap-3 text-base tracking-widest hover:tracking-[0.15em]", // Slower transition, wider tracking
        variants[variant],
        className
      )}
      {...props}
    >
      {children}
      <ChevronRight className="w-4 h-4 opacity-70" />
    </button>
  );
};

interface FadeInProps {
  children: React.ReactNode;
  delay?: number;
  className?: string;
}

const FadeIn: React.FC<FadeInProps> = ({ children, delay = 0, className }) => (
  <motion.div
    className={className}
    initial={{ opacity: 0, y: 20 }}
    whileInView={{ opacity: 1, y: 0 }}
    viewport={{ once: true, margin: "-100px" }}
    transition={{ duration: 0.6, delay }}
  >
    {children}
  </motion.div>
);

const Card = ({ children, className }: { children: React.ReactNode, className?: string }) => (
  <div className={cn("bg-white p-10 rounded-sm shadow-[0_2px_15px_-3px_rgba(0,0,0,0.03)] border border-[#f0efed]", className)}>
    {children}
  </div>
);

const StickyFooter = () => (
  <div className="fixed bottom-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-md border-t border-[#e8e6e3] shadow-[0_-4px_20px_rgba(0,0,0,0.03)]">
    <div className="max-w-3xl mx-auto px-4 py-3 md:py-4">
      <div className="grid grid-cols-3 gap-3">
        <a 
          href="https://lin.ee/WDv6EjZ" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 bg-[#8c8279] text-white rounded-sm hover:bg-[#7a7067] transition-colors shadow-sm"
        >
          <span className="text-[10px] opacity-90 mb-0.5 tracking-widest">富谷店</span>
          <span className="text-xs md:text-sm font-medium tracking-wide">公式LINE</span>
        </a>
        <a 
          href="https://lin.ee/19WgSxSB" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 bg-[#8c8279] text-white rounded-sm hover:bg-[#7a7067] transition-colors shadow-sm"
        >
          <span className="text-[10px] opacity-90 mb-0.5 tracking-widest">泉中央店</span>
          <span className="text-xs md:text-sm font-medium tracking-wide">公式LINE</span>
        </a>
        <a 
          href="https://www.instagram.com/clefan_tomiya/" 
          target="_blank" 
          rel="noopener noreferrer"
          className="flex flex-col items-center justify-center py-2.5 bg-[#4a423e] text-white rounded-sm hover:bg-[#3a322e] transition-colors shadow-sm"
        >
          <span className="text-[10px] opacity-90 mb-0.5 tracking-widest">Official</span>
          <div className="flex items-center gap-1">
            <Instagram className="w-3 h-3 md:w-4 md:h-4" />
            <span className="text-xs md:text-sm font-medium tracking-wide">Instagram</span>
          </div>
        </a>
      </div>
    </div>
  </div>
);

const StoreModal = ({ isOpen, onClose }: { isOpen: boolean, onClose: () => void }) => {
  const stores = [
    { name: 'Clef-an', url: 'https://qij22t.b-merit.jp/vixwk4/web/' },
    { name: 'Lamp', url: 'https://qij22t.b-merit.jp/9yihzi/web/' }
  ];

  return (
    <AnimatePresence>
      {isOpen && (
        <div className="fixed inset-0 z-[100] flex items-center justify-center p-6">
          <motion.div 
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            className="absolute inset-0 bg-black/40 backdrop-blur-sm"
          />
          <motion.div 
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="relative bg-[#fcfbf9] w-full max-w-md p-10 md:p-12 rounded-sm shadow-2xl border border-[#f0efed] text-center"
          >
            <button 
              onClick={onClose}
              className="absolute top-4 right-4 text-[#a89f91] hover:text-[#4a423e] transition-colors"
            >
              <X className="w-6 h-6" />
            </button>
            
            <h2 className="text-xl md:text-2xl font-serif text-[#4a423e] mb-10 tracking-widest">
              ご希望の店舗をお選びください
            </h2>
            
            <div className="space-y-6">
              {stores.map((store) => (
                <a 
                  key={store.name}
                  href={store.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block w-full py-5 px-8 border border-[#a89f91] text-[#5c544e] hover:bg-[#8c8279] hover:text-white hover:border-[#8c8279] transition-all duration-500 tracking-[0.2em] font-light text-lg rounded-sm"
                >
                  {store.name}
                </a>
              ))}
            </div>
            
            <p className="mt-10 text-[10px] text-[#a89f91] tracking-widest leading-relaxed">
              ※外部の予約システム（b-merit）へ移動します
            </p>
          </motion.div>
        </div>
      )}
    </AnimatePresence>
  );
};

// --- Main App ---

export default function App() {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const openModal = () => setIsModalOpen(true);
  const closeModal = () => setIsModalOpen(false);

  return (
    <div className="min-h-screen overflow-x-hidden">
      <StoreModal isOpen={isModalOpen} onClose={closeModal} />
      {/* ① ファーストビュー (First View) */}
      <header className="relative h-screen min-h-[700px] flex items-center justify-center overflow-hidden bg-[#fcfbf9]">
        <div className="absolute inset-0 z-0">
          <img 
            src="https://lh3.googleusercontent.com/d/1a6aWdsZQu56GLU-mLHBHa3gD_QaExvy_" 
            alt="Clef-an Salon Interior" 
            className="w-full h-full object-cover opacity-90 brightness-105 saturate-[0.7]" // Maintaining the soft tone
            referrerPolicy="no-referrer"
            loading="eager"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-white/20" />
        </div>
        
        <div className="relative z-10 text-center text-[#4a423e] px-6 max-w-4xl mx-auto mt-12">
          <div className="bg-[#fcfbf9]/90 p-8 md:p-16 rounded-sm border border-white/20 shadow-[0_8px_32px_rgba(0,0,0,0.02)] inline-block">
            <p className="text-xs md:text-sm tracking-[0.3em] mb-8 uppercase text-[#8c8279] font-medium">SNS総フォロワー20万人超</p>
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-serif font-light leading-relaxed mb-10 tracking-wide text-[#4a423e]">
              “自分史上最高の艶髪”を、<br />
              完全個室で
            </h1>
            <p className="text-[11px] md:text-lg font-light mb-16 text-[#5c544e] leading-loose tracking-normal md:tracking-wider">
              大人女性の髪悩み（艶・うねり・白髪ダメージ）に<br />
              髪質改善のスペシャリストが対応。
              <span className="text-[10px] md:text-xs mt-4 block text-[#8c8279]">口コミ平均4.94（直近1年集計）</span>
            </p>
            <div className="flex flex-col sm:flex-row gap-6 justify-center">
              <Button 
                onClick={openModal}
                className="bg-[#8c8279] text-white hover:bg-[#7a7067] border-none shadow-lg px-12"
              >
                空席を確認する
              </Button>
            </div>
          </div>
        </div>
      </header>

      {/* ② 初回オファー (First Offer) */}
      <Section className="bg-[#fcfbf9] my-20 py-24 border-y border-[#f0efed]"> {/* Full width background */}
        <div className="grid md:grid-cols-2 gap-16 items-center max-w-6xl mx-auto">
          <FadeIn>
            <div className="space-y-8">
              <span className="inline-block px-3 py-1 border border-[#a89f91] text-[#8c8279] text-[10px] tracking-[0.2em] uppercase mb-2">First Time Offer</span>
              <h2 className="text-3xl md:text-4xl font-serif leading-relaxed text-[#4a423e] font-light">
                初回は「期間限定」<br />
                「人気No.1」から。<br />
                最短で“艶髪体験”へ
              </h2>
              <p className="text-[#5c544e] leading-loose font-light text-sm tracking-wide">
                はじめての方へ。<br />
                私たちは、いきなり施術に入りません。<br /><br />
                まずは、今の髪の状態を<br />
                一緒に見つめる時間を大切にします。
              </p>
              
              <div className="space-y-6 mt-10">
                <div className="p-8 bg-white rounded-sm shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)] border border-[#f5f4f2] relative overflow-hidden group hover:border-[#e8e6e3] transition-colors">
                  <div className="absolute top-0 right-0 bg-[#f5f4f2] text-[#8c8279] text-[10px] px-3 py-1 tracking-widest">NO.1</div>
                  <div className="mb-4">
                    <h3 className="font-serif text-sm md:text-xl text-[#4a423e] mb-1">髪質改善縮毛矯正（カット無し）</h3>
                    <p className="text-[10px] text-[#a89f91] tracking-wider">期間限定プライス</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-[#c4beb8] line-through text-sm font-light">¥22,000</span>
                    <span className="text-2xl font-serif text-[#4a423e]">¥19,800</span>
                  </div>
                </div>

                <div className="p-8 bg-white rounded-sm shadow-[0_2px_20px_-5px_rgba(0,0,0,0.03)] border border-[#f5f4f2] group hover:border-[#e8e6e3] transition-colors">
                  <div className="mb-4">
                    <h3 className="font-serif text-sm md:text-xl text-[#4a423e] mb-1">カラー＋髪質改善ヘアエステ</h3>
                    <p className="text-[10px] text-[#a89f91] tracking-wider">TOPスタイリスト担当 / 限定枠</p>
                  </div>
                  <div className="flex items-baseline gap-4">
                    <span className="text-2xl font-serif text-[#4a423e]">¥16,500</span>
                  </div>
                </div>
              </div>

            </div>
          </FadeIn>
          <FadeIn delay={0.2}>
            <div className="relative h-full min-h-[400px]">
              <img 
                src="https://lh3.googleusercontent.com/d/1YCniwxeCXivXe4vvDe1UsVpoxuqefilL" 
                alt="Salon Interior" 
                className="rounded-sm w-full h-full object-cover grayscale-[0.1] brightness-105 shadow-[0_20px_50px_-20px_rgba(0,0,0,0.1)]" 
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>
        </div>
      </Section>


      {/* ④ 悩みの共感 (Empathy) */}
      <Section className="py-32">
        <div className="max-w-3xl mx-auto text-center space-y-12">
          <FadeIn>
            <h2 className="text-3xl md:text-4xl font-serif leading-relaxed text-[#4a423e] font-light">
              年齢・産後・白髪…<br />
              「仕方ない」を<br />
              卒業しませんか
            </h2>
            <div className="h-px w-12 bg-[#e8e6e3] mx-auto my-10"></div>
            <p className="text-[#5c544e] leading-loose text-base tracking-wide font-light">
              30代後半からの髪は、<br />
              少しずつ変わります。<br /><br />
              湿気の日だけじゃなく、<br />
              常に広がる。<br />
              ツヤが出にくい。<br />
              カラーのダメージが抜けない。<br />
              昔より「疲れて見える」。
            </p>
            <p className="text-[#5c544e] leading-loose text-base tracking-wide font-light">
              でも誰にも言われないし、<br />
              自分でも“気のせいかな”と<br />
              思ってしまう。<br /><br />
              だから我慢して、<br />
              また同じメニューを繰り返す。<br /><br />
              そしてまた、<br />
              しっくりこない。<br /><br />
              その繰り返しに、<br />
              そっと終止符を打ちたいのです。
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ⑤ 悩みの原因提示 (Cause) */}
      <Section className="bg-[#fcfbf9] py-24 border-y border-[#f0efed]">
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          <FadeIn className="order-2 md:order-1">
            <div className="relative p-4 border border-[#e8e6e3]">
              <img 
                src="https://lh3.googleusercontent.com/d/1iNGyEnfDw_7QAptW_JQZHxqTo0CYbbV3" 
                alt="Hair Reset" 
                className="w-full grayscale-[0.1] brightness-105" 
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>
          <FadeIn className="order-1 md:order-2 space-y-8">
            <h2 className="text-[23px] md:text-4xl font-serif text-[#4a423e] leading-relaxed">
              原因は髪質だけじゃない。<br />
              “残留”が浸透と持続を邪魔する
            </h2>
            <ul className="space-y-5">
              {[
                "水分保持力の低下",
                "内部密度の変化",
                "ホルモンバランスの揺らぎ",
                "長年のカラー履歴"
              ].map((item, i) => (
                <li key={i} className="flex items-center gap-4 text-[#5c544e] font-light tracking-wide">
                  <div className="w-1.5 h-1.5 rounded-full bg-[#a89f91]"></div>
                  {item}
                </li>
              ))}
            </ul>
            <p className="text-[#5c544e] leading-loose font-light text-sm">
              蓄積した皮膜・油脂が<br />
              薬剤浸透を妨げ、<br />
              仕上がりや持続低下の<br />
              原因になります。<br /><br />
              そのため、<br />
              私たちの施術のスタートは<br />
              必ず「髪のリセット」から<br />
              始まります。
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ⑥ 解決策の提示 (Solution) */}
      <Section className="py-24">
        <div className="text-center max-w-3xl mx-auto mb-20">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-serif mb-8 text-[#4a423e] leading-relaxed">
              成分表診断×都度調合。<br />
              だから“その日だけ”で<br />
              終わらせない
            </h2>
            <p className="text-[#5c544e] text-base font-light leading-loose">
              成分を原料レベルから理解し、<br />
              毛髪科学に基づいて<br />
              薬剤を設計します。<br /><br />
              トリートメントを<br />
              “重ねる”のではなく、<br />
              髪の内部環境を“整える”。
            </p>
          </FadeIn>
        </div>

        <div className="grid md:grid-cols-3 gap-10">
          {[
            { title: "成分表診断", desc: <>ホームケア診断を行い<br />正しい知識共有と日常ケアまでサポート。</>, img: "https://lh3.googleusercontent.com/d/1MpIQSmxinrRsafMD_8K3-631b06FJYdk", aspect: "aspect-[3/4]" },
            { title: "都度調合", desc: "髪質改善の薬剤は毎回オーダーメイドで調合します。", img: "https://lh3.googleusercontent.com/d/1uzcRlFTbotWM5kGuYYRMLRsO6Arh_6W6", aspect: "aspect-[3/4]" },
            { title: "マンツーマン", desc: "最初から最後まで担当が対応。個室空間で本音を話せます。", img: "https://lh3.googleusercontent.com/d/17hY0skS6XLDTVmspluTDgHdIRGdcdOGK", aspect: "aspect-[4/3]" }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="h-full bg-white p-6 border-l border-[#e8e6e3] hover:border-[#a89f91] transition-colors duration-500">
                <div className={cn("overflow-hidden mb-8", item.aspect)}>
                  <img 
                    src={item.img} 
                    alt={item.title} 
                    className="w-full h-full object-cover grayscale-[0.1] brightness-105 hover:scale-105 transition-transform duration-700" 
                    referrerPolicy="no-referrer"
                  />
                </div>
                <h3 className="text-lg font-serif mb-4 text-[#4a423e] tracking-wide">{item.title}</h3>
                <p className="text-[#5c544e] text-sm leading-loose font-light tracking-wide">{item.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ⑦ 解決策の問題提示 (Honesty) */}
      <Section className="bg-[#fcfbf9] py-20">
        <div className="max-w-4xl mx-auto bg-white p-6 md:p-16 shadow-[0_5px_30px_-10px_rgba(0,0,0,0.02)] text-center border border-[#f5f4f2]">
          <FadeIn>
            <h2 className="text-2xl md:text-3xl font-serif mb-8 text-[#4a423e] leading-relaxed">
              正直にお伝えします。<br />
              履歴によって<br />
              “できる最適解”は<br />
              変わります
            </h2>
            <p className="text-[#5c544e] font-light leading-loose text-sm tracking-wide">
              過去のセルフカラーや<br />
              ブリーチの履歴によっては、<br />
              ご希望の施術が難しい場合も<br />
              ございます。<br /><br />
              無理な施術は<br />
              髪を傷めるだけです。<br /><br />
              まずは履歴を共有いただき、<br />
              可能な範囲での最適なご提案を<br />
              させていただきます。
            </p>
          </FadeIn>
        </div>
      </Section>

      {/* ⑧ 選ばれる理由 (Reasons) */}
      <Section className="py-24">
        <FadeIn>
          <h2 className="text-2xl md:text-4xl font-serif text-center mb-20 text-[#4a423e] leading-relaxed">
            完全個室×マンツーマン。<br />
            担当が変わらないから<br />
            仕上がりが安定
          </h2>
        </FadeIn>
        
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {[
            { title: "売上のための提案はしません", desc: <>「これもやっておきましょうか？」<br />という言葉に疲れていませんか？<br />本当に必要なことだけを伝えます。</> },
            { title: "頑張らなくていい美しさ", desc: <>忙しい朝に、何工程もいりません。<br />ブラッシングだけで整う。<br />それが私たちの基準です。</> },
            { title: "個室マンツーマンという安心", desc: <>隣の席を気にしなくていい。<br />小さな悩みも遠慮なく話せる空間が<br />結果につながります。</> },
            { title: "理論があるから、ブレない", desc: <>感覚ではなく、理由がある。<br />髪に起きていることを理解したうえで、<br />最適な方法を選びます。</> }
          ].map((reason, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="bg-white p-8 h-full border-t border-[#e8e6e3] hover:border-[#a89f91] transition-colors duration-500">
                <div className="text-[#e8e6e3] font-serif text-4xl mb-6 font-light">
                  0{i + 1}
                </div>
                <h3 className="text-base font-serif mb-4 text-[#4a423e] tracking-wide">{reason.title}</h3>
                <p className="text-[#5c544e] text-xs leading-loose font-light">{reason.desc}</p>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ⑨ BeforeAfter */}
      <Section className="bg-[#fcfbf9] py-24">
        <div className="text-center mb-16">
          <FadeIn>
            <h2 className="text-3xl font-serif mb-4 text-[#4a423e]">Before → After</h2>
            <p className="text-[#8c8279] text-xs tracking-widest uppercase">Real Results</p>
          </FadeIn>
        </div>
        
        <div className="grid md:grid-cols-2 gap-10 max-w-4xl mx-auto">
          {[
            { label: "髪質改善縮毛矯正", imgBefore: "https://lh3.googleusercontent.com/d/1q-W4O0fBAuKpiU9fZSMJj0hiF6OFMjZi", imgAfter: "https://lh3.googleusercontent.com/d/1sSEumTcJr8krFshYtHNdSwPyehwGBgzF" },
            { label: "濃密ツヤカラー", imgBefore: "https://lh3.googleusercontent.com/d/1knEDcHY54AYlmc_wi0eg5zcjjuWhD_zF", imgAfter: "https://lh3.googleusercontent.com/d/1ByItoiY7UVdAYZ24py1p9p5rhvDETX8M" }
          ].map((item, i) => (
            <FadeIn key={i} delay={i * 0.1}>
              <div className="group cursor-pointer">
                <div className="relative aspect-[4/3] overflow-hidden mb-6">
                  <div className="absolute inset-0 flex">
                    <div className="w-1/2 relative border-r border-white/20">
                      <img 
                        src={item.imgBefore} 
                        alt="Before" 
                        className="w-full h-full object-cover grayscale-[0.2] scale-[1.2]" 
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-3 left-3 text-white/80 text-[10px] tracking-widest uppercase font-light">Before</span>
                    </div>
                    <div className="w-1/2 relative">
                      <img 
                        src={item.imgAfter} 
                        alt="After" 
                        className={`w-full h-full object-cover ${item.label === "濃密ツヤカラー" ? "scale-[1.1]" : ""}`} 
                        referrerPolicy="no-referrer"
                      />
                      <span className="absolute bottom-3 right-3 text-white text-[10px] tracking-widest uppercase font-light">After</span>
                    </div>
                  </div>
                </div>
                <h3 className="text-center font-serif text-[#4a423e] tracking-wide">{item.label}</h3>
              </div>
            </FadeIn>
          ))}
        </div>
      </Section>

      {/* ⑩ お客様の声 (Voice) */}
      <Section className="py-24 bg-white">
        <div className="max-w-6xl mx-auto px-6">
          <div className="text-center mb-20">
            <FadeIn>
              <h2 className="text-3xl font-serif mb-6 text-[#4a423e] tracking-widest">Customer's Voice</h2>
              <div className="flex flex-col items-center gap-4">
                <div className="flex items-center gap-2">
                  <div className="flex">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-[#a89f91] text-[#a89f91]" />
                    ))}
                  </div>
                  <span className="text-2xl font-serif text-[#4a423e] ml-2">4.94</span>
                </div>
                <p className="text-xs text-[#8c8279] tracking-[0.2em] uppercase">Google 口コミ平均（直近1年集計）</p>
              </div>
            </FadeIn>
          </div>

          <div className="grid md:grid-cols-2 gap-8">
            {[
              {
                name: "スズキモモ 様",
                text: "こちらのサロンは、スタッフの方が最初から最後までマンツーマンで丁寧に施術してくれるので、安心感がありとても信頼できます。特に縮毛矯正は自然な仕上がりで、まっすぐすぎず柔らかい質感に。ツヤも出て髪が見違えるように綺麗になりました。カラーも色持ちがとても良く、退色してもキンキンにならず、長く楽しめるのが嬉しいポイントです。毎回髪の状態をしっかり見ながら提案してくださるので、自分の髪に合った施術が受けられます。落ち着いた空間でリラックスできるのも魅力。髪の悩みがある方には本当におすすめです。",
                rating: 5
              },
              {
                name: "しんかい 様",
                text: "技術力も知識も本当に素晴らしく、これ以上のサロンはなかなか無いと心から思えるお店です。カットやカラーはもちろん、白髪染めに関しても提案力や仕上がりの美しさは群を抜いていて、毎回安心してお任せできます。スタッフの皆さんも明るく丁寧で、毎回心地よい時間を過ごさせていただいています。技術も接客も本当に最高なので、これからも自信を持って素晴らしいサービスを提供し続けていただきたいです！",
                rating: 5
              },
              {
                name: "さ 様",
                text: "4年ほど通っています。カラーの色持ちが良く、根本から毛先までムラなく綺麗にカラーをしていただけます。シャンプーやヘアオイルなどこちらの製品を使ってから髪が扱いやすくなり、毎日サラサラが続いています。薬剤の知識、技術が素晴らしく、安心してお任せできる美容室です。",
                rating: 5
              },
              {
                name: "お客様",
                text: "これまでいろいろな美容室を利用してきましたが、今まででいちばん良い美容室だと感じています。なんと言っても、カラーのもちが全然違います。また、ヘアケアに関しても本当に詳しいので、相談すると的確に答えてくださいます。なので、髪のお医者さん的な感じで通っています。髪が本当に扱いやすくなりました。オリジナルで出しているオイルやトリートメントもいいですよ〜！",
                rating: 5
              }
            ].map((voice, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-[#fcfbf9] p-10 h-full border border-[#f0efed] relative flex flex-col">
                  <div className="flex mb-6">
                    {[...Array(voice.rating)].map((_, i) => (
                      <Star key={i} className="w-4 h-4 fill-[#a89f91] text-[#a89f91]" />
                    ))}
                  </div>
                  <p className="text-[#5c544e] text-sm leading-loose mb-8 font-light tracking-wide flex-grow">
                    {voice.text}
                  </p>
                  <div className="flex items-center justify-between pt-6 border-t border-[#e8e6e3]">
                    <span className="text-[#4a423e] text-xs font-medium tracking-widest">{voice.name}</span>
                    <span className="text-[10px] text-[#8c8279] uppercase tracking-widest">Google Review</span>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>


      {/* 事業への想い (Philosophy) */}
      <Section className="bg-[#fcfbf9] py-24 border-y border-[#f0efed]">
        <div className="grid md:grid-cols-2 gap-20 items-center max-w-6xl mx-auto">
          <FadeIn>
            <div className="p-4 bg-white shadow-[0_5px_30px_-10px_rgba(0,0,0,0.03)]">
              <img src="https://lh3.googleusercontent.com/d/14XyJDlzTv6jxuVDuzLWL-r5w6nDkZraz" alt="Philosophy" className="w-full grayscale-[0.1] brightness-105" referrerPolicy="no-referrer" />
            </div>
          </FadeIn>
          <FadeIn className="space-y-10">
            <h2 className="text-2xl md:text-4xl font-serif leading-relaxed text-[#4a423e]">
              <span className="inline-block">“人生観が変わる髪質改善”を</span><br />
              <span className="inline-block">来店前から体感してほしい</span>
            </h2>
            <div className="space-y-8 text-[#5c544e] text-base leading-loose font-light tracking-wide">
              <p>
                私たちは、<br />
                若さを取り戻す美容を<br />
                しているわけではありません。
              </p>
              <p>
                「今の自分が、<br />
                ちゃんと好きでいられること」。<br />
                それを支えたい。
              </p>
              <p>
                鏡の前でため息をつく時間を、<br />
                ほんの少し減らしたい。<br /><br />
                誰かと会う前に、<br />
                髪を気にしなくていい<br />
                安心を届けたい。
              </p>
              <p>
                美容は、外見だけではなく、<br />
                その人の一日や気持ちまで<br />
                変える力があると信じています。
              </p>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 権威性、実績 (Authority) */}
      <Section className="py-24">
        <div className="text-center">
          <FadeIn>
            <h2 className="text-3xl font-serif mb-6 text-[#4a423e]">
              毛髪科学・薬剤知識に精通。<br />試験をクリアした担当のみ入客
            </h2>
            <p className="text-[#5c544e] font-light text-sm tracking-wide mb-12">
              厳しい研修と筆記・実技試験、技術チェックをクリアしたスタイリストのみが担当します。
            </p>
            <div className="max-w-5xl mx-auto">
              <img 
                src="https://lh3.googleusercontent.com/d/1oRSNgUee457WBtvb-Mr8nSa9cKNax00K" 
                alt="Expertise" 
                className="w-full h-auto shadow-sm grayscale-[0.05] brightness-[1.02]" 
                referrerPolicy="no-referrer"
              />
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 初回の流れ (Flow) */}
      <Section className="bg-[#fcfbf9] py-24 border-y border-[#f0efed]">
        <div className="max-w-4xl mx-auto">
          <FadeIn>
            <h2 className="text-3xl font-serif text-center mb-16 text-[#4a423e] leading-relaxed">
              初回は“診断→リセット→都度調合”で、<br />
              仕上がりと持続を両立
            </h2>
          </FadeIn>

          <div className="space-y-6">
            {[
              { step: "01", title: "事前カウンセリング", desc: "履歴、ホームケア、来店周期などを丁寧にヒアリングします。" },
              { step: "02", title: "成分表診断 & リセット", desc: "お使いのケア剤を確認し、髪に蓄積した不要な成分をリセットします。" },
              { step: "03", title: "都度調合での施術", desc: "その日の髪の状態に合わせて、薬剤をオーダーメイドで調合します。" },
              { step: "04", title: "ドライ & アイロン仕上げ", desc: "ご自宅でも再現できるよう、乾かし方からアドバイスします。" }
            ].map((flow, i) => (
              <FadeIn key={i} delay={i * 0.1}>
                <div className="bg-white p-8 flex items-start gap-8 border border-[#f5f4f2] hover:border-[#e8e6e3] transition-colors">
                  <span className="text-2xl font-serif text-[#e8e6e3] font-light tracking-widest">0{i + 1}</span>
                  <div>
                    <h3 className="text-lg font-serif mb-3 text-[#4a423e] tracking-wide">{flow.title}</h3>
                    <p className="text-[#5c544e] text-sm font-light leading-loose">{flow.desc}</p>
                  </div>
                </div>
              </FadeIn>
            ))}
          </div>
        </div>
      </Section>

      {/* 店舗情報 (Info) */}
      <Section className="py-24">
        <div className="max-w-5xl mx-auto px-6">
          <FadeIn>
            <h2 className="text-2xl md:text-4xl font-serif mb-16 text-[#4a423e] leading-relaxed text-center">
              年中無休・駐車場4台。<br />
              完全個室で<br />
              落ち着いて過ごせます
            </h2>
            
            <div className="grid md:grid-cols-2 gap-16 md:gap-24">
              {/* Clef-an */}
              <div className="space-y-8">
                <div className="mb-8">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1GJ2cOaP8LiV7VrG4kSmr1d_TiLTOaSHh" 
                    alt="Clef-an Logo" 
                    className="h-12 object-contain brightness-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <MapPin className="w-5 h-5 text-[#a89f91] shrink-0 mt-1" />
                    <div>
                      <p className="font-medium text-[#4a423e] mb-2 tracking-widest text-xl">Clef-an</p>
                      <p className="text-[#5c544e] font-light leading-relaxed">宮城県富谷市上桜木１丁目37-4 Foresta102</p>
                      <p className="text-xs mt-3 text-[#8c8279]">ツルハドラッグ上桜木店向かい / イオンモール富谷から車で5分</p>
                    </div>
                  </div>
                  
                  <div className="grid grid-cols-1 gap-6 ml-11">
                    <div className="flex items-start gap-4">
                      <Clock className="w-4 h-4 text-[#a89f91] shrink-0 mt-1" />
                      <div>
                        <p className="text-sm text-[#5c544e]">9:00 〜 19:00</p>
                        <p className="text-[10px] text-[#8c8279] mt-1">カット最終18:00 / 縮毛矯正最終16:00</p>
                      </div>
                    </div>
                    <div className="flex items-start gap-4">
                      <Phone className="w-4 h-4 text-[#a89f91] shrink-0 mt-1" />
                      <p className="text-sm text-[#5c544e]">022-341-3156</p>
                    </div>
                  </div>
                </div>

                <div className="aspect-video w-full p-1 border border-[#e8e6e3] bg-white">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3129.566373738092!2d140.8756013!3d38.3510526!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f89830889299999%3A0x6a6a6a6a6a6a6a6a!2zQ2xlZi1hbiAo44Kv44Os44Ki44OzKQ!5e0!3m2!1sja!2sjp!4v1709190000000!5m2!1sja!2sjp" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    className="grayscale-[0.5] opacity-90"
                  ></iframe>
                </div>
              </div>

              {/* Lamp */}
              <div className="space-y-8">
                <div className="mb-8">
                  <img 
                    src="https://lh3.googleusercontent.com/d/1C8_i34_wExvtxMDnDsqq64DL3gV227Lb" 
                    alt="Lamp Logo" 
                    className="h-12 object-contain brightness-110"
                    referrerPolicy="no-referrer"
                  />
                </div>
                <div className="space-y-6">
                  <div className="flex items-start gap-6">
                    <MapPin className="w-5 h-5 text-[#a89f91] shrink-0 mt-1" />
                    <div>
                      <div className="flex items-center gap-3 mb-2">
                        <p className="font-medium text-[#4a423e] tracking-widest text-xl">Lamp</p>
                        <span className="text-[10px] bg-[#8c8279] text-white px-2 py-0.5 rounded-sm tracking-widest">2026年4月 NEW OPEN</span>
                      </div>
                      <p className="text-[#5c544e] font-light leading-relaxed">宮城県仙台市泉区泉中央３丁目２６－１０ ローズポールビル１０２</p>
                      <p className="text-xs mt-3 text-[#8c8279]">泉中央駅から車で３分/徒歩１０分</p>
                      <p className="text-[10px] mt-3 text-[#8c8279] leading-relaxed">
                        泉ヶ岳通りのゼビオさんと<br />
                        将監の愛宕神社を結ぶ道沿い<br />
                        地下鉄南北線「泉中央」駅（北2）徒歩10分<br />
                        秋月庵 三次郎さん（お蕎麦屋さん）の隣
                      </p>
                    </div>
                  </div>
                </div>

                <div className="aspect-video w-full p-1 border border-[#e8e6e3] bg-white">
                  <iframe 
                    src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3130.662678945678!2d140.8800!3d38.3500!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x5f898123456789ab%3A0x1234567890abcdef!2zTGFtcCAo44Op44Oz44OXKQ!5e0!3m2!1sja!2sjp!4v1709190000000!5m2!1sja!2sjp" 
                    width="100%" 
                    height="100%" 
                    style={{ border: 0 }} 
                    allowFullScreen 
                    loading="lazy"
                    className="grayscale-[0.5] opacity-90"
                  ></iframe>
                </div>
              </div>
            </div>
          </FadeIn>
        </div>
      </Section>

      {/* 最後の予約ボタン (Final CTA) */}
      <footer className="bg-[#fcfbf9] text-[#4a423e] py-32 text-center px-6 mb-20 border-t border-[#f0efed]">
        <FadeIn>
          <h2 className="text-2xl md:text-4xl font-serif mb-12 leading-relaxed tracking-wide">
            変わるのは、<br />
            髪だけではありません。<br /><br />
            鏡の前の<br />
            あなたの気持ちまで。<br /><br />
            私たちは、<br />
            誠実に向き合います。
          </h2>
          <Button 
            onClick={openModal}
            className="bg-[#8c8279] text-white hover:bg-[#7a7067] text-lg px-16 py-5 h-auto shadow-xl"
          >
            ご希望の店舗で空席を確認する
          </Button>
        </FadeIn>
      </footer>
      <StickyFooter />
    </div>
  );
}
