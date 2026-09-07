import React, { useState, useEffect } from 'react';
import { useParams, Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';
import { 
  ArrowLeft, 
  Truck, 
  Printer, 
  MapPin, 
  CreditCard, 
  Clock, 
  CheckCircle2, 
  AlertCircle, 
  Package, 
  RefreshCw,
  XCircle,
  FileText
} from 'lucide-react';

const statusBadgeConfig = {
  Pending: { bg: 'bg-amber-50', text: 'text-amber-700', border: 'border-amber-200' },
  Processing: { bg: 'bg-blue-50', text: 'text-blue-700', border: 'border-blue-200' },
  Confirmed: { bg: 'bg-indigo-50', text: 'text-indigo-700', border: 'border-indigo-200' },
  Packed: { bg: 'bg-purple-50', text: 'text-purple-700', border: 'border-purple-200' },
  Shipped: { bg: 'bg-cyan-50', text: 'text-cyan-700', border: 'border-cyan-200' },
  'Out for Delivery': { bg: 'bg-orange-50', text: 'text-orange-700', border: 'border-orange-200' },
  Delivered: { bg: 'bg-emerald-50', text: 'text-emerald-700', border: 'border-emerald-200' },
  Cancelled: { bg: 'bg-red-50', text: 'text-red-700', border: 'border-red-200' }
};

const OrderDetail = () => {
  const { orderId } = useParams();
  const { authFetch } = useAuth();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchOrderDetail();
  }, [orderId]);

  const fetchOrderDetail = async () => {
    setLoading(true);
    setError('');
    try {
      const res = await authFetch(`/api/orders/${orderId}`);
      const data = await res.json();
      if (!res.ok || !data.success) {
        throw new Error(data.message || 'Order not found or unauthorized.');
      }
      setOrder(data.order);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  if (loading) {
    return (
      <div className="min-h-[70vh] flex flex-col items-center justify-center bg-stone-50 text-stone-500 gap-3">
        <RefreshCw className="w-8 h-8 animate-spin text-amber-700" />
        <p className="text-sm font-medium">Loading order details...</p>
      </div>
    );
  }

  if (error || !order) {
    return (
      <div className="max-w-3xl mx-auto px-4 py-16 text-center">
        <div className="bg-red-50 border border-red-200 text-red-700 p-8 rounded-2xl">
          <AlertCircle className="w-10 h-10 mx-auto mb-3" />
          <h2 className="text-xl font-bold font-serif mb-2">Unable to Load Order</h2>
          <p className="text-sm mb-6">{error || 'Order could not be found.'}</p>
          <Link
            to="/account/orders"
            className="inline-flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl text-sm font-bold shadow-md shadow-brand-500/20 transition"
          >
            <ArrowLeft className="w-4 h-4" /> Back to My Orders
          </Link>
        </div>
      </div>
    );
  }

  const badge = statusBadgeConfig[order.status] || statusBadgeConfig.Pending;
  const formattedDate = new Date(order.createdAt).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  });

  return (
    <div className="bg-stone-50 min-h-screen py-10 print:bg-white print:py-0">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Navigation & Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6 print:hidden">
          <div className="flex items-center gap-3">
            <Link
              to="/account/orders"
              className="p-2 rounded-xl bg-white border border-stone-200 hover:bg-stone-100 text-stone-700 transition"
            >
              <ArrowLeft className="w-5 h-5" />
            </Link>
            <div>
              <h1 className="text-2xl font-bold font-serif text-stone-900">
                Order #{order.id}
              </h1>
              <p className="text-xs text-stone-500">Placed on {formattedDate}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handlePrint}
              className="inline-flex items-center gap-2 px-4 py-2 bg-white border border-stone-300 rounded-xl text-stone-700 text-sm font-semibold hover:bg-stone-100 transition shadow-sm"
            >
              <Printer className="w-4 h-4" /> Print Invoice
            </button>
            <Link
              to={`/account/orders/${order.id}/tracking`}
              className="inline-flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-brand-500 to-brand-600 hover:from-brand-600 hover:to-brand-700 text-white rounded-xl text-sm font-bold shadow-md shadow-brand-500/25 transition"
            >
              <Truck className="w-4 h-4" /> Live Tracking
            </Link>
          </div>
        </div>

        {/* Invoice Printable Container */}
        <div className="bg-white rounded-2xl border border-stone-200 shadow-sm overflow-hidden p-6 sm:p-8 space-y-8 print:border-none print:shadow-none print:p-0">
          {/* Header row */}
          <div className="flex flex-col sm:flex-row justify-between sm:items-center gap-4 pb-6 border-b border-stone-100">
            <div>
              <div className="flex items-center gap-3">
                <span className="text-xs font-bold text-stone-400 uppercase tracking-wider">Status:</span>
                <span className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold border ${badge.bg} ${badge.text} ${badge.border}`}>
                  {order.status}
                </span>
              </div>
              {order.estimatedDelivery && (
                <p className="text-xs text-stone-600 mt-1">
                  Expected Delivery: <strong className="text-stone-900">{new Date(order.estimatedDelivery).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}</strong>
                </p>
              )}
            </div>

            <div className="sm:text-right">
              <span className="text-xs text-stone-400 uppercase tracking-wider">Payment</span>
              <p className="text-sm font-semibold text-stone-900">
                {order.paymentMethod || 'Razorpay / UPI'} &bull; <span className="text-emerald-700">{order.paymentStatus || 'Paid'}</span>
              </p>
            </div>
          </div>

          {/* Customer & Address Details */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 bg-stone-50/70 p-5 rounded-xl border border-stone-200/60">
            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <MapPin className="w-4 h-4 text-brand-600" /> Delivery Address
              </h3>
              <p className="text-sm font-bold text-stone-900">{order.customerName}</p>
              <p className="text-xs text-stone-600 mt-0.5">{order.address}</p>
              <p className="text-xs text-stone-600">
                {order.city} - {order.pincode}
              </p>
              <p className="text-xs text-stone-600 mt-1">Phone: {order.phone}</p>
            </div>

            <div>
              <h3 className="text-xs font-bold uppercase tracking-wider text-stone-500 mb-2 flex items-center gap-1.5">
                <CreditCard className="w-4 h-4 text-brand-600" /> Billing &amp; Dispatch
              </h3>
              <p className="text-xs text-stone-600">
                Fulfilled by: <strong>Naik Foods Regional Spice Hub</strong>
              </p>
              <p className="text-xs text-stone-600 mt-0.5">Origin: Kolhapur & Pune Mills, Maharashtra</p>
              <p className="text-xs text-stone-600 mt-0.5">Carrier: Express Road Logistics</p>
              <p className="text-xs text-stone-500 mt-2 font-mono">Invoice Ref: INV-{order.id}</p>
            </div>
          </div>

          {/* Ordered Items Table */}
          <div>
            <h3 className="text-base font-bold font-serif text-stone-900 mb-3">
              Ordered Products
            </h3>
            <div className="border border-stone-200 rounded-xl overflow-hidden">
              <table className="w-full text-left text-sm">
                <thead className="bg-stone-50 text-stone-500 text-xs uppercase font-bold border-b border-stone-200">
                  <tr>
                    <th className="p-4">Item Details</th>
                    <th className="p-4 text-center">Unit Price</th>
                    <th className="p-4 text-center">Qty</th>
                    <th className="p-4 text-right">Amount</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-stone-100">
                  {order.items && order.items.map((item, idx) => (
                    <tr key={idx} className="hover:bg-amber-50/20">
                      <td className="p-4 flex items-center gap-3">
                        <img
                          src={item.image}
                          alt={item.name}
                          className="w-12 h-12 rounded-lg object-cover border border-stone-200"
                        />
                        <div>
                          <p className="font-semibold text-stone-900">{item.name}</p>
                          {item.marathiName && (
                            <p className="text-xs text-amber-900 font-serif">{item.marathiName}</p>
                          )}
                          <p className="text-[11px] text-stone-500">Net Wt: {item.weight || '250g'}</p>
                        </div>
                      </td>
                      <td className="p-4 text-center font-mono">₹{item.price}</td>
                      <td className="p-4 text-center font-mono font-semibold">{item.quantity}</td>
                      <td className="p-4 text-right font-mono font-bold text-stone-900">
                        ₹{item.price * item.quantity}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Summary Breakdown */}
          <div className="flex justify-end">
            <div className="w-full sm:w-72 space-y-2 text-sm text-stone-600">
              <div className="flex justify-between">
                <span>Subtotal</span>
                <span className="font-mono font-semibold text-stone-900">₹{order.subtotal || order.totalAmount}</span>
              </div>
              <div className="flex justify-between">
                <span>Shipping</span>
                <span className="font-mono text-stone-900">
                  {order.shippingCost === 0 || !order.shippingCost ? (
                    <span className="text-emerald-700 font-sans font-bold">FREE</span>
                  ) : (
                    `₹${order.shippingCost}`
                  )}
                </span>
              </div>
              {order.discount > 0 && (
                <div className="flex justify-between text-emerald-700 font-medium">
                  <span>Coupon Discount</span>
                  <span className="font-mono">-₹{order.discount}</span>
                </div>
              )}
              <div className="pt-2 border-t border-stone-200 flex justify-between items-baseline font-bold text-base text-stone-900">
                <span>Grand Total</span>
                <span className="text-xl font-mono text-stone-900 font-extrabold">₹{order.totalAmount}</span>
              </div>
            </div>
          </div>

          {/* Status Change History Timeline */}
          {order.statusHistory && order.statusHistory.length > 0 && (
            <div className="pt-6 border-t border-stone-100">
              <h3 className="text-sm font-bold uppercase tracking-wider text-stone-500 mb-4 flex items-center gap-1.5">
                <Clock className="w-4 h-4 text-brand-600" /> Order Timeline &amp; Updates
              </h3>
              <div className="relative pl-6 space-y-6 border-l-2 border-brand-200 ml-2">
                {order.statusHistory.map((entry, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-[31px] top-0 w-4 h-4 rounded-full bg-brand-600 border-2 border-white shadow-sm" />
                    <div>
                      <span className="inline-block font-bold text-stone-900 text-sm">
                        {entry.status}
                      </span>
                      <span className="ml-3 text-xs text-stone-400">
                        {new Date(entry.timestamp).toLocaleString('en-IN', {
                          day: 'numeric',
                          month: 'short',
                          hour: '2-digit',
                          minute: '2-digit'
                        })}
                      </span>
                      {entry.comment && (
                        <p className="text-xs text-stone-600 mt-0.5">{entry.comment}</p>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default OrderDetail;
