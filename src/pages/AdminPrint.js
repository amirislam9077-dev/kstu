import React from 'react';

// Printable list of orders (Print / Save as PDF). Shown only on paper.

const STATUS_LABELS = {
  new: 'New',
  confirmed: 'Confirmed',
  shipped: 'Shipped',
  delivered: 'Delivered',
  cancelled: 'Cancelled'
};

const money = (value) => `Rs.${Number(value || 0).toLocaleString('en-PK', { maximumFractionDigits: 0 })}`;

const date = (value) => {
  const d = new Date(String(value || '').replace(' ', 'T'));
  return Number.isNaN(d.getTime())
    ? value
    : d.toLocaleString('en-PK', { day: '2-digit', month: 'short', year: 'numeric', hour: '2-digit', minute: '2-digit' });
};

const AdminPrint = ({ sheet }) => {
  if (!sheet) {
    return null;
  }
  const { orders, title, filtersText } = sheet;
  const total = orders.reduce((sum, order) => sum + Number(order.subtotal || 0), 0);

  return (
    <div className="admin-print">
      <div className="admin-print-head">
        <div>
          <div className="admin-print-brand">KHURRAM STUDIO</div>
          <h1>{title}</h1>
          {filtersText && <p>{filtersText}</p>}
        </div>
        <div className="admin-print-meta">
          Printed {date(new Date().toISOString())}
          <br />
          {orders.length} orders · {money(total)}
        </div>
      </div>

      <table>
        <thead>
          <tr>
            <th>Order #</th>
            <th>Date</th>
            <th>Customer</th>
            <th>City</th>
            <th>Items</th>
            <th>Collections</th>
            <th className="num">Total</th>
            <th>Status</th>
          </tr>
        </thead>
        <tbody>
          {orders.map((order) => (
            <tr key={order.id}>
              <td>#{order.id}</td>
              <td>{date(order.created_at)}</td>
              <td>
                {order.customer_name}
                <br />
                <small>{order.phone}</small>
              </td>
              <td>{order.city}</td>
              <td>{order.item_count}</td>
              <td>{order.collections || '-'}</td>
              <td className="num">{money(order.subtotal)}</td>
              <td>{STATUS_LABELS[order.status] || order.status}</td>
            </tr>
          ))}
        </tbody>
        <tfoot>
          <tr>
            <td colSpan={6}>Total ({orders.length} orders)</td>
            <td className="num">{money(total)}</td>
            <td />
          </tr>
        </tfoot>
      </table>
    </div>
  );
};

export default AdminPrint;
