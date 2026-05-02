import { useRef, useState, useEffect } from 'react'
import {
  ComposedChart,
  BarChart,
  Bar,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  Legend,
  LabelList,
} from 'recharts'

const palette = {
  bar: ['#4f8cff', '#3b6fd4', '#2563eb'],
  line: ['#a78bfa', '#f59e0b', '#34d399', '#f472b6'],
  grid: 'rgba(255,255,255,0.06)',
  axis: 'rgba(255,255,255,0.25)',
  tooltipBg: 'rgba(20,20,30,0.95)',
  tooltipBorder: 'rgba(255,255,255,0.1)',
}

function CustomTooltip({ active, payload, label }) {
  if (!active || !payload?.length) return null
  const unit = payload[0]?.payload?.unit || ''
  return (
    <div style={{
      background: palette.tooltipBg,
      border: `1px solid ${palette.tooltipBorder}`,
      borderRadius: 8,
      padding: '10px 14px',
      fontSize: 13,
      lineHeight: 1.6,
    }}>
      <div style={{ color: 'rgba(255,255,255,0.5)', marginBottom: 4 }}>{label}</div>
      {payload.map((entry, i) => (
        <div key={i} style={{ color: entry.color, fontWeight: 600 }}>
          {entry.name}: {entry.value}{unit}
        </div>
      ))}
    </div>
  )
}

export default function SlideChart({ config }) {
  const {
    type = 'combo',
    bars = [],
    lines = [],
    data = [],
    height = 260,
    xKey = 'label',
    unit = '',
  } = config

  const containerRef = useRef(null)
  const [width, setWidth] = useState(600)

  useEffect(() => {
    const el = containerRef.current
    if (!el) return
    const ro = new ResizeObserver(([entry]) => {
      if (entry?.contentRect?.width) setWidth(entry.contentRect.width)
    })
    ro.observe(el)
    setWidth(el.offsetWidth || 600)
    return () => ro.disconnect()
  }, [])

  if (!data.length) return null

  const enrichedData = data.map(d => ({ ...d, unit: d.unit || unit }))
  const isCompact = width < 500

  // ── Stacked bar chart ──
  if (type === 'stacked') {
    const segs = bars.map((b, i) => ({
      ...b,
      color: b.color || palette.bar[i % palette.bar.length],
    }))

    // Dynamic bar size: on mobile, fit 2 bars with gaps
    const nBars = enrichedData.length || 2
    const barW = Math.min(140, Math.max(48, (width - 60) / (nBars * 1.6)))

    const makeStackLabel = (label) => (props) => {
      const { x, y, width: w, height: h, value } = props
      if (h < 18 || (isCompact && h < 28)) return null
      const fs = isCompact ? 10 : 12
      const fsVal = isCompact ? 11 : 13
      const showName = !isCompact || h > 36
      return (
        <text x={x + w / 2} y={y + h / 2}
          textAnchor="middle" dominantBaseline="central"
          fill="rgba(255,255,255,0.92)" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          {showName && <tspan x={x + w / 2} dy={h > 40 ? -4 : -2} fontSize={fs} fontWeight={600}>{label}</tspan>}
          <tspan x={x + w / 2} dy={showName ? (h > 40 ? 16 : 14) : 0} fontSize={fsVal} fontWeight={700}>{value}%</tspan>
        </text>
      )
    }

    return (
      <div className="slide-chart slide-chart-stacked" style={{ height: isCompact ? Math.min(height, 240) : height, minHeight: 180 }} ref={containerRef}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={enrichedData} margin={isCompact ? { top: 4, right: 8, left: 0, bottom: 0 } : { top: 8, right: 32, left: 0, bottom: 0 }}
            barGap={0} barCategoryGap={isCompact ? '25%' : '35%'}>
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grid} vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: palette.axis, fontSize: isCompact ? 11 : 14, fontWeight: 600 }}
              tickLine={false}
              axisLine={{ stroke: palette.grid }}
            />
            <YAxis hide />
            <Tooltip content={<CustomTooltip />} />
            {segs.map((s, i) => (
              <Bar
                key={s.dataKey}
                dataKey={s.dataKey}
                name={s.name}
                fill={s.color}
                stackId="stack"
                radius={i === segs.length - 1 ? [5, 5, 0, 0] : [0, 0, 0, 0]}
                barSize={barW}
                isAnimationActive={false}
              >
                <LabelList dataKey={s.dataKey} content={makeStackLabel(s.name)} />
              </Bar>
            ))}
          </BarChart>
        </ResponsiveContainer>
      </div>
    )
  }

  // ── Combo chart (bars + lines) ──
  const barConfigs = bars.map((b, i) => ({
    ...b,
    color: b.color || palette.bar[i % palette.bar.length],
  }))

  const lineConfigs = lines.map((l, i) => ({
    ...l,
    color: l.color || palette.line[i % palette.line.length],
  }))

  const renderCombo = () => (
    <ComposedChart data={enrichedData} margin={isCompact ? { top: 4, right: 4, left: -10, bottom: 0 } : { top: 8, right: 8, left: -10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={palette.grid} vertical={false} />
      <XAxis
        dataKey={xKey}
        tick={{ fill: palette.axis, fontSize: isCompact ? 10 : 12 }}
        tickLine={false}
        axisLine={{ stroke: palette.grid }}
        interval={isCompact ? 1 : 0}
      />
      <YAxis
        yAxisId="left"
        tick={{ fill: palette.axis, fontSize: isCompact ? 9 : 11 }}
        tickLine={false}
        axisLine={false}
        width={isCompact ? 30 : 40}
      />
      {lineConfigs.length > 0 && (
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: palette.axis, fontSize: isCompact ? 9 : 11 }}
          tickLine={false}
          axisLine={false}
          width={isCompact ? 30 : 40}
        />
      )}
      <Tooltip content={<CustomTooltip />} />
      {(barConfigs.length > 0 || lineConfigs.length > 0) && (
        <Legend
          wrapperStyle={{ fontSize: isCompact ? 10 : 12, paddingTop: 8, color: 'rgba(255,255,255,0.6)' }}
        />
      )}
      {barConfigs.map((b) => (
        <Bar
          key={b.dataKey}
          yAxisId="left"
          dataKey={b.dataKey}
          name={b.name}
          fill={b.color}
          radius={[4, 4, 0, 0]}
          barSize={isCompact ? 18 : 28}
        />
      ))}
      {lineConfigs.map((l) => (
        <Line
          key={l.dataKey}
          yAxisId="right"
          type="monotone"
          dataKey={l.dataKey}
          name={l.name}
          stroke={l.color}
          strokeWidth={isCompact ? 2 : 2.5}
          dot={{ fill: l.color, r: isCompact ? 3 : 4, strokeWidth: 0 }}
          activeDot={{ r: isCompact ? 4 : 6, strokeWidth: 0 }}
        />
      ))}
    </ComposedChart>
  )

  return (
    <div className="slide-chart" style={{ height: isCompact ? Math.min(height, 220) : height, minHeight: 160 }} ref={containerRef}>
      <ResponsiveContainer width="100%" height="100%">
        {renderCombo()}
      </ResponsiveContainer>
    </div>
  )
}
