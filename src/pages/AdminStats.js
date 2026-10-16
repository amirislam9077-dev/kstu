import React, { useEffect, useState } from 'react';

// Performance cards at the top of the admin: today, this month, all time, and
// orders still waiting for action.

const money = (value) => `Rs.${Math.round(Number(value) || 0).toLocaleString('en-PK')}`;

const dayString = (date) => {
  const pad = (n) => String(n).padStart(2, '0');
  return `${date.getFullYear()}-${pad(date.getMonth() + 1)}-${pad(date.getDate())}`;
};

const Icon = ({ path }) => (
  <svg viewBox="0 0 24 24" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
    {path}
  </svg>
);

const AdminStats = ({ request, statusCounts, refreshKey }) => {
  const [stats, setStats] = useState(null);

  useEffect(() => {
    let cancelled = false;
    const now = new Date();
    const today = dayString(now);
    const monthStart = dayString(new Date(now.getFullYear(), now.getMonth(), 1));
    Promise.all([
      request(`/admin/reports?from=${today}&to=${today}`),
      request(`/admin/reports?from=${monthStart}&to=${today}`),
      request('/admin/reports')
    ])
      .then(([day, month, all]) => {
        if (!cancelled) setStats({ day: day.summary, month: month.summary, all: all.summary });
      })
      .catch(() => {});
    return () => {
      cancelled = true;
    };
  }, [request, refreshKey]);

  const waiting = (statusCounts.new || 0) + (statusCounts.confirmed || 0);

  const cards = [
    {
      key: 'today',
      label: "Today's sales",
      value: stats ? money(stats.day.revenue) : '…',
      note: stats ? `${stats.day.orders} order${stats.day.orders === 1 ? '' : 's'} today` : '',
      tone: 'blue',
      icon: <Icon path={<><circle cx="12" cy="12" r="9" /><path d="M12 7v5l3 2" /></>} />
    },
    {
      key: 'month',
      label: 'This month',
      value: stats ? money(stats.month.revenue) : '…',
      note: stats ? `${stats.month.orders} orders · ${stats.month.items} pieces` : '',
      tone: 'green',
      icon: <Icon path={<><rect x="3" y="4" width="18" height="17" rx="2" /><path d="M3 9h18M8 2v4M16 2v4" /></>} />
    },
    {
      key: 'all',
      label: 'Total sales',
      value: stats ? money(stats.all.revenue) : '…',
      note: stats ? `Avg. order ${money(stats.all.average)}` : '',
      tone: 'purple',
      icon: <Icon path={<><path d="M3 17l6-6 4 4 8-8" /><path d="M14 7h7v7" /></>} />
    },
    {
      key: 'waiting',
      label: 'Need action',
      value: waiting,
      note: `${statusCounts.new || 0} new · ${statusCounts.confirmed || 0} to ship`,
      tone: 'orange',
      icon: <Icon path={<><path d="M12 9v4M12 17h.01" /><path d="M10.3 3.9L2 18a2 2 0 0 0 1.7 3h16.6A2 2 0 0 0 22 18L13.7 3.9a2 2 0 0 0-3.4 0z" /></>} />
    }
  ];

  return (
    <div className="admin-stats">
      {cards.map((card) => (
        <div key={card.key} className={`admin-stat admin-stat--${card.tone}`}>
          <span className="admin-stat-icon">{card.icon}</span>
          <div>
            <span className="admin-stat-label">{card.label}</span>
            <strong className="admin-stat-value">{card.value}</strong>
            <span className="admin-stat-note">{card.note}</span>
          </div>
        </div>
      ))}
    </div>
  );
};

export default AdminStats;
