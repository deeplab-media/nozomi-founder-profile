(() => {
  const style = document.createElement('style');
  style.textContent = `
    .language-toggle{border:1px solid #1b332e;background:transparent;color:#1b332e;padding:10px 14px;font:inherit;cursor:pointer;transition:background .25s,color .25s}
    .language-toggle:hover{background:#1b332e;color:#fff}
    .company-mark{width:140px;min-height:72px;display:grid;place-items:center;font-size:22px;font-weight:700;letter-spacing:3px;color:#1b332e;border:1px solid #d7dcd4;background:linear-gradient(135deg,#fffdf8,#f1eee2)}
    .nozomi-pillars{list-style:none;margin:28px 0 0;padding:0;display:grid;grid-template-columns:repeat(3,1fr);gap:10px}
    .nozomi-pillars li{display:flex;align-items:flex-start;gap:12px;padding:16px 13px;background:#e9ece4;border-top:2px solid #a47c41;font-size:13px;line-height:1.6}
    .nozomi-pillars li>b{color:#a47c41;font-size:12px}
    .nozomi-pillars small{display:block;color:#7a7666;font-size:11px;margin-top:4px}
    .nozomi-gallery{margin-top:45px}
    .nozomi-photo-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));grid-auto-rows:190px;gap:13px}
    .nozomi-photo-grid figure{position:relative;overflow:hidden;background:#e4e5df;margin:0}
    .nozomi-photo-grid img{width:100%;height:100%;object-fit:cover;transition:transform .8s cubic-bezier(.16,1,.3,1)}
    .nozomi-photo-grid figure:hover img{transform:scale(1.04)}
    .nozomi-photo-grid figcaption{position:absolute;left:0;right:0;bottom:0;padding:32px 14px 13px;color:#fff;font-size:12px;background:linear-gradient(transparent,#10221fe0)}
    .nozomi-photo-wide{grid-column:span 2;grid-row:span 2}
    .nozomi-photo-wide img{object-position:center 42%}
    .nozomi-more{margin-top:20px;border-top:1px solid #cfc9bd;border-bottom:1px solid #cfc9bd}
    .nozomi-more summary{cursor:pointer;list-style:none;padding:17px 4px;color:#1b332e;font-size:13px}
    .nozomi-more summary::-webkit-details-marker{display:none}
    .nozomi-more summary span{color:#a47c41;margin-left:8px}
    .nozomi-more .nozomi-photo-grid{padding:0 0 20px}
    .dg-legacy{display:grid;grid-template-columns:1fr 1fr;gap:8%;align-items:center;background:#1b332e;color:#f4f3ed;padding:75px 7%}
    .dg-legacy h2{font-size:clamp(32px,4vw,52px)}
    .dg-legacy h2 em{color:#d0ad75}
    .dg-legacy p:not(.eyebrow){color:#c1ccc4;line-height:1.8}
    .enmusubi-pillars{display:grid;grid-template-columns:repeat(3,1fr);gap:14px;margin:42px 0;padding:0}
    .enmusubi-pillars article{padding:24px 21px;background:#fffdf8;border-top:2px solid #a83c36}
    .enmusubi-pillars b{font-size:12px;letter-spacing:.08em;color:#a47c41}
    .enmusubi-pillars p{font-size:13px;line-height:1.7;margin:14px 0}
    .enmusubi-pillars small{font-size:11px;color:#7a7666}
    @media(max-width:700px){.nozomi-pillars,.enmusubi-pillars{grid-template-columns:1fr}.nozomi-photo-grid{grid-template-columns:repeat(2,minmax(0,1fr));grid-auto-rows:145px;gap:9px}.nozomi-photo-wide{grid-column:span 2;grid-row:span 1}.dg-legacy{grid-template-columns:1fr;gap:18px;padding:55px 6%}.language-toggle{font-size:12px;padding:8px 9px}}
  `;
  document.head.append(style);
  const button = document.querySelector('.language-toggle');
  if (!button) return;
  document.querySelector('header').insertBefore(button, document.querySelector('.menu'));
  const translations = [
    ['.skip', '本文へ'],
    ['#navigation a[href="#cau-chuyen"]', 'プロフィール'],
    ['#navigation a[href="#dau-an"]', '歩み'],
    ['#navigation a[href="#he-sinh-thai"]', '事業'],
    ['#navigation a[href="#nozomi"]', 'NOZOMI'],
    ['#navigation a[href="#cong-dong"]', '地域活動'],
    ['#navigation a[href="#lien-he"]', 'お問い合わせ ↗'],
    ['.menu', 'メニュー ＋'],
    ['.japan-signature small', '人と人をつなぎ、共に成長する'],
    ['.hero-copy>.eyebrow', 'ベトナム　↔　日本'],
    ['.overline', '創業者・日越の架け橋'],
    ['.hero h1', 'グエン・ティ・<br><span>トゥオン・ハイ</span>'],
    ['.hero .intro', '30年以上にわたり、日本とベトナムの企業、人材、そして地域をつなぎ、新たな価値を築いてきました。'],
    ['.hero .button', '歩みをたどる <span>↗</span>'],
    ['.hero-facts>div:first-child small', '経験年数'],
    ['.hero-facts>div:last-child strong', 'ベトナム — 日本'],
    ['.hero-facts>div:last-child small', '貿易 · 人材 · 健康'],
    ['.brand-portrait>span', 'トゥオン・ハイ<br>創業者プロフィール'],
    ['.portrait-label>span', 'グエン・ティ・トゥオン・ハイ'],
    ['.portrait-label small', '創業者・代表<br>NOZOMI · ENMUSUBI'],
    ['.art-note', '人と人をつなぐ。<br>可能性をひらく。'],
    ['.hero-bottom span:nth-child(1)', '国際貿易'],
    ['.hero-bottom span:nth-child(2)', '人材育成'],
    ['.hero-bottom span:nth-child(3)', '日越連携'],
    ['.hero-bottom a', 'スクロールしてご覧ください ↓'],
    ['.story h2', '大きなビジョン<br>人から<br><em>始まる</em>'],
    ['.story-copy .lead', '国際貿易のプロジェクトから、若者の未来を拓く取り組みまで。'],
    ['.story-copy>p:nth-of-type(2)', 'グエン・ティ・トゥオン・ハイ氏は、NOZOMI人材育成・キャリア支援会社およびENMUSUBI株式会社の創業者・代表です。30年以上にわたる国際貿易、投資促進、人材育成の経験を基盤に、日越両国の架け橋として活動しています。'],
    ['.story-copy>p:nth-of-type(3)', '人材育成に取り組む以前から、工業、物流、縫製、素材分野における国際協力プロジェクトに携わってきました。日本企業との経験を、実践的な日本語、技能、仕事の姿勢を備えた人材の育成に生かしています。'],
    ['.story-copy blockquote', '「日本を出発点に、NOZOMIの歩みを始めました。」<cite>グエン・ティ・トゥオン・ハイ</cite>'],
    ['#cau-chuyen .eyebrow', '創業者プロフィール'],
    ['#dau-an .section-title h2', 'つながりが<br><em>価値を生む</em>'],
    ['#dau-an .section-title>p', '一つの協力関係から、長く続く価値へ。ハイ氏の歩みを形づくる代表的な分野をご紹介します。'],
    ['.brand-history>p', 'これまでの歩みに関わる企業'],
    ['.brand-history small', 'キャリア資料で紹介されているプロジェクトや事業に関係する企業です。'],
    ['.legacy-grid .num', '実績と経験'],
    ['#dau-an .source-note', '創業者から提供された資料をもとに編集しています。'],
    ['.legacy-grid article:nth-child(1) h3', 'ベトナム市場への<br>新たな扉を開く'],
    ['.legacy-grid article:nth-child(1) p', '日本企業のベトナムにおける商業活動を支援し、市場開拓、投資促進、国際協力を推進。'],
    ['.legacy-grid article:nth-child(2) h3', '大規模プロジェクトを<br>つなぐ'],
    ['.legacy-grid article:nth-child(2) p', 'フーミー火力発電所向け大型・重量設備の輸送に関わる物流事業者の商業活動を支援。'],
    ['.legacy-grid article:nth-child(3) h3', '日本の基準を<br>ベトナムの製品へ'],
    ['.legacy-grid article:nth-child(3) p', '日本からの高品質な縫製プロジェクトを展開し、ベトティエン社の形態安定シャツ開発を推進。'],
    ['.legacy-grid article:nth-child(4) h3', '国際的な製造<br>ネットワークに参画'],
    ['.legacy-grid article:nth-child(4) p', 'トヨタ車向けエアバッグ製造のベトナム展開や、レクサス車内装向けベトナム産ジュート素材の研究開発に携わる。'],
    ['.legacy-grid article:nth-child(5) h3', 'ベトナム素材の<br>価値を高める'],
    ['.legacy-grid article:nth-child(5) p', 'ゴム、アカシアなどのベトナム産素材を、日本企業の建築・インテリア分野へつなぐ。'],
    ['.legacy-grid article:nth-child(6) h3', '若い世代に<br>新たな機会を'],
    ['.legacy-grid article:nth-child(6) p', '日本企業との経験を生かし、実践的な日本語、仕事の姿勢、職業能力を備えた若者の育成に取り組んでいます。'],
    ['.legacy-grid article:nth-child(2) .names', 'フーミー火力発電所'],
    ['.legacy-grid article:nth-child(3) .names', 'ベトティエン · 日本のサプライチェーン'],
    ['.legacy-grid article:nth-child(5) .names', 'Panasonic · Sumitomo<br>Ichijo Komuten · Daiken'],
    ['.legacy-grid article:nth-child(6) .names', '教育 · 文化 · キャリア'],
    ['#he-sinh-thai .section-title h2', '二つの企業<br><em>一つの日越の未来</em>'],
    ['#he-sinh-thai .section-title>div>.jp-heading', '二つの企業、一つのつながる未来。'],
    ['#he-sinh-thai .section-title>div+ p', 'NOZOMIは質の高い人材を育成し、ENMUSUBIは企業連携と予防的ヘルスケアを通じて日越をつなぎます。それぞれ異なる事業を展開し、グエン・ティ・トゥオン・ハイ氏が創業しました。'],
    ['.company-switch a:first-child span', '01 / 人材育成・キャリア支援<small>日本語教育・人材育成</small>'],
    ['.company-switch a:last-child span', '02 / 日越連携・ヘルスケア<small>企業連携・予防医療</small>'],
    ['.chapter-hint', 'スクロールして各事業をご覧ください ↓'],
    ['#nozomi .business-intro .eyebrow', 'NOZOMI / 人材育成・キャリア支援'],
    ['#enmusubi .business-intro .eyebrow', 'ENMUSUBI / 日越連携・ヘルスケア'],
    ['#nozomi .business-intro h3', '日本語を学び、<br>日本の仕事を知り、<br><em>未来をつくる</em>'],
    ['#nozomi .business-intro .jp-heading', '日本語と日本の仕事の姿勢を学び、未来へ。'],
    ['#nozomi .business-intro>div>p:not(.eyebrow):not(.jp-heading)', 'NOZOMIは、日本およびベトナムの日系企業に向けて質の高い人材を育成します。仕事で使える日本語、日本の文化と仕事の姿勢、実践的な職業技能を重視し、学習者の円滑な職場適応と長期的な成長を支えます。'],
    ['.nozomi-pillars li:nth-child(1)>span', '日本語センター<small>日本語センター</small>'],
    ['.nozomi-pillars li:nth-child(2)>span', '日本の文化・仕事の姿勢<small>日本の文化・仕事の姿勢</small>'],
    ['.nozomi-pillars li:nth-child(3)>span', '物流分野を中心とした人材連携<small>物流分野を中心とした人材連携</small>'],
    ['.logistics-copy .eyebrow', '重点分野 · 物流'],
    ['.logistics-copy h4', '物流人材を育成<br><em>トラック運転手を中心に</em>'],
    ['.logistics-copy>p:not(.eyebrow):not(.ai-disclosure)', 'NOZOMIは日本企業の物流分野に向けて、トラック運転手を中心とした人材の育成と連携を目指します。専門日本語、安全意識、職業技能を組み合わせた準備を行います。'],
    ['.logistics-copy .ai-disclosure', '✦ AI生成イメージ · 実際の写真に更新予定'],
    ['.logistics-feature figcaption', '日本の物流分野に向けたトラック運転手育成のイメージ · AI生成'],
    ['.company-switch a:first-child>span', '01 / 人材育成・キャリア支援<small>日本語教育・人材育成</small>'],
    ['.company-switch a:last-child span', '02 / 日越連携・ヘルスケア<small>企業連携・予防医療</small>'],
    ['#dau-an .section-title .eyebrow', '02 / 主な実績'],
    ['#he-sinh-thai .section-title .eyebrow', '03 / 事業と使命'],
    ['#nozomi .nozomi-gallery .eyebrow', 'NOZOMI / 学びと体験'],
    ['#nozomi .business-intro figcaption', 'NOZOMIの学習環境 · 提供資料より'],
    ['#nozomi .nozomi-photo-grid img', 'NOZOMIの活動写真'],
    ['#dau-an .brand-history .brand-row img', '関連プロジェクトの企業ロゴ'],
    ['#cong-dong .video-thumb img', '地域医療支援プログラムの動画サムネイル'],
    ['.japan .eyebrow', '日本 / 深いつながり'],
    ['.japan>figure img', '東京を訪問するグエン・ティ・トゥオン・ハイ氏'],
    ['.japan>div>figure img', '日本文化を体験するグエン・ティ・トゥオン・ハイ氏'],
    ['.japan>div>figure figcaption', '日本での文化交流と歩み'],
    ['.nozomi-gallery .subheading .eyebrow', 'NOZOMI / 学びと体験'],
    ['.nozomi-gallery .subheading h3', '体験を通して<br>日本語と文化を学ぶ'],
    ['.nozomi-photo-grid figcaption', '学びと交流のひととき'],
    ['.nozomi-more summary', 'NOZOMIの活動写真をもっと見る ↓'],
    ['.values article:nth-child(1) b', '実践的な学び'],
    ['.values article:nth-child(1) p', '学んだ日本語を実際の場面で使う。'],
    ['.values article:nth-child(2) b', '現場につながる指導'],
    ['.values article:nth-child(2) p', '職場で役立つ会話と技能を身につける。'],
    ['.values article:nth-child(3) b', '規律と責任'],
    ['.values article:nth-child(3) p', '時間を守り、責任を持ち、仲間を尊重する。'],
    ['.values article:nth-child(4) b', '未来への準備'],
    ['.values article:nth-child(4) p', '自立し、新しい環境に適応し、成長する。'],
    ['#nozomi>.subheading .eyebrow', '育成ステップ'],
    ['#nozomi>.subheading h3', '渡日前に準備し、<br>自信を持って新生活へ'],
    ['.roadmap article:nth-child(1) h4', '基礎'],
    ['.roadmap article:nth-child(1) p', '文字、発音、あいさつ、自主学習の方法を身につけます。'],
    ['.roadmap article:nth-child(2) h4', '日本語 N5'],
    ['.roadmap article:nth-child(2) p', '語彙約800語、漢字100字を学び、会話と面接を練習します。'],
    ['.roadmap article:nth-child(3) h4', 'N4・専門分野'],
    ['.roadmap article:nth-child(3) p', '仕事の語彙、場面対応、希望に応じた試験対策を学びます。'],
    ['.roadmap article:nth-child(4) h4', '能力の維持'],
    ['.roadmap article:nth-child(4) p', 'N5・N4の復習、読解、会話の反応力を磨きます。'],
    ['.roadmap article:nth-child(5) h4', '渡航前準備'],
    ['.roadmap article:nth-child(5) p', '実用日本語、企業文化、日本での生活技能を学びます。'],
    ['#nozomi .benefits h3', '力を見える化し、<br>企業と共に育てる'],
    ['.benefits li:nth-child(1)', '日本語力と学習規律を定期的に評価し、進捗を確認。'],
    ['.benefits li:nth-child(2)', '職種や採用要件に応じて語彙と場面練習を調整。'],
    ['.benefits li:nth-child(3)', '5S、安全、チームワーク、報告・連絡・相談を実践。'],
    ['.benefits li:nth-child(4)', 'クラスやグループの状況を共有し、受け入れ準備を支援。'],
    ['#enmusubi .business-intro h3', '専門性をつなぎ、<br><em>一人ひとりに寄り添う</em>'],
    ['#enmusubi .business-intro>div>p:not(.eyebrow):not(.jp-heading)', 'グエン・ティ・トゥオン・ハイ氏が創業・運営するENMUSUBI株式会社は、予防的ヘルスケアと企業連携を通じてベトナムと日本をつなぎます。ご相談の受付から医療機関との連携、書類、通訳、日本滞在中のサポートまで一貫して支援します。'],
    ['#enmusubi>.business-intro .text-link', 'ENMUSUBI公式サイト ↗'],
    ['.partners article:first-child .text-link', '病院の詳細 ↗'],
    ['.partners article:nth-child(2) .text-link', 'CellPro Japan公式サイト ↗'],
    ['.partners article:nth-child(3) .text-link', 'AS Medical公式サイト ↗'],
    ['.enmusubi-scenes .eyebrow', '医療と健康をつなぐ取り組み'],
    ['#enmusubi .business-intro figcaption', '日本での医療連携を紹介する資料'],
    ['.enmusubi-pillars article:nth-child(1) b', '01 / 投資相談'],
    ['.enmusubi-pillars article:nth-child(1) p', 'ベトナムと日本の企業をつなぎ、連携の機会や投資についての相談を支援します。'],
    ['.enmusubi-pillars article:nth-child(2) b', '02 / ヘルスケア'],
    ['.enmusubi-pillars article:nth-child(2) p', '日本の医療機関と連携し、情報、書類、通訳、受診までの行程を支援します。'],
    ['.enmusubi-pillars article:nth-child(3) b', '03 / 日越連携'],
    ['.enmusubi-pillars article:nth-child(3) p', '相談窓口となり、パートナーとの調整からお客様への継続的な支援まで行います。'],
    ['.enmusubi-scenes>.subheading h3', '最初のご相談から<br>日本でのサポートまで'],
    ['#enmusubi>.subheading .eyebrow', '日本の医療連携先'],
    ['#enmusubi>.subheading h3', 'ENMUSUBIと共に歩む<br>日本の医療機関'],
    ['.product-feature .eyebrow', 'プログラム資料より'],
    ['.product-feature .product-tag:last-child', 'ENMUSUBI 資料'],
    ['.care-editorial .eyebrow', '一人ひとりに寄り添う'],
    ['.care-editorial h3', '一つの窓口で<br>継続的なサポート'],
    ['#enmusubi .care-editorial>div>p:not(.eyebrow)', 'ベトナムのお客様のご希望と日本の専門知識をつなぎ、安心して医療相談に臨めるよう準備をお手伝いします。'],
    ['.health-mosaic .health-main figcaption', '<span>01 / ご相談</span>医療専門家との連携'],
    ['.health-mosaic figure:nth-child(2) figcaption', '<span>02 / 基本プログラム</span>Medicacell Type-I'],
    ['.health-mosaic figure:nth-child(3) figcaption', '<span>03 / ケア</span>リハビリテーション'],
    ['.health-mosaic figure:nth-child(4) figcaption', '<span>04 / 設備</span>高気圧酸素療法'],
    ['.health-mosaic figure:nth-child(5) figcaption', '<span>05 / 専門的な手順</span>専用輸送'],
    ['.partners article:first-child h4', '王司病院'],
    ['.partners article:first-child p', '下関市にある医療機関です。ENMUSUBIの資料で紹介されている日本での診療・ケアの連携先です。'],
    ['.partners article:nth-child(2) h4', 'CellPro Japan'],
    ['.partners article:nth-child(2) p', '藤沢市に拠点を置く再生医療分野の研究・製造企業です。'],
    ['.partners article:nth-child(3) h4', 'AS Medical Support'],
    ['.partners article:nth-child(3) p', '専門的な支援と細胞処理・培養施設を提供する事業者です。'],
    ['#enmusubi .source-note', '掲載内容はENMUSUBIの資料に基づきます。医療サービスは医療機関への相談と評価を経てご案内します。'],
    ['.product-feature h3', 'Medicacell Type-I'],
    ['.product-feature>div>p:not(.eyebrow)', 'ENMUSUBIの基本プログラム資料に掲載された製品です。成分、目的、適合性については医療機関へご相談ください。'],
    ['.programs article:first-child p', '資料に基づきMedicacell Type-Iと支援の流れをご案内します。ご相談受付から日本での予定調整まで支援します。'],
    ['.programs article:last-child p', '資料では自己脂肪由来幹細胞（ADSC）のプログラムが紹介されています。採取、培養、実施は医師の計画に基づきます。'],
    ['#enmusubi .programs .num', '健康サポートプログラム'],
    ['#enmusubi .programs+.source-note', 'プログラムの選択、適応、医療行為は医療機関と医師が評価します。'],
    ['.care-steps li:nth-child(1) b', 'ご相談・事前準備'],
    ['.care-steps li:nth-child(1) span', 'ご希望を伺い、書類と相談予約を支援します。'],
    ['.care-steps li:nth-child(2) b', '専門機関との連携'],
    ['.care-steps li:nth-child(2) span', '医療機関と連携し、診察日程や医師の評価を調整します。'],
    ['.care-steps li:nth-child(3) b', '日本滞在中のサポート'],
    ['.care-steps li:nth-child(3) span', '医療ビザ、通訳、滞在日程の準備を支援します。'],
    ['.care-editorial .eyebrow', '寄り添い、つなぐ'],
    ['#enmusubi .benefits li:nth-child(1)', '書類、医療ビザ、日本での通訳を支援。'],
    ['#enmusubi .benefits li:nth-child(2)', '診察、滞在、医療ツーリズムの日程を調整。'],
    ['#enmusubi .benefits li:nth-child(3)', '職業訓練、人材、教育相談を連携。'],
    ['#enmusubi .benefits li:nth-child(4)', '日越双方の投資促進と企業連携を支援。'],
    ['.care-editorial h3', '一つの窓口で<br>途切れないサポート'],
    ['.care-editorial>div>p:not(.eyebrow)', 'ベトナムのお客様のご希望と日本の専門知識をつなぎ、安心して医療相談に臨めるよう準備をお手伝いします。'],
    ['.programs article:first-child h3', '予防的な<br>健康サポート'],
    ['.programs article:last-child h3', '一人ひとりに合わせた<br>専門プログラム'],
    ['#cong-dong .section-title h2', '分かち合うことで<br><em>価値が広がる</em>'],
    ['#cong-dong .section-title>div+ p', '企業活動に加え、地域の健康と子どもたちの安全を支える活動にも取り組んでいます。'],
    ['#cong-dong .eyebrow', '地域と共に'],
    ['.community-grid article:first-child .num', '01 / 地域の健康支援'],
    ['.community-grid article:last-child .num', '02 / 応急手当の教育'],
    ['.community-grid article:first-child .video-link>span:nth-child(2)', '活動動画を見る<small>YouTube · 医療を地域の人々へ</small>'],
    ['.community-grid article:last-child .reserved', 'プログラム写真<small>資料を準備中</small>'],
    ['.community-grid article:first-child .video-link small', 'YouTube · 医療を地域の人々へ'],
    ['.community-grid article:last-child .reserved small', '資料を準備中'],
    ['.community-grid article:first-child h3', '医療を<br>地域の人々へ'],
    ['.community-grid article:first-child>p', '医療相談・診療と生活に困難を抱える方々への贈り物を無償で提供し、地域に医療を届ける活動です。'],
    ['.community-grid article:last-child h3', 'いのちを守る<br>学びの場'],
    ['.community-grid article:last-child>p', '小中学生を対象とした応急手当の教育プログラムです。日常の緊急時に自ら行動できる知識と技能を学びます。'],
    ['.vision h2', '一人ひとりの力が<br>健やかな社会と<br><em>強いチームをつくる</em>'],
    ['.vision>p:not(.eyebrow)', 'キャリア形成、技能向上、学びへの投資を通じて、若者の未来と健康な社会づくりに貢献します。'],
    ['.vision .eyebrow', '創業者の想い'],
    ['.japan h2', '日本を知り、<br><em>人と人をつなぐ</em>'],
    ['.japan>div>p:not(.eyebrow):not(.jp-heading)', '日本はハイ氏がNOZOMIを始めた場所です。人々、文化、働く環境との深いつながりが、日越の人材育成への想いにつながっています。'],
    ['.japan>div>figure figcaption', '日本での文化交流と歩み'],
        ['#lien-he h2', '今日つながり、<br><em>明日をつくる</em>'],
    ['#lien-he .eyebrow', '06 / 新たな機会を共に'],
    ['#lien-he .jp-heading', '今日のつながりから、明日を創る。'],
    ['#lien-he>div:first-child>p:last-child', '人材育成、予防的ヘルスケア、日越企業連携についてお問い合わせください。'],
    ['#lien-he .contact-list article:first-child h3', 'NOZOMI 人材育成'],
    ['#lien-he .contact-list article:last-child h3', 'ENMUSUBI 日越連携'],
    ['#lien-he .contact-list article:first-child>p', 'ホーチミン市カットライ区63番通り 21番地'],
    ['#lien-he .contact-list article:last-child>p', 'クエン · ご相談・連携'],
    ['footer>span', 'グエン・ティ・トゥオン・ハイ <small>創業者プロフィール / 2026</small>'],
    ['.source-note', '提供資料をもとに編集しています。詳しい内容は関係機関へご確認ください。'],
    ['footer>a', 'ページ上部へ ↑']
    ,['.japan-signature small', '人と人をつなぎ、共に成長する']
    ,['.brand span', 'トゥオン・ハイ<br>創業者プロフィール']
    ,['.hero-art .portrait img', 'NOZOMIとENMUSUBIの創業者、グエン・ティ・トゥオン・ハイ氏']
    ,['.business-intro figure img', 'NOZOMIの学習環境']
    ,['#enmusubi .business-intro figure img', 'ENMUSUBIの医療連携資料']
    ,['.health-mosaic img', '日本での医療相談・連携に関する資料']
    ,['.product-feature img', 'ENMUSUBI資料掲載のMedicacell Type-I']
    ,['.care-editorial img', '日本の医療相談とケアを結ぶイメージ']
    ,['.community-grid .video-thumb img', '地域医療支援プログラムの動画サムネイル']
    ,['.japan .jp-heading', '文化を理解し、人をつなぐ']
    ,['#lien-he .contact-list article:last-child>p', 'クエン · ご相談・連携']
    ,['.vision>span', 'グエン・ティ・トゥオン・ハイ']
    ,['.japan-signature small', '人と人をつなぎ、共に成長する']
    ,['.business-chapter>.business-intro .eyebrow', '日越をつなぐ事業']
    ,['#nozomi>.business-intro .eyebrow', 'NOZOMI / 人材育成・キャリア支援']
    ,['#enmusubi>.business-intro .eyebrow', 'ENMUSUBI / 日越連携・ヘルスケア']
    ,['#enmusubi .business-intro figcaption', '医療連携に関する資料']
    ,['.health-mosaic img', '日本での医療相談・連携に関する資料']
    ,['.care-editorial img', '日本の医療相談とケアを結ぶイメージ']
    ,['.hero-art .portrait img', 'NOZOMIとENMUSUBIの創業者、グエン・ティ・トゥオン・ハイ氏']
    ,['.business-intro figure img', 'NOZOMIの学習環境']
    ,['#enmusubi .business-intro figure img', 'ENMUSUBIの医療連携資料']
    ,['.product-feature img', 'ENMUSUBI資料掲載のMedicacell Type-I']
    ,['.community-grid .video-thumb img', '地域医療支援プログラムの動画サムネイル']
    ,['#lien-he .contact-list article:first-child>p', 'ホーチミン市カットライ区63番通り21番地']
    ,['.vision>p:not(.eyebrow)', '職業訓練や技能向上、学びへの投資を通じて、若者の未来と健康な社会づくりに貢献します。']
    ,['.hero-bottom span:nth-child(1)', '国際貿易']
    ,['.hero-bottom span:nth-child(2)', '人材育成']
    ,['.hero-bottom span:nth-child(3)', '日越連携']
    ,['.hero-bottom a', 'スクロールしてご覧ください ↓']
    ,['.nozomi-gallery .subheading h3', '体験を通して<br>日本語と文化を学ぶ']
    ,['.care-editorial h3', '一つの窓口で<br>途切れないサポート']
    ,['.community-grid .reserved span', 'プログラム写真']
    ,['.community-grid .reserved small', '資料を準備中']
    ,['.community-grid article:first-child .video-link>span:nth-child(2)', '活動動画を見る<small>YouTube · 医療を地域の人々へ</small>']
    ,['.japan figcaption', '日本での文化交流と歩み']
    ,['footer>span', 'グエン・ティ・トゥオン・ハイ <small>創業者プロフィール / 2026</small>']
    ,['.source-note', '提供資料をもとに編集しています。詳しい内容は関係機関へご確認ください。']
    ,['#enmusubi .benefits h3', '一つの窓口で<br>多様な連携を支援']
    ,['.logistics-feature img', 'AI生成イメージ：ベトナム人研修生が日本でトラック運転を学ぶ様子']
    ,['.partners article:first-child img', '季朋会・王司病院のロゴ']
    ,['.partners article:first-child small', '山口県']
    ,['.partners article:nth-child(2) small', '神奈川県']
    ,['.partners article:nth-child(3) small', '福岡県']
    ,['.partners article:first-child .medical-logo+small', '医療法人社団 季朋会']
    ,['.partners article:nth-child(2) img', 'CellPro Japanのロゴ']
    ,['.partners article:nth-child(3) img', 'AS Medical Supportのロゴ']
    ,['.brand-history .brand-row img', '関連プロジェクトの企業ロゴ']
    ,['.contact>div>p:not(.eyebrow):not(.jp-heading)', '人材育成、予防的ヘルスケア、日越企業連携についてお問い合わせください。']
    ,['.logistics-copy .eyebrow', '物流分野の人材育成']
    ,['.logistics-copy h4', '物流を支える<br><em>人材を育成</em>']
    ,['.logistics-copy>p:not(.eyebrow)', '専門用語を含む日本語、安全意識、実践的な業務スキルを身につけ、日本企業の物流現場で活躍できる人材を育成します。']
    ,['.logistics-visuals img', '日本の物流分野における研修や輸送の様子']
    ,['.values article:nth-child(1) b', '学びを実践につなげる']
    ,['.values article:nth-child(1) p', '日本語を学習や日々の仕事で活用できる力を身につけます。']
    ,['.values article:nth-child(2) b', '仕事につながる学び']
    ,['.values article:nth-child(2) p', '職場での会話や実際の業務を想定した内容を学びます。']
    ,['.values article:nth-child(3) b', '社会人としての姿勢']
    ,['.values article:nth-child(3) p', '時間を守ることや責任感、周囲と協力する姿勢を身につけます。']
    ,['.values article:nth-child(4) b', '次の一歩に向けて']
    ,['.values article:nth-child(4) p', '新しい環境に適応し、長期的に成長するための基礎を整えます。']
    ,['.multisector-heading .eyebrow', '多分野に広がる人材育成']
    ,['.multisector-heading h3', '日本企業とともに<br><em>広がるキャリアの機会</em>']
    ,['.multisector-intro', '介護、サービス、製造、農業など幅広い分野に向けて、日本語、職業技能、日本の職場で求められる姿勢を身につける機会を提供します。']
    ,['.multisector-card:nth-child(1) b', '介護・健康支援']
    ,['.multisector-card:nth-child(1) span', '介護技術と思いやりのあるコミュニケーションを学ぶ']
    ,['.multisector-card:nth-child(2) b', '宿泊・サービス']
    ,['.multisector-card:nth-child(2) span', 'おもてなしの心とチームで働く姿勢を身につける']
    ,['.multisector-card:nth-child(3) b', '食品製造']
    ,['.multisector-card:nth-child(3) span', '衛生、安全、製造工程に沿った作業を学ぶ']
    ,['.multisector-card:nth-child(4) b', '製造・組立']
    ,['.multisector-card:nth-child(4) span', '専門技能とチームワークを磨く']
    ,['.multisector-card:nth-child(5) b', '先端農業']
    ,['.multisector-card:nth-child(5) span', '新しい栽培環境で技術を学ぶ']
    ,['.multisector-card:nth-child(6) b', '企業連携・調整']
    ,['.multisector-card:nth-child(6) span', '異文化のチームで連携・調整する力を育てる']
  ];
  const originals = new Map();
  const originalAttributes = new Map();
  const apply = (enabled) => {
    for (const [selector, japanese] of translations) {
      const elements = document.querySelectorAll(selector);
      elements.forEach((element) => {
        if (!originals.has(element)) originals.set(element, element.tagName === 'IMG' ? element.alt : element.innerHTML);
        if (element.tagName === 'IMG') element.alt = enabled ? japanese : originals.get(element);
        else element.innerHTML = enabled ? japanese : originals.get(element);
      });
    }
    document.querySelectorAll('h1,h2,h3,h4,h5,h6').forEach((heading) => {
      heading.innerHTML = heading.innerHTML.replace(/[。.]([\s<])/g, '$1').replace(/[。.]$/, '');
    });
    const switcher = document.querySelector('.company-switch');
    if (switcher) {
      if (!originalAttributes.has(switcher)) originalAttributes.set(switcher, switcher.getAttribute('aria-label'));
      switcher.setAttribute('aria-label', enabled ? '事業を選択' : originalAttributes.get(switcher));
    }
    const seal = document.querySelector('.seal');
    if (seal) {
      if (!originalAttributes.has(seal)) originalAttributes.set(seal, seal.getAttribute('aria-label'));
      seal.setAttribute('aria-label', enabled ? '縁' : originalAttributes.get(seal));
    }
    document.documentElement.lang = enabled ? 'ja' : 'vi';
    button.setAttribute('aria-pressed', String(enabled));
    button.textContent = enabled ? 'Tiếng Việt' : '日本語';
    document.title = enabled ? 'グエン・ティ・トゥオン・ハイ | 日越をつなぐ' : 'Nguyễn Thị Tường Hải | Những kết nối tạo nên giá trị';
  };
  button.addEventListener('click', () => apply(button.getAttribute('aria-pressed') !== 'true'));
})();
