const slides = [
  {
    id: 1,
    type: 'title',
    title: '软件定义汽车时代',
    subtitle: '奔驰的机遇与挑战',
    layout: 'center',
    image: null,
    note: '演讲时长 60 分钟 + 30 分钟交流。'
  },
  {
    id: 2,
    type: 'chapter',
    title: '开场',
    subtitle: '我是谁',
    layout: 'center',
    image: null,
    note: '预计 2 分钟。'
  },
  {
    id: 3,
    type: 'content',
    title: '我的角色',
    content: [
      '奔驰自动驾驶研发部门，云技术专家，技术负责人',
      '为奔驰全球研发体系打造基础设施，为当代和下一代电子电气架构构建云端开发平台',
      '从头参与奔驰第一代全自研操作系统 MB.OS 和 MMA 架构的研发过程',
      '今天分享的是我真实参与和看到的奔驰，不是新闻稿里的奔驰'
    ],
    layout: 'left',
    image: null,
    note: '个人权威性建设，简短即可。'
  },
  {
    id: 4,
    type: 'content',
    title: '先聊清楚：什么是「软件定义汽车」？',
    content: [
      '传统汽车：功能由硬件决定。车造好那天，它是什么样，以后就是什么样。',
      '软件定义汽车（SDV）：功能由软件决定。车造好之后，通过软件更新，它可以不断获得新能力。',
      '',
      '打个比方：',
      '传统汽车 = 功能手机，出厂什么样，永远什么样',
      'SDV = 智能手机，系统升级后同一部手机有了新功能 — 空中升级（OTA）',
      '',
      '本质：这不是技术概念，是商业模式概念 —— <b>车的价值不再在交付日锁定，而是可以持续增长。</b>'
    ],
    layout: 'left',
    image: null,
    note: '用手机类比。此处要点出 OTA 为后面铺垫。最后一句点出商业本质。'
  },
  {
    id: 5,
    type: 'chapter',
    title: '第一章',
    subtitle: '燃油车时代：硬件的黄金秩序',
    layout: 'center',
    image: null,
    note: '预计 8 分钟。'
  },
  {
    id: 6,
    type: 'content',
    title: '硬件定义汽车的时代',
    content: [
      '决定车辆体验和差异化的核心：发动机、变速箱、底盘 —— 三大件占总成本 30%+',
      '行业权力结构：OEM → Tier1 → Tier2 → Tier3，金字塔式的供应链体系',
      'OEM 站在塔尖：定标准、做集成，Tier1 负责具体实现',
      '豪华品牌的护城河：<b>大排量发动机、精致内饰、优雅外观、底盘和变速箱带来的舒适驾乘体验</b>',
      '这是一个稳定、利润可预测的旧世界 —— 直到两件事发生'
    ],
    layout: 'left',
    image: null,
    note: '强调「豪华品牌的护城河」，为后面 EV 时代差异化消失做铺垫。'
  },
  {
    id: 7,
    type: 'content',
    title: '电气架构的碎片化',
    content: [
      '一台豪华车搭载 80-120 个 ECU（奔驰 S 级 100+），通过 CAN/LIN 总线通信',
      '每个 ECU 对 OEM 都是「黑盒」—— 只管接口标准，不管内部实现',
      '后果：<b>车辆出厂后功能即锁定，OEM 不拥有自己产品的「灵魂」</b>',
      '100 个黑盒加在一起，不会自动变成白盒'
    ],
    layout: 'left',
    image: null,
    note: '「黑盒」和「灵魂」两个关键词。为后面「夺回话语权」埋线。'
  },
  {
    id: 8,
    type: 'chapter',
    title: '第二章',
    subtitle: '变局——电动化 + 智能化',
    layout: 'center',
    image: null,
    note: '预计 12 分钟。'
  },
  {
    id: 9,
    type: 'content',
    title: '电动化：BOM 结构被重置',
    content: [
      '燃油车价值锚点：排量、马力、声浪、操控质感',
      '电动车价值锚点：续航、充电速度、加速、智能座舱',
      '',
      'BOM 成本结构对比（S-Class vs EQS）：',
      '<b>S-Class</b>：动力总成（发动机+变速箱）≈ 25-30%，内饰 ≈ 20%',
      '<b>EQS</b>：<b>电池单独占 30-40%</b>，是整车成本的最大单点',
      '',
      '关键变化：ICE 成本分散在多个机械模块 → EV 成本极度集中在电池',
      '→ <b>权力从 OEM 向电池供应商转移</b>'
    ],
    layout: 'left',
    image: null,
    note: '有具体数据支撑。「权力转移」是贯穿全篇的分析主线。'
  },
  {
    id: 10,
    type: 'content',
    title: 'BOM 成本结构：S-Class vs EQS',
    content: [
      'S-Class：动力总成（发动机+变速箱）≈ 25-30% → 机械复杂度高，成本分散',
      'EQS：<b>电池单独占 30-40%</b> → 材料成本高，成本极度集中',
      '',
      '关键差异：',
      '—— ICE 成本分布在多个模块（发动机、变速箱、底盘……）',
      '—— EV 成本被一个模块主导（电池），无法通过工程优化大幅降本',
      '—— EQS 零件数减少 ~30%，但电池成本抵消了所有节省',
      '',
      '结果：EV 的 BOM 反而比同级别燃油车更高，奔驰 BEV 利润差的核心原因在此'
    ],
    layout: 'columns',
    wider: true,
    image: null,
    chart: {
      type: 'stacked',
      bars: [
        {
          dataKey: 'powertrain',
          name: '动力核心（发动机 / 电池）',
          color: '#ef4444'
        },
        {
          dataKey: 'drivetrain',
          name: '驱动系统（底盘 / 电驱）',
          color: '#f59e0b'
        },
        {
          dataKey: 'body',
          name: '车身结构',
          color: '#34d399'
        },
        {
          dataKey: 'interior',
          name: '内饰',
          color: '#fbbf24'
        },
        {
          dataKey: 'electronics',
          name: '电子电气',
          color: '#a78bfa'
        },
        {
          dataKey: 'other',
          name: '其他（热管理等）',
          color: '#9ca3af'
        }
      ],
      data: [
        {
          label: 'S-Class',
          powertrain: 29,
          drivetrain: 12,
          body: 18,
          interior: 19,
          electronics: 14,
          other: 8
        },
        {
          label: 'EQS',
          powertrain: 34,
          drivetrain: 18,
          body: 16,
          interior: 13,
          electronics: 12,
          other: 7
        }
      ],
      height: 340,
      unit: '%'
    },
    chartAlt: {
      type: 'stacked',
      bars: [
        {
          dataKey: 'oem',
          name: 'OEM 可控成本',
          color: '#4f8cff'
        },
        {
          dataKey: 'supplier',
          name: '供应商控制成本',
          color: '#ef4444'
        }
      ],
      data: [
        {
          label: 'S-Class',
          oem: 78,
          supplier: 22
        },
        {
          label: 'EQS',
          oem: 41,
          supplier: 59
        }
      ],
      height: 340,
      unit: '%'
    },
    sources: [
      'S-Class BOM 基于行业 50% 规则估算（售价 €100k-150k → BOM €50k-70k）',
      'EQS BOM 基于 EVA 平台分析，电池 pack 级成本 €15k-25k（107.8-118 kWh）',
      '数据来源：Mercedes-Benz Group Annual Reports, DriveDuel UK, Electro IQ（2020-2025）'
    ],
    note: '数据归一化到 100%。点击图表切换视图：模块构成 / OEM vs 供应商控制权。EQS 电池 34% 为供应商控制，是利润差核心。'
  },
  {
    id: 11,
    type: 'content',
    title: '软件化：从分布式 ECU 到域控制器',
    content: [
      'OTA（空中升级）= 车辆出厂后仍能通过软件获得新功能',
      '但 100+ ECU 由不同 Tier1 开发，技术栈各不相同 → 想做一次统一固件升级几乎不可能',
      '',
      '解决路径：分布式 ECU 架构 → 域控制器（DCU）架构',
      '把相似功能区域整合到一个域控制器中，统一软件标准',
      '这正是我们团队在做的事 —— 搭建 DCU 云平台，支持远程刷机、CAN Bus 模拟、日志分析',
      '',
      '→ <b>权力从 Tier1 向 OEM 回流 —— 前提是 OEM 自己学会写软件</b>'
    ],
    layout: 'left',
    image: null,
    note: '将自己团队的工作嵌入叙事，增加可信度。'
  },
  {
    id: 12,
    type: 'content',
    title: '旧金字塔的瓦解',
    content: [
      '在电动化和软件化两条线的夹击下：',
      '',
      'OEM 被迫向上游（软件/电子）渗透 → 与 Tier1 从甲乙方变竞合',
      'OEM 被迫向下游（用户体验/数据）延伸 → 软件订阅、功能付费',
      '电池等新核心出现 → OEM 对新供应商话语权下降',
      '',
      '这不是一次技术升级，<b>这是一场行业权力结构的重组。</b>'
    ],
    layout: 'left',
    image: null,
    note: '转折点。「权力重组」概括全文。'
  },
  {
    id: 13,
    type: 'chapter',
    title: '第三章',
    subtitle: '挑战——转型为什么这么难',
    layout: 'center',
    image: null,
    note: '预计 15 分钟。从组织、人才、工具三个维度，再加一个独特视角：豪华差异化消失。'
  },
  {
    id: 14,
    type: 'content',
    title: '挑战一：组织文化的冲突',
    content: [
      '奔驰口号：「我们要成为一家软件公司！」→ 全球招聘 3000 名程序员',
      '但现实：从董事会到中层，几乎没有软件背景的管理者',
      '',
      '更深层的矛盾：',
      '汽车制造文化 = 流程驱动，容错率极低（硬件召回成本巨大）',
      '软件开发文化 = 迭代驱动，允许快速试错（软件可以持续更新）',
      '用制造 V6 发动机的流程管理写代码的团队，很难不水土不服',
      '',
      '我的观察：<b>奔驰转型为软件公司的决心不够坚定。</b> 口号喊了，人也招了，但组织的骨架没有变。'
    ],
    layout: 'left',
    image: null,
    note: '此处加入个人判断：「决心不够坚定」，用观察支撑。'
  },
  {
    id: 15,
    type: 'content',
    title: '挑战二：人才与工具链的缺口',
    content: [
      '招 3000 个程序员不难，难的是：',
      '管理层的考核激励仍然是「交付了多少辆车」，不是「交付了多少软件能力」',
      '汽车行业的薪酬体系和互联网不在一个赛道上',
      '',
      '工具链缺口同样致命：',
      '传统模式下，研发工具链积累在 Tier1 手里，不在 OEM 手里',
      'CI/CD、测试环境、仿真平台 —— 都要从零搭建',
      '我们团队的 DCU 云平台本质上就是在补这个课：「边砍柴边磨刀」'
    ],
    layout: 'left',
    image: null,
    note: '人才和工具链合并为一个挑战。更紧凑。'
  },
  {
    id: 16,
    type: 'content',
    title: '挑战三：豪华差异化在电动车时代消失了',
    content: [
      '燃油车时代，奔驰的豪华心智模型由自己定义：',
      '—— 大排量发动机的声浪和动力、精致的内饰设计、优雅的车身线条、舒适的驾乘体验',
      '',
      '电动车时代，这些差异化逐一瓦解：',
      '—— 电机没有声浪，加速人人可做（Model 3 Performance 零百 3.3 秒）',
      '—— 早期 EQ 系列为续航牺牲外观设计，风阻系数做到了极致，但失去了奔驰一贯的美感',
      '—— 自研 MBUX 娱乐系统初期稳定性和可靠性问题频出',
      '—— 加速、续航、智能化等新卖点，奔驰不占优',
      '',
      '结果：<b>当差异化消失，溢价能力就消失了。</b>'
    ],
    layout: 'left',
    image: null,
    note: '这是你的独特洞察，是整场演讲的差异化内容。用「豪华心智模型」这个框架来分析。'
  },
  {
    id: 17,
    type: 'content',
    title: '数据不会说谎：奔驰的销量与电气化进程',
    content: [
      '总销量 2020→2025：216万 → 209万 → 204万 → 204万 → 198万 → <b>180万（-9%）</b>',
      '连续下滑，2025 年跌破 200 万关口',
      '',
      'BEV（纯电）不升反降：',
      '2023 年 22.3 万 → 2024 年 18.5 万（<b>-23%</b>）→ 2025 年 16.9 万（<b>-9%</b>）',
      '更扎心的是：<b>PHEV（插混）卖得比 BEV 多</b> —— 2025 年 PHEV 20.0 万 vs BEV 16.9 万',
      '',
      '电动化占比（含 PHEV）卡在 ~20%，三年没动。',
      '<b>奔驰的电动化不是加速，是倒车。</b>'
    ],
    layout: 'columns',
    image: null,
    chart: {
      type: 'combo',
      bars: [
        {
          dataKey: 'total',
          name: '总销量（万辆）',
          color: '#4f8cff'
        }
      ],
      lines: [
        {
          dataKey: 'bev',
          name: 'BEV 销量（万辆）',
          color: '#a78bfa'
        }
      ],
      data: [
        {
          label: '2020',
          total: 216,
          bev: 1.9
        },
        {
          label: '2021',
          total: 209,
          bev: 4.9
        },
        {
          label: '2022',
          total: 204,
          bev: 11.8
        },
        {
          label: '2023',
          total: 204,
          bev: 22.3
        },
        {
          label: '2024',
          total: 198,
          bev: 18.5
        },
        {
          label: '2025',
          total: 180,
          bev: 16.9
        }
      ],
      height: 280
    },
    note: '2025 年数据为最新验证数据。BEV 连续两年下滑是最有冲击力的数据点。PHEV 反超 BEV 说明奔驰的电动化实际上在倒退。'
  },
  {
    id: 18,
    type: 'content',
    title: '财务维度：收入在降，研发在涨',
    content: [
      '收入：€154bn（2020）→ <b>€132bn（2025）</b>，累计缩水 14%',
      'EBIT 从 €29.7bn（2021 峰值）跌至 ~€8bn（2025）—— <b>利润蒸发超 70%</b>',
      '',
      '但研发费用占比不降反升：',
      '2020 年 R&D 占收入 ~6% → 2024-2025 年 <b>8%+</b>',
      '软件（MB.OS）、自动驾驶、电动平台三线烧钱',
      '',
      '双重挤压：',
      '<b>卖车变少 → 收入变少 → 但研发一分不能少</b>',
      '这就是传统车企转型的真实财务代价。'
    ],
    layout: 'columns',
    image: null,
    chart: {
      type: 'combo',
      bars: [
        {
          dataKey: 'revenue',
          name: '收入（€bn）',
          color: '#4f8cff'
        }
      ],
      lines: [
        {
          dataKey: 'ebit',
          name: 'EBIT（€bn）',
          color: '#f59e0b'
        }
      ],
      data: [
        {
          label: '2020',
          revenue: 154,
          ebit: 6.6
        },
        {
          label: '2021',
          revenue: 168,
          ebit: 29.7
        },
        {
          label: '2022',
          revenue: 153,
          ebit: 20.5
        },
        {
          label: '2023',
          revenue: 150,
          ebit: 19.7
        },
        {
          label: '2024',
          revenue: 146,
          ebit: 13.6
        },
        {
          label: '2025',
          revenue: 132,
          ebit: 8.5
        }
      ],
      height: 280
    },
    note: 'EBIT 2021 年峰值受益于疫情后高端需求释放，不可持续。核心叙事：双重挤压。'
  },
  {
    id: 19,
    type: 'chapter',
    title: '第四章',
    subtitle: '机遇——夺回话语权，还是陷入新依赖？',
    layout: 'center',
    image: null,
    note: '预计 12 分钟。'
  },
  {
    id: 20,
    type: 'content',
    title: '机遇：从 Tier1 手中夺回研发话语权',
    content: [
      'SDV 给 OEM 提供了一个历史性机会：',
      '',
      '过去：Tier1 控制每个 ECU 内部实现，OEM 只看到接口 → 车的「灵魂」在供应商手里',
      '',
      'SDV 逻辑下：',
      'OEM 通过域控制器统一硬件平台，通过自研软件定义功能',
      '→ <b>第一次有机会把软件研发的控制权拿回来</b>',
      '→ 有机会重新定义「一辆奔驰应该是什么样的」',
      '',
      '这是我们团队搭建 DCU 云平台的深层意义：让奔驰具备自己写软件、自己测试、自己迭代的能力。'
    ],
    layout: 'left',
    image: null,
    note: '机遇论点。要点：不仅是技术控制权，更是品牌定义权。'
  },
  {
    id: 21,
    type: 'content',
    title: '悖论：旧依赖解除，新依赖产生',
    content: [
      '从 Tier1 手中夺回控制权的同时，奔驰发现自己陷入了新的依赖：',
      '',
      '芯片：与英伟达合作 Orin/DRIVE 平台 —— 英伟达甚至可以从整车销售中获得利润分成',
      '电池：宁德时代、LG、比亚迪掌握 35-45% 的成本核心',
      '',
      '区别在哪？',
      '旧依赖 =「你帮我做」，OEM 是甲方',
      '新依赖 =「我们一起做」，双方都没经验，合作关系从甲乙方变成了竞合实验',
      '',
      '奔驰的处境变了：<b>从制定标准的人，变成了和其他人一起摸索的人。</b>'
    ],
    layout: 'left',
    image: null,
    note: '核心悖论。SDV 让 OEM 有机会夺回控制权，但新领域的话语权不在 OEM 熟悉的地方。'
  },
  {
    id: 22,
    type: 'content',
    title: '一个真实的开发故事',
    subtitle: '叙事高潮',
    content: [
      '（此处放入你的真实经历，2-3 分钟）'
    ],
    layout: 'center',
    image: null,
    note: '演讲者自己准备的真实故事。'
  },
  {
    id: 23,
    type: 'chapter',
    title: '回顾',
    subtitle: '今天聊了什么',
    layout: 'center',
    image: null,
    note: '预计 3 分钟。'
  },
  {
    id: 24,
    type: 'content',
    title: '回顾',
    content: [
      '软件定义汽车：功能由软件决定，价值可以持续增长 —— 本质上是一个商业模式的变革',
      '',
      '燃油车时代：硬件定义体验，OEM 站在金字塔尖，豪华心智模型由自己塑造',
      '',
      '变局：电动化重置成本结构，软件化要求 OEM 学会自己写代码 —— 两股力量同时推动权力重组',
      '',
      '挑战：组织文化、人才工具链、<b>以及最关键的 —— 豪华差异化在电动车时代的消失</b>',
      '',
      '机遇与悖论：SDV 给了 OEM 夺回话语权的机会，但新的话语权不在 OEM 熟悉的地方。',
      '旧依赖解除了，新依赖又产生了。这是所有传统豪华品牌共同面对的困局。'
    ],
    layout: 'left',
    image: null,
    note: '一段一点，对应前文结构。加入「豪华差异化」作为独立要点。最后自然过渡到 Q&A。'
  },
  {
    id: 25,
    type: 'end',
    title: '谢谢',
    subtitle: 'Q & A',
    layout: 'center',
    image: null,
    note: ''
  }
]

export default slides
