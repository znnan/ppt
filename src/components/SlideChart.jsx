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

  if (!data.length) return null

  // Attach unit to data points for tooltip
  const enrichedData = data.map(d => ({ ...d, unit: d.unit || unit }))

  // ── Stacked bar chart ──
  if (type === 'stacked') {
    const segs = bars.map((b, i) => ({
      ...b,
      color: b.color || palette.bar[i % palette.bar.length],
    }))

    const makeStackLabel = (label) => (props) => {
      const { x, y, width, height, value } = props
      if (height < 22) return null
      return (
        <text x={x + width / 2} y={y + height / 2}
          textAnchor="middle" dominantBaseline="central"
          fill="rgba(255,255,255,0.92)" style={{ textShadow: '0 1px 3px rgba(0,0,0,0.5)' }}>
          <tspan x={x + width / 2} dy={height > 40 ? -4 : -2} fontSize={12} fontWeight={600}>{label}</tspan>
          <tspan x={x + width / 2} dy={height > 40 ? 16 : 14} fontSize={13} fontWeight={700}>{value}%</tspan>
        </text>
      )
    }

    return (
      <div className="slide-chart slide-chart-stacked" style={{ height }}>
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={enrichedData} margin={{ top: 8, right: 32, left: 0, bottom: 0 }}
            barGap={0} barCategoryGap="35%">
            <CartesianGrid strokeDasharray="3 3" stroke={palette.grid} vertical={false} />
            <XAxis
              dataKey={xKey}
              tick={{ fill: palette.axis, fontSize: 14, fontWeight: 600 }}
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
                barSize={140}
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
    <ComposedChart data={enrichedData} margin={{ top: 8, right: 8, left: -10, bottom: 0 }}>
      <CartesianGrid strokeDasharray="3 3" stroke={palette.grid} vertical={false} />
      <XAxis
        dataKey={xKey}
        tick={{ fill: palette.axis, fontSize: 12 }}
        tickLine={false}
        axisLine={{ stroke: palette.grid }}
      />
      <YAxis
        yAxisId="left"
        tick={{ fill: palette.axis, fontSize: 11 }}
        tickLine={false}
        axisLine={false}
        width={40}
      />
      {lineConfigs.length > 0 && (
        <YAxis
          yAxisId="right"
          orientation="right"
          tick={{ fill: palette.axis, fontSize: 11 }}
          tickLine={false}
          axisLine={false}
          width={40}
        />
      )}
      <Tooltip content={<CustomTooltip />} />
      {(barConfigs.length > 0 || lineConfigs.length > 0) && (
        <Legend
          wrapperStyle={{ fontSize: 12, paddingTop: 10, color: 'rgba(255,255,255,0.6)' }}
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
          barSize={28}
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
          strokeWidth={2.5}
          dot={{ fill: l.color, r: 4, strokeWidth: 0 }}
          activeDot={{ r: 6, strokeWidth: 0 }}
        />
      ))}
    </ComposedChart>
  )

  return (
    <div className="slide-chart" style={{ height }}>
      <ResponsiveContainer width="100%" height="100%">
        {renderCombo()}
      </ResponsiveContainer>
    </div>
  )
}
